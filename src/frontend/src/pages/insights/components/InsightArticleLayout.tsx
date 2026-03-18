import { PageHero } from "@/components/sections/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";

interface InsightArticleLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function InsightArticleLayout({
  title,
  description,
  children,
}: InsightArticleLayoutProps) {
  const slug = window.location.pathname.replace("/insights/", "");

  useSEO({
    title: `${title} | INOVICS Insights`,
    description,
    url: window.location.pathname,
  });

  useEffect(() => {
    trackEvent("page_view_insights", { article_title: slug });
  }, [slug]);

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = endRef.current;
    if (!el) return;
    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fired) {
          fired = true;
          trackEvent("article_read_complete", { article_title: slug });
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [slug]);

  const handleBackClick = () => {
    window.history.pushState({}, "", "/insights");
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <PageHero title={title} />
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <button
            type="button"
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent-yellow transition-colors mb-8 group"
            data-ocid="insights.back-link"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </button>

          <div className="prose prose-lg prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent-yellow">
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              {description}
            </p>
            {children}
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </>
  );
}
