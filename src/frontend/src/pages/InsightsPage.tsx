import { InsightsNewsletterForm } from "@/components/forms/InsightsNewsletterForm";
import { PageHero } from "@/components/sections/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";
import { INSIGHT_ARTICLES } from "./insights/insightArticles";
import { ORDERED_INSIGHT_SLUGS } from "./insights/insightSlugs";

const CATEGORY_COLORS: Record<string, string> = {
  Operations: "#3B82F6",
  Strategy: "#8B5CF6",
  Leadership: "#10B981",
  Technology: "#F59E0B",
};

export function InsightsPage() {
  useSEO({
    title: "Insights | INOVICS",
    description:
      "Strategic articles on AI transformation, operational excellence, and scaling systems for founder-led Indian businesses.",
    url: "/insights",
  });
  useEffect(() => {
    document.title = "Insights | INOVICS";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Strategic insights on business systems, operational excellence, and digital transformation for growing mid-sized businesses.",
      );
    }
  }, []);

  const handleArticleClick = (slug: string) => {
    const article = INSIGHT_ARTICLES[slug];
    if (article)
      trackEvent("insight_card_click", { article_title: article.title });
    window.history.pushState({}, "", `/insights/${slug}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const featuredSlug = ORDERED_INSIGHT_SLUGS[0];
  const featuredArticle = INSIGHT_ARTICLES[featuredSlug];
  const restSlugs = ORDERED_INSIGHT_SLUGS.slice(1);

  return (
    <main style={{ backgroundColor: "#0D1E35" }}>
      {/* Hero — same PageHero as FAQ page */}
      <PageHero
        title="Perspectives for Founders Who Scale"
        subtitle="Strategic Insights"
        description="Deep analysis on business systems, operational excellence, and institutional transformation for ₹5–50 Cr enterprises."
      />

      {/* Featured Article */}
      <section
        className="py-16"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-8"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Featured
          </p>
          <button
            type="button"
            data-ocid="insights.item.1"
            className="group w-full text-left"
            onClick={() => handleArticleClick(featuredSlug)}
          >
            <div
              className="rounded-2xl overflow-hidden p-10 md:p-14 transition-all duration-300 group-hover:scale-[1.01]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,174,32,0.12) 0%, rgba(232,174,32,0.04) 100%)",
                border: "1px solid rgba(232,174,32,0.25)",
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[featuredArticle.category] || "#E8AE20",
                    color: "#ffffff",
                  }}
                >
                  {featuredArticle.category}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {featuredArticle.date}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  · {featuredArticle.readTime}
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-5 leading-tight transition-colors duration-200"
                style={{ color: "#E8AE20" }}
              >
                {featuredArticle.title}
              </h2>
              <p
                className="text-lg leading-relaxed mb-8 max-w-3xl"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {featuredArticle.description}
              </p>
              <span
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-all duration-200 group-hover:gap-4"
                style={{ color: "#E8AE20" }}
              >
                Read Full Article <span>→</span>
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-10"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            All Articles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restSlugs.map((slug, index) => {
              const article = INSIGHT_ARTICLES[slug];
              return (
                <button
                  type="button"
                  key={slug}
                  data-ocid={`insights.item.${index + 2}`}
                  className="group text-left rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onClick={() => handleArticleClick(slug)}
                >
                  {/* Card color bar */}
                  <div
                    className="h-1 w-full"
                    style={{
                      backgroundColor:
                        CATEGORY_COLORS[article.category] || "#E8AE20",
                    }}
                  />
                  <div className="p-7 flex flex-col flex-1">
                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span
                        className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: CATEGORY_COLORS[article.category]
                            ? `${CATEGORY_COLORS[article.category]}22`
                            : "rgba(232,174,32,0.15)",
                          color: CATEGORY_COLORS[article.category] || "#E8AE20",
                        }}
                      >
                        {article.category}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-3 leading-snug transition-colors duration-200 group-hover:text-yellow-400"
                      style={{ color: "#ffffff" }}
                    >
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="text-sm leading-relaxed flex-1 mb-6 line-clamp-3"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {article.description}
                    </p>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {article.date}
                      </span>
                      <span
                        className="text-xs font-bold tracking-wide transition-all duration-200 group-hover:translate-x-1 inline-block"
                        style={{ color: "#E8AE20" }}
                      >
                        Read →
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-16 mt-4"
        style={{
          borderTop: "1px solid rgba(232,174,32,0.2)",
          background:
            "linear-gradient(135deg, rgba(232,174,32,0.06) 0%, transparent 100%)",
        }}
      >
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#E8AE20" }}>
            Subscribe to Strategic Insights
          </h2>
          <p
            className="mb-10 text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Receive monthly insights on operational excellence, business
            systems, and institutional growth.
          </p>
          <InsightsNewsletterForm />
        </div>
      </section>
    </main>
  );
}
