import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { Footer } from "./components/Footer";
import { ScrollToTopControl } from "./components/ScrollToTopControl";
import { TopNav } from "./components/TopNav";
import { ContactSection } from "./components/sections/ContactSection";
import { ControlFrameworkSection } from "./components/sections/ControlFrameworkSection";
import { EmotionalBlockSection } from "./components/sections/EmotionalBlockSection";
import { FinalCtaSection } from "./components/sections/FinalCtaSection";
import { HeroSection } from "./components/sections/HeroSection";
import { IndustriesSection } from "./components/sections/IndustriesSection";
import { InsightsSection } from "./components/sections/InsightsSection";
import { OutcomesSection } from "./components/sections/OutcomesSection";
import { ProblemSection } from "./components/sections/ProblemSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { WhatInovicsDoesSection } from "./components/sections/WhatInovicsDoesSection";
import { AdminPage } from "./pages/AdminPage";
import { ContactPage } from "./pages/ContactPage";
import { ControlFrameworkPage } from "./pages/ControlFrameworkPage";
import { FaqPage } from "./pages/FaqPage";
import { ImpactStoriesPage } from "./pages/ImpactStoriesPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { InsightsPage } from "./pages/InsightsPage";
import { ProcessPage } from "./pages/ProcessPage";
import { StrategySessionPage } from "./pages/StrategySessionPage";
import { ImpactStoryLayout } from "./pages/impact-stories/ImpactStoryLayout";
import {
  IMPACT_STORIES,
  isValidImpactStorySlug,
} from "./pages/impact-stories/impactStoryData";
import { BusinessGrowthInfrastructurePage } from "./pages/insights/BusinessGrowthInfrastructurePage";
import { BusinessOperationalMaturityPage } from "./pages/insights/BusinessOperationalMaturityPage";
import { CanYourBusinessRunWithoutYouPage } from "./pages/insights/CanYourBusinessRunWithoutYouPage";
import { CrmVsErpWhatGrowingSmesActuallyNeedPage } from "./pages/insights/CrmVsErpWhatGrowingSmesActuallyNeedPage";
import { ExcelIsNotABusinessSystemPage } from "./pages/insights/ExcelIsNotABusinessSystemPage";
import { FoundersPlaybookScalingPage } from "./pages/insights/FoundersPlaybookScalingPage";
import { FromFounderDrivenToSystemDrivenPage } from "./pages/insights/FromFounderDrivenToSystemDrivenPage";
import { HowCompaniesScaleEffectivelyPage } from "./pages/insights/HowCompaniesScaleEffectivelyPage";
import { HowToScaleABusinessWithoutChaosPage } from "./pages/insights/HowToScaleABusinessWithoutChaosPage";
import { HowToScaleOperationsPage } from "./pages/insights/HowToScaleOperationsPage";
import { OperationalExcellenceForSmesPage } from "./pages/insights/OperationalExcellenceForSmesPage";
import { SystemsThinkingForBusinessPage } from "./pages/insights/SystemsThinkingForBusinessPage";
import { TheHiddenCostOfManualReportingPage } from "./pages/insights/TheHiddenCostOfManualReportingPage";
import { TheModernBusinessOperatingModelPage } from "./pages/insights/TheModernBusinessOperatingModelPage";
import { TheScalingOperationsFrameworkPage } from "./pages/insights/TheScalingOperationsFrameworkPage";
import { WhyGrowthBreaksWeakInfrastructurePage } from "./pages/insights/WhyGrowthBreaksWeakInfrastructurePage";
import {
  INSIGHT_SLUGS,
  isValidInsightSlug,
} from "./pages/insights/insightSlugs";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const isControlFrameworkPage = currentPath === "/control-framework";
  const isIndustriesPage = currentPath === "/industries";
  const isProcessPage = currentPath === "/process";
  const isContactPage = currentPath === "/contact";
  const isStrategySessionPage = currentPath === "/strategy-session";
  const isAdminPage = currentPath === "/admin";
  const isFaqPage = currentPath === "/faq";
  const isInsightsHubPage = currentPath === "/insights";
  const isImpactStoriesHubPage = currentPath === "/impact-stories";

  const insightSlugMatch = currentPath.match(/^\/insights\/(.+)$/);
  const insightSlug = insightSlugMatch ? insightSlugMatch[1] : null;
  const isInsightArticlePage = insightSlug && isValidInsightSlug(insightSlug);

  const impactSlugMatch = currentPath.match(/^\/impact-stories\/(.+)$/);
  const impactSlug = impactSlugMatch ? impactSlugMatch[1] : null;
  const isImpactStoryPage = impactSlug && isValidImpactStorySlug(impactSlug);

  if (isImpactStoryPage && impactSlug) {
    const story = IMPACT_STORIES[impactSlug];
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <ImpactStoryLayout story={story} />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  if (isImpactStoriesHubPage) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <ImpactStoriesPage />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  if (isInsightArticlePage && insightSlug) {
    let ArticleComponent: ComponentType | null = null;
    switch (insightSlug) {
      case INSIGHT_SLUGS.FOUNDERS_PLAYBOOK_SCALING:
        ArticleComponent = FoundersPlaybookScalingPage;
        break;
      case INSIGHT_SLUGS.HOW_COMPANIES_SCALE_EFFECTIVELY:
        ArticleComponent = HowCompaniesScaleEffectivelyPage;
        break;
      case INSIGHT_SLUGS.HOW_TO_SCALE_A_BUSINESS_WITHOUT_CHAOS:
        ArticleComponent = HowToScaleABusinessWithoutChaosPage;
        break;
      case INSIGHT_SLUGS.EXCEL_IS_NOT_A_BUSINESS_SYSTEM:
        ArticleComponent = ExcelIsNotABusinessSystemPage;
        break;
      case INSIGHT_SLUGS.WHY_GROWTH_BREAKS_WEAK_INFRASTRUCTURE:
        ArticleComponent = WhyGrowthBreaksWeakInfrastructurePage;
        break;
      case INSIGHT_SLUGS.FROM_FOUNDER_DRIVEN_TO_SYSTEM_DRIVEN:
        ArticleComponent = FromFounderDrivenToSystemDrivenPage;
        break;
      case INSIGHT_SLUGS.CRM_VS_ERP_WHAT_GROWING_SMES_ACTUALLY_NEED:
        ArticleComponent = CrmVsErpWhatGrowingSmesActuallyNeedPage;
        break;
      case INSIGHT_SLUGS.THE_HIDDEN_COST_OF_MANUAL_REPORTING:
        ArticleComponent = TheHiddenCostOfManualReportingPage;
        break;
      case INSIGHT_SLUGS.CAN_YOUR_BUSINESS_RUN_WITHOUT_YOU:
        ArticleComponent = CanYourBusinessRunWithoutYouPage;
        break;
      case INSIGHT_SLUGS.OPERATIONAL_EXCELLENCE_FOR_SMES:
        ArticleComponent = OperationalExcellenceForSmesPage;
        break;
      case INSIGHT_SLUGS.BUSINESS_OPERATIONAL_MATURITY:
        ArticleComponent = BusinessOperationalMaturityPage;
        break;
      case INSIGHT_SLUGS.HOW_TO_SCALE_OPERATIONS:
        ArticleComponent = HowToScaleOperationsPage;
        break;
      case INSIGHT_SLUGS.SYSTEMS_THINKING_FOR_BUSINESS:
        ArticleComponent = SystemsThinkingForBusinessPage;
        break;
      case INSIGHT_SLUGS.THE_SCALING_OPERATIONS_FRAMEWORK:
        ArticleComponent = TheScalingOperationsFrameworkPage;
        break;
      case INSIGHT_SLUGS.BUSINESS_GROWTH_INFRASTRUCTURE:
        ArticleComponent = BusinessGrowthInfrastructurePage;
        break;
      case INSIGHT_SLUGS.THE_MODERN_BUSINESS_OPERATING_MODEL:
        ArticleComponent = TheModernBusinessOperatingModelPage;
        break;
      default:
        ArticleComponent = null;
    }

    if (ArticleComponent) {
      return (
        <div className="min-h-screen bg-background">
          <TopNav />
          <ArticleComponent />
          <Footer />
          <ScrollToTopControl />
        </div>
      );
    }
  }

  if (isInsightsHubPage) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <InsightsPage />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  if (isControlFrameworkPage) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <ControlFrameworkPage />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  if (isIndustriesPage) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <IndustriesPage />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  if (isProcessPage) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <ProcessPage />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  if (isContactPage) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <ContactPage />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  if (isStrategySessionPage) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <StrategySessionPage />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <AdminPage />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  if (isFaqPage) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <FaqPage />
        <Footer />
        <ScrollToTopControl />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main>
        <HeroSection />
        <ProblemSection />
        <WhatInovicsDoesSection />
        <ControlFrameworkSection />
        <OutcomesSection />
        <IndustriesSection />
        <ProcessSection />
        <EmotionalBlockSection />
        <InsightsSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTopControl />
    </div>
  );
}

export default App;
