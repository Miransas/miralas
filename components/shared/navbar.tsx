"use client";

import * as React from "react";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  Code2,
  FileText,
  GraduationCap,
  Menu,
  MessagesSquare,
  MoveRight,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
  Cloud,
  Layers,
  Cpu,
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

// MİRANSAS ECOSYSTEM DATA
const DEFAULT_FEATURES: MegaMenuItem[] = [
  {
    title: "Miransas Core",
    description: "Temel arayüz bileşenleri. Kopyala, özelleştir ve hızla yayına al.",
    href: "/components",
    icon: Layers,
    badge: "v2.0",
  },
  {
    title: "Miransas Motion",
    description: "Kusursuz etkileşimler ve dikkat dağıtmayan akıcı animasyonlar.",
    href: "/motion",
    icon: Zap,
    badge: "Yeni",
  },
  {
    title: "Miransas Cloud",
    description: "Projelerinizi saniyeler içinde global olarak dağıtın ve ölçeklendirin.",
    href: "/cloud",
    icon: Cloud,
  },
  {
    title: "Miransas AI",
    description: "Yapay zeka entegrasyonları ile uygulamanıza zeka katın.",
    href: "/ai",
    icon: Cpu,
  },
  {
    title: "Dokümantasyon",
    description: "Temiz kurulum notları, API referansları ve kod örnekleri.",
    href: "/docs",
    icon: Code2,
  },
  {
    title: "Açık Kaynak",
    description: "Geliştirici topluluğu için inşa edilmiş pratik tasarım sistemi.",
    href: "https://github.com/Miransas",
    icon: ShieldCheck,
  },
];

const DEFAULT_USE_CASES: MegaMenuItem[] = [
  {
    title: "Kurumsal Çözümler",
    description: "Büyük ölçekli uygulamalar için performanslı ve güvenilir mimari.",
    href: "/enterprise",
    icon: Building2,
  },
  {
    title: "Startup & SaaS",
    description: "Fikirlerinizi hızla ürüne dönüştürecek hazır yapı taşları.",
    href: "/startups",
    icon: Rocket,
  },
  {
    title: "Kişisel Projeler",
    description: "Portfolyonuzu ve yaratıcı işlerinizi teknik bir zarafetle sunun.",
    href: "/personal",
    icon: Briefcase,
  },
];

const DEFAULT_RESOURCE_GROUPS: MegaMenuResourceGroup[] = [
  {
    title: "Keşfet",
    links: [
      { title: "Bileşenler", href: "/components", icon: Layers },
      { title: "Bloklar", href: "/blocks", icon: BarChart3 },
      { title: "Şablonlar", href: "/templates", icon: Sparkles },
    ],
  },
  {
    title: "Öğren",
    links: [
      { title: "Dokümantasyon", href: "/docs", icon: FileText },
      { title: "Güncellemeler", href: "/changelog", icon: Code2 },
      { title: "Topluluk", href: "https://discord.gg/miransas", icon: Users },
    ],
  },
];

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
        "inline-flex h-9 items-center justify-center rounded-xl px-4 text-sm font-semibold tracking-tight transition-all duration-300 ease-out active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-zinc-950 text-white shadow-md hover:bg-zinc-800 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-zinc-200",
        variant === "ghost" &&
          "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white",
        variant === "outline" &&
          "border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-100 dark:hover:bg-white/5",
        className,
      )}
    >
      {children}
    </a>
  );
}

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
      className="group flex shrink-0 items-center gap-3 text-base font-bold tracking-tight text-zinc-950 transition-all dark:text-white"
    >
      {logo ?? (
        <div className="relative flex size-8 items-center justify-center rounded-xl bg-zinc-950 shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[360deg] group-hover:scale-105 dark:bg-white">
          <img src="/logo.png" alt="Logo" className="size-4 brightness-0 invert dark:invert-0" />
        </div>
      )}
      <span className="bg-gradient-to-br from-zinc-950 to-zinc-600 bg-clip-text text-transparent transition-colors group-hover:to-zinc-950 dark:from-white dark:to-zinc-400 dark:group-hover:to-white">
        {brandName}
      </span>
    </a>
  );
}

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
        "group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-all duration-300 ease-out",
        "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
        "dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white",
        isOpen && "bg-zinc-100 text-zinc-950 dark:bg-white/10 dark:text-white",
      )}
    >
      {label}
      <ChevronDown
        className={cn(
          "size-3.5 opacity-50 transition-transform duration-300 ease-out group-hover:opacity-100",
          isOpen && "rotate-180 opacity-100",
        )}
      />
    </button>
  );
}

