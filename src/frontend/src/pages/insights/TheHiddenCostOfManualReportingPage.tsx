import { useSEO } from "@/hooks/useSEO";
import { InsightArticleLayout } from "./components/InsightArticleLayout";
import { INSIGHT_ARTICLES } from "./insightArticles";
import { INSIGHT_SLUGS } from "./insightSlugs";

export function TheHiddenCostOfManualReportingPage() {
  const article =
    INSIGHT_ARTICLES[INSIGHT_SLUGS.THE_HIDDEN_COST_OF_MANUAL_REPORTING];
  useSEO({
    title: "Hidden Cost of Manual Reporting | SME India | INOVICS",
    description:
      "Manual MIS reporting wastes time and hides critical business insights. The real cost for Indian SMEs and how AI reporting solves it.",
    url: "/insights/the-hidden-cost-of-manual-reporting",
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
