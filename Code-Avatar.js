import svgPaths from "./svg-xrpumje87b";
import img from "figma:asset/26171e9c437f73685bb2343e4dfb2d36a9ef6321.png";
import { useActiveBreakpoint } from "figma:react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { defineProperties } from "figma:react";

// Utility function to generate deterministic random values
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Function to get randomized animation properties
function getRandomAnimationProps(index, randomness = 0.5, baseDelay = 0.2, maxDistanceVariation = 0.3) {
  // Generate random values based on the index
  const speedVariation = 1 + (seededRandom(index * 123.45) * randomness - randomness/2);
  const delayVariation = seededRandom(index * 456.78) * baseDelay * 2;
  const startOffsetY = seededRandom(index * 789.12) * maxDistanceVariation * 2 - maxDistanceVariation;
  
  return {
    speedVariation,
    delayVariation,
    startOffsetY
  };
}

// Map of easing functions
const easingFunctions = {
  linear: "linear",
  easeOut: "easeOut",
  easeIn: "easeIn",
  easeInOut: "easeInOut",
  bounceOut: [0.22, 1.2, 0.36, 1],
  overshoot: [0.17, 0.67, 0.83, 1.67],
  anticipate: [0.38, -0.4, 0.88, 0.65],
}

function Layer20Desktop({ 
  animationDistance = 250, 
  animationDuration = 1.2,
  randomness = 0.5,
  group2Distance = 800,
  group1Distance = 800,
  linesEase = "easeOut",
  animationOn = true
}) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationOn ? 100 : 0);
    return () => clearTimeout(timer);
  }, [animationOn]);

  // Create staggered line animations with randomness
  const lineVariants = {
    hidden: (i) => {
      // If animation is off, start from the final state
      if (!animationOn) {
        return {
          y: 0,
          opacity: 1,
          pathLength: 1,
          pathOffset: 0
        };
      }
      
      const { startOffsetY } = getRandomAnimationProps(i, randomness);
      const distanceMultiplier = 1 + startOffsetY;
      return { 
        y: -group2Distance * distanceMultiplier, 
        opacity: 0,
        pathLength: 0,
        pathOffset: 1
      };
    },
    visible: (i) => {
      const { speedVariation, delayVariation } = getRandomAnimationProps(i, randomness);
      return {
        y: 0,
        opacity: 1,
        pathLength: 1,
        pathOffset: 0,
        transition: animationOn ? { 
          pathLength: { 
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: easingFunctions[linesEase]
          },
          pathOffset: { 
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: easingFunctions[linesEase]
          },
          y: {
            delay: delayVariation,
            duration: animationDuration * speedVariation * 0.8,
            ease: easingFunctions[linesEase]
          },
          opacity: {
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: [0.2, 0.6, 0.4, 1]
          }
        } : { duration: 0 } // No animation when animationOn is false
      };
    }
  };

  const lineVariants2 = {
    hidden: (i) => {
      // If animation is off, start from the final state
      if (!animationOn) {
        return {
          y: 0,
          opacity: 1,
          pathLength: 1,
          pathOffset: 0
        };
      }
      
      const { startOffsetY } = getRandomAnimationProps(i + 100, randomness);
      const distanceMultiplier = 1 + startOffsetY;
      return { 
        y: group1Distance * distanceMultiplier, 
        opacity: 0,
        pathLength: 0,
        pathOffset: 1
      };
    },
    visible: (i) => {
      const { speedVariation, delayVariation } = getRandomAnimationProps(i + 100, randomness);
      return {
        y: 0,
        opacity: 1,
        pathLength: 1,
        pathOffset: 0,
        transition: animationOn ? { 
          pathLength: { 
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: easingFunctions[linesEase]
          },
          pathOffset: { 
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: easingFunctions[linesEase] 
          },
          y: {
            delay: delayVariation,
            duration: animationDuration * speedVariation * 0.8,
            ease: easingFunctions[linesEase]
          },
          opacity: {
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: [0.2, 0.6, 0.4, 1]
          }
        } : { duration: 0 } // No animation when animationOn is false
      };
    }
  };

  return (
    <div className="relative size-full" data-name="Layer 20">
      <div className="absolute inset-0">
        <svg
          className="block size-full overflow-visible"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 371 374"
          style={{ overflow: "visible" }}
        >
          <g id="Layer 20">
            <g id="Group2">
              {Array.from({ length: 19 }).map((_, i) => {
                const pathProps = {
                  stroke: "var(--stroke-0, #EEBA05)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 6,
                  initial: "hidden",
                  animate: isVisible ? "visible" : "hidden",
                  variants: lineVariants,
                  custom: i,
                };
                
                if (i === 0) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector${i > 0 ? '_' + i : ''}`}
                    d="M4.88121 144.543V228.541"
                    {...pathProps}
                  />
                );
                if (i === 1) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d="M24.4076 95.4775V277.608"
                    {...pathProps}
                  />
                );
                if (i === 2) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d={svgPaths.p31b2b380}
                    {...pathProps}
                  />
                );
                if (i === 3) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d={svgPaths.p1ffbf80}
                    {...pathProps}
                  />
                );
                if (i === 4) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d="M82.9868 33.5524V339.532"
                    {...pathProps}
                  />
                );
                if (i === 5) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d={svgPaths.p15233080}
                    {...pathProps}
                  />
                );
                if (i === 6) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d="M122.04 14.024V359.062"
                    {...pathProps}
                  />
                );
                if (i === 7) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d={svgPaths.p2af53f30}
                    {...pathProps}
                  />
                );
                if (i === 8) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d={svgPaths.p124c7140}
                    {...pathProps}
                  />
                );
                if (i === 9) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d="M180.619 3.06256V370.022"
                    {...pathProps}
                  />
                );
                if (i === 10) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d="M200.145 3.56496V369.519"
                    {...pathProps}
                  />
                );
                if (i === 11) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d="M219.672 6.11123V366.973"
                    {...pathProps}
                  />
                );
                if (i === 12) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d={svgPaths.p12ebd800}
                    {...pathProps}
                  />
                );
                if (i === 13) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d="M258.724 17.8569V355.228"
                    {...pathProps}
                  />
                );
                if (i === 14) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d={svgPaths.pe6ce878}
                    {...pathProps}
                  />
                );
                if (i === 15) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d="M297.777 40.4292V332.657"
                    {...pathProps}
                  />
                );
                if (i === 16) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d={svgPaths.p3ae37000}
                    {...pathProps}
                  />
                );
                if (i === 17) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d={svgPaths.p360f400}
                    {...pathProps}
                  />
                );
                if (i === 18) return (
                  <motion.path
                    key={`vector_${i}`}
                    id={`Vector_${i}`}
                    d="M356.356 114.945V258.141"
                    {...pathProps}
                  />
                );
                return null;
              })}
            </g>
            <g id="Group1">
              {Array.from({ length: 19 }).map((_, i) => {
                const pathProps = {
                  stroke: "var(--stroke-0, #EEBA05)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 6,
                  initial: "hidden",
                  animate: isVisible ? "visible" : "hidden",
                  variants: lineVariants2,
                  custom: i,
                };
                
                if (i === 0) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths.p24c62740}
                    {...pathProps}
                  />
                );
                if (i === 1) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths.pd308880}
                    {...pathProps}
                  />
                );
                if (i === 2) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths.p1a92000}
                    {...pathProps}
                  />
                );
                if (i === 3) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M73.2244 40.4294V332.657"
                    {...pathProps}
                  />
                );
                if (i === 4) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M92.7508 27.5569V345.527"
                    {...pathProps}
                  />
                );
                if (i === 5) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M112.277 17.8569V355.228"
                    {...pathProps}
                  />
                );
                if (i === 6) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths.p106f74f0}
                    {...pathProps}
                  />
                );
                if (i === 7) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths.p6839ec0}
                    {...pathProps}
                  />
                );
                if (i === 8) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M170.855 3.56497V369.519"
                    {...pathProps}
                  />
                );
                if (i === 9) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M190.381 3.06261V370.022"
                    {...pathProps}
                  />
                );
                if (i === 10) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M209.908 4.57756V368.507"
                    {...pathProps}
                  />
                );
                if (i === 11) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M229.434 8.18029V364.906"
                    {...pathProps}
                  />
                );
                if (i === 12) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths.p30363f00}
                    {...pathProps}
                  />
                );
                if (i === 13) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M268.487 22.3501V350.736"
                    {...pathProps}
                  />
                );
                if (i === 14) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths.p25557ac0}
                    {...pathProps}
                  />
                );
                if (i === 15) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M307.54 48.3154V324.769"
                    {...pathProps}
                  />
                );
                if (i === 16) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths.p129fca00}
                    {...pathProps}
                  />
                );
                if (i === 17) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d="M346.592 95.4777V277.608"
                    {...pathProps}
                  />
                );
                if (i === 18) return (
                  <motion.path
                    key={`vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths.pcb5ccc0}
                    {...pathProps}
                  />
                );
                return null;
              })}
            </g>
            <g id="Circle"></g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function AvatarDesktop({ 
  animationDistance = 250, 
  animationDuration = 1.2, 
  randomness = 0.5,
  group2Distance = 800,
  group1Distance = 800,
  linesEase = "easeOut",
  faceStartScale = 0.8,
  faceEndScale = 1,
  faceScaleDuration = 0.8,
  faceScaleDelay = 0.8,
  faceOpacityDuration = 0.8,
  faceOpacityDelay = 0.8,
  faceScaleEase = "easeOut",
  animationOn = true
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationOn ? 100 : 0);
    return () => clearTimeout(timer);
  }, [animationOn]);

  return (
    <div className="relative size-full" data-name="Avatar">
      <div
        className="absolute inset-0"
        data-name="Lines"
      >
        <div className="absolute flex inset-0 items-center justify-center">
          <div className="flex-none h-[371.042px] rotate-[45deg] w-[375px] overflow-visible">
            <Layer20Desktop 
              animationDistance={animationDistance} 
              animationDuration={animationDuration} 
              randomness={randomness}
              group2Distance={group2Distance}
              group1Distance={group1Distance}
              linesEase={linesEase}
              animationOn={animationOn}
            />
          </div>
        </div>
      </div>
      <motion.div
        className="absolute bg-center bg-cover bg-no-repeat inset-0"
        data-name="Osama"
        style={{ 
          backgroundImage: `url('${img}')`,
          transformOrigin: "center" 
        }}
        initial={animationOn ? { opacity: 0, scale: faceStartScale } : { opacity: 1, scale: faceEndScale }}
        animate={isVisible ? { opacity: 1, scale: faceEndScale } : { opacity: 0, scale: faceStartScale }}
        transition={animationOn ? { 
          opacity: { duration: faceOpacityDuration, delay: faceOpacityDelay },
          scale: { duration: faceScaleDuration, delay: faceScaleDelay, ease: easingFunctions[faceScaleEase] }
        } : { duration: 0 }}
      />
    </div>
  );
}

