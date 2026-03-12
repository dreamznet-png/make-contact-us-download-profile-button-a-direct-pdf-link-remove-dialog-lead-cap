import { PageHero } from "@/components/sections/PageHero";
import { useEffect } from "react";
import {
  IMPACT_STORIES,
  IMPACT_STORY_SLUGS,
} from "./impact-stories/impactStoryData";

const INDUSTRY_COLORS: Record<string, string> = {
  "Finance & Operations": "#E8AE20",
  Manufacturing: "#3B82F6",
  Distribution: "#10B981",
  "Professional Services": "#8B5CF6",
  Retail: "#F59E0B",
  "HR & Workforce": "#EC4899",
};

export function ImpactStoriesPage() {
  useEffect(() => {
    document.title = "Impact Stories | INOVICS";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Real-world AI transformation stories from SMEs across industries. Discover how businesses eliminated manual work, reduced errors, and scaled operations with AI.",
      );
    }
  }, []);

  const handleStoryClick = (slug: string) => {
    window.history.pushState({}, "", `/impact-stories/${slug}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const featuredSlug = IMPACT_STORY_SLUGS[0];
  const featuredStory = IMPACT_STORIES[featuredSlug];
  const restSlugs = IMPACT_STORY_SLUGS.slice(1);

  return (
    <main style={{ backgroundColor: "#0D1E35" }}>
      <PageHero
        title="AI Transformation in the Real World"
        subtitle="Impact Stories"
        description="Documented case studies of how SMEs across India are using AI systems to eliminate manual work, reduce errors, and scale operations without adding headcount."
      />

      {/* Featured Story */}
      <section
        className="py-16"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-8"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Featured Story
          </p>
          <button
            type="button"
            data-ocid="impact-stories.item.1"
            className="group w-full text-left"
            onClick={() => handleStoryClick(featuredSlug)}
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
                    backgroundColor: INDUSTRY_COLORS[featuredStory.industry]
                      ? `${INDUSTRY_COLORS[featuredStory.industry]}22`
                      : "rgba(232,174,32,0.15)",
                    color: INDUSTRY_COLORS[featuredStory.industry] || "#E8AE20",
                  }}
                >
                  {featuredStory.industry}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {featuredStory.date}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  · {featuredStory.readTime}
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
                style={{ color: "#E8AE20" }}
              >
                {featuredStory.title}
              </h2>
              <p
                className="text-lg leading-relaxed mb-8 max-w-3xl"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {featuredStory.description}
              </p>
              <span
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-all duration-200 group-hover:gap-4"
                style={{ color: "#E8AE20" }}
              >
                Read Full Story <span>→</span>
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Stories Grid */}
      {restSlugs.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-10"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              All Stories
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restSlugs.map((slug, index) => {
                const story = IMPACT_STORIES[slug];
                const accentColor =
                  INDUSTRY_COLORS[story.industry] || "#E8AE20";
                return (
                  <button
                    type="button"
                    key={slug}
                    data-ocid={`impact-stories.item.${index + 2}`}
                    className="group text-left rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onClick={() => handleStoryClick(slug)}
                  >
                    <div
                      className="h-1 w-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${accentColor}22`,
                            color: accentColor,
                          }}
                        >
                          {story.industry}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {story.readTime}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-bold mb-3 leading-snug transition-colors duration-200 group-hover:text-yellow-400"
                        style={{ color: "#ffffff" }}
                      >
                        {story.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed flex-1 mb-6 line-clamp-3"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {story.description}
                      </p>
                      <div
                        className="flex items-center justify-between pt-4"
                        style={{
                          borderTop: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <span
                          className="text-xs"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          {story.date}
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
      )}

      {/* Bottom CTA */}
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
            Could Your Business Be the Next Story?
          </h2>
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Book a strategy session to explore how AI transformation can be
            applied to your operations.
          </p>
          <button
            type="button"
            onClick={() => {
              window.history.pushState({}, "", "/contact");
              window.dispatchEvent(new PopStateEvent("popstate"));
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
            className="font-bold px-8 py-3 rounded-full text-sm transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: "#E8AE20", color: "#0D1E35" }}
            data-ocid="impact-stories.cta.primary_button"
          >
            Book a Strategy Call
          </button>
        </div>
      </section>
    </main>
  );
}
