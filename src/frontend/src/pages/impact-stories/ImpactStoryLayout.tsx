import { PageHero } from "@/components/sections/PageHero";
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Lightbulb,
  Target,
  TrendingUp,
  Wrench,
} from "lucide-react";
import type { ImpactStory } from "./impactStoryData";

interface ImpactStoryLayoutProps {
  story: ImpactStory;
}

const SECTION_CONFIG = [
  {
    key: "businessChallenge" as const,
    label: "Business Challenge",
    icon: Target,
    accent: "#E8AE20",
  },
  {
    key: "traditionalProcess" as const,
    label: "Traditional Process",
    icon: Wrench,
    accent: "#3B82F6",
  },
  {
    key: "aiSystemImplemented" as const,
    label: "AI System Implemented",
    icon: Cpu,
    accent: "#10B981",
  },
  {
    key: "implementationApproach" as const,
    label: "Implementation Approach",
    icon: Lightbulb,
    accent: "#8B5CF6",
  },
  {
    key: "resultsAndImpact" as const,
    label: "Results & Impact",
    icon: TrendingUp,
    accent: "#F59E0B",
  },
];

export function ImpactStoryLayout({ story }: ImpactStoryLayoutProps) {
  const handleBackClick = () => {
    window.history.pushState({}, "", "/impact-stories");
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <PageHero
        title={story.title}
        subtitle="Impact Story"
        description={story.description}
      />

      <main style={{ backgroundColor: "#0D1E35" }} className="min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Back button */}
          <button
            type="button"
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-all duration-200 hover:gap-3"
            style={{ color: "rgba(255,255,255,0.5)" }}
            data-ocid="impact-stories.back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Impact Stories
          </button>

          {/* Industry + date + read time */}
          <div className="flex flex-wrap gap-3 mb-12">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(232,174,32,0.15)",
                color: "#E8AE20",
              }}
            >
              {story.industry}
            </span>
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {story.date}
            </span>
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              · {story.readTime}
            </span>
          </div>

          {/* Content sections */}
          <div className="space-y-10">
            {SECTION_CONFIG.map(({ key, label, icon: Icon, accent }) => (
              <div
                key={key}
                className="rounded-2xl p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${accent}30`,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${accent}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: accent }}>
                    {label}
                  </h2>
                </div>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {story[key]}
                </p>
              </div>
            ))}

            {/* Key Takeaways */}
            <div
              className="rounded-2xl p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,174,32,0.10) 0%, rgba(232,174,32,0.03) 100%)",
                border: "1px solid rgba(232,174,32,0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(232,174,32,0.20)" }}
                >
                  <CheckCircle2
                    className="w-5 h-5"
                    style={{ color: "#E8AE20" }}
                  />
                </div>
                <h2 className="text-xl font-bold" style={{ color: "#E8AE20" }}>
                  Key Takeaways
                </h2>
              </div>
              <ul className="space-y-3">
                {story.keyTakeaways.map((takeaway, i) => (
                  <li
                    key={takeaway.slice(0, 30)}
                    className="flex items-start gap-3"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    <span
                      className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{ backgroundColor: "#E8AE20", color: "#0D1E35" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-base leading-relaxed">
                      {takeaway}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-16 rounded-2xl p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,174,32,0.08) 0%, rgba(232,174,32,0.02) 100%)",
              border: "1px solid rgba(232,174,32,0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-3"
              style={{ color: "#E8AE20" }}
            >
              Could This Transform Your Business?
            </h3>
            <p
              className="mb-8 text-sm"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Book a strategy session to explore how AI systems can be
              implemented in your operations.
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
        </div>
      </main>
    </>
  );
}
