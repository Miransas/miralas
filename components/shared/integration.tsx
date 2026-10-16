/* eslint-disable react-hooks/purity */
"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

interface VisualContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TeamCardProps {
  visual: React.ReactNode;
  title: string;
  description: string;
  url: string;
}

interface IntegrationItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  path: string;
  delay: number;
}

const FigmaLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 28"
      fill="none"
      className={className}
    >
      <path
        d="M9.19782 13.7949C9.19782 7.6656 18.3948 7.6656 18.3948 13.7949C18.3948 19.9242 9.19782 19.9242 9.19782 13.7949ZM0.000862536 22.9918C0.000522523 22.3879 0.119222 21.7899 0.350175 21.2318C0.581128 20.6738 0.919805 20.1668 1.34684 19.7398C1.77388 19.3127 2.2809 18.9741 2.83891 18.7431C3.39692 18.5122 3.99499 18.3935 4.59891 18.3938H9.19695V22.9918C9.19695 29.1211 0 29.1211 0 22.9918H0.000862536ZM9.19782 -0.000113647V9.19684H13.7959C19.9252 9.19684 19.9252 -0.000113647 13.7959 -0.000113647H9.19782ZM0.000862536 4.59793C0.000522523 5.20185 0.119222 5.79992 0.350175 6.35793C0.581128 6.91594 0.919805 7.42296 1.34684 7.85C1.77388 8.27704 2.2809 8.61571 2.83891 8.84667C3.39692 9.07762 3.99499 9.19632 4.59891 9.19598H9.19695V-0.000975834H4.59891C3.99499 -0.00131585 3.39692 0.117384 2.83891 0.348337C2.2809 0.57929 1.77388 0.917967 1.34684 1.345C0.919805 1.77204 0.581128 2.27906 0.350175 2.83707C0.119222 3.39509 0.000522523 3.99315 0.000862536 4.59707V4.59793ZM0.000862536 13.7949C0.000522523 14.3988 0.119222 14.9969 0.350175 15.5549C0.581128 16.1129 0.919805 16.6199 1.34684 17.047C1.77388 17.474 2.2809 17.8127 2.83891 18.0436C3.39692 18.2746 3.99499 18.3941 4.59891 18.3938H9.19695V9.19598H4.59891C3.99499 9.19564 3.39692 9.31434 2.83891 9.54529C2.2809 9.77624 1.77388 10.1149 1.34684 10.542C0.919805 10.969 0.581128 11.476 0.350175 12.034C0.119222 12.592 0.000522523 13.1901 0.000862536 13.794V13.7949Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ClaudeLogo = ({ className }: { className?: string }) => {
  return (
    <img src="" alt="" />
  );
};

const ShadcnLogo = ({ className }: { className?: string }) => {
  return (
   <img src="" alt="" />
  );
};

const ReactLogo = ({ className }: { className?: string }) => {
  return (
  <img src="" alt="" />
  );
};

const MotionLogo = ({ className }: { className?: string }) => {
  return (
    <img src="" alt="" />
  );
};

const TailwindLogo = ({ className }: { className?: string }) => {
  return (
    <img src="" alt="" className="cn" />
  );
};

// Center is 282, 205
const integrations: IntegrationItem[] = [
  {
    id: "figma", // Top-Left
    icon: FigmaLogo,
    x: 110,
    y: 90,
    path: "M 270 205 V 105 Q 270 90 255 90 H 110",
    delay: 0.1,
  },
  {
    id: "claude", // Top-Right
    icon: ClaudeLogo,
    x: 360,
    y: 70,
    path: "M 294 205 V 85 Q 294 70 309 70 H 360",
    delay: 0.2,
  },
  {
    id: "shadcn", // Mid-Left
    icon: ShadcnLogo,
    x: 160,
    y: 205,
    path: "M 250 205 H 160",
    delay: 0.3,
  },
  {
    id: "react", // Mid-Right
    icon: ReactLogo,
    x: 480,
    y: 205,
    path: "M 314 205 H 480",
    delay: 0.4,
  },
  {
    id: "motion", // Bottom-Center
    icon: MotionLogo,
    x: 282,
    y: 360,
    path: "M 282 205 V 360",
    delay: 0.6,
  },
  {
    id: "tailwind", // Bottom-Right
    icon: TailwindLogo,
    x: 460,
    y: 340,
    path: "M 314 215 V 325 Q 314 340 329 340 H 460",
    delay: 0.7,
  },
];

const AnimatedPath = ({ d, id }: { d: string; id: string }) => {
  return (
    <>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-border"
      />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop
            offset="50%"
            stopColor="var(--color-primary)"
            stopOpacity="0.5"
          />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </>
  );
};

export function Integration() {
  const containerId = useId();

  return (
    <div className="relative h-full w-full">
      {/* SVG Lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 564 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {integrations.map((integration) => (
          <AnimatedPath
            key={integration.id}
            d={integration.path}
            id={`${containerId}-${integration.id}`}
          />
        ))}
      </svg>

      {/* Center Logo */}
      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-background p-0.5 shadow-md sm:rounded-2xl sm:p-2 sm:shadow-xl">
        <div className="border p-1 rounded-lg sm:p-2.5 sm:rounded-xl">
          <img
            src={
              "https://cdn.21st.dev/assets/localized/957853b5639018e275a36ba6f77941315543dc3dfe74c5756ad1cd21262de54c.png"
            }
            alt="logo"
            width={35}
            height={35}
            className="size-5 object-cover sm:size-9 block dark:hidden"
          />
          <img
            src={
              "https://cdn.21st.dev/assets/localized/14ea5dbc67d7e1e085d656ad41574121f53d0635cf0dfb11965fc8b642f9a053.png"
            }
            alt="logo"
            width={35}
            height={35}
            className="size-5 object-cover sm:size-9 hidden dark:block"
          />
        </div>
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-primary/10 sm:rounded-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Peripheral Icons */}
      {integrations.map((integration) => {
        const Icon = integration.icon;
        return (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: integration.delay }}
            style={{
              left: `${(integration.x / 564) * 100}%`,
              top: `${(integration.y / 410) * 100}%`,
            }}
            className="absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-background shadow-sm sm:h-12 sm:w-12 md:h-13.5 md:w-13.5 sm:rounded-xl text-foreground"
          >
            <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-foreground" />
          </motion.div>
        );
      })}
    </div>
  );
}

export function VisualContainer({ children, className }: VisualContainerProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-564/460 w-full items-center justify-center overflow-hidden rounded-none bg-muted p-8 sm:aspect-564/410 dark:bg-muted/50",
        className,
      )}
    >
      {/* Dots Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/60 from-10% via-transparent to-90% to-background/60" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

const IntegrationCard = ({
  visual,
  title,
  description,
  url,
}: TeamCardProps) => {
  return (
    <Card className="mx-auto flex w-full flex-col sm:max-w-141 rounded-2xl overflow-hidden p-0 ring-0 border gap-0">
      <VisualContainer>{visual}</VisualContainer>

      <CardContent className="p-6 sm:p-8 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
            {title}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <Button
          nativeButton={false}
          className="h-10 w-fit rounded-full px-5 hover:bg-primary/80 cursor-pointer"
          render={<a href={url} />}
        >
          Learn more
        </Button>
      </CardContent>
    </Card>
  );
};

export function IntegrationCardDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-96 p-4 sm:p-6">
      <IntegrationCard
        visual={<Integration />}
        title="Seamless Integrations"
        description="Connect your favorite tools and keep your workflows unified without switching between platforms."
        url="#"
      />
    </div>
  );
}

export default IntegrationCardDemo;
