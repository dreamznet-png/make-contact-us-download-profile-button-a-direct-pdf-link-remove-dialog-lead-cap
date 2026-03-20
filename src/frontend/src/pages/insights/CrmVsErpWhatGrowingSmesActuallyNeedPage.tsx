import { useSEO } from "@/hooks/useSEO";
import { InsightArticleLayout } from "./components/InsightArticleLayout";
import { INSIGHT_ARTICLES } from "./insightArticles";
import { INSIGHT_SLUGS } from "./insightSlugs";

export function CrmVsErpWhatGrowingSmesActuallyNeedPage() {
  const article =
    INSIGHT_ARTICLES[INSIGHT_SLUGS.CRM_VS_ERP_WHAT_GROWING_SMES_ACTUALLY_NEED];
  useSEO({
    title: "CRM vs ERP: What Indian SMEs Need | INOVICS",
    description:
      "Should your Indian SME invest in CRM or ERP? Understand the difference and what growing ₹5–50 Cr businesses actually need to scale.",
    url: "/insights/crm-vs-erp-what-growing-smes-actually-need",
  });

  return (
    <InsightArticleLayout
      title={article.title}
      description={article.description}
    >
      <div className="space-y-12 text-muted-foreground">
        {article.sections.map((section) => (
          <section
            key={section.heading ?? section.content[0]}
            className="space-y-6"
          >
            {section.heading && (
              <h2 className="text-3xl font-bold text-foreground">
                {section.heading}
              </h2>
            )}
            {section.content.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </InsightArticleLayout>
  );
}
