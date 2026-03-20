import { useSEO } from "@/hooks/useSEO";
import { InsightArticleLayout } from "./components/InsightArticleLayout";
import { INSIGHT_ARTICLES } from "./insightArticles";
import { INSIGHT_SLUGS } from "./insightSlugs";

export function HowToScaleABusinessWithoutChaosPage() {
  const article =
    INSIGHT_ARTICLES[INSIGHT_SLUGS.HOW_TO_SCALE_A_BUSINESS_WITHOUT_CHAOS];
  useSEO({
    title: "Scale Business Without Chaos | SME Growth | INOVICS",
    description:
      "Why growth creates operational chaos — and how Indian SMEs transition from people-driven to system-driven operations for sustainable scaling.",
    url: "/insights/how-to-scale-a-business-without-chaos",
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
