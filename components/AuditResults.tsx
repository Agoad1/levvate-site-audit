"use client";

import PDFExport from "./PDFExport";

interface AuditData {
  seo?: string[];
  page_structure?: string[];
  aeo?: string[];
  recommendations?: string[];
}

interface AuditResultsProps {
  data: AuditData;
  url: string;
}

const sections = [
  {
    key: "seo" as const,
    label: "SEO Issues",
    accent: "#dc2626",
    lightBg: "#fef2f2",
    emptyText: "No SEO issues identified.",
  },
  {
    key: "page_structure" as const,
    label: "Page Structure",
    accent: "#2563eb",
    lightBg: "#eff6ff",
    emptyText: "No page structure observations.",
  },
  {
    key: "aeo" as const,
    label: "AEO Improvements",
    accent: "#16a34a",
    lightBg: "#f0fdf4",
    emptyText: "No AEO improvements identified.",
  },
  {
    key: "recommendations" as const,
    label: "Recommendations",
    accent: "#7c3aed",
    lightBg: "#faf5ff",
    emptyText: "No recommendations provided.",
  },
];

export default function AuditResults({ data, url }: AuditResultsProps) {
  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let hostname = url;
  try {
    hostname = new URL(url).hostname;
  } catch {}

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Audit Report</h2>
        <PDFExport targetId="audit-report" filename={`Levvate_Audit_${hostname}.pdf`} />
      </div>

      {/* Document — this div is captured for PDF */}
      <div
        id="audit-report"
        style={{
          background: "#ffffff",
          maxWidth: "794px",
          margin: "0 auto",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          borderRadius: "8px",
          overflow: "hidden",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Letterhead */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
            padding: "40px 48px 32px",
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  letterSpacing: "-0.5px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  marginBottom: "4px",
                }}
              >
                LEVVATE
              </div>
              <div style={{ fontSize: "13px", opacity: 0.75, fontFamily: "system-ui, sans-serif", letterSpacing: "2px" }}>
                SITE AUDIT REPORT
              </div>
            </div>
            <div style={{ textAlign: "right", fontSize: "13px", opacity: 0.85, fontFamily: "system-ui, sans-serif" }}>
              <div>{reportDate}</div>
              <div style={{ marginTop: "4px", fontWeight: "600" }}>{hostname}</div>
            </div>
          </div>

          <div
            style={{
              marginTop: "28px",
              borderTop: "1px solid rgba(255,255,255,0.25)",
              paddingTop: "20px",
            }}
          >
            <div style={{ fontSize: "13px", opacity: 0.7, fontFamily: "system-ui, sans-serif", marginBottom: "6px" }}>
              AUDITED URL
            </div>
            <div style={{ fontSize: "15px", fontFamily: "system-ui, sans-serif", wordBreak: "break-all" }}>{url}</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "40px 48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {sections.map((section) => {
              const items = data[section.key];
              const hasItems = Array.isArray(items) && items.length > 0;

              return (
                <div key={section.key}>
                  {/* Section header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "28px",
                        background: section.accent,
                        borderRadius: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: section.accent,
                        margin: 0,
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {section.label}
                    </h3>
                  </div>

                  {/* Section content */}
                  <div
                    style={{
                      background: section.lightBg,
                      borderRadius: "6px",
                      padding: "20px 24px",
                      borderLeft: `3px solid ${section.accent}`,
                    }}
                  >
                    {hasItems ? (
                      <ul style={{ margin: 0, paddingLeft: "20px", listStyleType: "disc" }}>
                        {items!.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: "14px",
                              color: "#374151",
                              lineHeight: "1.7",
                              marginBottom: i < items!.length - 1 ? "8px" : 0,
                              fontFamily: "system-ui, -apple-system, sans-serif",
                            }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#9ca3af",
                          fontStyle: "italic",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {section.emptyText}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            background: "#f9fafb",
            borderTop: "1px solid #e5e7eb",
            padding: "16px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Generated by Levvate &middot; {reportDate}
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            levvate.com
          </span>
        </div>
      </div>
    </div>
  );
}
