import { useSEO } from "@/hooks/useSEO";
import { InsightArticleLayout } from "./components/InsightArticleLayout";
import { INSIGHT_ARTICLES } from "./insightArticles";
import { INSIGHT_SLUGS } from "./insightSlugs";

export function BusinessGrowthInfrastructurePage() {
  const article =
    INSIGHT_ARTICLES[INSIGHT_SLUGS.BUSINESS_GROWTH_INFRASTRUCTURE];
  useSEO({
    title: "Business Growth Infrastructure | Indian SMEs | INOVICS",
    description:
      "Why Indian SMEs need operational infrastructure — not just sales tactics — to grow sustainably. Build the systems that support long-term expansion.",
    url: "/insights/business-growth-infrastructure",
  });

  return (
    <InsightArticleLayout
      title={article.title}
      description={article.description}
    >
      <div className="space-y-6 text-muted-foreground">
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
