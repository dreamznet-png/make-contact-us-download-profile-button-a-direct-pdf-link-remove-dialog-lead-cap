import { useSEO } from "@/hooks/useSEO";
import { InsightArticleLayout } from "./components/InsightArticleLayout";
import { INSIGHT_ARTICLES } from "./insightArticles";
import { INSIGHT_SLUGS } from "./insightSlugs";

export function OperationalExcellenceForSmesPage() {
  const article =
    INSIGHT_ARTICLES[INSIGHT_SLUGS.OPERATIONAL_EXCELLENCE_FOR_SMES];
  useSEO({
    title: "Operational Excellence for Indian SMEs | INOVICS",
    description:
      "How Indian SMEs achieve operational excellence through process standardization, automation, and structured performance systems. Compete like enterprise.",
    url: "/insights/operational-excellence-for-smes",
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
