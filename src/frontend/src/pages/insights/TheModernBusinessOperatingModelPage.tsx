import { useSEO } from "@/hooks/useSEO";
import { InsightArticleLayout } from "./components/InsightArticleLayout";
import { INSIGHT_ARTICLES } from "./insightArticles";
import { INSIGHT_SLUGS } from "./insightSlugs";

export function TheModernBusinessOperatingModelPage() {
  const article =
    INSIGHT_ARTICLES[INSIGHT_SLUGS.THE_MODERN_BUSINESS_OPERATING_MODEL];
  useSEO({
    title: "Modern Business Operating Model | INOVICS India",
    description:
      "How Indian businesses are redesigning operating models for the digital era. Cross-functional collaboration, AI tools, and data-driven decisions.",
    url: "/insights/the-modern-business-operating-model",
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
