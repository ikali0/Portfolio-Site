/**
 * Timeline Animation Component
 * 
 * Provides scroll-triggered animations with customizable variants.
 */
import { motion, useInView, Variants } from "framer-motion";
import { RefObject, useMemo, ReactNode, ComponentProps } from "react";

type MotionTag = "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "a" | "button" | "figure" | "section" | "article" | "header" | "footer" | "nav" | "ul" | "li";

interface TimelineContentProps {
  as?: MotionTag;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children?: ReactNode;
  // Common props for anchor elements
  href?: string;
  target?: string;
  rel?: string;
  // Allow any other HTML attributes
  [key: string]: unknown;
}

export const TimelineContent = ({
  as = "div",
  animationNum,
  timelineRef,
  customVariants,
  className = "",
  children,
  ...props
}: TimelineContentProps) => {
  const isInView = useInView(timelineRef as RefObject<Element>, { once: true, amount: 0.2 });

  const defaultVariants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
      },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          delay: i * 0.15,
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }),
    }),
    []
  );

  const variants = customVariants || defaultVariants;

  const sharedProps = {
    custom: animationNum,
    variants,
    initial: "hidden" as const,
    animate: isInView ? "visible" as const : "hidden" as const,
    className,
    ...props,
  };

  // Render the appropriate motion component based on the 'as' prop
  switch (as) {
    case "a":
      return <motion.a {...sharedProps as ComponentProps<typeof motion.a>}>{children}</motion.a>;
    case "button":
      return <motion.button {...sharedProps as ComponentProps<typeof motion.button>}>{children}</motion.button>;
    case "span":
      return <motion.span {...sharedProps as ComponentProps<typeof motion.span>}>{children}</motion.span>;
    case "p":
      return <motion.p {...sharedProps as ComponentProps<typeof motion.p>}>{children}</motion.p>;
    case "h1":
      return <motion.h1 {...sharedProps as ComponentProps<typeof motion.h1>}>{children}</motion.h1>;
    case "h2":
      return <motion.h2 {...sharedProps as ComponentProps<typeof motion.h2>}>{children}</motion.h2>;
    case "h3":
      return <motion.h3 {...sharedProps as ComponentProps<typeof motion.h3>}>{children}</motion.h3>;
    case "h4":
      return <motion.h4 {...sharedProps as ComponentProps<typeof motion.h4>}>{children}</motion.h4>;
    case "figure":
      return <motion.figure {...sharedProps as ComponentProps<typeof motion.figure>}>{children}</motion.figure>;
    case "section":
      return <motion.section {...sharedProps as ComponentProps<typeof motion.section>}>{children}</motion.section>;
    case "article":
      return <motion.article {...sharedProps as ComponentProps<typeof motion.article>}>{children}</motion.article>;
    case "header":
      return <motion.header {...sharedProps as ComponentProps<typeof motion.header>}>{children}</motion.header>;
    case "footer":
      return <motion.footer {...sharedProps as ComponentProps<typeof motion.footer>}>{children}</motion.footer>;
    case "nav":
      return <motion.nav {...sharedProps as ComponentProps<typeof motion.nav>}>{children}</motion.nav>;
    case "ul":
      return <motion.ul {...sharedProps as ComponentProps<typeof motion.ul>}>{children}</motion.ul>;
    case "li":
      return <motion.li {...sharedProps as ComponentProps<typeof motion.li>}>{children}</motion.li>;
    case "div":
    default:
      return <motion.div {...sharedProps as ComponentProps<typeof motion.div>}>{children}</motion.div>;
  }
};

TimelineContent.displayName = "TimelineContent";
