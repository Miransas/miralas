"use client";

import * as React from "react";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  Code2,
  Cloud,
  Cpu,
  FileText,
  Layers,
  Menu,
  MoveRight,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "../providers/mode-toggle";

export interface MegaMenuItem {
  title: string;
  description?: string;
  href: string;
  icon?: LucideIcon;
  iconClassName?: string;
  badge?: string;
}

export interface MegaMenuResourceGroup {
  title: string;
  links: MegaMenuItem[];
}

export interface MegaMenuNavbarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brandName?: string;
  brandHref?: string;
  logo?: React.ReactNode;
  features?: MegaMenuItem[];
  useCases?: MegaMenuItem[];
  resourceGroups?: MegaMenuResourceGroup[];
  pricingHref?: string;
  loginHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

type DesktopMenu = "features" | "use-cases" | "resources" | null;
type MobileSection = Exclude<DesktopMenu, null>;

/* ============================================================
   DEFAULT DATA
   ============================================================ */

const DEFAULT_FEATURES: MegaMenuItem[] = [
  {
    title: "Miransas Core",
    description:
      "Temel arayüz bileşenleri. Kopyala, özelleştir ve hızla yayına al.",
    href: "/components",
    icon: Layers,
    badge: "v2.0",
  },
  {
    title: "Miransas Motion",
    description:
      "Kusursuz etkileşimler ve dikkat dağıtmayan akıcı animasyonlar.",
    href: "/motion",
    icon: Zap,
    badge: "Yeni",
  },
  {
    title: "Miransas Cloud",
    description:
      "Projelerinizi saniyeler içinde global olarak dağıtın ve ölçeklendirin.",
    href: "/cloud",
    icon: Cloud,
  },
  {
    title: "Miransas AI",
    description:
      "Yapay zeka entegrasyonları ile uygulamanıza zeka katın.",
    href: "/ai",
    icon: Cpu,
  },
  {
    title: "Dokümantasyon",
    description:
      "Temiz kurulum notları, API referansları ve kod örnekleri.",
    href: "/docs",
    icon: Code2,
  },
  {
    title: "Açık Kaynak",
    description:
      "Geliştirici topluluğu için inşa edilmiş pratik tasarım sistemi.",
    href: "https://github.com/Miransas",
    icon: ShieldCheck,
  },
];

const DEFAULT_USE_CASES: MegaMenuItem[] = [
  {
    title: "Kurumsal Çözümler",
    description:
      "Büyük ölçekli uygulamalar için performanslı ve güvenilir mimari.",
    href: "/enterprise",
    icon: Building2,
  },
  {
    title: "Startup & SaaS",
    description:
      "Fikirlerinizi hızla ürüne dönüştürecek hazır yapı taşları.",
    href: "/startups",
    icon: Rocket,
  },
  {
    title: "Kişisel Projeler",
    description:
      "Portfolyonuzu ve yaratıcı işlerinizi teknik bir zarafetle sunun.",
    href: "/personal",
    icon: Briefcase,
  },
];

const DEFAULT_RESOURCE_GROUPS: MegaMenuResourceGroup[] = [
  {
    title: "Keşfet",
    links: [
      {
        title: "Bileşenler",
        href: "/components",
        icon: Layers,
      },
      {
        title: "Bloklar",
        href: "/blocks",
        icon: BarChart3,
      },
      {
        title: "Şablonlar",
        href: "/templates",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "Öğren",
    links: [
      {
        title: "Dokümantasyon",
        href: "/docs",
        icon: FileText,
      },
      {
        title: "Güncellemeler",
        href: "/changelog",
        icon: Code2,
      },
      {
        title: "Topluluk",
        href: "https://discord.gg/miransas",
        icon: Users,
      },
    ],
  },
];

/* ============================================================
   NAV ACTION
   ============================================================ */

function NavAction({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold tracking-tight",
        "transition-all duration-300 ease-out active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",

        variant === "primary" &&
          [
            "bg-foreground text-background",
            "shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--foreground)_35%,transparent)]",
            "hover:-translate-y-0.5",
            "hover:shadow-[0_12px_35px_-12px_color-mix(in_oklab,var(--foreground)_45%,transparent)]",
          ],

        variant === "ghost" &&
          [
            "text-muted-foreground",
            "hover:bg-foreground/[0.045]",
            "hover:text-foreground",
          ],

        variant === "outline" &&
          [
            "border border-border",
            "bg-card/70",
            "text-foreground",
            "shadow-sm",
            "backdrop-blur-xl",
            "hover:-translate-y-0.5",
            "hover:bg-card",
          ],

        className,
      )}
    >
      {children}
    </a>
  );
}

