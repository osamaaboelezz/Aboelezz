import svgPaths from "./svg-yxh29vqbsf";
import { useActiveBreakpoint } from "figma:react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { defineProperties } from "figma:react";

function LogoDesktop({ animationDuration = 1, autoAnimate = true, direction = "leftToRight", moveDistance = 185.28, moveDuration = 1, moveDelay = 0, curveFactor = 0.85, fadeOffset = 0.3, startDelay = 0, logoColor = "white" }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [overlapping, setOverlapping] = useState(false);
  const circleX = useMotionValue(0);
  const circleRef = useRef(null);
  const triangleRef = useRef(null);

  // Track overlap status when circle moves
  useMotionValueEvent(circleX, "change", (latest) => {
    if (latest > moveDistance * 0.6) {
      setOverlapping(true);
    } else {
      setOverlapping(false);
    }
  });

  useEffect(() => {
    if (autoAnimate) {
      const t = setTimeout(() => setIsAnimating(true), startDelay * 1000);
      return () => clearTimeout(t);
    }
  }, [autoAnimate, startDelay]);

  // Calculate delays based on direction
  const getDelay = (index) => {
    const maxIndex = 10; // Total number of animated elements
    return direction === "leftToRight"
      ? (maxIndex - index) * (animationDuration / 10)
      : index * (animationDuration / 10);
  };

  return (
    <div className="relative size-full" data-name="Logo" style={{ "--fill-0": logoColor } as React.CSSProperties}>
      {/* First 'Z' */}
      <motion.div
        className="absolute bottom-[0.66%] left-[95.781%] right-[0.12%] top-[70.54%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(0) + fadeOffset }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 23 29"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p1cb61180}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* Second 'Z' */}
      <motion.div
        className="absolute bottom-[0.66%] left-[91.349%] right-[4.552%] top-[70.54%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(1) + fadeOffset }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 23 29"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p1cb61180}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'E' */}
      <motion.div
        className="absolute bottom-[0.06%] left-[86.29%] right-[9.281%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(2) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 25 31"
          aria-hidden="true"
        >
          <path d={svgPaths.p270f500} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </motion.div>
      {/* 'L' */}
      <motion.div
        className="absolute bottom-[0.66%] left-[84.401%] right-[15.072%] top-[56.74%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(3) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 3 43"
          aria-hidden="true"
        >
          <path
            d="M0 42.6H2.88V0H0V42.6Z"
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'E' */}
      <motion.div
        className="absolute bottom-[0.06%] left-[78.628%] right-[16.944%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(4) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 25 31"
          aria-hidden="true"
        >
          <path d={svgPaths.p270f500} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </motion.div>
      {/* 'O' in 'BOE' */}
      <motion.div
        className="absolute bottom-0 left-[72.779%] right-[22.276%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(5) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 27 31"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p276c2500}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'B' */}
      <motion.div
        className="absolute bottom-0 left-[67.101%] right-[28.119%] top-[56.74%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(6) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 27 44"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p32085070}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'M' */}
      <motion.div
        className="absolute bottom-0 left-[37.452%] right-[58.724%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(7) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 21 31"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p1f34e300}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* Middle stroke of 'A' */}
      <motion.div
        className="absolute bottom-[0.66%] left-[28.866%] right-[63.815%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(8) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 40 30"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p1a513600}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'S' */}
      <motion.div
        className="absolute bottom-0 left-[23.458%] right-[72.717%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(9) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 21 31"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p3efab300}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* First letter */}
      <motion.div
        className="absolute bottom-[0.06%] left-[19.414%] right-[77.465%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(10) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 18 31"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p367e1400}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>

      {/* Combined SVG layer for handling boolean subtract between A and O */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 550 100" preserveAspectRatio="none">
        <defs>
          {/* Mask for A shape */}
          <mask id="triangleMask">
            <rect width="550" height="100" fill="white" />
            {/* When shapes overlap, show the triangle but hide the circle area */}
            {overlapping && (
              <circle 
                cx={50 + circleX.get()} 
                cy="50" 
                r="50" 
                fill="black" 
              />
            )}
          </mask>
          
          {/* Mask for O shape */}
          <mask id="circleMask">
            <rect width="550" height="100" fill="white" />
            {/* When shapes overlap, show the circle but hide the triangle area */}
            {overlapping && (
              <path 
                d="M63 0L126 100H0L63 0Z" 
                transform="translate(235 0)" 
                fill="black"
              />
            )}
          </mask>
        </defs>

        {/* Only one of these will be visible at a time */}
        {!overlapping ? (
          <>
            {/* Triangle 'A' - Keep visible, shown normally when not overlapping */}
            <path 
              d="M63 0L126 100H0L63 0Z" 
              transform="translate(235 0)" 
              fill={logoColor}
              ref={triangleRef}
            />
            
            {/* Circle 'O' - Move while others fade, shown normally when not overlapping */}
            <motion.circle 
              cx="50" 
              cy="50" 
              r="50"
              fill={logoColor}
              style={{ x: circleX }}
              animate={isAnimating ? { x: [0, moveDistance * curveFactor, moveDistance] } : { x: 0 }}
              transition={{
                duration: moveDuration,
                delay: moveDelay + startDelay,
                times: [0, 0.4, 1],
                ease: ["linear", "easeOut"]
              }}
              ref={circleRef}
            />
          </>
        ) : (
          <>
            {/* Triangle 'A' with mask applied when overlapping */}
            <path 
              d="M63 0L126 100H0L63 0Z" 
              transform="translate(235 0)" 
              fill={logoColor}
              mask="url(#triangleMask)"
            />
            
            {/* Circle 'O' with mask applied when overlapping */}
            <motion.circle 
              cx="50" 
              cy="50" 
              r="50"
              fill={logoColor}
              style={{ x: circleX }}
              animate={isAnimating ? { x: [0, moveDistance * curveFactor, moveDistance] } : { x: 0 }}
              transition={{
                duration: moveDuration,
                delay: moveDelay + startDelay,
                times: [0, 0.4, 1],
                ease: ["linear", "easeOut"]
              }}
              mask="url(#circleMask)"
            />
          </>
        )}
      </svg>
    </div>
  );
}

