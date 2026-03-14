import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Orchestrator is running' });
});

// Chat completion endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'llama-3.3-70b-versatile' } = req.body;

    console.log('\n🔵 New chat request received');
    console.log('📝 Number of messages:', messages?.length);
    console.log('🤖 Model:', model);

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Invalid request: messages array is required'
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ 
        error: 'Server configuration error: GROQ_API_KEY not set' 
      });
    }

    // Add system prompt if not already present
    const systemPrompt = {
      role: 'system',
      content: 'You are a product manager that handles work distribution based on the individual performance of developers and reports their progress back to the managers in real time. keep your answers to 3-4 short sentences max.'
    };

    const hasSystemMessage = messages.some(msg => msg.role === 'system');
    const conversationMessages = hasSystemMessage ? messages : [systemPrompt, ...messages];

    // Call Groq API
    console.log('🚀 Calling GROQ API...');
    const startTime = Date.now();

    const chatCompletion = await groq.chat.completions.create({
      messages: conversationMessages,
      model: model,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    const duration = Date.now() - startTime;
    const assistantMessage = chatCompletion.choices[0]?.message?.content;

    if (!assistantMessage) {
      return res.status(500).json({
        error: 'No response from AI'
      });
    }

    console.log('✅ GROQ response received');
    console.log('⏱️  Response time:', duration + 'ms');
    console.log('📊 Tokens used:', chatCompletion.usage?.total_tokens);
    console.log('💬 Response preview:', assistantMessage.substring(0, 100) + '...');

    res.json({
      success: true,
      message: assistantMessage,
      model: model,
      usage: chatCompletion.usage,
      timestamp: new Date().toISOString(),
      responseId: chatCompletion.id
    });

  } catch (error) {
    console.error('Error calling Groq API:', error);
    
    // Handle specific error types
    if (error.status === 401) {
      return res.status(401).json({ 
        error: 'Invalid API key' 
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`✅ GROQ API Key: ${process.env.GROQ_API_KEY ? 'Configured' : '❌ MISSING'}`);
});