/* ============================================================
   BRAND
   ============================================================ */

function Brand({
  brandName,
  brandHref,
  logo,
  onNavigate,
}: {
  brandName: string;
  brandHref: string;
  logo?: React.ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={brandHref}
      onClick={onNavigate}
      className="
        group
        flex
        shrink-0
        items-center
        gap-2.5
        rounded-full
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ring
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background
      "
      aria-label={brandName}
    >
      {logo ?? (
        <span
          className="
            relative
            flex
            size-8
            items-center
            justify-center
            overflow-hidden
            rounded-[11px]
            border
            border-border
            bg-card
            shadow-sm
            transition-all
            duration-300
            group-hover:scale-105
            group-hover:shadow-md
          "
        >
          <span
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_30%_25%,color-mix(in_oklab,var(--foreground)_10%,transparent),transparent_55%)]
            "
          />

          <span
            className="
              relative
              size-3
              rounded-full
              bg-foreground
              shadow-[0_0_18px_color-mix(in_oklab,var(--foreground)_25%,transparent)]
            "
          />
        </span>
      )}

      <span
        className="
          hidden
          text-sm
          font-bold
          tracking-[-0.02em]
          text-foreground
          sm:block
        "
      >
        {brandName}
      </span>
    </a>
  );
}

/* ============================================================
   MENU TRIGGER
   ============================================================ */

function MenuTrigger({
  id,
  label,
  isOpen,
  onToggle,
  onOpen,
}: {
  id: string;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={id}
      onClick={onToggle}
      onFocus={onOpen}
      className={cn(
        "group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold tracking-tight",
        "text-muted-foreground transition-all duration-300 ease-out",
        "hover:bg-foreground/[0.045] hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isOpen && "bg-foreground/[0.055] text-foreground",
      )}
    >
      {label}

      <ChevronDown
        className={cn(
          "size-3.5 opacity-50 transition-all duration-300",
          "group-hover:opacity-100",
          isOpen && "rotate-180 opacity-100",
        )}
      />

      {isOpen && (
        <span
          className="
            absolute
            bottom-0.5
            left-1/2
            size-1
            -translate-x-1/2
            rounded-full
            bg-foreground
          "
        />
      )}
    </button>
  );
}

/* ============================================================
   FEATURE GRID
   ============================================================ */

function FeatureGrid({
  items,
}: {
  items: MegaMenuItem[];
}) {
  return (
    <div className="grid grid-cols-2 gap-1">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.title}
            href={item.href}
            className="
              group/item
              relative
              flex
              gap-3.5
              rounded-2xl
              p-3.5
              transition-all
              duration-300
              ease-out
              hover:-translate-y-0.5
              hover:bg-foreground/[0.035]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
            "
          >
            {Icon && (
              <span
                className="
                  relative
                  flex
                  size-10
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-border
                  bg-background
                  text-muted-foreground
                  shadow-sm
                  transition-all
                  duration-300
                  group-hover/item:border-foreground/15
                  group-hover/item:text-foreground
                  group-hover/item:shadow-md
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--foreground)_7%,transparent),transparent_65%)]
                  "
                />

                <Icon
                  className={cn(
                    "relative size-[18px]",
                    item.iconClassName,
                  )}
                />
              </span>
            )}

            <span className="min-w-0 pt-0.5">
              <span className="flex items-center gap-2">
                <span
                  className="
                    text-sm
                    font-bold
                    tracking-tight
                    text-foreground
                  "
                >
                  {item.title}
                </span>

                {item.badge && (
                  <span
                    className="
                      rounded-full
                      border
                      border-border
                      bg-background
                      px-1.5
                      py-0.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-muted-foreground
                    "
                  >
                    {item.badge}
                  </span>
                )}
              </span>

              {item.description && (
                <span
                  className="
                    mt-1
                    block
                    max-w-[250px]
                    text-[11px]
                    leading-[1.55]
                    text-muted-foreground
                  "
                >
                  {item.description}
                </span>
              )}
            </span>

            <MoveRight
              className="
                absolute
                right-3
                top-3
                size-3.5
                -translate-x-1
                opacity-0
                text-muted-foreground
                transition-all
                duration-300
                group-hover/item:translate-x-0
                group-hover/item:opacity-100
              "
            />
          </a>
        );
      })}
    </div>
  );
}

