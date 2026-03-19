import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  IMPACT_STORIES,
  IMPACT_STORY_SLUGS,
} from "@/pages/impact-stories/impactStoryData";

const CATEGORY_COLORS: Record<string, string> = {
  "Finance & Operations": "#E8AE20",
  Manufacturing: "#3B82F6",
  Distribution: "#10B981",
  "Professional Services": "#8B5CF6",
  Retail: "#F59E0B",
  "HR & Workforce": "#EC4899",
  Sales: "#F97316",
  "Customer Service": "#06B6D4",
  "HR & Talent": "#EC4899",
  Operations: "#10B981",
  Marketing: "#8B5CF6",
  Procurement: "#3B82F6",
  "Finance & Planning": "#E8AE20",
  Leadership: "#F59E0B",
};

function getAccentColor(industry: string): string {
  for (const [key, color] of Object.entries(CATEGORY_COLORS)) {
    if (industry.includes(key) || key.includes(industry)) return color;
  }
  return "#E8AE20";
}

export function ImpactStoriesPreviewSection() {
  const handleViewAll = () => {
    window.history.pushState({}, "", "/impact-stories");
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleStoryClick = (slug: string) => {
    window.history.pushState({}, "", `/impact-stories/${slug}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: "#0D1E35",
        borderTop: "1px solid rgba(232,174,32,0.15)",
        borderBottom: "1px solid rgba(232,174,32,0.15)",
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#E8AE20" }}
            >
              What We Build
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "#E8AE20" }}
            >
              AI Impact Stories
            </h2>
            <p
              className="mt-4 text-base max-w-xl"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Real implementations across Indian SMEs — from invoice automation
              to decision intelligence. Each story is a live proof of what AI
              systems can do.
            </p>
          </div>
          <button
            type="button"
            onClick={handleViewAll}
            className="shrink-0 font-bold px-7 py-3 rounded-full text-sm transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: "#E8AE20", color: "#0D1E35" }}
          >
            View All Stories →
          </button>
        </div>

        {/* Carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {IMPACT_STORY_SLUGS.map((slug) => {
              const story = IMPACT_STORIES[slug];
              const accent = getAccentColor(story.industry);
              return (
                <CarouselItem
                  key={slug}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <button
                    type="button"
                    onClick={() => handleStoryClick(slug)}
                    className="group w-full text-left rounded-2xl p-6 h-full flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    {/* Industry badge */}
                    <span
                      className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full self-start"
                      style={{
                        backgroundColor: `${accent}18`,
                        color: accent,
                        border: `1px solid ${accent}40`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      {story.industry}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-base font-bold leading-snug group-hover:text-yellow-300 transition-colors duration-200"
                      style={{ color: "#ffffff" }}
                    >
                      {story.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {story.description}
                    </p>

                    {/* Read more */}
                    <span
                      className="text-xs font-semibold flex items-center gap-1 mt-auto group-hover:gap-2 transition-all duration-200"
                      style={{ color: accent }}
                    >
                      Read Story
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Nav buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <CarouselPrevious
              className="static translate-y-0 size-10 rounded-full border-0"
              style={{
                backgroundColor: "rgba(232,174,32,0.15)",
                color: "#E8AE20",
              }}
            />
            <CarouselNext
              className="static translate-y-0 size-10 rounded-full border-0"
              style={{
                backgroundColor: "rgba(232,174,32,0.15)",
                color: "#E8AE20",
              }}
            />
          </div>
        </Carousel>

        {/* Stats bar */}
        <div
          className="mt-14 pt-8 flex flex-wrap gap-8 md:gap-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {[
            {
              value: `${IMPACT_STORY_SLUGS.length}+`,
              label: "Documented Stories",
            },
            { value: "5", label: "Industry Categories" },
            { value: "20–40%", label: "Avg Productivity Gain" },
            { value: "SMEs", label: "Indian Businesses Transformed" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold" style={{ color: "#E8AE20" }}>
                {stat.value}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
