// Stable slug definitions for Insight articles
export const INSIGHT_SLUGS = {
  FOUNDERS_PLAYBOOK_SCALING: "founders-playbook-scaling",
  HOW_COMPANIES_SCALE_EFFECTIVELY: "how-companies-scale-effectively",
  HOW_TO_SCALE_A_BUSINESS_WITHOUT_CHAOS:
    "how-to-scale-a-business-without-chaos",
  EXCEL_IS_NOT_A_BUSINESS_SYSTEM: "excel-is-not-a-business-system",
  WHY_GROWTH_BREAKS_WEAK_INFRASTRUCTURE:
    "why-growth-breaks-weak-infrastructure",
  FROM_FOUNDER_DRIVEN_TO_SYSTEM_DRIVEN: "from-founder-driven-to-system-driven",
  CRM_VS_ERP_WHAT_GROWING_SMES_ACTUALLY_NEED:
    "crm-vs-erp-what-growing-smes-actually-need",
  THE_HIDDEN_COST_OF_MANUAL_REPORTING: "the-hidden-cost-of-manual-reporting",
  CAN_YOUR_BUSINESS_RUN_WITHOUT_YOU: "can-your-business-run-without-you",
  OPERATIONAL_EXCELLENCE_FOR_SMES: "operational-excellence-for-smes",
  BUSINESS_OPERATIONAL_MATURITY: "business-operational-maturity",
  HOW_TO_SCALE_OPERATIONS: "how-to-scale-operations",
  SYSTEMS_THINKING_FOR_BUSINESS: "systems-thinking-for-business",
  THE_SCALING_OPERATIONS_FRAMEWORK: "the-scaling-operations-framework",
  BUSINESS_GROWTH_INFRASTRUCTURE: "business-growth-infrastructure",
  THE_MODERN_BUSINESS_OPERATING_MODEL: "the-modern-business-operating-model",
} as const;

export const INSIGHT_TITLES: Record<string, string> = {
  [INSIGHT_SLUGS.FOUNDERS_PLAYBOOK_SCALING]:
    "How to Scale a Business: The Founder's Playbook",
  [INSIGHT_SLUGS.HOW_COMPANIES_SCALE_EFFECTIVELY]:
    "How Companies Scale Effectively",
  [INSIGHT_SLUGS.HOW_TO_SCALE_A_BUSINESS_WITHOUT_CHAOS]:
    "How to Scale a Business Without Chaos",
  [INSIGHT_SLUGS.EXCEL_IS_NOT_A_BUSINESS_SYSTEM]:
    "Excel Is Not a Business System",
  [INSIGHT_SLUGS.WHY_GROWTH_BREAKS_WEAK_INFRASTRUCTURE]:
    "Why Growth Breaks Weak Infrastructure",
  [INSIGHT_SLUGS.FROM_FOUNDER_DRIVEN_TO_SYSTEM_DRIVEN]:
    "From Founder-Driven to System-Driven",
  [INSIGHT_SLUGS.CRM_VS_ERP_WHAT_GROWING_SMES_ACTUALLY_NEED]:
    "CRM vs ERP: What Growing SMEs Actually Need",
  [INSIGHT_SLUGS.THE_HIDDEN_COST_OF_MANUAL_REPORTING]:
    "The Hidden Cost of Manual Reporting",
  [INSIGHT_SLUGS.CAN_YOUR_BUSINESS_RUN_WITHOUT_YOU]:
    "Can Your Business Run Without You?",
  [INSIGHT_SLUGS.OPERATIONAL_EXCELLENCE_FOR_SMES]:
    "Operational Excellence for SMEs",
  [INSIGHT_SLUGS.BUSINESS_OPERATIONAL_MATURITY]:
    "Business Operational Maturity",
  [INSIGHT_SLUGS.HOW_TO_SCALE_OPERATIONS]: "How to Scale Operations",
  [INSIGHT_SLUGS.SYSTEMS_THINKING_FOR_BUSINESS]:
    "Systems Thinking for Business",
  [INSIGHT_SLUGS.THE_SCALING_OPERATIONS_FRAMEWORK]:
    "The Scaling Operations Framework",
  [INSIGHT_SLUGS.BUSINESS_GROWTH_INFRASTRUCTURE]:
    "Business Growth Infrastructure",
  [INSIGHT_SLUGS.THE_MODERN_BUSINESS_OPERATING_MODEL]:
    "The Modern Business Operating Model",
};

// Newest first
export const ORDERED_INSIGHT_SLUGS = [
  INSIGHT_SLUGS.THE_MODERN_BUSINESS_OPERATING_MODEL,
  INSIGHT_SLUGS.BUSINESS_GROWTH_INFRASTRUCTURE,
  INSIGHT_SLUGS.THE_SCALING_OPERATIONS_FRAMEWORK,
  INSIGHT_SLUGS.SYSTEMS_THINKING_FOR_BUSINESS,
  INSIGHT_SLUGS.HOW_TO_SCALE_OPERATIONS,
  INSIGHT_SLUGS.BUSINESS_OPERATIONAL_MATURITY,
  INSIGHT_SLUGS.OPERATIONAL_EXCELLENCE_FOR_SMES,
  INSIGHT_SLUGS.FOUNDERS_PLAYBOOK_SCALING,
  INSIGHT_SLUGS.HOW_COMPANIES_SCALE_EFFECTIVELY,
  INSIGHT_SLUGS.HOW_TO_SCALE_A_BUSINESS_WITHOUT_CHAOS,
  INSIGHT_SLUGS.EXCEL_IS_NOT_A_BUSINESS_SYSTEM,
  INSIGHT_SLUGS.WHY_GROWTH_BREAKS_WEAK_INFRASTRUCTURE,
  INSIGHT_SLUGS.FROM_FOUNDER_DRIVEN_TO_SYSTEM_DRIVEN,
  INSIGHT_SLUGS.CRM_VS_ERP_WHAT_GROWING_SMES_ACTUALLY_NEED,
  INSIGHT_SLUGS.THE_HIDDEN_COST_OF_MANUAL_REPORTING,
  INSIGHT_SLUGS.CAN_YOUR_BUSINESS_RUN_WITHOUT_YOU,
];

export function isValidInsightSlug(slug: string): boolean {
  return Object.values(INSIGHT_SLUGS).includes(slug as any);
}

export function getTitleFromSlug(slug: string): string | null {
  return INSIGHT_TITLES[slug] || null;
}
