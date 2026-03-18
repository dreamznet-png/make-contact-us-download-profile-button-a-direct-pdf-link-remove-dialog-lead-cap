const defaultBg =
  "/assets/generated/inovics-data-grid-bg-logo-palette.dim_1920x1080.png";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  backgroundImage?: string;
  backgroundOpacity?: number;
}

export function PageHero({
  title,
  subtitle,
  description,
  children,
  backgroundImage = defaultBg,
  backgroundOpacity = 10,
}: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:py-32 overflow-hidden min-h-[220px] sm:min-h-[260px]">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-charcoal">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: backgroundOpacity / 100,
          }}
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-2xl sm:text-4xl lg:text-7xl font-bold tracking-tight leading-tight text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-2xl text-muted-foreground font-medium">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-base sm:text-lg text-muted-foreground/80">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
