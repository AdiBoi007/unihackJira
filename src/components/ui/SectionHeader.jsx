function SectionHeader({ code, title }) {
  return (
    <div className="section-header">
      <span className="section-header__code">{code}</span>
      <h2>{title}</h2>
      <div className="section-header__rule" aria-hidden="true" />
    </div>
  );
}

export default SectionHeader;