function Layer20Mobile({ 
  animationDistance = 150, 
  animationDuration = 1.2,
  randomness = 0.5,
  group2Distance = 800,
  group1Distance = 800,
  linesEase = "easeOut",
  animationOn = true
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationOn ? 100 : 0);
    return () => clearTimeout(timer);
  }, [animationOn]);

  // Create staggered line animations with randomness
  const lineVariants = {
    hidden: (i) => {
      // If animation is off, start from the final state
      if (!animationOn) {
        return {
          y: 0,
          opacity: 1,
          pathLength: 1,
          pathOffset: 0
        };
      }
      
      const { startOffsetY } = getRandomAnimationProps(i, randomness);
      const distanceMultiplier = 1 + startOffsetY;
      return { 
        y: -group2Distance * distanceMultiplier, 
        opacity: 0,
        pathLength: 0,
        pathOffset: 1
      };
    },
    visible: (i) => {
      const { speedVariation, delayVariation } = getRandomAnimationProps(i, randomness);
      return {
        y: 0,
        opacity: 1,
        pathLength: 1,
        pathOffset: 0,
        transition: animationOn ? { 
          pathLength: { 
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: easingFunctions[linesEase]
          },
          pathOffset: { 
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: easingFunctions[linesEase]
          },
          y: {
            delay: delayVariation,
            duration: animationDuration * speedVariation * 0.8,
            ease: easingFunctions[linesEase]
          },
          opacity: {
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: [0.2, 0.6, 0.4, 1]
          }
        } : { duration: 0 } // No animation when animationOn is false
      };
    }
  };

  const lineVariants2 = {
    hidden: (i) => {
      // If animation is off, start from the final state
      if (!animationOn) {
        return {
          y: 0,
          opacity: 1,
          pathLength: 1,
          pathOffset: 0
        };
      }
      
      const { startOffsetY } = getRandomAnimationProps(i + 100, randomness);
      const distanceMultiplier = 1 + startOffsetY;
      return { 
        y: group1Distance * distanceMultiplier, 
        opacity: 0,
        pathLength: 0,
        pathOffset: 1
      };
    },
    visible: (i) => {
      const { speedVariation, delayVariation } = getRandomAnimationProps(i + 100, randomness);
      return {
        y: 0,
        opacity: 1,
        pathLength: 1,
        pathOffset: 0,
        transition: animationOn ? { 
          pathLength: { 
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: easingFunctions[linesEase]
          },
          pathOffset: { 
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: easingFunctions[linesEase]
          },
          y: {
            delay: delayVariation,
            duration: animationDuration * speedVariation * 0.8,
            ease: easingFunctions[linesEase]
          },
          opacity: {
            delay: delayVariation,
            duration: animationDuration * speedVariation,
            ease: [0.2, 0.6, 0.4, 1]
          }
        } : { duration: 0 } // No animation when animationOn is false
      };
    }
  };

  return (
    <div className="relative size-full" data-name="Layer 20">
      <div className="absolute inset-0">
        <svg
          className="block size-full overflow-visible"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 371 374"
          style={{ overflow: "visible" }}
        >
          <g id="Layer 20">
            <g id="Group2">
              {Array.from({ length: 19 }).map((_, i) => {
                const pathProps = {
                  stroke: "var(--stroke-0, #EEBA05)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 6,
                  initial: "hidden",
                  animate: isVisible ? "visible" : "hidden",
                  variants: lineVariants,
                  custom: i,
                };

                const svgPathKeys = [
                  'p3c0a3a00',
                  'pdd96b00',
                  'p215ff0c0',
                  'p639fb00',
                  'p2fff7a80',
                  'p2bdf8c70',
                  'p1f9ae780',
                  'p11007480',
                  'p165aeb00',
                  'p32c9a900',
                  'pafab40',
                  'p329c4a00',
                  'p304db1c0',
                  'p15112096',
                  'p28960800',
                  'p9c8e300',
                  'p3f009b00',
                  'p68c5100',
                  'p19d9bb00'
                ];
                
                return (
                  <motion.path
                    key={`mobile_vector_${i}`}
                    id={`Vector${i === 0 ? '' : '_' + i}`}
                    d={svgPaths[svgPathKeys[i]]}
                    {...pathProps}
                  />
                );
              })}
            </g>
            <g id="Group1">
              {Array.from({ length: 19 }).map((_, i) => {
                const pathProps = {
                  stroke: "var(--stroke-0, #EEBA05)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 6,
                  initial: "hidden",
                  animate: isVisible ? "visible" : "hidden",
                  variants: lineVariants2,
                  custom: i,
                };

                const svgPathKeys = [
                  'p1394ff40',
                  'p24332b00',
                  'pf211a00',
                  'p36fb9e80',
                  'p24afcc00',
                  'p1672e00',
                  'p2ed5e7a0',
                  'p1bd5ae00',
                  'p2df5b880',
                  'p28c677e8',
                  'pb116c80',
                  'p880f88',
                  'pf0dca00',
                  'p3d646560',
                  'p30872600',
                  'pcac3880',
                  'p321ad380',
                  'p2c981340',
                  'p25cd8240'
                ];
                
                return (
                  <motion.path
                    key={`mobile_vector2_${i + 20}`}
                    id={`Vector_${i + 20}`}
                    d={svgPaths[svgPathKeys[i]]}
                    {...pathProps}
                  />
                );
              })}
            </g>
            <g id="Circle"></g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function AvatarMobile({ 
  animationDistance = 150, 
  animationDuration = 1.2,
  randomness = 0.5,
  group2Distance = 800,
  group1Distance = 800,
  linesEase = "easeOut",
  faceStartScale = 0.8,
  faceEndScale = 1,
  faceScaleDuration = 0.8,
  faceScaleDelay = 0.8,
  faceOpacityDuration = 0.8,
  faceOpacityDelay = 0.8,
  faceScaleEase = "easeOut",
  animationOn = true
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);

  // Recalculate on resize to match viewport width
  useEffect(() => {
    const updateScale = () => {
      const vw = typeof window !== "undefined" ? window.innerWidth : 430;
      setScaleFactor(vw >= 430 ? 1 : vw / 430);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationOn ? 100 : 0);
    return () => clearTimeout(timer);
  }, [animationOn]);

  // Calculate proper dimensions
  const wrapperWidth = 375;
  const wrapperHeight = 371.042;

  // Adjust face scale to 0.9x as requested
  const adjustedFaceEndScale = faceEndScale * 0.9;

  return (
    <div
      className="relative"
      style={{
        width: `${wrapperWidth}px`,
        height: `${wrapperHeight}px`,
        transform: `scale(${scaleFactor})`,
        transformOrigin: "center"
      }}
      data-name="Avatar"
    >
      <div
        className="absolute inset-0"
        data-name="Lines"
      >
        <div className="absolute flex inset-0 items-center justify-center">
          <div className="flex-none h-[371.042px] rotate-[45deg] w-[375px] overflow-visible">
            <Layer20Desktop 
              animationDistance={animationDistance} 
              animationDuration={animationDuration}
              randomness={randomness}
              group2Distance={group2Distance}
              group1Distance={group1Distance}
              linesEase={linesEase}
              animationOn={animationOn}
            />
          </div>
        </div>
      </div>
      <motion.div
        className="absolute bg-center bg-cover bg-no-repeat inset-0"
        data-name="Osama"
        style={{ 
          backgroundImage: `url('${img}')`,
          transformOrigin: "center" 
        }}
        initial={animationOn ? { opacity: 0, scale: faceStartScale } : { opacity: 1, scale: adjustedFaceEndScale }}
        animate={isVisible ? { opacity: 1, scale: adjustedFaceEndScale } : { opacity: 0, scale: faceStartScale }}
        transition={animationOn ? { 
          opacity: { duration: faceOpacityDuration, delay: faceOpacityDelay },
          scale: { duration: faceScaleDuration, delay: faceScaleDelay, ease: easingFunctions[faceScaleEase] }
        } : { duration: 0 }}
      />
    </div>
  );
}

function Avatar({ 
  animationDistance = 200, 
  animationDuration = 1.2,
  randomness = 0.5,
  group2Distance = 800,
  group1Distance = 800,
  linesEase = "easeOut",
  faceStartScale = 0.8,
  faceEndScale = 1,
  faceScaleDuration = 0.8,
  faceScaleDelay = 0.8,
  faceOpacityDuration = 0.8,
  faceOpacityDelay = 0.8,
  faceScaleEase = "easeOut",
  animationOn = true
}) {
  const { width } = useActiveBreakpoint();
  if (width < 800) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <AvatarMobile 
          animationDistance={animationDistance} 
          animationDuration={animationDuration}
          randomness={randomness}
          faceStartScale={faceStartScale}
          faceEndScale={faceEndScale}
          faceScaleDuration={faceScaleDuration}
          faceScaleDelay={faceScaleDelay}
          faceOpacityDuration={faceOpacityDuration}
          faceOpacityDelay={faceOpacityDelay}
          faceScaleEase={faceScaleEase}
          group2Distance={group2Distance}
          group1Distance={group1Distance}
          linesEase={linesEase}
          animationOn={animationOn}
        />
      </div>
    );
  }
  // Tablet detection (apply 1.5× face size between 800px and 1279px)
  const isTablet = width >= 800 && width < 1280;
  const adjustedFaceStart = faceStartScale * (isTablet ? 1.5 : 1);
  // Apply 0.9x factor to face end scale for desktop/tablet too
  const adjustedFaceEnd = faceEndScale * (isTablet ? 1.5 : 1) * 0.9;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <AvatarDesktop 
        animationDistance={animationDistance} 
        animationDuration={animationDuration}
        randomness={randomness}
        faceStartScale={adjustedFaceStart}
        faceEndScale={adjustedFaceEnd}
        faceScaleDuration={faceScaleDuration}
        faceScaleDelay={faceScaleDelay}
        faceOpacityDuration={faceOpacityDuration}
        faceOpacityDelay={faceOpacityDelay}
        faceScaleEase={faceScaleEase}
        group2Distance={group2Distance}
        group1Distance={group1Distance}
        linesEase={linesEase}
        animationOn={animationOn}
      />
    </div>
  );
}

