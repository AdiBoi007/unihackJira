import { FileText, Upload, X } from "lucide-react";
import { useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import { documentationUploadConfig } from "../../data/mockData";
import { useDashboard } from "../../context/DashboardContext";
import { formatFileSize, formatRelativeTime } from "../../utils/time";

function DocumentationUploadSection() {
  const { addDocuments, documents, removeDocument } = useDashboard();
  const srsInputRef = useRef(null);
  const docsInputRef = useRef(null);
  const latestUpload = documents[0]?.uploadedAt ? formatRelativeTime(documents[0].uploadedAt) : "No uploads";
  const srsCount = documents.filter((document) => document.category === "SRS").length;
  const docsCount = documents.filter((document) => document.category === "DOCS").length;

  const inputRefs = {
    documentation: docsInputRef,
    srs: srsInputRef,
  };

  const handleUpload = (category, event) => {
    addDocuments(event.target.files, category);
    event.target.value = "";
  };

  return (
    <section className="dashboard-section" data-section id="documentation-uploader">
      <SectionHeader code="08 — DOCUMENT UPLOADS" title="Upload the SRS and software documentation" />

      <div className="doc-summary-grid">
        <article className="doc-summary-card">
          <span className="doc-summary-card__label">TOTAL FILES</span>
          <strong className="doc-summary-card__value">{documents.length}</strong>
          <span className="doc-summary-card__meta">IN THIS SESSION</span>
        </article>

        <article className="doc-summary-card">
          <span className="doc-summary-card__label">SRS FILES</span>
          <strong className="doc-summary-card__value">{srsCount}</strong>
          <span className="doc-summary-card__meta">REQUIREMENTS BASELINE</span>
        </article>

        <article className="doc-summary-card">
          <span className="doc-summary-card__label">SUPPORT DOCS</span>
          <strong className="doc-summary-card__value">{docsCount}</strong>
          <span className="doc-summary-card__meta">TECHNICAL REFERENCE</span>
        </article>

        <article className="doc-summary-card">
          <span className="doc-summary-card__label">LATEST UPLOAD</span>
          <strong className="doc-summary-card__value doc-summary-card__value--small">
            {documents.length ? latestUpload : "NONE"}
          </strong>
          <span className="doc-summary-card__meta">MOST RECENT FILE</span>
        </article>
      </div>

      <div className="doc-layout">
        <div className="doc-upload-grid">
          {documentationUploadConfig.zones.map((zone) => (
            <article className="doc-upload-card" key={zone.id}>
              <div className="doc-upload-card__icon">
                <Upload size={18} strokeWidth={1.8} />
              </div>
              <span className="summary-card__label">{zone.code}</span>
              <h3>{zone.title}</h3>
              <p>{zone.detail}</p>
              <button
                className="doc-upload-card__button"
                onClick={() => inputRefs[zone.id].current?.click()}
                type="button"
              >
                {zone.buttonLabel}
              </button>
              <span className="doc-upload-card__accept">PDF / DOC / DOCX / MD / TXT / RTF</span>
              <input
                accept={documentationUploadConfig.accept}
                className="doc-upload-card__input"
                multiple
                onChange={(event) => handleUpload(zone.id, event)}
                ref={inputRefs[zone.id]}
                type="file"
              />
            </article>
          ))}
        </div>

        <article className="doc-library">
          <div className="doc-library__header">
            <div>
              <span className="summary-card__label">DOCUMENT LIBRARY</span>
              <h3>Uploaded files</h3>
            </div>
            <span className="doc-library__meta">{latestUpload}</span>
          </div>

          {documents.length ? (
            <div className="document-list">
              {documents.map((document) => (
                <div className={document.isNew ? "document-row is-new" : "document-row"} key={document.id}>
                  <div className="document-row__identity">
                    <div className="document-row__icon">
                      <FileText size={16} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h4>{document.name}</h4>
                      <div className="document-row__chips">
                        <span
                          className={
                            document.category === "SRS"
                              ? "document-chip document-chip--srs"
                              : "document-chip document-chip--docs"
                          }
                        >
                          {document.category}
                        </span>
                        <span className="document-chip document-chip--ext">{document.extension}</span>
                      </div>
                    </div>
                  </div>

                  <div className="document-row__details">
                    <span>{formatFileSize(document.size)}</span>
                    <span>{formatRelativeTime(document.uploadedAt)}</span>
                  </div>

                  <button
                    aria-label={`Delete ${document.name}`}
                    className="document-row__delete"
                    onClick={() => removeDocument(document.id)}
                    type="button"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="doc-library__empty">
              <span className="summary-card__label">NO FILES YET</span>
              <p>Upload the SRS or any supporting software documentation to populate this page.</p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

export default DocumentationUploadSection;
