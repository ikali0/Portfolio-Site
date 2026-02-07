'use client'

import { RefObject, createElement, ReactNode } from "react"
import { motion, Variants, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

type TimelineContentProps = {
  as?: keyof JSX.IntrinsicElements
  animationNum: number
  timelineRef: RefObject<HTMLElement | null>
  customVariants?: Variants
  className?: string
  children?: ReactNode
  href?: string
  target?: string
  rel?: string
  [key: string]: unknown
}

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

function TimelineContent({
  as = "div",
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" })

  const variants = customVariants || defaultVariants

  // Create motion component for the specified element type
  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionComponent
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

export { TimelineContent }