function FeatureGrid({ items }: { items: MegaMenuItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.title}
            href={item.href}
            className={cn(
              "group/item relative flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 ease-out",
              "hover:-translate-y-1 hover:bg-white hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300",
              "dark:hover:bg-zinc-900/80 dark:hover:shadow-[0_8px_30px_-4px_rgba(255,255,255,0.03)] dark:focus-visible:ring-white/20",
            )}
          >
            {Icon ? (
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200/50 bg-zinc-50/50 transition-all duration-300 ease-out group-hover/item:scale-110 group-hover/item:border-zinc-300 group-hover/item:bg-white group-hover/item:shadow-sm dark:border-white/5 dark:bg-white/5 dark:group-hover/item:border-white/10 dark:group-hover/item:bg-white/10">
                <Icon className={cn("size-5 transition-colors duration-300", item.iconClassName ?? "text-zinc-600 group-hover/item:text-zinc-950 dark:text-zinc-400 dark:group-hover/item:text-white")} />
              </span>
            ) : null}

            <span className="relative z-10 min-w-0 transition-transform duration-300 ease-out group-hover/item:translate-x-0.5">
              <span className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white">
                  {item.title}
                </span>
                {item.badge ? (
                  <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                    {item.badge}
                  </span>
                ) : null}
              </span>
              {item.description ? (
                <span className="mt-1.5 block text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {item.description}
                </span>
              ) : null}
            </span>
          </a>
        );
      })}
    </div>
  );
}

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
        "absolute left-0 top-full z-50 pt-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open
          ? "visible translate-y-0 scale-100 opacity-100"
          : "invisible -translate-y-3 scale-95 opacity-0 pointer-events-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

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
    <div className="border-b border-zinc-200 dark:border-white/10">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => onToggle(value)}
        className="flex w-full items-center justify-between py-4 text-sm font-bold tracking-tight text-zinc-950 transition-colors hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-white dark:hover:text-zinc-400"
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-zinc-400 transition-transform duration-300 ease-out",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="ml-2 flex flex-col gap-1 border-l-2 border-zinc-100 pl-4 dark:border-white/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenuItem({ item, onNavigate }: { item: MegaMenuItem; onNavigate: () => void }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className="group flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-sm font-semibold tracking-tight text-zinc-600 transition-all duration-200 ease-out hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
    >
      {Icon ? (
        <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm dark:bg-white/5 dark:group-hover:bg-white/10">
          <Icon className={cn("size-4", item.iconClassName)} />
        </div>
      ) : null}
      <span className="transition-transform duration-300 group-hover:translate-x-1">{item.title}</span>
    </a>
  );
}

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
  const [openMenu, setOpenMenu] = React.useState<DesktopMenu>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSection, setMobileSection] = React.useState<MobileSection | null>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  const navRef = React.useRef<HTMLElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  const toggleDesktopMenu = (menu: Exclude<DesktopMenu, null>) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  const toggleMobileSection = (section: MobileSection) => {
    setMobileSection((current) => (current === section ? null : section));
  };

  return (
    <header
      {...props}
      ref={navRef}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isScrolled 
          ? "bg-white/80 backdrop-blur-2xl border-b border-zinc-200/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] dark:bg-black/70 dark:border-white/10 dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border-b border-transparent",
        className,
      )}
      onMouseLeave={(event) => {
        setOpenMenu(null);
        props.onMouseLeave?.(event);
      }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className={cn(
          "flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled ? "h-16" : "h-24"
        )}>
          <div className="flex items-center gap-10">
            <Brand brandName={brandName} brandHref={brandHref} logo={logo} />

            <nav aria-label="Primary navigation" className="hidden items-center lg:flex">
              <ul className="flex items-center gap-2">
                <li className="relative" onMouseEnter={() => setOpenMenu("features")}>
                  <MenuTrigger
                    id="features-mega-menu"
                    label="Ekosistem"
                    isOpen={openMenu === "features"}
                    onToggle={() => toggleDesktopMenu("features")}
                    onOpen={() => setOpenMenu("features")}
                  />
                  <DesktopDropdown id="features-mega-menu" open={openMenu === "features"} className="w-[720px]">
                    <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 p-4 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] ring-1 ring-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/95 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                      <FeatureGrid items={features} />
                      <div className="mt-4 flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/50 px-5 py-4 transition-colors hover:bg-zinc-100/50 dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Miransas ile bir sonraki büyük projenizi oluşturun.
                        </span>
                        <a
                          href="/components"
                          className="group inline-flex items-center gap-2 text-sm font-bold tracking-tight text-zinc-950 transition-colors hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
                        >
                          Tüm Kütüphaneyi Gör
                          <MoveRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>

                <li className="relative" onMouseEnter={() => setOpenMenu("use-cases")}>
                  <MenuTrigger
                    id="use-cases-mega-menu"
                    label="Çözümler"
                    isOpen={openMenu === "use-cases"}
                    onToggle={() => toggleDesktopMenu("use-cases")}
                    onOpen={() => setOpenMenu("use-cases")}
                  />
                  <DesktopDropdown id="use-cases-mega-menu" open={openMenu === "use-cases"} className="w-[460px]">
                    <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 p-3 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] ring-1 ring-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/95 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                      <div className="flex flex-col gap-1">
                        {useCases.map((item) => {
                          const Icon = item.icon;

                          return (
                            <a
                              key={item.title}
                              href={item.href}
                              className="group/item relative flex items-center gap-4 rounded-2xl p-3.5 transition-all duration-300 ease-out hover:bg-zinc-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
                            >
                              {Icon ? (
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200/50 bg-white transition-all duration-300 ease-out group-hover/item:scale-110 group-hover/item:border-zinc-300 group-hover/item:shadow-sm dark:border-white/10 dark:bg-zinc-900/50 dark:group-hover/item:border-white/20 dark:group-hover/item:bg-white/5">
                                  <Icon className="size-5 text-zinc-600 transition-colors duration-300 group-hover/item:text-zinc-950 dark:text-zinc-400 dark:group-hover/item:text-white" />
                                </span>
                              ) : null}
                              <span className="transition-transform duration-300 ease-out group-hover/item:translate-x-0.5">
                                <span className="block text-sm font-bold tracking-tight text-zinc-950 dark:text-white">
                                  {item.title}
                                </span>
                                {item.description ? (
                                  <span className="mt-1 block text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                    {item.description}
                                  </span>
                                ) : null}
                              </span>
                            </a>
                          );
                        })}
                      </div>

                      <div className="mt-2 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-5 dark:border-white/5 dark:bg-white/[0.02]">
                        <p className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white">Özelleştirilebilir Yapı</p>
                        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          Miransas mimarisini kendi iş modelinize göre esnetin.
                        </p>
                        <a href="/components" className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-tight text-zinc-900 transition-colors hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300">
                          Örnekleri İncele 
                          <MoveRight className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>

                <li>
                  <a
                    href={pricingHref}
                    className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold tracking-tight text-zinc-600 transition-all duration-300 ease-out hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    Fiyatlandırma
                  </a>
                </li>

                <li className="relative" onMouseEnter={() => setOpenMenu("resources")}>
                  <MenuTrigger
                    id="resources-mega-menu"
                    label="Kaynaklar"
                    isOpen={openMenu === "resources"}
                    onToggle={() => toggleDesktopMenu("resources")}
                    onOpen={() => setOpenMenu("resources")}
                  />
                  <DesktopDropdown
                    id="resources-mega-menu"
                    open={openMenu === "resources"}
                    className="left-1/2 w-[740px] -translate-x-1/2"
                  >
                    <div className="grid grid-cols-3 gap-6 rounded-3xl border border-zinc-200/80 bg-white/95 p-6 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] ring-1 ring-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/95 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                      <div className="group flex flex-col justify-between rounded-2xl border border-zinc-100 bg-zinc-50/80 p-6 transition-all duration-300 hover:bg-zinc-100/80 dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]">
                        <div>
                          <span className="flex size-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/50 transition-transform duration-300 ease-out group-hover:scale-110 dark:bg-zinc-900 dark:ring-white/10">
                            <BookOpen className="size-5 text-zinc-700 dark:text-zinc-300" />
                          </span>
                          <h4 className="mt-6 text-sm font-bold tracking-tight text-zinc-950 dark:text-white">
                            Geliştirici Odaklı Tasarım
                          </h4>
                          <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                            Temiz kod, kusursuz dokümantasyon ve limitsiz esneklik.
                          </p>
                        </div>
                        <a href="/about" className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-tight text-zinc-900 transition-colors hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300">
                          Miransas Hakkında
                          <MoveRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                        </a>
                      </div>

                      <div className="col-span-2 grid grid-cols-2 gap-8 px-2">
                        {resourceGroups.map((group) => (
                          <div key={group.title} className="flex flex-col gap-2">
                            <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                              {group.title}
                            </h4>
                            {group.links.map((item) => {
                              const Icon = item.icon;

                              return (
                                <a
                                  key={item.title}
                                  href={item.href}
                                  className="group flex items-center gap-3 rounded-xl p-2.5 text-sm font-semibold text-zinc-600 transition-all duration-300 ease-out hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                                >
                                  {Icon ? <Icon className="size-4.5 text-zinc-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-zinc-950 dark:group-hover:text-white" /> : null}
                                  <span className="transition-transform duration-300 group-hover:translate-x-1">{item.title}</span>
                                </a>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DesktopDropdown>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <div className="hidden items-center gap-3 lg:flex">
              <NavAction href={loginHref} variant="ghost">
                Giriş Yap
              </NavAction>
              <NavAction href={ctaHref}>{ctaLabel}</NavAction>
            </div>

            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex size-10 items-center justify-center rounded-xl text-zinc-600 transition-all duration-300 hover:bg-zinc-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-white/10 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!mobileOpen}
        onClick={closeMobile}
        className={cn(
          "fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen ? true : undefined}
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white p-6 shadow-2xl ring-1 ring-zinc-900/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark:bg-black dark:ring-white/10 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <Brand brandName={brandName} brandHref={brandHref} logo={logo} onNavigate={closeMobile} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobile}
            aria-label="Close navigation menu"
            className="flex size-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-500 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="-mx-6 flex-1 overflow-y-auto px-6">
          <MobileAccordion
            title="Ekosistem"
            value="features"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {features.map((item) => (
              <MobileMenuItem key={item.title} item={item} onNavigate={closeMobile} />
            ))}
          </MobileAccordion>

          <MobileAccordion
            title="Çözümler"
            value="use-cases"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {useCases.map((item) => (
              <MobileMenuItem key={item.title} item={item} onNavigate={closeMobile} />
            ))}
          </MobileAccordion>

          <a
            href={pricingHref}
            onClick={closeMobile}
            className="block border-b border-zinc-200 py-5 text-sm font-bold tracking-tight text-zinc-950 transition-colors hover:text-zinc-600 dark:border-white/10 dark:text-white dark:hover:text-zinc-400"
          >
            Fiyatlandırma
          </a>

          <MobileAccordion
            title="Kaynaklar"
            value="resources"
            openSection={mobileSection}
            onToggle={toggleMobileSection}
          >
            {resourceGroups.flatMap((group) =>
              group.links.map((item) => (
                <MobileMenuItem key={`${group.title}-${item.title}`} item={item} onNavigate={closeMobile} />
              )),
            )}
          </MobileAccordion>
        </nav>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <NavAction href={loginHref} variant="outline" className="w-full" onClick={closeMobile}>
            Giriş Yap
          </NavAction>
          <NavAction href={ctaHref} className="w-full" onClick={closeMobile}>
            {ctaLabel}
          </NavAction>
        </div>
      </aside>
    </header>
  );
}

export default Navbar;