function LogoMobile({ animationDuration = 1, autoAnimate = true, direction = "leftToRight", moveDistance = 185.28, moveDuration = 1, moveDelay = 0, curveFactor = 0.85, fadeOffset = 0.3, startDelay = 0, logoColor = "white" }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [overlapping, setOverlapping] = useState(false);
  const circleX = useMotionValue(0);

  // Track overlap status when circle moves
  useMotionValueEvent(circleX, "change", (latest) => {
    if (latest > moveDistance * 0.6) {
      setOverlapping(true);
    } else {
      setOverlapping(false);
    }
  });

  useEffect(() => {
    if (autoAnimate) {
      const t = setTimeout(() => setIsAnimating(true), startDelay * 1000);
      return () => clearTimeout(t);
    }
  }, [autoAnimate, startDelay]);
  
  // Calculate delays based on direction
  const getDelay = (index) => {
    const maxIndex = 10; // Total number of animated elements
    return direction === "leftToRight" 
      ? (maxIndex - index) * (animationDuration / 10)
      : index * (animationDuration / 10);
  };

  return (
    <div className="relative size-full" data-name="Logo" style={{ "--fill-0": logoColor } as React.CSSProperties}>
      {/* First 'Z' */}
      <motion.div
        className="absolute bottom-[0.66%] left-[95.781%] right-[0.12%] top-[70.54%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(0) + fadeOffset }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 13 17"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p17df51f0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* Second 'Z' */}
      <motion.div
        className="absolute bottom-[0.66%] left-[91.349%] right-[4.552%] top-[70.54%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(1) + fadeOffset }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 13 17"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p17df51f0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'E' */}
      <motion.div
        className="absolute bottom-[0.06%] left-[86.29%] right-[9.281%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(2) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 18"
          aria-hidden="true"
        >
          <path d={svgPaths.pa4d200} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </motion.div>
      {/* 'L' */}
      <motion.div
        className="absolute bottom-[0.66%] left-[84.401%] right-[15.072%] top-[56.74%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(3) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 2 25"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p1d667180}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'E' */}
      <motion.div
        className="absolute bottom-[0.06%] left-[78.628%] right-[16.944%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(4) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 18"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p3ba638c0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'O' in 'BOE' */}
      <motion.div
        className="absolute bottom-0 left-[72.779%] right-[22.276%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(5) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 16 18"
          aria-hidden="true"
        >
          <path d={svgPaths.p156e700} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </motion.div>
      {/* 'B' */}
      <motion.div
        className="absolute bottom-0 left-[67.101%] right-[28.119%] top-[56.74%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(6) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 16 25"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p1096f580}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'M' */}
      <motion.div
        className="absolute bottom-0 left-[37.452%] right-[58.724%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(7) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 13 18"
          aria-hidden="true"
        >
          <path d={svgPaths.pd537580} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </motion.div>
      {/* Middle stroke of 'A' */}
      <motion.div
        className="absolute bottom-[0.66%] left-[28.866%] right-[63.815%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(8) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 17"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p28d3e100}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>
      {/* 'S' */}
      <motion.div
        className="absolute bottom-0 left-[23.458%] right-[72.717%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(9) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 13 18"
          aria-hidden="true"
        >
          <path d={svgPaths.pd537580} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </motion.div>
      {/* First letter */}
      <motion.div
        className="absolute bottom-[0.06%] left-[19.414%] right-[77.465%] top-[69.88%]"
        data-name="Vector"
        initial={{ opacity: 1 }}
        animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: animationDuration, ease: "easeInOut", delay: getDelay(10) }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 10 18"
          aria-hidden="true"
        >
          <path
            d={svgPaths.p2d8de500}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </motion.div>

      {/* Combined SVG layer for handling boolean subtract between A and O for mobile */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 318 58" preserveAspectRatio="none">
        <defs>
          {/* Mask for A shape */}
          <mask id="triangleMaskMobile">
            <rect width="318" height="58" fill="white" />
            {/* When shapes overlap, show the triangle but hide the circle area */}
            {overlapping && (
              <circle 
                cx={28.8462 + circleX.get()} 
                cy="28.8462" 
                r="28.8462" 
                fill="black" 
              />
            )}
          </mask>
          
          {/* Mask for O shape */}
          <mask id="circleMaskMobile">
            <rect width="318" height="58" fill="white" />
            {/* When shapes overlap, show the circle but hide the triangle area */}
            {overlapping && (
              <path 
                d={svgPaths.p3ce53a00}
                transform="translate(136 0)" 
                fill="black"
              />
            )}
          </mask>
        </defs>

        {!overlapping ? (
          <>
            {/* Triangle 'A' - Keep visible */}
            <path 
              d={svgPaths.p3ce53a00} 
              transform="translate(136 0)" 
              fill={logoColor}
            />
            
            {/* Circle 'O' - Move while others fade */}
            <motion.circle 
              cx="28.8462" 
              cy="28.8462" 
              r="28.8462"
              fill={logoColor}
              style={{ x: circleX }}
              animate={isAnimating ? { x: [0, moveDistance * curveFactor, moveDistance] } : { x: 0 }}
              transition={{
                duration: moveDuration,
                delay: moveDelay + startDelay,
                times: [0, 0.4, 1],
                ease: ["linear", "easeOut"]
              }}
            />
          </>
        ) : (
          <>
            {/* Triangle 'A' with mask when overlapping */}
            <path 
              d={svgPaths.p3ce53a00} 
              transform="translate(136 0)" 
              fill={logoColor}
              mask="url(#triangleMaskMobile)"
            />
            
            {/* Circle 'O' with mask when overlapping */}
            <motion.circle 
              cx="28.8462" 
              cy="28.8462" 
              r="28.8462"
              fill={logoColor}
              style={{ x: circleX }}
              animate={isAnimating ? { x: [0, moveDistance * curveFactor, moveDistance] } : { x: 0 }}
              transition={{
                duration: moveDuration,
                delay: moveDelay + startDelay,
                times: [0, 0.4, 1],
                ease: ["linear", "easeOut"]
              }}
              mask="url(#circleMaskMobile)"
            />
          </>
        )}
      </svg>
    </div>
  );
}