export default Avatar;

defineProperties(Avatar, {
  animationOn: {
    label: "Animation On",
    type: "boolean",
    defaultValue: true
  },
  animationDistance: {
    label: "Animation distance",
    type: "number",
    defaultValue: 200
  },
  animationDuration: {
    label: "Animation duration",
    type: "number",
    defaultValue: 1.2
  },
  randomness: {
    label: "Animation randomness",
    type: "number",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 0.5
  },
  group2Distance: {
    label: "Group 2 start distance",
    type: "number",
    control: "slider",
    min: 200,
    max: 3000,
    step: 100,
    defaultValue: 800
  },
  group1Distance: {
    label: "Group 1 start distance",
    type: "number",
    control: "slider",
    min: 200,
    max: 3000,
    step: 100,
    defaultValue: 800
  },
  linesEase: {
    type: "string",
    control: "select",
    options: [
      { value: "linear", label: "Linear" },
      { value: "easeOut", label: "Ease Out" },
      { value: "easeIn", label: "Ease In" },
      { value: "easeInOut", label: "Ease In Out" },
      { value: "bounceOut", label: "Bounce Out" },
      { value: "overshoot", label: "Overshoot" },
      { value: "anticipate", label: "Anticipate" },
    ],
    label: "Lines Animation Easing",
    defaultValue: "easeOut",
  },
  faceStartScale: {
    label: "Face start scale",
    type: "number",
    defaultValue: 0.8
  },
  faceScaleDuration: {
    label: "Face scale duration",
    type: "number",
    defaultValue: 0.8
  },
  faceScaleDelay: {
    label: "Face scale delay",
    type: "number",
    defaultValue: 0.8
  },
  faceOpacityDuration: {
    label: "Face opacity duration",
    type: "number",
    defaultValue: 0.8
  },
  faceOpacityDelay: {
    label: "Face opacity delay",
    type: "number",
    defaultValue: 0.8
  },
  faceEndScale: {
    label: "Face end scale (1 = 100%)",
    type: "number",
    defaultValue: 1
  },
  faceScaleEase: {
    type: "string",
    control: "select",
    options: [
      { value: "linear", label: "Linear" },
      { value: "easeOut", label: "Ease Out" },
      { value: "easeIn", label: "Ease In" },
      { value: "easeInOut", label: "Ease In Out" },
      { value: "bounceOut", label: "Bounce Out" },
      { value: "overshoot", label: "Overshoot" },
      { value: "anticipate", label: "Anticipate" },
    ],
    label: "Face Scale Easing",
    defaultValue: "easeOut",
  }
});