/* ============================================================
   DESKTOP DROPDOWN
   ============================================================ */

function DesktopDropdown({
  id,
  open,
  className,
  children,
}: {
  id: string;
  open: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      className={cn(
        "absolute left-0 top-full z-50 pt-3",
        "origin-top-left",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open
          ? "visible translate-y-0 scale-100 opacity-100"
          : "pointer-events-none invisible -translate-y-2 scale-[0.97] opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ============================================================
   MOBILE ACCORDION
   ============================================================ */

function MobileAccordion({
  title,
  value,
  openSection,
  onToggle,
  children,
}: {
  title: string;
  value: MobileSection;
  openSection: MobileSection | null;
  onToggle: (value: MobileSection) => void;
  children: React.ReactNode;
}) {
  const isOpen = openSection === value;
  const contentId = `mobile-${value}-content`;

  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => onToggle(value)}
        className="
          flex
          w-full
          items-center
          justify-between
          py-4
          text-sm
          font-bold
          tracking-tight
          text-foreground
          transition-colors
          hover:text-muted-foreground
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring
        "
      >
        {title}

        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300",
          isOpen
            ? "grid-rows-[1fr] pb-4 opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="ml-1 flex flex-col gap-1 border-l border-border pl-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MOBILE ITEM
   ============================================================ */

function MobileMenuItem({
  item,
  onNavigate,
}: {
  item: MegaMenuItem;
  onNavigate: () => void;
}) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className="
        group
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-sm
        font-semibold
        text-muted-foreground
        transition-all
        duration-200
        hover:bg-foreground/[0.04]
        hover:text-foreground
      "
    >
      {Icon && (
        <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
      )}

      <span>{item.title}</span>

      {item.badge && (
        <span
          className="
            ml-auto
            rounded-full
            border
            border-border
            px-1.5
            py-0.5
            text-[9px]
            font-bold
            uppercase
            tracking-wider
            text-muted-foreground
          "
        >
          {item.badge}
        </span>
      )}
    </a>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */

export function Navbar({
  brandName = "Miransas Projects",
  brandHref = "/",
  logo,
  features = DEFAULT_FEATURES,
  useCases = DEFAULT_USE_CASES,
  resourceGroups = DEFAULT_RESOURCE_GROUPS,
  pricingHref = "/pricing",
  loginHref = "/login",
  ctaHref = "/dashboard",
  ctaLabel = "Ekosisteme Katıl",
  className,
  ...props
}: MegaMenuNavbarProps) {
  const [openMenu, setOpenMenu] =
    React.useState<DesktopMenu>(null);

  const [mobileOpen, setMobileOpen] =
    React.useState(false);

  const [mobileSection, setMobileSection] =
    React.useState<MobileSection | null>(null);

  const [isScrolled, setIsScrolled] =
    React.useState(false);

  const navRef = React.useRef<HTMLElement | null>(null);

  const closeButtonRef =
    React.useRef<HTMLButtonElement | null>(null);

  /* ----------------------------------------------------------
     SCROLL
     ---------------------------------------------------------- */

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
  }, []);

  /* ----------------------------------------------------------
     OUTSIDE CLICK + ESCAPE
     ---------------------------------------------------------- */

  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setOpenMenu(null);
      setMobileOpen(false);
      setMobileSection(null);
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  /* ----------------------------------------------------------
     MOBILE SCROLL LOCK
     ---------------------------------------------------------- */

  React.useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileOpen]);

  /* ----------------------------------------------------------
     HELPERS
     ---------------------------------------------------------- */

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  const toggleDesktopMenu = (
    menu: Exclude<DesktopMenu, null>,
  ) => {
    setOpenMenu((current) =>
      current === menu ? null : menu,
    );
  };

  const toggleMobileSection = (
    section: MobileSection,
  ) => {
    setMobileSection((current) =>
      current === section ? null : section,
    );
  };

  /* ----------------------------------------------------------
     RENDER
     ---------------------------------------------------------- */

  return (
    <>
      <header
        {...props}
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "px-3 pt-3 sm:px-5 sm:pt-4",
          className,
        )}
      >
        {/* ====================================================
            FLOATING NAVBAR
            ==================================================== */}

        <div
          className={cn(
            "mx-auto flex max-w-[1400px] items-center justify-between",
            "rounded-2xl border px-2.5",
            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",

            isScrolled
              ? [
                  "h-[58px]",
                  "border-border/80",
                  "bg-background/78",
                  "shadow-[0_12px_50px_-20px_color-mix(in_oklab,var(--foreground)_22%,transparent)]",
                  "backdrop-blur-2xl",
                ]
              : [
                  "h-16",
                  "border-transparent",
                  "bg-background/[0.32]",
                  "backdrop-blur-xl",
                ],
          )}
        >
          {/* --------------------------------------------------
              LEFT
              -------------------------------------------------- */}

          <div className="flex min-w-0 items-center gap-5">
            <Brand
              brandName={brandName}
              brandHref={brandHref}
              logo={logo}
            />

            {/* Desktop navigation */}

            <nav
              aria-label="Primary navigation"
              className="hidden lg:block"
            >
              <ul className="flex items-center gap-0.5">
                {/* ECOSYSTEM */}

                <li
                  className="relative"
                  onMouseEnter={() =>
                    setOpenMenu("features")
                  }
                >
                  <MenuTrigger
                    id="features-mega-menu"
                    label="Ekosistem"
                    isOpen={
                      openMenu === "features"
                    }
                    onToggle={() =>
                      toggleDesktopMenu(
                        "features",
                      )
                    }
                    onOpen={() =>
                      setOpenMenu("features")
                    }
                  />

                  <DesktopDropdown
                    id="features-mega-menu"
                    open={
                      openMenu === "features"
                    }
                    className="w-[720px]"
                  >
                    <div
                      className="
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-border/80
                        bg-card/92
                        p-3
                        shadow-[0_28px_80px_-25px_color-mix(in_oklab,var(--foreground)_25%,transparent)]
                        backdrop-blur-2xl
                      "
                    >
                      <div className="rounded-[20px] border border-border/60 bg-background/45 p-1">
                        <FeatureGrid
                          items={features}
                        />
                      </div>

                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          justify-between
                          gap-5
                          rounded-2xl
                          border
                          border-border/70
                          bg-foreground/[0.025]
                          px-4
                          py-3.5
                        "
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-7 items-center justify-center rounded-lg border border-border bg-background">
                            <Sparkles className="size-3.5 text-muted-foreground" />
                          </span>

                          <span className="text-xs font-medium text-muted-foreground">
                            Bir sonraki büyük
                            projenizi oluşturun.
                          </span>
                        </div>

                        <a
                          href="/components"
                          className="
                            group
                            inline-flex
                            shrink-0
                            items-center
                            gap-1.5
                            text-xs
                            font-bold
                            text-foreground
                            transition-colors
                            hover:text-muted-foreground
                          "
                        >
                          Kütüphaneyi keşfet
                          <MoveRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>

                {/* SOLUTIONS */}

                <li
                  className="relative"
                  onMouseEnter={() =>
                    setOpenMenu("use-cases")
                  }
                >
                  <MenuTrigger
                    id="use-cases-mega-menu"
                    label="Çözümler"
                    isOpen={
                      openMenu === "use-cases"
                    }
                    onToggle={() =>
                      toggleDesktopMenu(
                        "use-cases",
                      )
                    }
                    onOpen={() =>
                      setOpenMenu("use-cases")
                    }
                  />

                  <DesktopDropdown
                    id="use-cases-mega-menu"
                    open={
                      openMenu === "use-cases"
                    }
                    className="w-[470px]"
                  >
                    <div
                      className="
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-border/80
                        bg-card/92
                        p-3
                        shadow-[0_28px_80px_-25px_color-mix(in_oklab,var(--foreground)_25%,transparent)]
                        backdrop-blur-2xl
                      "
                    >
                      <div className="flex flex-col gap-1">
                        {useCases.map((item) => {
                          const Icon = item.icon;

                          return (
                            <a
                              key={item.title}
                              href={item.href}
                              className="
                                group
                                flex
                                gap-3.5
                                rounded-2xl
                                p-3.5
                                transition-all
                                duration-300
                                hover:bg-foreground/[0.035]
                              "
                            >
                              {Icon && (
                                <span
                                  className="
                                    flex
                                    size-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-border
                                    bg-background
                                    text-muted-foreground
                                    transition-all
                                    duration-300
                                    group-hover:border-foreground/15
                                    group-hover:text-foreground
                                  "
                                >
                                  <Icon className="size-[18px]" />
                                </span>
                              )}

                              <span className="min-w-0">
                                <span className="block text-sm font-bold tracking-tight text-foreground">
                                  {item.title}
                                </span>

                                {item.description && (
                                  <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">
                                    {item.description}
                                  </span>
                                )}
                              </span>

                              <MoveRight className="ml-auto mt-1 size-3.5 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                            </a>
                          );
                        })}
                      </div>

                      <div
                        className="
                          mt-2
                          rounded-2xl
                          border
                          border-border
                          bg-foreground/[0.025]
                          p-4
                        "
                      >
                        <p className="text-xs font-bold text-foreground">
                          Özelleştirilebilir yapı
                        </p>

                        <p className="mt-1.5 max-w-sm text-[11px] leading-relaxed text-muted-foreground">
                          Miransas mimarisini kendi
                          ürününüzün ihtiyaçlarına göre
                          esnetin.
                        </p>

                        <a
                          href="/components"
                          className="
                            group
                            mt-3
                            inline-flex
                            items-center
                            gap-1.5
                            text-xs
                            font-bold
                            text-foreground
                          "
                        >
                          Örnekleri incele
                          <MoveRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>

                {/* PRICING */}

                <li>
                  <a
                    href={pricingHref}
                    className="
                      flex
                      items-center
                      rounded-full
                      px-3.5
                      py-2
                      text-sm
                      font-semibold
                      tracking-tight
                      text-muted-foreground
                      transition-all
                      duration-300
                      hover:bg-foreground/[0.045]
                      hover:text-foreground
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-ring
                    "
                  >
                    Fiyatlandırma
                  </a>
                </li>

                {/* RESOURCES */}

                <li
                  className="relative"
                  onMouseEnter={() =>
                    setOpenMenu("resources")
                  }
                >
                  <MenuTrigger
                    id="resources-mega-menu"
                    label="Kaynaklar"
                    isOpen={
                      openMenu === "resources"
                    }
                    onToggle={() =>
                      toggleDesktopMenu(
                        "resources",
                      )
                    }
                    onOpen={() =>
                      setOpenMenu("resources")
                    }
                  />

                  <DesktopDropdown
                    id="resources-mega-menu"
                    open={
                      openMenu === "resources"
                    }
                    className="left-1/2 w-[740px] -translate-x-1/2 origin-top"
                  >
                    <div
                      className="
                        grid
                        grid-cols-[230px_1fr]
                        gap-3
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-border/80
                        bg-card/92
                        p-3
                        shadow-[0_28px_80px_-25px_color-mix(in_oklab,var(--foreground)_25%,transparent)]
                        backdrop-blur-2xl
                      "
                    >
                      {/* Featured */}

                      <div
                        className="
                          group
                          flex
                          flex-col
                          justify-between
                          rounded-[20px]
                          border
                          border-border
                          bg-foreground/[0.025]
                          p-5
                        "
                      >
                        <div>
                          <span
                            className="
                              flex
                              size-10
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-border
                              bg-background
                              text-muted-foreground
                            "
                          >
                            <BookOpen className="size-[18px]" />
                          </span>

                          <h4 className="mt-5 text-sm font-bold tracking-tight text-foreground">
                            Geliştirici odaklı
                            tasarım
                          </h4>

                          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                            Temiz kod, güçlü
                            dokümantasyon ve limitsiz
                            esneklik.
                          </p>
                        </div>

                        <a
                          href="/about"
                          className="
                            mt-6
                            inline-flex
                            items-center
                            gap-1.5
                            text-xs
                            font-bold
                            text-foreground
                          "
                        >
                          Miransas hakkında
                          <MoveRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </div>

                      {/* Resource links */}

                      <div className="grid grid-cols-2 gap-5 p-3">
                        {resourceGroups.map(
                          (group) => (
                            <div
                              key={group.title}
                            >
                              <h4
                                className="
                                  mb-2.5
                                  px-2
                                  text-[9px]
                                  font-black
                                  uppercase
                                  tracking-[0.18em]
                                  text-muted-foreground
                                "
                              >
                                {group.title}
                              </h4>

                              <div className="flex flex-col gap-0.5">
                                {group.links.map(
                                  (item) => {
                                    const Icon =
                                      item.icon;

                                    return (
                                      <a
                                        key={
                                          item.title
                                        }
                                        href={
                                          item.href
                                        }
                                        className="
                                          group
                                          flex
                                          items-center
                                          gap-2.5
                                          rounded-xl
                                          px-2.5
                                          py-2.5
                                          text-xs
                                          font-semibold
                                          text-muted-foreground
                                          transition-all
                                          duration-200
                                          hover:bg-foreground/[0.04]
                                          hover:text-foreground
                                        "
                                      >
                                        {Icon && (
                                          <Icon className="size-3.5 transition-transform duration-200 group-hover:scale-110" />
                                        )}

                                        <span>
                                          {
                                            item.title
                                          }
                                        </span>

                                        <MoveRight className="ml-auto size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-70" />
                                      </a>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>
              </ul>
            </nav>
          </div>

          {/* --------------------------------------------------
              RIGHT
              -------------------------------------------------- */}

          <div className="flex shrink-0 items-center gap-1.5">
            <ModeToggle />

            <div className="hidden items-center gap-1.5 lg:flex">
              <NavAction
                href={loginHref}
                variant="ghost"
              >
                Giriş Yap
              </NavAction>

              <NavAction href={ctaHref}>
                {ctaLabel}
              </NavAction>
            </div>

            <button
              type="button"
              aria-label="Menüyü aç"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="
                flex
                size-10
                items-center
                justify-center
                rounded-full
                text-muted-foreground
                transition-all
                duration-300
                hover:bg-foreground/[0.045]
                hover:text-foreground
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                lg:hidden
              "
            >
              <Menu className="size-[19px]" />
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================
          MOBILE BACKDROP
          ====================================================== */}

      <div
        aria-hidden={!mobileOpen}
        onClick={closeMobile}
        className={cn(
          "fixed inset-0 z-[60] bg-background/70 backdrop-blur-md transition-opacity duration-500 lg:hidden",
          mobileOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      {/* ======================================================
          MOBILE DRAWER
          ====================================================== */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen ? true : undefined}
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-y-3 right-3 z-[70] flex w-[calc(100%-24px)] max-w-md flex-col overflow-hidden rounded-3xl border border-border bg-background/96 p-5 shadow-[0_30px_100px_-30px_color-mix(in_oklab,var(--foreground)_35%,transparent)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          mobileOpen
            ? "translate-x-0"
            : "translate-x-[110%]",
        )}
      >
        {/* Mobile top */}

        <div className="mb-5 flex items-center justify-between">
          <Brand
            brandName={brandName}
            brandHref={brandHref}
            logo={logo}
            onNavigate={closeMobile}
          />

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobile}
            aria-label="Menüyü kapat"
            className="
              flex
              size-10
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-card
              text-muted-foreground
              transition-all
              duration-300
              hover:bg-foreground/[0.045]
              hover:text-foreground
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
            "
          >
            <X className="size-[18px]" />
          </button>
        </div>

        {/* Mobile nav */}

        <nav
          aria-label="Mobile navigation"
          className="-mx-2 flex-1 overflow-y-auto px-2"
        >
          <MobileAccordion
            title="Ekosistem"
            value="features"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {features.map((item) => (
              <MobileMenuItem
                key={item.title}
                item={item}
                onNavigate={closeMobile}
              />
            ))}
          </MobileAccordion>

          <MobileAccordion
            title="Çözümler"
            value="use-cases"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {useCases.map((item) => (
              <MobileMenuItem
                key={item.title}
                item={item}
                onNavigate={closeMobile}
              />
            ))}
          </MobileAccordion>

          <a
            href={pricingHref}
            onClick={closeMobile}
            className="
              block
              border-b
              border-border
              py-4
              text-sm
              font-bold
              tracking-tight
              text-foreground
              transition-colors
              hover:text-muted-foreground
            "
          >
            Fiyatlandırma
          </a>

          <MobileAccordion
            title="Kaynaklar"
            value="resources"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {resourceGroups.flatMap(
              (group) =>
                group.links.map((item) => (
                  <MobileMenuItem
                    key={`${group.title}-${item.title}`}
                    item={item}
                    onNavigate={closeMobile}
                  />
                )),
            )}
          </MobileAccordion>
        </nav>

        {/* Mobile footer */}

        <div className="mt-5 border-t border-border pt-4">
          <div className="grid grid-cols-2 gap-2">
            <NavAction
              href={loginHref}
              variant="outline"
              className="w-full"
              onClick={closeMobile}
            >
              Giriş Yap
            </NavAction>

            <NavAction
              href={ctaHref}
              className="w-full"
              onClick={closeMobile}
            >
              {ctaLabel}
            </NavAction>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;