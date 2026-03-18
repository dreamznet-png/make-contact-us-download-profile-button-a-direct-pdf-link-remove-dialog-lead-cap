import { trackEvent } from "@/lib/analytics";
import { X } from "lucide-react";
import { useState } from "react";

export function AIAssessmentPopout() {
  const [isOpen, setIsOpen] = useState(false);

  const handleStartAssessment = () => {
    trackEvent("cta_click", { cta_name: "Start Assessment" });
    setIsOpen(false);
    window.history.pushState({}, "", "/assessment");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const closePanel = () => {
    trackEvent("assessment_popout_closed");
    setIsOpen(false);
  };

  const openPanel = () => {
    trackEvent("assessment_popout_opened");
    setIsOpen(true);
  };

  return (
    <>
      <style>{`
        @keyframes aiPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        .ai-panel {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          height: 100dvh;
          width: clamp(300px, 85vw, 380px);
          z-index: 40;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          background-color: #0D1E35;
          border-left: 3px solid #E8AE20;
          border-radius: 16px 0 0 16px;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.45), -2px 0 12px rgba(232,174,32,0.15);
          overflow: hidden;
        }
        .ai-panel-open { transform: translateX(0); }
        .ai-panel-closed { transform: translateX(100%); }
        .ai-panel-scroll {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: column;
        }
        .ai-panel-footer {
          padding: 16px 24px;
          padding-bottom: max(16px, env(safe-area-inset-bottom));
          border-top: 1px solid rgba(232,174,32,0.2);
          background-color: #0D1E35;
          flex-shrink: 0;
        }
        .ai-start-btn {
          background-color: #E8AE20;
          color: #000000;
          border: none;
          border-radius: 8px;
          padding: 14px 20px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.03em;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 20px rgba(232,174,32,0.35);
          width: 100%;
        }
        .ai-tab-btn {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          background-color: #E8AE20;
          color: #000000;
          border: none;
          border-radius: 10px 0 0 10px;
          padding: 16px 10px;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.08em;
          cursor: pointer;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: -3px 0 16px rgba(232,174,32,0.45);
          user-select: none;
          white-space: nowrap;
          max-height: 200px;
        }
        .desktop-tab-text { display: inline-block; }
        .mobile-tab-text { display: none; }
        @media (max-width: 640px) {
          .ai-panel {
            width: 92vw;
          }
          .ai-tab-btn {
            padding: 12px 8px;
            font-size: 10px;
            max-height: 160px;
          }
          .ai-panel-footer {
            padding: 12px 16px;
            padding-bottom: max(12px, env(safe-area-inset-bottom));
          }
          .ai-start-btn {
            font-size: 14px;
            padding: 13px 16px;
          }
          .desktop-tab-text { display: none; }
          .mobile-tab-text { display: inline-block; }
        }
      `}</style>

      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close assessment panel"
          onClick={closePanel}
          onKeyDown={(e) => e.key === "Escape" && closePanel()}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
            zIndex: 39,
            cursor: "default",
          }}
        />
      )}

      <div
        data-ocid="ai-assessment.panel"
        className={`ai-panel ${isOpen ? "ai-panel-open" : "ai-panel-closed"}`}
      >
        <div className="ai-panel-scroll">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              padding: "20px 20px 0",
            }}
          >
            <button
              type="button"
              data-ocid="ai-assessment.close_button"
              onClick={closePanel}
              aria-label="Close assessment panel"
              style={{
                background: "rgba(232,174,32,0.12)",
                border: "1px solid rgba(232,174,32,0.3)",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#E8AE20",
                flexShrink: 0,
              }}
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div
            style={{
              padding: "16px 24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#E8AE20",
                  boxShadow: "0 0 6px #E8AE20",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#E8AE20",
                }}
              >
                AI Readiness
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(20px, 5vw, 26px)",
                fontWeight: 800,
                color: "#E8AE20",
                lineHeight: 1.2,
                marginBottom: 10,
                letterSpacing: "-0.02em",
              }}
            >
              Do I Need AI in My Business?
            </h2>

            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.75)",
                marginBottom: 18,
                letterSpacing: "0.01em",
              }}
            >
              A 2-Minute Reality Check for SME Owners
            </p>

            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, #E8AE20 0%, rgba(232,174,32,0.1) 100%)",
                marginBottom: 18,
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.65,
                }}
              >
                Most businesses don&apos;t realize where they are losing{" "}
                <span style={{ color: "#E8AE20", fontWeight: 600 }}>time</span>,{" "}
                <span style={{ color: "#E8AE20", fontWeight: 600 }}>money</span>
                , and{" "}
                <span style={{ color: "#E8AE20", fontWeight: 600 }}>
                  opportunities
                </span>
                .
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.65,
                }}
              >
                Answer these questions honestly.
              </p>
              <div
                style={{
                  background: "rgba(232,174,32,0.08)",
                  border: "1px solid rgba(232,174,32,0.25)",
                  borderRadius: 10,
                  padding: "12px 14px",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  If you say{" "}
                  <span
                    style={{ color: "#E8AE20", fontWeight: 700, fontSize: 14 }}
                  >
                    &ldquo;Yes&rdquo;
                  </span>{" "}
                  to even{" "}
                  <span style={{ color: "#E8AE20", fontWeight: 700 }}>3–4</span>
                  , your business is{" "}
                  <span style={{ color: "#E8AE20", fontWeight: 700 }}>
                    ready for AI systems
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-panel-footer">
          <button
            type="button"
            data-ocid="ai-assessment.primary_button"
            onClick={handleStartAssessment}
            className="ai-start-btn"
          >
            Start Assessment
            <span style={{ fontSize: 17, lineHeight: 1 }}>→</span>
          </button>
        </div>
      </div>

      <button
        type="button"
        data-ocid="ai-assessment.open_modal_button"
        onClick={() => (isOpen ? closePanel() : openPanel())}
        aria-label="Open AI assessment panel"
        aria-expanded={isOpen}
        className="ai-tab-btn"
      >
        <span
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "#000000",
            opacity: 0.6,
            animation: "aiPulse 1.8s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
        <span
          className="desktop-tab-text"
          style={{ transform: "rotate(180deg)" }}
        >
          AI Check
        </span>
        <span
          className="mobile-tab-text"
          style={{ transform: "rotate(180deg)" }}
        >
          AI Check
        </span>
      </button>
    </>
  );
}