function Logo({ animationDuration = 1, autoAnimate = true, direction = "leftToRight", moveDistance = 185.28, moveDuration = 1, moveDelay = 0, curveFactor = 0.85, fadeOffset = 0.3, startDelay = 0, logoColor = "white", redirect = true }) {
  const { width } = useActiveBreakpoint();

  // Calculate total animation length so we know when to redirect
  const totalFadeTime = startDelay + 2 * animationDuration + fadeOffset; // last fade ends here
  const totalMoveTime = startDelay + moveDelay + moveDuration; // circle O animation end
  const totalAnimTime = Math.max(totalFadeTime, totalMoveTime);

  useEffect(() => {
    if (autoAnimate && redirect) {
      const t = setTimeout(() => {
        window.location.href = "https://desk-home-43851929.figma.site";
      }, (totalAnimTime + 1) * 1000); // wait 1s after animations finish
      return () => clearTimeout(t);
    }
  }, [autoAnimate, totalAnimTime, redirect]);
  
  if (width < 1280) {
    return <LogoMobile 
      animationDuration={animationDuration} 
      autoAnimate={autoAnimate}
      direction={direction}
      moveDistance={moveDistance}
      moveDuration={moveDuration}
      moveDelay={moveDelay}
      curveFactor={curveFactor}
      fadeOffset={fadeOffset}
      startDelay={startDelay}
      logoColor={logoColor}
    />;
  }
  return <LogoDesktop 
    animationDuration={animationDuration} 
    autoAnimate={autoAnimate}
    direction={direction}
    moveDistance={moveDistance}
    moveDuration={moveDuration}
    moveDelay={moveDelay}
    curveFactor={curveFactor}
    fadeOffset={fadeOffset}
    startDelay={startDelay}
    logoColor={logoColor}
  />;
}

