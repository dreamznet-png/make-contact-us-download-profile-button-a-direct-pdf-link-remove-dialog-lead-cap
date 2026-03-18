import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Industry =
  | "Manufacturing"
  | "Trading / Distribution"
  | "Agency / Professional Services"
  | "Ecommerce / Retail"
  | "Other";
type AnswerValue = 0 | 1 | 2 | 3;

interface Question {
  id: string;
  text: string;
  section: "sales" | "communication" | "productivity" | "industry";
}

const SCORING_OPTIONS: { label: string; value: AnswerValue }[] = [
  { label: "Never", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Always", value: 3 },
];

const INDUSTRIES: Industry[] = [
  "Manufacturing",
  "Trading / Distribution",
  "Agency / Professional Services",
  "Ecommerce / Retail",
  "Other",
];

const CORE_QUESTIONS: Question[] = [
  // Sales & Lead Management
  {
    id: "s1",
    section: "sales",
    text: "Do leads come from multiple channels (WhatsApp, email, website, calls) without a central system?",
  },
  {
    id: "s2",
    section: "sales",
    text: "Do you depend on salespeople remembering follow-ups?",
  },
  {
    id: "s3",
    section: "sales",
    text: "Have you lost business due to slow responses?",
  },
  {
    id: "s4",
    section: "sales",
    text: "Do you know your lead-to-conversion ratio?",
  },
  { id: "s5", section: "sales", text: "Are follow-ups automated or manual?" },
  // Customer Communication
  {
    id: "c1",
    section: "communication",
    text: "Do customers repeatedly ask the same questions?",
  },
  {
    id: "c2",
    section: "communication",
    text: "Do enquiries remain unanswered outside office hours?",
  },
  {
    id: "c3",
    section: "communication",
    text: "Do staff manually answer common queries daily?",
  },
  {
    id: "c4",
    section: "communication",
    text: "Is customer data scattered across different systems?",
  },
  {
    id: "c5",
    section: "communication",
    text: "Do customers often ask for updates on orders or services?",
  },
  // Internal Productivity
  { id: "p1", section: "productivity", text: "Are reports created manually?" },
  {
    id: "p2",
    section: "productivity",
    text: "Do teams copy data between spreadsheets or systems?",
  },
  {
    id: "p3",
    section: "productivity",
    text: "Do managers spend time collecting updates from people?",
  },
  {
    id: "p4",
    section: "productivity",
    text: "Are repetitive tasks done daily by staff?",
  },
  {
    id: "p5",
    section: "productivity",
    text: "Do employees repeatedly write similar emails or documents?",
  },
];

const INDUSTRY_QUESTIONS: Record<Industry, Question[]> = {
  Manufacturing: [
    {
      id: "m1",
      section: "industry",
      text: "Can you see real-time production status without calling someone?",
    },
    {
      id: "m2",
      section: "industry",
      text: "Do delays become visible only near delivery?",
    },
    {
      id: "m3",
      section: "industry",
      text: "Is production planning dependent on one experienced supervisor?",
    },
    {
      id: "m4",
      section: "industry",
      text: "Do you track machine downtime digitally?",
    },
    {
      id: "m5",
      section: "industry",
      text: "Are production reports created manually?",
    },
    {
      id: "m6",
      section: "industry",
      text: "Can you predict bottlenecks before they happen?",
    },
    { id: "m7", section: "industry", text: "Are inventory updates manual?" },
    {
      id: "m8",
      section: "industry",
      text: "Do customers call asking order status?",
    },
  ],
  "Trading / Distribution": [
    {
      id: "t1",
      section: "industry",
      text: "Do you manage inventory levels manually across warehouses?",
    },
    {
      id: "t2",
      section: "industry",
      text: "Do stockouts or excess inventory occur frequently?",
    },
    {
      id: "t3",
      section: "industry",
      text: "Does order processing from receipt to dispatch take longer than expected?",
    },
    {
      id: "t4",
      section: "industry",
      text: "Do you lack real-time visibility into inventory across all locations?",
    },
    {
      id: "t5",
      section: "industry",
      text: "Does management lack access to daily sales and stock movement dashboards?",
    },
    {
      id: "t6",
      section: "industry",
      text: "Is demand forecasting done manually without data systems?",
    },
    {
      id: "t7",
      section: "industry",
      text: "Are purchase orders generated manually rather than through automated systems?",
    },
    {
      id: "t8",
      section: "industry",
      text: "Is your order processing workflow mostly manual?",
    },
    {
      id: "t9",
      section: "industry",
      text: "Are supplier communications managed manually?",
    },
    {
      id: "t10",
      section: "industry",
      text: "Does it take too long to identify slow-moving or dead inventory?",
    },
    {
      id: "t11",
      section: "industry",
      text: "Does it take more than a day to adjust pricing or promotions based on demand?",
    },
    {
      id: "t12",
      section: "industry",
      text: "Do you lack AI tools for forecasting, pricing, or supply chain planning?",
    },
  ],
  "Agency / Professional Services": [
    {
      id: "a1",
      section: "industry",
      text: "Are proposals created from scratch every time?",
    },
    {
      id: "a2",
      section: "industry",
      text: "Do account managers manually prepare weekly reports?",
    },
    {
      id: "a3",
      section: "industry",
      text: "Do clients repeatedly ask similar questions?",
    },
    {
      id: "a4",
      section: "industry",
      text: "Is project tracking done through spreadsheets or WhatsApp?",
    },
    {
      id: "a5",
      section: "industry",
      text: "Do teams manually summarize meetings?",
    },
    {
      id: "a6",
      section: "industry",
      text: "Do leads get lost due to lack of follow-up?",
    },
    {
      id: "a7",
      section: "industry",
      text: "Do employees repeatedly create presentations?",
    },
    {
      id: "a8",
      section: "industry",
      text: "Do managers struggle to track team bandwidth?",
    },
  ],
  "Ecommerce / Retail": [
    {
      id: "e1",
      section: "industry",
      text: "Do customers frequently ask order status questions?",
    },
    {
      id: "e2",
      section: "industry",
      text: "Does support repeatedly answer the same product queries?",
    },
    {
      id: "e3",
      section: "industry",
      text: "Do you manually update product catalogues?",
    },
    {
      id: "e4",
      section: "industry",
      text: "Do you struggle to predict demand?",
    },
    {
      id: "e5",
      section: "industry",
      text: "Are marketing campaigns created without clear performance data?",
    },
    {
      id: "e6",
      section: "industry",
      text: "Are product descriptions written manually?",
    },
    {
      id: "e7",
      section: "industry",
      text: "Do customers wait long for responses?",
    },
    {
      id: "e8",
      section: "industry",
      text: "Do you rely on spreadsheets for sales insights?",
    },
  ],
  Other: [
    {
      id: "e9",
      section: "industry",
      text: "Are proposals or quotes created manually each time?",
    },
    {
      id: "e10",
      section: "industry",
      text: "Do staff spend significant time on administrative tasks?",
    },
    {
      id: "e11",
      section: "industry",
      text: "Is business performance tracked through spreadsheets?",
    },
    {
      id: "e12",
      section: "industry",
      text: "Do you struggle to get real-time visibility into operations?",
    },
    {
      id: "e13",
      section: "industry",
      text: "Are customer updates communicated manually?",
    },
    {
      id: "e14",
      section: "industry",
      text: "Do managers spend time collecting status updates from teams?",
    },
    {
      id: "e15",
      section: "industry",
      text: "Are key processes dependent on specific individuals?",
    },
    {
      id: "e16",
      section: "industry",
      text: "Do you lack automated reporting on business performance?",
    },
  ],
};

const SECTION_LABELS: Record<string, string> = {
  sales: "Sales & Lead Management",
  communication: "Customer Communication",
  productivity: "Internal Productivity",
  industry: "Industry Operations",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getIndustryKeys(ind: Industry): string[] {
  return (INDUSTRY_QUESTIONS[ind] ?? []).map((q) => q.id);
}

function getIndustryMax(ind: Industry | null): number {
  if (!ind) return 24;
  return INDUSTRY_QUESTIONS[ind].length * 3;
}

function getTotalMax(ind: Industry | null): number {
  return 45 + getIndustryMax(ind);
}

function getScoreInterpretation(score: number, maxScore: number) {
  const pct = maxScore > 0 ? score / maxScore : 0;
  if (pct < 0.3)
    return {
      headline: "Structured Foundation",
      body: "Your systems are structured. AI can provide incremental improvements.",
      color: "#22c55e",
    };
  if (pct < 0.58)
    return {
      headline: "Moderate Manual Processes",
      body: "Your business has several manual processes. AI could significantly improve productivity.",
      color: "#eab308",
    };
  if (pct < 0.8)
    return {
      headline: "High Automation Potential",
      body: "Your business relies heavily on manual workflows. AI could automate 20–30% of operations.",
      color: "#f97316",
    };
  return {
    headline: "Transformation Ready",
    body: "Your business is highly dependent on manual work. AI transformation could deliver major efficiency gains.",
    color: "#ef4444",
  };
}

function getRecommendations(
  answers: Record<string, AnswerValue>,
  industry: Industry,
) {
  const recs: { title: string; description: string }[] = [];
  const salesScore = ["s1", "s2", "s3", "s4", "s5"].reduce(
    (a, k) => a + (answers[k] ?? 0),
    0,
  );
  const commScore = ["c1", "c2", "c3", "c4", "c5"].reduce(
    (a, k) => a + (answers[k] ?? 0),
    0,
  );
  const prodScore = ["p1", "p2", "p3", "p4", "p5"].reduce(
    (a, k) => a + (answers[k] ?? 0),
    0,
  );
  const industryKeys = getIndustryKeys(industry);
  const industryScore = industryKeys.reduce((a, k) => a + (answers[k] ?? 0), 0);
  const industryMax = getIndustryMax(industry);

  if (salesScore >= 6)
    recs.push({
      title: "AI Sales Follow-up System",
      description:
        "Automate lead tracking, follow-up scheduling, and conversion monitoring across all channels.",
    });
  if (commScore >= 6)
    recs.push({
      title: "AI Customer Support Assistant",
      description:
        "Deploy an AI assistant to handle FAQs, after-hours enquiries, and order status requests automatically.",
    });
  if (prodScore >= 6)
    recs.push({
      title: "Workflow Automation",
      description:
        "Eliminate manual data copying and repetitive administrative tasks through intelligent workflow automation.",
    });
  if (prodScore >= 4)
    recs.push({
      title: "Reporting Automation",
      description:
        "Replace manual report creation with automated dashboards that update in real time.",
    });
  // threshold scales with number of industry questions (roughly 40% of max)
  if (industryScore >= Math.ceil(industryMax * 0.4))
    recs.push({
      title: "Decision Intelligence Dashboard",
      description: `Get real-time visibility into ${industry} operations with AI-powered analytics and alerts.`,
    });

  if (recs.length === 0)
    recs.push({
      title: "Incremental AI Enhancements",
      description:
        "Your operations are relatively structured. Targeted AI tools can add efficiency at key touchpoints.",
    });
  return recs;
}

// ─── Report Download ──────────────────────────────────────────────────────────
function generateReport(params: {
  name: string;
  company: string;
  industry: Industry;
  totalScore: number;
  totalMax: number;
  industryMax: number;
  sectionScores: Record<string, number>;
  recommendations: { title: string; description: string }[];
  interpretation: ReturnType<typeof getScoreInterpretation>;
}) {
  const {
    name,
    company,
    industry,
    totalScore,
    totalMax,
    industryMax,
    sectionScores,
    recommendations,
    interpretation,
  } = params;
  const date = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>AI Opportunity Report – ${company}</title>
<style>
  body { font-family: Georgia, serif; margin: 0; padding: 0; background: #fff; color: #1a1a1a; }
  .cover { background: #0D1E35; color: #fff; padding: 60px 48px; }
  .logo { font-size: 28px; font-weight: 900; color: #E8AE20; letter-spacing: 0.1em; margin-bottom: 8px; }
  .tagline { font-size: 12px; color: rgba(255,255,255,0.6); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 48px; }
  .cover h1 { font-size: 36px; color: #E8AE20; margin: 0 0 12px; }
  .cover .meta { font-size: 14px; color: rgba(255,255,255,0.75); margin-top: 24px; line-height: 2; }
  .body { padding: 48px; }
  h2 { color: #0D1E35; border-bottom: 2px solid #E8AE20; padding-bottom: 8px; margin-top: 40px; font-size: 18px; }
  .score-block { background: #0D1E35; color: #fff; border-radius: 12px; padding: 32px; text-align: center; margin: 24px 0; }
  .score-num { font-size: 72px; font-weight: 900; color: #E8AE20; line-height: 1; }
  .score-label { font-size: 14px; color: rgba(255,255,255,0.7); margin-top: 6px; }
  .score-headline { font-size: 20px; font-weight: 700; color: #fff; margin-top: 12px; }
  .score-body { font-size: 14px; color: rgba(255,255,255,0.8); margin-top: 8px; }
  .bar-row { display: flex; align-items: center; gap: 12px; margin: 12px 0; }
  .bar-label { min-width: 200px; font-size: 13px; color: #333; }
  .bar-track { flex: 1; background: #eee; border-radius: 4px; height: 14px; }
  .bar-fill { background: #E8AE20; border-radius: 4px; height: 14px; }
  .bar-val { min-width: 40px; font-size: 13px; font-weight: 700; color: #0D1E35; text-align: right; }
  .rec-item { border-left: 4px solid #E8AE20; padding: 12px 16px; margin: 12px 0; background: #f9f7f0; border-radius: 0 8px 8px 0; }
  .rec-title { font-weight: 700; color: #0D1E35; font-size: 15px; }
  .rec-desc { font-size: 13px; color: #555; margin-top: 4px; }
  .footer { background: #0D1E35; color: rgba(255,255,255,0.6); padding: 24px 48px; font-size: 12px; margin-top: 60px; }
  .next-steps li { margin: 8px 0; font-size: 14px; color: #333; }
</style>
</head>
<body>
<div class="cover">
  <div class="logo">INOVICS</div>
  <div class="tagline">AI Transformation Studio</div>
  <h1>AI Opportunity Report</h1>
  <div class="meta">
    Prepared for: <strong style="color:#fff">${name}</strong><br/>
    Company: <strong style="color:#fff">${company}</strong><br/>
    Industry: <strong style="color:#fff">${industry}</strong><br/>
    Date: ${date}
  </div>
</div>
<div class="body">
  <h2>AI Readiness Score</h2>
  <div class="score-block">
    <div class="score-num">${totalScore}</div>
    <div class="score-label">out of ${totalMax}</div>
    <div class="score-headline">${interpretation.headline}</div>
    <div class="score-body">${interpretation.body}</div>
  </div>

  <h2>Category Performance</h2>
  ${Object.entries(sectionScores)
    .map(([key, val]) => {
      const max = key === "industry" ? industryMax : 15;
      const pct = Math.round((val / max) * 100);
      return `<div class="bar-row">
      <span class="bar-label">${SECTION_LABELS[key]}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
      <span class="bar-val">${val}/${max}</span>
    </div>`;
    })
    .join("")}

  <h2>Identified Inefficiencies</h2>
  <p style="font-size:14px;color:#444">Based on your responses, your business shows manual process dependencies across multiple operational areas. Key inefficiency signals were detected in your workflow, communication, and reporting systems.</p>

  <h2>Recommended AI Systems</h2>
  ${recommendations.map((r) => `<div class="rec-item"><div class="rec-title">${r.title}</div><div class="rec-desc">${r.description}</div></div>`).join("")}

  <h2>Estimated Productivity Improvement</h2>
  <p style="font-size:14px;color:#444">Based on your AI Opportunity Score of <strong>${totalScore}/${totalMax}</strong>, implementing the recommended AI systems could deliver:</p>
  <ul style="font-size:14px;color:#333;line-height:2">
    <li>Productivity improvement: <strong>20–40%</strong></li>
    <li>Reduction in manual administrative work: <strong>30–50%</strong></li>
    <li>Faster response times to customers: <strong>60–80%</strong></li>
    <li>Improved decision visibility for leadership: <strong>Significant</strong></li>
  </ul>

  <h2>Next Steps to Implement AI</h2>
  <ol class="next-steps">
    <li>Book a Strategy Session with the INOVICS team to discuss your specific operational gaps.</li>
    <li>Conduct a detailed process audit of your top 3 manual workflows.</li>
    <li>Define a 90-day AI implementation roadmap prioritizing highest-impact areas.</li>
    <li>Pilot one AI system (typically Sales Follow-up or Customer Support) within 30 days.</li>
    <li>Measure and document outcomes before scaling to additional systems.</li>
  </ol>
</div>
<div class="footer">
  INOVICS — AI Transformation Studio | Ground floor, Mahendra Mansion, D.J.Road, Vile Parle(w), Mumbai 400056 | contact@weareinovics.com | +91 9322286441
</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `INOVICS-AI-Opportunity-Report-${company.replace(/\s+/g, "-")}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Step Components ──────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 32,
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: stable fixed-length array
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: i < step ? 28 : i === step ? 28 : 24,
              height: i < step ? 28 : i === step ? 28 : 24,
              borderRadius: "50%",
              backgroundColor:
                i < step
                  ? "#E8AE20"
                  : i === step
                    ? "#E8AE20"
                    : "rgba(232,174,32,0.2)",
              border: i === step ? "3px solid #E8AE20" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: i <= step ? "#000" : "rgba(255,255,255,0.4)",
              flexShrink: 0,
              transition: "all 0.3s",
            }}
          >
            {i < step ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div
              style={{
                width: 24,
                height: 2,
                backgroundColor: i < step ? "#E8AE20" : "rgba(232,174,32,0.2)",
                flexShrink: 0,
                transition: "background 0.3s",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Progress
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#E8AE20" }}>
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: "rgba(232,174,32,0.15)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "#E8AE20",
            borderRadius: 3,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

function CategoryBar({
  label,
  value,
  max,
}: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.85)",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#E8AE20" }}>
          {value}/{max}
        </span>
      </div>
      <div
        style={{
          height: 10,
          background: "rgba(232,174,32,0.15)",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background:
              pct >= 80
                ? "#ef4444"
                : pct >= 60
                  ? "#f97316"
                  : pct >= 40
                    ? "#E8AE20"
                    : "#22c55e",
            borderRadius: 5,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function AssessmentPage() {
  useSEO({
    title: "AI Opportunity Assessment | INOVICS",
    description:
      "Take a 2-minute assessment to discover your business's AI readiness and where automation can deliver the biggest impact.",
    url: "/assessment",
  });
  const [step, setStep] = useState<
    "industry" | "questions" | "leadcapture" | "results"
  >("industry");
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [leadData, setLeadData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const allQuestions = industry
    ? [...CORE_QUESTIONS, ...INDUSTRY_QUESTIONS[industry]]
    : CORE_QUESTIONS;
  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[questionIndex];

  const industryMax = getIndustryMax(industry);
  const totalMax = getTotalMax(industry);

  const sectionScores = {
    sales: ["s1", "s2", "s3", "s4", "s5"].reduce(
      (a, k) => a + (answers[k] ?? 0),
      0,
    ),
    communication: ["c1", "c2", "c3", "c4", "c5"].reduce(
      (a, k) => a + (answers[k] ?? 0),
      0,
    ),
    productivity: ["p1", "p2", "p3", "p4", "p5"].reduce(
      (a, k) => a + (answers[k] ?? 0),
      0,
    ),
    industry: industry
      ? getIndustryKeys(industry).reduce((a, k) => a + (answers[k] ?? 0), 0)
      : 0,
  };
  const totalScore = Object.values(sectionScores).reduce((a, b) => a + b, 0);
  const interpretation = getScoreInterpretation(totalScore, totalMax);
  const recommendations = industry ? getRecommendations(answers, industry) : [];

  const currentSection = currentQuestion
    ? SECTION_LABELS[currentQuestion.section]
    : "";
  const prevSectionLabel =
    questionIndex > 0
      ? SECTION_LABELS[allQuestions[questionIndex - 1].section]
      : null;
  const isSectionStart =
    questionIndex === 0 || prevSectionLabel !== currentSection;

  function handleAnswer(val: AnswerValue) {
    const newAnswers = { ...answers, [currentQuestion.id]: val };
    setAnswers(newAnswers);
    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
    } else {
      trackEvent("assessment_step", { step: "leadcapture" });
      setStep("leadcapture");
    }
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLeadSubmitting(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "df498dde-23c4-4163-8da6-1f764a11e96f",
          subject: `AI Assessment Report Request – ${leadData.company}`,
          from_name: leadData.name,
          name: leadData.name,
          company: leadData.company,
          email: leadData.email,
          phone: leadData.phone,
          industry: industry,
          ai_opportunity_score: totalScore,
          score_interpretation: interpretation.headline,
          message: `AI Assessment completed. Score: ${totalScore}/${totalMax} — ${interpretation.headline}`,
        }),
      });
    } catch (_) {
      /* silent */
    }
    setLeadSubmitting(false);

    trackEvent("assessment_completed", { score: totalScore });
    setStep("results");
  }

  // ── STYLES ──
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#0D1E35",
    paddingTop: 130,
    paddingBottom: 80,
  };
  const containerStyle: React.CSSProperties = {
    maxWidth: 720,
    margin: "0 auto",
    padding: "0 24px",
  };
  const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(232,174,32,0.2)",
    borderRadius: 20,
    padding: "40px 48px",
  };
  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(24px, 4vw, 32px)",
    fontWeight: 900,
    color: "#E8AE20",
    marginBottom: 8,
    lineHeight: 1.2,
  };
  const subtitleStyle: React.CSSProperties = {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 32,
    lineHeight: 1.6,
  };

  // ── INDUSTRY SELECTION ──
  if (step === "industry") {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <StepIndicator step={0} total={4} />
          <div style={cardStyle}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#E8AE20",
                marginBottom: 12,
              }}
            >
              Step 1 of 4
            </p>
            <h1 style={titleStyle}>Select Your Industry</h1>
            <p style={subtitleStyle}>
              We'll tailor the assessment questions to your specific business
              context.
            </p>
            <div style={{ display: "grid", gap: 12 }}>
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  data-ocid="assessment.industry.button"
                  onClick={() => {
                    setIndustry(ind);
                    setAnswers({});
                    trackEvent("assessment_started");
                    trackEvent("assessment_industry_selected", {
                      industry: ind,
                    });
                    setStep("questions");
                    setQuestionIndex(0);
                  }}
                  style={{
                    textAlign: "left",
                    padding: "18px 24px",
                    background:
                      industry === ind
                        ? "rgba(232,174,32,0.15)"
                        : "rgba(255,255,255,0.04)",
                    border:
                      industry === ind
                        ? "1.5px solid #E8AE20"
                        : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                  }}
                >
                  {ind}
                  <span style={{ color: "#E8AE20", fontSize: 20 }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── QUESTIONS ──
  if (step === "questions" && industry) {
    const _answered = Object.keys(answers).filter((k) =>
      allQuestions.find((q) => q.id === k),
    ).length;
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <StepIndicator step={1} total={4} />
          <ProgressBar value={questionIndex} max={totalQuestions} />
          <div style={cardStyle}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#E8AE20",
                marginBottom: 8,
              }}
            >
              Question {questionIndex + 1} of {totalQuestions}
            </p>
            {isSectionStart && (
              <div
                style={{
                  background: "rgba(232,174,32,0.1)",
                  border: "1px solid rgba(232,174,32,0.3)",
                  borderRadius: 8,
                  padding: "10px 16px",
                  marginBottom: 20,
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#E8AE20",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Section: {currentSection}
                </span>
              </div>
            )}
            <h2
              style={{
                ...titleStyle,
                fontSize: "clamp(18px, 3vw, 24px)",
                marginBottom: 32,
              }}
            >
              {currentQuestion.text}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {SCORING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  data-ocid="assessment.answer.button"
                  onClick={() => handleAnswer(opt.value)}
                  style={{
                    padding: "16px 20px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.15s",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(232,174,32,0.15)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#E8AE20";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(255,255,255,0.12)";
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>
                    {opt.value === 0
                      ? "✗"
                      : opt.value === 1
                        ? "△"
                        : opt.value === 2
                          ? "◎"
                          : "✓"}
                  </div>
                  {opt.label}
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.45)",
                      marginTop: 2,
                    }}
                  >
                    {opt.value} pts
                  </div>
                </button>
              ))}
            </div>
            {questionIndex > 0 && (
              <button
                type="button"
                onClick={() => setQuestionIndex(questionIndex - 1)}
                style={{
                  marginTop: 24,
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── LEAD CAPTURE ──
  if (step === "leadcapture") {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <StepIndicator step={2} total={4} />
          <div style={cardStyle}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#E8AE20",
                marginBottom: 12,
              }}
            >
              Almost there
            </p>
            <h1 style={titleStyle}>Get Your AI Opportunity Report</h1>
            <p style={subtitleStyle}>
              Enter your details to unlock your personalised report with scores,
              insights, and recommendations.
            </p>
            <form
              onSubmit={handleLeadSubmit}
              style={{ display: "grid", gap: 16 }}
            >
              {(
                [
                  {
                    key: "name",
                    label: "Full Name",
                    placeholder: "Your name",
                    type: "text",
                  },
                  {
                    key: "company",
                    label: "Company Name",
                    placeholder: "Your company",
                    type: "text",
                  },
                  {
                    key: "email",
                    label: "Email Address",
                    placeholder: "your@email.com",
                    type: "email",
                  },
                  {
                    key: "phone",
                    label: "Phone Number",
                    placeholder: "+91 XXXXX XXXXX",
                    type: "tel",
                  },
                ] as const
              ).map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label
                    htmlFor={`lead-field-${key}`}
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                      marginBottom: 6,
                    }}
                  >
                    {label} *
                  </label>
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    value={leadData[key]}
                    onChange={(e) =>
                      setLeadData((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    id={`lead-field-${key}`}
                    data-ocid="assessment.lead.input"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 10,
                      color: "#fff",
                      fontSize: 15,
                      fontFamily: "inherit",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={leadSubmitting}
                data-ocid="assessment.lead.submit_button"
                style={{
                  marginTop: 8,
                  padding: "18px 24px",
                  background: "#E8AE20",
                  color: "#000",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: leadSubmitting ? "not-allowed" : "pointer",
                  opacity: leadSubmitting ? 0.7 : 1,
                  fontFamily: "inherit",
                  letterSpacing: "0.03em",
                }}
              >
                {leadSubmitting
                  ? "Generating Report…"
                  : "Get My AI Opportunity Report →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS ──
  if (step === "results" && industry) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <StepIndicator step={3} total={4} />

          {/* Score Hero */}
          <div
            style={{
              ...cardStyle,
              textAlign: "center",
              marginBottom: 24,
              background:
                "linear-gradient(135deg, rgba(232,174,32,0.12) 0%, rgba(13,30,53,0.6) 100%)",
              border: "1.5px solid rgba(232,174,32,0.4)",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#E8AE20",
                marginBottom: 12,
              }}
            >
              Your AI Opportunity Score
            </p>
            <div
              style={{
                fontSize: "clamp(72px, 15vw, 96px)",
                fontWeight: 900,
                color: interpretation.color,
                lineHeight: 1,
              }}
            >
              {totalScore}
            </div>
            <div
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.5)",
                margin: "4px 0 16px",
              }}
            >
              out of {totalMax}
            </div>
            <div
              style={{
                fontSize: "clamp(18px, 3vw, 22px)",
                fontWeight: 800,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              {interpretation.headline}
            </div>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.75)",
                maxWidth: 480,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              {interpretation.body}
            </p>
          </div>

          {/* Category Scores */}
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#E8AE20",
                marginBottom: 24,
              }}
            >
              Category Breakdown
            </h2>
            <CategoryBar
              label="Sales Automation"
              value={sectionScores.sales}
              max={15}
            />
            <CategoryBar
              label="Customer Communication"
              value={sectionScores.communication}
              max={15}
            />
            <CategoryBar
              label="Internal Productivity"
              value={sectionScores.productivity}
              max={15}
            />
            <CategoryBar
              label="Industry Operations"
              value={sectionScores.industry}
              max={industryMax}
            />
          </div>

          {/* Recommendations */}
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#E8AE20",
                marginBottom: 8,
              }}
            >
              Recommended AI Systems
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                marginBottom: 20,
              }}
            >
              Based on your score of {totalScore}/{totalMax} for {industry}
            </p>
            {recommendations.map((rec) => (
              <div
                key={rec.title}
                style={{
                  borderLeft: "3px solid #E8AE20",
                  paddingLeft: 16,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  {rec.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.5,
                  }}
                >
                  {rec.description}
                </div>
              </div>
            ))}
            <div
              style={{
                marginTop: 20,
                background: "rgba(232,174,32,0.08)",
                border: "1px solid rgba(232,174,32,0.25)",
                borderRadius: 10,
                padding: "16px 20px",
              }}
            >
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                Estimated potential improvement
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#E8AE20",
                  marginTop: 4,
                }}
              >
                20–40% Productivity Gain
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <button
              type="button"
              data-ocid="assessment.download.button"
              onClick={() => {
                trackEvent("assessment_report_downloaded");
                generateReport({
                  name: leadData.name,
                  company: leadData.company,
                  industry,
                  totalScore,
                  totalMax,
                  industryMax,
                  sectionScores,
                  recommendations,
                  interpretation,
                });
              }}
              style={{
                padding: "16px 20px",
                background: "#E8AE20",
                color: "#000",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Download Report
            </button>
            <a
              href="/strategy-session"
              data-ocid="assessment.strategy.button"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/strategy-session");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              style={{
                padding: "16px 20px",
                background: "transparent",
                color: "#E8AE20",
                border: "2px solid #E8AE20",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "inherit",
                textDecoration: "none",
                textAlign: "center",
                display: "block",
              }}
            >
              Book Strategy Call
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
