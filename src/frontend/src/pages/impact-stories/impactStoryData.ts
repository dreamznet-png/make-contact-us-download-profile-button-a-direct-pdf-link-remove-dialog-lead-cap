export interface ImpactStory {
  slug: string;
  title: string;
  description: string;
  industry: string;
  date: string;
  readTime: string;
  headerImage?: string;
  businessChallenge: string;
  traditionalProcess: string;
  aiSystemImplemented: string;
  implementationApproach: string;
  resultsAndImpact: string;
  keyTakeaways: string[];
}

export const IMPACT_STORIES: Record<string, ImpactStory> = {
  "ai-invoice-processing-for-smes": {
    slug: "ai-invoice-processing-for-smes",
    title: "AI Invoice Processing for SMEs",
    description:
      "How an AI-aided invoice processing system eliminated manual data entry, reduced errors, and gave leadership real-time visibility into operational performance.",
    industry: "Finance & Operations",
    date: "March 2026",
    readTime: "5 min read",
    businessChallenge:
      "Many SMEs rely on manual workflows involving spreadsheets, emails, and repetitive data entry. These processes consume significant employee time, introduce errors, and limit leadership visibility into operational performance.",
    traditionalProcess:
      "Typical workflows involve manual review of documents, data entry into internal systems, and coordination across departments. As organizations grow, these workflows become slower and increasingly difficult to manage.",
    aiSystemImplemented:
      "An AI-aided system analyzes incoming information, extracts relevant data, and triggers automated actions within connected business systems. Instead of performing repetitive tasks manually, employees interact with intelligent workflows that assist with processing and decision support.",
    implementationApproach:
      "Implementation begins with mapping the existing process, identifying repetitive tasks, and introducing AI automation layers. Integrations with CRM, ERP, or internal tools allow data to flow automatically between systems.",
    resultsAndImpact:
      "Organizations implementing AI systems often experience dramatic productivity improvements. Manual work decreases, error rates decline, and teams gain real-time operational insights through dashboards and automated reporting.",
    keyTakeaways: [
      "AI systems enable SMEs to scale productivity without increasing headcount.",
      "Automating repetitive invoice tasks frees employees for higher-value work.",
      "Integrated AI workflows reduce error rates and improve data accuracy.",
      "Real-time dashboards give leadership immediate visibility into financial operations.",
      "By augmenting human teams with automation, businesses improve both operational speed and decision quality.",
    ],
  },
};

export const IMPACT_STORY_SLUGS = Object.keys(IMPACT_STORIES);

export function isValidImpactStorySlug(slug: string): boolean {
  return slug in IMPACT_STORIES;
}