defineProperties(Logo, {
  animationDuration: {
    label: "Animation duration",
    type: "number",
    defaultValue: 1
  },
  autoAnimate: {
    label: "Auto animate",
    type: "boolean",
    defaultValue: true
  },
  direction: {
    type: "string",
    control: "select",
    options: [
      { value: "leftToRight", label: "Left to Right" },
      { value: "rightToLeft", label: "Right to Left" },
    ],
    label: "Animation Direction",
    defaultValue: "leftToRight",
  },
  moveDistance: {
    label: "Move distance (px)",
    type: "number",
    defaultValue: 185.28
  },
  moveDuration: {
    label: "Move duration",
    type: "number",
    defaultValue: 1
  },
  moveDelay: {
    label: "Move delay",
    type: "number",
    defaultValue: 0
  },
  curveFactor: {
    label: "Curve factor",
    type: "number",
    defaultValue: 0.85,
    control: "slider",
    min: 0.5,
    max: 0.95,
    step: 0.01
  },
  fadeOffset: {
    label: "Fade delay (s)",
    type: "number",
    defaultValue: 0.3,
    control: "slider",
    min: 0,
    max: 2,
    step: 0.05
  },
  startDelay: {
    label: "Start delay (s)",
    type: "number",
    defaultValue: 0,
    control: "slider",
    min: 0,
    max: 5,
    step: 0.1
  },
  logoColor: {
    label: "Logo color",
    type: "string",
    defaultValue: "white"
  },
  redirect: {
    label: "Redirect to Home",
    type: "boolean",
    defaultValue: true
  }
});

export default Logo;
