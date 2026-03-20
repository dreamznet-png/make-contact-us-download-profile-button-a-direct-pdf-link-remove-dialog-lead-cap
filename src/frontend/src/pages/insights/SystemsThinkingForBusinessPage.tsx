import { useSEO } from "@/hooks/useSEO";
import { InsightArticleLayout } from "./components/InsightArticleLayout";
import { INSIGHT_ARTICLES } from "./insightArticles";
import { INSIGHT_SLUGS } from "./insightSlugs";

export function SystemsThinkingForBusinessPage() {
  const article = INSIGHT_ARTICLES[INSIGHT_SLUGS.SYSTEMS_THINKING_FOR_BUSINESS];
  useSEO({
    title: "Systems Thinking for Business | SME India | INOVICS",
    description:
      "How Indian business leaders use systems thinking to identify root causes, design scalable solutions, and grow sustainably without chaos.",
    url: "/insights/systems-thinking-for-business",
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
