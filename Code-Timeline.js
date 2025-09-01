import { imgTopStroke, imgDot, imgBottomStroke, imgBottomStroke1, imgDot1, imgBottomStroke2, imgBottomStroke3, img, img1, img2, img3, img4, img5, img6, img7 } from "./svg-oxh9d";
import { useActiveBreakpoint, defineProperties } from "figma:react";
import { useState, useRef, useCallback, useMemo, memo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

// Education icon SVG component
const EducationIcon = memo(({ color = "#000000", size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 3L33 11.5V12.5L18 21L3 12.5V11.5L18 3Z" stroke={color} strokeWidth="2"/>
    <path d="M9 14V24.5C9 24.5 12.5 28 18 28C23.5 28 27 24.5 27 24.5V14" stroke={color} strokeWidth="2"/>
    <rect x="17" y="21" width="2" height="12" fill={color}/>
    <path d="M13 33H23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
));

interface ComponentsTimelinePositionProps {
  isExpanded?: "no" | "yes";
  isHovered?: "no" | "yes";
  isHighlightedByMarker?: boolean; // New prop to indicate if highlighted by a map marker
  breakpoint?: "desktop" | "mobile";
  blackColor?: string;
  amberColor?: string;
  date?: string;
  title?: string;
  institute?: string;
  location?: string;
  details?: string;
  positionId?: number;
  totalPositions?: number;
  customIconUrl?: string;
  mobileFontSize?: number;
  animationSpeed?: number;
  randomnessFactor?: number;
  onPositionClick?: (id: number) => void;
  onPositionHover?: (id: number | null) => void;
}

const ComponentsTimelinePosition = memo(function ComponentsTimelinePosition({ 
  isExpanded = "no", 
  isHovered = "no", 
  isHighlightedByMarker = false, // New prop with default false
  breakpoint = "desktop",
  blackColor = "#000000",
  amberColor = "#EEBA05",
  date = "Mar 2025 - Sep 2025",
  title = "Product Designer",
  institute = "Felixheck Design",
  location = "Munich, Germany",
  details = "Details",
  positionId,
  totalPositions = 14,
  customIconUrl,
  mobileFontSize = 12,
  animationSpeed = 1,
  randomnessFactor = 5,
  onPositionClick,
  onPositionHover
}: ComponentsTimelinePositionProps) {
  
  const handleClick = useCallback(() => {
    if (onPositionClick && positionId !== undefined) {
      onPositionClick(positionId);
    }
  }, [onPositionClick, positionId]);

  const handleMouseEnter = useCallback(() => {
    if (onPositionHover && positionId !== undefined) {
      onPositionHover(positionId);
    }
  }, [onPositionHover, positionId]);

  const handleMouseLeave = useCallback(() => {
    if (onPositionHover) {
      onPositionHover(null);
    }
  }, [onPositionHover]);

  // Check if this position should show the education icon
  const showEducationIcon = positionId === 8 || positionId === 12;
  // Decide icon size based on breakpoint
  const iconSize = breakpoint === "mobile" ? 24 : 36;

  // If a custom icon URL is provided, we turn the graphic into a mask so we can tint it
  const IconElement = useMemo(() => {
    if (customIconUrl) {
      return (
        <div
          aria-label="education icon"
          style={{
            width: iconSize,
            height: iconSize,
            backgroundColor: isExpanded === "yes" ? amberColor : blackColor,
            WebkitMaskImage: `url(${customIconUrl})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
            maskImage: `url(${customIconUrl})`,
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center"
          }}
        />
      );
    } else {
      return <EducationIcon color={isExpanded === "yes" ? amberColor : blackColor} size={iconSize} />;
    }
  }, [customIconUrl, iconSize, isExpanded, amberColor, blackColor]);

  // make top stroke transparent for position 1 while keeping space
  const topStrokeStyle = positionId === 1 ? { opacity: 0 } : undefined;
  
  // make bottom stroke transparent for the last position while keeping space
  const bottomStrokeStyle = positionId === totalPositions ? { opacity: 0 } : undefined;
  
  // Animation settings
  const transitionSettings = {
    duration: 0.25 / animationSpeed,
    ease: "easeOut"
  };
  
  // New special case for highlighted-by-marker state (similar to hover but with amber title)
  if (isHighlightedByMarker && isExpanded === "no" && breakpoint === "desktop") {
    return (
      <div 
        className="content-stretch flex gap-3 items-start justify-start relative size-full cursor-pointer" 
        data-name="is-highlighted-by-marker, is expanded=no, breakpoint=desktop"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="box-border content-stretch flex gap-2.5 h-9 items-center justify-end pb-0 pt-1.5 px-0 relative shrink-0 w-[155px]" data-name="Date">
          <div className="flex flex-col font-['Manrope:ExtraLight',_sans-serif] font-extralight justify-center leading-[0] relative shrink-0 text-nowrap text-right" style={{ color: blackColor, fontSize: '16px' }}>
            <p className="leading-[1.5] whitespace-pre">{date}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-px items-center justify-center relative self-stretch shrink-0" data-name="indicator">
          <div className="h-[19px] relative shrink-0 w-0.5" data-name="Top (Stroke)" style={topStrokeStyle}>
            <img className="block max-w-none size-full" src={imgTopStroke} />
          </div>
          <div className="relative shrink-0 size-2" data-name="dot">
            <img className="block max-w-none size-full" src={imgDot} />
          </div>
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-0.5" data-name="bottom (Stroke)" style={bottomStrokeStyle}>
            <img className="block max-w-none size-full" src={imgBottomStroke} />
          </div>
        </div>
        <div className="basis-0 content-stretch flex gap-1 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Text">
          <div className="flex items-center">
            {showEducationIcon && <div className="mr-2">{IconElement}</div>}
            <div className="flex flex-col font-['Manrope:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-nowrap" style={{ color: amberColor, fontSize: '24px' }}>
              <p className="leading-[1.5] whitespace-pre">{title}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Also handle mobile highlighted state
  if (isHighlightedByMarker && isExpanded === "no" && breakpoint === "mobile") {
    return (
      <div 
        className="content-stretch flex gap-3 items-center justify-start relative size-full cursor-pointer" 
        data-name="is-highlighted-by-marker, is expanded=no, breakpoint=mobile"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="box-border content-stretch flex gap-2.5 h-[23px] items-start justify-end pb-0 pt-1 px-0 relative shrink-0 w-16">
          <div className="flex flex-col font-['Manrope:ExtraLight',_sans-serif] font-extralight justify-center leading-[1.5] relative shrink-0 text-right w-full" style={{ color: blackColor, fontSize: '10px' }}>
            <p className="mb-0">{date.split(' - ')[0]}</p>
            <p>{date.split(' - ')[1]}</p>
          </div>
        </div>
        <div className="flex flex-row items-center self-stretch">
          <div className="content-stretch flex flex-col gap-px h-full items-center justify-start relative shrink-0" data-name="indicator">
            <div className="h-[11px] relative shrink-0 w-0.5" data-name="Top (Stroke)" style={topStrokeStyle}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
                <path d="M2 0V11H0V0H2Z" fill={blackColor} id="Top (Stroke)" />
              </svg>
            </div>
            <div className="relative shrink-0 size-1.5" data-name="dot">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                <circle cx="3" cy="3" fill={blackColor} r="3" />
              </svg>
            </div>
            <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-0.5" data-name="bottom (Stroke)" style={bottomStrokeStyle}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 100">
                <path d="M2 0V100H0V0H2Z" fill={blackColor} id="bottom (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="basis-0 content-stretch flex gap-0.5 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Text">
          <div className="flex items-center">
            {showEducationIcon && <div className="mr-2">{IconElement}</div>}
            <div className="basis-0 flex flex-col font-['Manrope:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[15px]" style={{ color: amberColor }}>
              <p className="leading-[1.5]">{title}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Original states follow
  if (isExpanded === "no" && isHovered === "yes" && breakpoint === "desktop") {
    return (
      <div 
        className="content-stretch flex gap-3 items-start justify-start relative size-full cursor-pointer" 
        data-name="is expanded=no, is hovered=yes, breakpoint=desktop"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="box-border content-stretch flex gap-2.5 h-9 items-center justify-end pb-0 pt-1.5 px-0 relative shrink-0 w-[155px]" data-name="Date">
          <div className="flex flex-col font-['Manrope:ExtraLight',_sans-serif] font-extralight justify-center leading-[0] relative shrink-0 text-nowrap text-right" style={{ color: blackColor, fontSize: '16px' }}>
            <p className="leading-[1.5] whitespace-pre">{date}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-px items-center justify-center relative self-stretch shrink-0" data-name="indicator">
          <div className="h-[19px] relative shrink-0 w-0.5" data-name="Top (Stroke)" style={topStrokeStyle}>
            <img className="block max-w-none size-full" src={imgTopStroke} />
          </div>
          <div className="relative shrink-0 size-2" data-name="dot">
            <img className="block max-w-none size-full" src={imgDot} />
          </div>
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-0.5" data-name="bottom (Stroke)" style={bottomStrokeStyle}>
            <img className="block max-w-none size-full" src={imgBottomStroke} />
          </div>
        </div>
        <div className="basis-0 content-stretch flex gap-1 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Text">
          <div className="flex items-center">
            {showEducationIcon && <div className="mr-2">{IconElement}</div>}
            <div className="flex flex-col font-['Manrope:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-nowrap" style={{ color: blackColor, fontSize: '24px' }}>
              <p className="leading-[1.5] whitespace-pre">{title}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isExpanded === "yes" && isHovered === "no" && breakpoint === "desktop") {
    return (
      <motion.div 
        className="content-stretch flex gap-3 items-start justify-start relative size-full cursor-pointer" 
        data-name="is expanded=yes, is hovered=no, breakpoint=desktop"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ height: "auto" }}
        animate={{ height: "auto" }}
        transition={transitionSettings}
      >
        {/* Static elements - Date */}
        <div className="box-border content-stretch flex gap-2.5 h-9 items-center justify-end pb-0 pt-1.5 px-0 relative shrink-0 w-[155px]" data-name="Date">
          <div className="flex flex-col font-['Manrope:ExtraLight',_sans-serif] font-extralight justify-center leading-[0] relative shrink-0 text-nowrap text-right" style={{ color: blackColor, fontSize: '16px' }}>
            <p className="leading-[1.5] whitespace-pre">{date}</p>
          </div>
        </div>
        
        {/* Static elements - Timeline indicator */}
        <div className="content-stretch flex flex-col gap-px items-center justify-center relative self-stretch shrink-0" data-name="indicator">
          <div className="h-[19px] relative shrink-0 w-0.5" data-name="Top (Stroke)" style={topStrokeStyle}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 19">
              <path d="M2 0V19H0V0H2Z" fill={blackColor} id="Top (Stroke)" />
            </svg>
          </div>
          <div className="relative shrink-0 size-2" data-name="dot">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill={amberColor} id="dot" r="4" />
            </svg>
          </div>
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-0.5" data-name="bottom (Stroke)" style={bottomStrokeStyle}>
            <img className="block max-w-none size-full" src={imgBottomStroke1} />
          </div>
        </div>
        
        {/* Text content container */}
        <div className="basis-0 content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Text">
          {/* Static title */}
          <div className="content-stretch flex gap-0 items-start justify-start relative shrink-0 w-full" data-name="Title">
            <div className="flex items-center">
              {showEducationIcon && <div className="mr-2">{IconElement}</div>}
              <div className="basis-0 flex flex-col font-['Manrope:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[24px]" style={{ color: amberColor }}>
                <p className="leading-[1.5]">{title}</p>
              </div>
            </div>
          </div>
          
          {/* Animated content */}
          <motion.div 
            className="w-full overflow-hidden" 
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={transitionSettings}
          >
            <motion.div 
              key="institute"
              className="flex flex-col font-['Manrope:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[24px] w-full" 
              style={{ color: blackColor }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.1 / animationSpeed }}
            >
              <p className="leading-[1.5]">{institute}</p>
            </motion.div>
            <motion.div 
              key="location"
              className="flex flex-col font-['Manrope:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] w-full" 
              style={{ color: blackColor }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.2 / animationSpeed }}
            >
              <p className="leading-[1.5]">{location}</p>
            </motion.div>
            <motion.div 
              key="details"
              className="flex flex-col font-['Manrope:ExtraLight',_sans-serif] font-extralight justify-center leading-[0] relative shrink-0 text-[16px] w-full" 
              style={{ color: blackColor }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.3 / animationSpeed }}
            >
              <p className="leading-[1.5] mt-[8px] mr-[0px] mb-[16px] ml-[0px]">{details}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
  if (isExpanded === "no" && isHovered === "no" && breakpoint === "mobile") {
    return (
      <div 
        className="content-stretch flex gap-3 items-center justify-start relative size-full cursor-pointer" 
        data-name="is expanded=no, is hovered=no, breakpoint=mobile"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-[23px] shrink-0 w-16" data-name="Placeholder" />
        <div className="flex flex-row items-center self-stretch">
          <div className="content-stretch flex flex-col gap-px h-full items-center justify-start relative shrink-0" data-name="indicator">
            <div className="h-[11px] relative shrink-0 w-0.5" data-name="Top (Stroke)" style={topStrokeStyle}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
                <path d="M2 0V11H0V0H2Z" fill={blackColor} id="Top (Stroke)" />
              </svg>
            </div>
            <div className="relative shrink-0 size-1.5" data-name="dot">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                <circle cx="3" cy="3" fill={blackColor} r="3" />
              </svg>
            </div>
            <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-0.5" data-name="bottom (Stroke)" style={bottomStrokeStyle}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 100">
                <path d="M2 0V100H0V0H2Z" fill={blackColor} id="bottom (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="basis-0 content-stretch flex gap-0.5 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Text">
          <div className="flex items-center">
            {showEducationIcon && <div className="mr-2">{IconElement}</div>}
            <div className="basis-0 flex flex-col font-['Manrope:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[15px]" style={{ color: blackColor }}>
              <p className="leading-[1.5]">{title}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isExpanded === "no" && isHovered === "yes" && breakpoint === "mobile") {
    return (
      <div 
        className="content-stretch flex gap-3 items-center justify-start relative size-full cursor-pointer" 
        data-name="is expanded=no, is hovered=yes, breakpoint=mobile"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="box-border content-stretch flex gap-2.5 h-[23px] items-start justify-end pb-0 pt-1 px-0 relative shrink-0 w-16">
          <div className="flex flex-col font-['Manrope:ExtraLight',_sans-serif] font-extralight justify-center leading-[1.5] relative shrink-0 text-right w-full" style={{ color: blackColor, fontSize: '10px' }}>
            <p className="mb-0">{date.split(' - ')[0]}</p>
            <p>{date.split(' - ')[1]}</p>
          </div>
        </div>
        <div className="flex flex-row items-center self-stretch">
          <div className="content-stretch flex flex-col gap-px h-full items-center justify-start relative shrink-0" data-name="indicator">
            <div className="h-[11px] relative shrink-0 w-0.5" data-name="Top (Stroke)" style={topStrokeStyle}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
                <path d="M2 0V11H0V0H2Z" fill={blackColor} id="Top (Stroke)" />
              </svg>
            </div>
            <div className="relative shrink-0 size-1.5" data-name="dot">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                <circle cx="3" cy="3" fill={blackColor} r="3" />
              </svg>
            </div>
            <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-0.5" data-name="bottom (Stroke)" style={bottomStrokeStyle}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 100">
                <path d="M2 0V100H0V0H2Z" fill={blackColor} id="bottom (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="basis-0 content-stretch flex gap-0.5 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Text">
          <div className="flex items-center">
            {showEducationIcon && <div className="mr-2">{IconElement}</div>}
            <div className="basis-0 flex flex-col font-['Manrope:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[15px]" style={{ color: blackColor }}>
              <p className="leading-[1.5]">{title}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isExpanded === "yes" && isHovered === "no" && breakpoint === "mobile") {
    return (
      <motion.div 
        className="content-stretch flex gap-3 items-start justify-start relative size-full cursor-pointer" 
        data-name="is expanded=yes, is hovered=no, breakpoint=mobile"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ height: "auto" }}
        animate={{ height: "auto" }}
        transition={transitionSettings}
      >
        {/* Static elements - Date */}
        <div className="box-border content-stretch flex gap-2.5 items-start justify-end pb-0 pt-1 px-0 relative shrink-0 w-16">
          <div className="flex flex-col font-['Manrope:ExtraLight',_sans-serif] font-extralight justify-center leading-[1.5] relative shrink-0 text-right w-full" style={{ color: blackColor, fontSize: '10px' }}>
            <p className="mb-0">{date.split(' - ')[0]}</p>
            <p>{date.split(' - ')[1]}</p>
          </div>
        </div>
        
        {/* Static elements - Timeline indicator */}
        <div className="content-stretch flex flex-col gap-px items-center justify-center relative self-stretch shrink-0" data-name="indicator">
          <div className="h-[11px] relative shrink-0 w-0.5" data-name="Top (Stroke)" style={topStrokeStyle}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
              <path d="M2 0V11H0V0H2Z" fill={blackColor} id="Top (Stroke)" />
            </svg>
          </div>
          <div className="relative shrink-0 size-1.5" data-name="dot">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
              <circle cx="3" cy="3" fill={amberColor} id="dot" r="3" />
            </svg>
          </div>
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-0.5" data-name="bottom (Stroke)" style={bottomStrokeStyle}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 100">
              <path d="M2 0V100H0V0H2Z" fill={blackColor} id="bottom (Stroke)" />
            </svg>
          </div>
        </div>
        
        {/* Text content container */}
        <div className="basis-0 content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Text">
          {/* Static title */}
          <div className="content-stretch flex gap-0 items-center justify-start relative shrink-0 w-full">
            <div className="flex items-center">
              {showEducationIcon && <div className="mr-2">{IconElement}</div>}
              <div className="basis-0 flex flex-col font-['Manrope:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[15px]" style={{ color: amberColor }}>
                <p className="leading-[1.5]">{title}</p>
              </div>
            </div>
          </div>
          
          {/* Animated content */}
          <motion.div 
            className="w-full overflow-hidden" 
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={transitionSettings}
          >
            <motion.div 
              key="institute-mobile"
              className="flex flex-col font-['Manrope:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] w-full" 
              style={{ color: blackColor }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.1 / animationSpeed }}
            >
              <p className="leading-[1.5]">{institute}</p>
            </motion.div>
            <motion.div 
              key="location-mobile"
              className="flex flex-col font-['Manrope:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 w-full" 
              style={{ color: blackColor, fontSize: `${mobileFontSize}px` }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.2 / animationSpeed }}
            >
              <p className="leading-[1.5]">{location}</p>
            </motion.div>
            <motion.div 
              key="details-mobile"
              className="flex flex-col font-['Manrope:ExtraLight',_sans-serif] font-extralight justify-center leading-[0] relative shrink-0 w-full" 
              style={{ color: blackColor, fontSize: `${mobileFontSize}px` }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSettings, delay: 0.3 / animationSpeed }}
            >
              <p className="leading-[1.5] my-[8px] mx-[0px] mt-[4px] mr-[0px] mb-[8px] ml-[0px]">{details}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
  return (
    <div 
      className="content-stretch flex gap-3 items-center justify-start relative size-full cursor-pointer" 
      data-name="is expanded=no, is hovered=no, breakpoint=desktop"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-9 shrink-0 w-[155px]" data-name="Placeholder" />
      <div className="flex flex-row items-center self-stretch">
        <div className="content-stretch flex flex-col gap-px h-full items-center justify-start relative shrink-0" data-name="indicator">
          <div className="h-[19px] relative shrink-0 w-0.5" data-name="Top (Stroke)" style={topStrokeStyle}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 19">
              <path d="M2 0V19H0V0H2Z" fill={blackColor} id="Top (Stroke)" />
            </svg>
          </div>
          <div className="relative shrink-0 size-2" data-name="dot">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill={blackColor} r="4" />
            </svg>
          </div>
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-0.5" data-name="bottom (Stroke)" style={bottomStrokeStyle}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 100">
              <path d="M2 0V100H0V0H2Z" fill={blackColor} id="bottom (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="basis-0 content-stretch flex gap-1 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Text">
        <div className="flex items-center">
          {showEducationIcon && <div className="mr-2">{IconElement}</div>}
          <div className="flex flex-col font-['Manrope:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-nowrap" style={{ color: blackColor, fontSize: '24px' }}>
            <p className="leading-[1.5] whitespace-pre">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

interface TimelineMapProps {
  breakpoint?: "mobile" | "desktop" | "tablet";
  blackColor?: string;
  amberColor?: string;
  customIconUrl?: string;
  mobileFontSize?: number;
  animationSpeed?: number;
  randomnessFactor?: number;
  parallaxIntensity?: number; // Controls the intensity of parallax effect
  parallaxEndPoint?: number; // Controls when the parallax effect completes (0.1-0.9)
  fadeDuringParallax?: boolean; // Toggle opacity change during parallax
  dotDelay?: number; // base delay before dot animation
  dotDuration?: number; // duration of dot bounce animation
  autoExpandFirstOnMobile?: boolean; // New prop to control auto expansion on mobile
  autoExpandDelay?: number; // New prop for controlling delay before auto expansion
  position1Date?: string;
  position1Title?: string;
  position1Institute?: string;
  position1Location?: string;
  position1Details?: string;
  position2Date?: string;
  position2Title?: string;
  position2Institute?: string;
  position2Location?: string;
  position2Details?: string;
  position3Date?: string;
  position3Title?: string;
  position3Institute?: string;
  position3Location?: string;
  position3Details?: string;
  position4Date?: string;
  position4Title?: string;
  position4Institute?: string;
  position4Location?: string;
  position4Details?: string;
  position5Date?: string;
  position5Title?: string;
  position5Institute?: string;
  position5Location?: string;
  position5Details?: string;
  position6Date?: string;
  position6Title?: string;
  position6Institute?: string;
  position6Location?: string;
  position6Details?: string;
  position7Date?: string;
  position7Title?: string;
  position7Institute?: string;
  position7Location?: string;
  position7Details?: string;
  position8Date?: string;
  position8Title?: string;
  position8Institute?: string;
  position8Location?: string;
  position8Details?: string;
  position9Date?: string;
  position9Title?: string;
  position9Institute?: string;
  position9Location?: string;
  position9Details?: string;
  position10Date?: string;
  position10Title?: string;
  position10Institute?: string;
  position10Location?: string;
  position10Details?: string;
  position11Date?: string;
  position11Title?: string;
  position11Institute?: string;
  position11Location?: string;
  position11Details?: string;
  position12Date?: string;
  position12Title?: string;
  position12Institute?: string;
  position12Location?: string;
  position12Details?: string;
  position13Date?: string;
  position13Title?: string;
  position13Institute?: string;
  position13Location?: string;
  position13Details?: string;
  position14Date?: string;
  position14Title?: string;
  position14Institute?: string;
  position14Location?: string;
  position14Details?: string;
  numPositions?: number;
}

// Location mapping lookup table for faster checks
const LOCATION_MAPPING = {
  "Japan": [14, 13],
  "Egypt": [13, 12, 11, 10, 9, 5],
  "USA": [12],
  "UK": [8, 3],
  "Korea": [7],
  "Germany": [4, 2, 1],
};

const TimelineMap = memo(function TimelineMap({ 
  breakpoint = "desktop", 
  blackColor = "#000000", 
  amberColor = "#EEBA05",
  customIconUrl,
  mobileFontSize = 12,
  animationSpeed = 1,
  randomnessFactor = 5,
  parallaxIntensity = 5, // Default parallax intensity (mid-range)
  parallaxEndPoint = 0.3, // Default parallax end point (30% of scroll)
  fadeDuringParallax = true, // Whether map fades in with parallax
  dotDelay = 0.5, // base delay in seconds for dot animation start
  dotDuration = 0.6, // duration of dot animation
  autoExpandFirstOnMobile = true, // Auto expand first position on mobile view
  autoExpandDelay = 0.5, // Delay in seconds before auto expanding
  position1Date = "Mar 2025 - Sep 2025",
  position1Title = "Product Designer",
  position1Institute = "Felixheck Design",
  position1Location = "Munich, Germany",
  position1Details = "Details",
  position2Date = "Jan 2024 - Feb 2025",
  position2Title = "UX Designer",
  position2Institute = "Creative Agency",
  position2Location = "London, UK",
  position2Details = "Details",
  position3Date = "May 2023 - Dec 2023",
  position3Title = "UI Designer",
  position3Institute = "Tech Startup",
  position3Location = "Berlin, Germany",
  position3Details = "Details",
  position4Date = "Aug 2022 - Apr 2023",
  position4Title = "Graphic Designer",
  position4Institute = "Design Studio",
  position4Location = "Paris, France",
  position4Details = "Details",
  position5Date = "Feb 2022 - Jul 2022",
  position5Title = "Design Intern",
  position5Institute = "Fashion Brand",
  position5Location = "Milan, Italy",
  position5Details = "Details",
  position6Date = "Jan 2021 - Jan 2022",
  position6Title = "Junior Designer",
  position6Institute = "Marketing Agency",
  position6Location = "Barcelona, Spain",
  position6Details = "Details",
  position7Date = "Sep 2020 - Dec 2020",
  position7Title = "Design Freelancer",
  position7Institute = "Self-employed",
  position7Location = "Remote",
  position7Details = "Details",
  position8Date = "Feb 2020 - Aug 2020",
  position8Title = "Research Assistant",
  position8Institute = "University Design Lab",
  position8Location = "Copenhagen, Denmark",
  position8Details = "Details",
  position9Date = "Aug 2019 - Jan 2020",
  position9Title = "Exchange Student",
  position9Institute = "Design Academy",
  position9Location = "Stockholm, Sweden",
  position9Details = "Details",
  position10Date = "Sep 2017 - Jul 2019",
  position10Title = "Bachelor's Degree",
  position10Institute = "Design University",
  position10Location = "Amsterdam, Netherlands",
  position10Details = "Details",
  position11Date = "May 2016 - Aug 2017",
  position11Title = "Gap Year",
  position11Institute = "Travel & Volunteering",
  position11Location = "Southeast Asia",
  position11Details = "Details",
  position12Date = "Sep 2013 - Apr 2016",
  position12Title = "High School",
  position12Institute = "International School",
  position12Location = "Vienna, Austria",
  position12Details = "Details",
  position13Date = "Sep 2010 - Jun 2013",
  position13Title = "Middle School",
  position13Institute = "European School",
  position13Location = "Brussels, Belgium",
  position13Details = "Details",
  position14Date = "Mar 1986",
  position14Title = "Born",
  position14Institute = "",
  position14Location = "Fukuoka, Japan",
  position14Details = "",
  numPositions = 14
}: TimelineMapProps) {
  const [expandedPosition, setExpandedPosition] = useState<number | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);
  const [mapAnimationComplete, setMapAnimationComplete] = useState(false);
  // Track if markers have already been revealed - only animate them once
  const [markersRevealed, setMarkersRevealed] = useState(false);
  // New state to track highlighted location
  const [highlightedLocation, setHighlightedLocation] = useState<string | null>(null);
  // Flag to track if auto-expand has already been triggered
  const [autoExpandTriggered, setAutoExpandTriggered] = useState(false);
  
  // Reference for the component to track scroll position
  const componentRef = useRef<HTMLDivElement>(null);
  // Reference for the timeline section specifically (for auto-expand)
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Clamp parallaxEndPoint between 0.1 and 0.9
  const safeParallaxEndPoint = useMemo(() => {
    return Math.max(0.1, Math.min(0.9, parallaxEndPoint));
  }, [parallaxEndPoint]);
  
  // Create an intersection observer to track when the component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !mapAnimationComplete) {
          // When component comes into view and animation hasn't completed
          // Trigger map animation completion after a small delay to match parallax timing
          setTimeout(() => {
            setMapAnimationComplete(true);
          }, 500); // 500ms delay to let the map lines appear first
        }
      },
      { threshold: 0.3, rootMargin: "50px 0px" }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [mapAnimationComplete]);

  // Improved auto-expand feature for mobile – wait until user stops actively scrolling
  // use a ref so the latest slider value is always used (fix for published build caching old value)
  const autoExpandDelayRef = useRef(autoExpandDelay);
  useEffect(() => {
    autoExpandDelayRef.current = autoExpandDelay;
  }, [autoExpandDelay]);

  useEffect(() => {
    if (breakpoint !== "mobile" || !autoExpandFirstOnMobile) return;

    let lastScroll = Date.now();
    const scrollListener = () => {
      lastScroll = Date.now();
    };
    window.addEventListener("scroll", scrollListener, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoExpandTriggered) {
          // wait for user to stop scrolling + configurable delay so we don't break momentum scrolling
          const waitForIdle = () => {
            const now = Date.now();
            if (now - lastScroll > 150) {
              const delayMs = parseFloat(String(autoExpandDelayRef.current)) * 1000;
              setAutoExpandTriggered(true);
              setTimeout(() => {
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setExpandedPosition(1);
                  });
                });
              }, delayMs);
            } else {
              requestAnimationFrame(waitForIdle);
            }
          };
          waitForIdle();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px"
      }
    );

    if (timelineRef.current) observer.observe(timelineRef.current);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      if (timelineRef.current) observer.unobserve(timelineRef.current);
    };
  }, [breakpoint, autoExpandFirstOnMobile, autoExpandTriggered, autoExpandDelay]);

  // Track scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["start end", "end start"]
  });

  // Create standard transition settings - used for both position and marker animations
  const transitionSettings = useMemo(() => ({
    duration: 0.25 / animationSpeed,
    ease: "easeOut"
  }), [animationSpeed]);

  // Calculate parallax ranges based on intensity (shorter path)
  const parallaxRange = useMemo(() => {
    // Scale from 0‒10 to 0‒80 px so movement is subtle and finishes quickly
    const clamped = Math.max(0, Math.min(10, parallaxIntensity));
    return (clamped / 10) * 80; // 0 → 80 px
  }, [parallaxIntensity]);

  // Parallax effect with configurable end point
  // The effect completes at safeParallaxEndPoint (e.g., 0.3 = 30% of scroll progress)
  // After that point, the offsets remain at 0
  const group1XOffset = useTransform(scrollYProgress, [0, safeParallaxEndPoint, 1], [parallaxRange, 0, 0]);
  const group1YOffset = useTransform(scrollYProgress, [0, safeParallaxEndPoint, 1], [-parallaxRange, 0, 0]);
  const group2XOffset = useTransform(scrollYProgress, [0, safeParallaxEndPoint, 1], [-parallaxRange, 0, 0]);
  const group2YOffset = useTransform(scrollYProgress, [0, safeParallaxEndPoint, 1], [parallaxRange, 0, 0]);
  
  // Opacity in sync with parallax – fully visible by safeParallaxEndPoint
  const mapOpacityTransform = useTransform(scrollYProgress, [0, safeParallaxEndPoint], [0, 1]);
  const mapOpacity = fadeDuringParallax ? mapOpacityTransform : 1;
  
  // Use this to track when markers should appear (they appear when parallax is complete)
  const markersProgress = useTransform(scrollYProgress, [0, safeParallaxEndPoint, 1], [0, 1, 1]);

  const handlePositionClick = useCallback((id: number) => {
    // Clear any highlighted location when clicking on a position
    setHighlightedLocation(null);
    setExpandedPosition(prev => prev === id ? null : id);
  }, []);

  const handlePositionHover = useCallback((id: number | null) => {
    setHoveredPosition(id);
  }, []);

  // Function to handle marker click (new)
  const handleMarkerClick = useCallback((location: string) => {
    // Toggle the highlighted location - if already highlighted, clear it
    setHighlightedLocation(prev => prev === location ? null : location);
    // Clear any expanded position when highlighting via marker
    setExpandedPosition(null);
  }, []);

  // Check if position is part of the currently highlighted location
  const isPositionHighlightedByMarker = useCallback((positionId: number) => {
    if (!highlightedLocation) return false;
    const locationsArray = LOCATION_MAPPING[highlightedLocation as keyof typeof LOCATION_MAPPING];
    return locationsArray?.includes(positionId) || false;
  }, [highlightedLocation]);

  // Modified getPositionState to include marker-based highlighting
  const getPositionState = useCallback((positionId: number) => {
    const highlighted = isPositionHighlightedByMarker(positionId);
    return {
      isExpanded: expandedPosition === positionId ? "yes" : "no",
      isHovered: hoveredPosition === positionId && expandedPosition !== positionId ? "yes" : "no",
      isHighlightedByMarker: highlighted
    };
  }, [expandedPosition, hoveredPosition, isPositionHighlightedByMarker]);

  // Handle marker reveal completion
  const handleMarkersRevealed = useCallback(() => {
    setMarkersRevealed(true);
  }, []);

  // Create an array of position data for easy rendering
  const positionData = useMemo(() => [
    { date: position1Date, title: position1Title, institute: position1Institute, location: position1Location, details: position1Details },
    { date: position2Date, title: position2Title, institute: position2Institute, location: position2Location, details: position2Details },
    { date: position3Date, title: position3Title, institute: position3Institute, location: position3Location, details: position3Details },
    { date: position4Date, title: position4Title, institute: position4Institute, location: position4Location, details: position4Details },
    { date: position5Date, title: position5Title, institute: position5Institute, location: position5Location, details: position5Details },
    { date: position6Date, title: position6Title, institute: position6Institute, location: position6Location, details: position6Details },
    { date: position7Date, title: position7Title, institute: position7Institute, location: position7Location, details: position7Details },
    { date: position8Date, title: position8Title, institute: position8Institute, location: position8Location, details: position8Details },
    { date: position9Date, title: position9Title, institute: position9Institute, location: position9Location, details: position9Details },
    { date: position10Date, title: position10Title, institute: position10Institute, location: position10Location, details: position10Details },
    { date: position11Date, title: position11Title, institute: position11Institute, location: position11Location, details: position11Details },
    { date: position12Date, title: position12Title, institute: position12Institute, location: position12Location, details: position12Details },
    { date: position13Date, title: position13Title, institute: position13Institute, location: position13Location, details: position13Details },
    { date: position14Date, title: position14Title, institute: position14Institute, location: position14Location, details: position14Details }
  ].slice(0, Math.min(14, Math.max(1, numPositions))), [
    numPositions,
    position1Date, position1Title, position1Institute, position1Location, position1Details,
    position2Date, position2Title, position2Institute, position2Location, position2Details,
    position3Date, position3Title, position3Institute, position3Location, position3Details,
    position4Date, position4Title, position4Institute, position4Location, position4Details,
    position5Date, position5Title, position5Institute, position5Location, position5Details,
    position6Date, position6Title, position6Institute, position6Location, position6Details,
    position7Date, position7Title, position7Institute, position7Location, position7Details,
    position8Date, position8Title, position8Institute, position8Location, position8Details,
    position9Date, position9Title, position9Institute, position9Location, position9Details,
    position10Date, position10Title, position10Institute, position10Location, position10Details,
    position11Date, position11Title, position11Institute, position11Location, position11Details,
    position12Date, position12Title, position12Institute, position12Location, position12Details,
    position13Date, position13Title, position13Institute, position13Location, position13Details,
    position14Date, position14Title, position14Institute, position14Location, position14Details
  ]);
  
  const totalPositions = positionData.length;

  // Function to determine if a specific location should be active based on the currently expanded position
  const isLocationActive = useCallback((location: string) => {
    // Check for both expanded position or highlighted location
    if (highlightedLocation === location) return true;
    if (expandedPosition === null) return false;
    const locationsArray = LOCATION_MAPPING[location as keyof typeof LOCATION_MAPPING];
    return locationsArray?.includes(expandedPosition) || false;
  }, [expandedPosition, highlightedLocation]);

  // Create a marker component with active/inactive states
  const MapMarker = useCallback(({ location }: { location: string }) => {
    const active = isLocationActive(location);
    
    // Calculate random delay factor (0.1 to 0.3 * randomnessFactor/5)
    const randomDelayFactor = 0.1 + (Math.random() * 0.2 * (randomnessFactor / 5));
    
    // Use user-controlled base delay for dots
    const baseDelay = dotDelay;
    
    // Initial reveal bounce settings - controlled via slider
    const bounceSettings = {
      duration: dotDuration / animationSpeed, 
      // Enhanced bounce with more overshoot - reaches 120% instead of 110%
      ease: [0, 0.5, 0.1, 1.2], 
      // Add base delay + random factor based on randomnessFactor
      delay: baseDelay + (randomDelayFactor * Math.random() * randomnessFactor * 0.1)
    };

    // After initial reveal, use faster transitions for active state changes
    const activeTransitionSettings = {
      duration: 0.25 / animationSpeed,
      ease: "easeOut"
    };

    // Marker should be visible when parallax is complete or after initial reveal
    const shouldShow = mapAnimationComplete || markersRevealed;

    // Handle marker click - added new click handler
    const handleClick = () => {
      handleMarkerClick(location);
    };

    // If not in view or not ready to show markers, return invisible marker
    if (!shouldShow) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            width="11" 
            height="11"
            viewBox="0 0 11 11"
            fill="none" 
            preserveAspectRatio="xMidYMid meet"
            style={{ opacity: 0, scale: 0 }}
          >
            <circle cx="5.5" cy="5.5" r="5.5" fill={blackColor} />
          </svg>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={handleClick}
        className="w-8 h-8 flex items-center justify-center focus:outline-none cursor-pointer"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <motion.svg
          width="11"
          height="11"
          className="pointer-events-none" 
          fill="none" 
          viewBox="0 0 11 11"
          preserveAspectRatio="xMidYMid meet"
          // Initial state depends on whether markers have been revealed
          initial={{ scale: markersRevealed ? (active ? 1.4 : 1) : 0 }}
          animate={{ scale: active ? 1.4 : 1 }}
          // Use different transition based on whether this is initial reveal or state toggle
          transition={markersRevealed ? activeTransitionSettings : bounceSettings}
          // For the last marker in the list, notify parent when reveal is complete
          onAnimationComplete={() => {
            if (location === "Germany" && !markersRevealed) {
              handleMarkersRevealed();
            }
          }}
          style={{ transformOrigin: "center" }}
        >
          {active ? (
            // Active state - amber fill with black stroke
            <>
              <circle cx="5.5" cy="5.5" r="5.5" fill={amberColor} />
              <circle cx="5.5" cy="5.5" r="4.5" stroke={blackColor} strokeWidth="2" />
            </>
          ) : (
            // Default state - black fill
            <circle cx="5.5" cy="5.5" r="5.5" fill={blackColor} />
          )}
        </motion.svg>
      </button>
    );
  }, [
    isLocationActive,
    amberColor,
    blackColor,
    animationSpeed,
    mapAnimationComplete,
    markersRevealed,
    handleMarkersRevealed,
    randomnessFactor,
    dotDelay,
    dotDuration,
    handleMarkerClick
  ]);

  // Render positions component
  const positions = useMemo(() => (
    <div ref={timelineRef} className="content-stretch flex flex-col items-start justify-start relative w-full">
      {positionData.map((position, index) => {
        const positionId = index + 1;
        return (
          <div 
            key={`position-${positionId}`}
            className="content-stretch flex items-start justify-start relative shrink-0 w-full" 
            data-name={index === 0 ? "start" : index === totalPositions - 1 ? "end" : "middle"}
          >
            <div className="basis-0 content-stretch flex gap-3 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Components / Timeline / Position">
              <ComponentsTimelinePosition 
                {...getPositionState(positionId)}
                breakpoint={breakpoint === "tablet" ? "mobile" : breakpoint}
                blackColor={blackColor} 
                amberColor={amberColor}
                date={position.date}
                title={position.title}
                institute={position.institute}
                location={position.location}
                details={position.details}
                positionId={positionId}
                totalPositions={totalPositions}
                customIconUrl={customIconUrl}
                mobileFontSize={mobileFontSize}
                animationSpeed={animationSpeed}
                randomnessFactor={randomnessFactor}
                onPositionClick={handlePositionClick}
                onPositionHover={handlePositionHover}
              />
            </div>
          </div>
        );
      })}
    </div>
  ), [
    positionData, 
    totalPositions, 
    getPositionState, 
    breakpoint, 
    blackColor, 
    amberColor, 
    customIconUrl, 
    mobileFontSize,
    animationSpeed,
    randomnessFactor,
    handlePositionClick,
    handlePositionHover
  ]);

  // Vector animations with parallax effect
  const renderVectorAnimations = useCallback((imgGroup1: string, imgGroup2: string) => {
    // Use the component's scroll progress to create parallax effect
    return (
      <>
        <motion.div 
          className="absolute bottom-[1.36%] left-[0.84%] right-0 top-0"
          style={{
            x: group1XOffset,
            y: group1YOffset,
            opacity: mapOpacity
          }}
        >
          <div className="absolute inset-[-0.66%_-0.32%]">
            <img 
              className="block max-w-none size-full" 
              src={imgGroup1} 
            />
          </div>
        </motion.div>
        <motion.div 
          className="absolute bottom-0 left-0 right-[1.63%] top-[0.48%]"
          style={{
            x: group2XOffset,
            y: group2YOffset,
            opacity: mapOpacity
          }}
        >
          <div className="absolute inset-[-0.65%_-0.33%]">
            <img 
              className="block max-w-none size-full" 
              src={imgGroup2} 
            />
          </div>
        </motion.div>
      </>
    );
  }, [
    group1XOffset, 
    group1YOffset, 
    group2XOffset, 
    group2YOffset, 
    mapOpacity
  ]);

  // Effect to listen for scroll position and trigger map animation completion
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Once we've scrolled past the end point, ensure mapAnimationComplete is set
      if (latest > safeParallaxEndPoint && !mapAnimationComplete) {
        setMapAnimationComplete(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, mapAnimationComplete, safeParallaxEndPoint]);

  // Render map markers
  const renderMapMarkers = useCallback(() => {
    const locations = ["Japan", "Egypt", "USA", "UK", "Korea", "Germany"];
    const coordsMap: Record<string, string> = {
      Japan: "inset-[40.15%_13.64%_54.68%_83.81%]",
      Egypt: "inset-[44.56%_43.84%_50.27%_53.61%]",
      USA: "inset-[40.15%_76.38%_54.68%_21.07%]",
      UK: "inset-[30.36%_52.65%_64.48%_44.8%]",
      Korea: "inset-[41.66%_16.19%_53.17%_81.26%]",
      Germany: "inset-[32.51%_48.14%_62.33%_49.31%]",
    };

    return locations.map((location) => (
      <div key={location} className={`absolute ${coordsMap[location]}`} data-name={location}>
        <div className="relative w-full h-full flex items-center justify-center">
          <MapMarker location={location} />
        </div>
      </div>
    ));
  }, [MapMarker]);

  if (breakpoint === "tablet") {
    return (
      <div 
        ref={componentRef} 
        className="content-stretch flex gap-4 items-start justify-center relative size-full h-auto" 
        data-name="breakpoint=tablet"
      >
        <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-[380px]" data-name="Timeline_simplified">
          {positions}
        </div>
        <div className="basis-0 box-border content-stretch flex flex-col grow h-auto items-start justify-start min-h-px min-w-px px-0 py-12 relative shrink-0" data-name="Map" style={{ transform:'scale(0.95)', transformOrigin:'left top' }}>
          <div className="aspect-[1884/929] relative shrink-0 w-full max-w-[600px] mx-auto overflow-hidden" data-name="Map_interactive">
            <div className="absolute bottom-[0.71%] left-0 right-[0.83%] top-[0.01%]" data-name="Map_vector">
              {renderVectorAnimations(img, img1)}
            </div>
            {renderMapMarkers()}
          </div>
        </div>
      </div>
    );
  }
  if (breakpoint === "mobile") {
    return (
      <div 
        ref={componentRef}
        className="content-stretch flex flex-col gap-4 items-center justify-start relative size-full h-auto" 
        data-name="breakpoint=mobile"
      >
        <div className="box-border content-stretch flex flex-col items-start justify-start px-0 py-[30px] relative shrink-0 w-full" data-name="Map">
          <div className="aspect-[1884/929] relative shrink-0 w-full max-w-[600px] mx-auto overflow-hidden" data-name="Map_interactive">
            <div className="absolute bottom-[0.71%] left-0 right-[0.83%] top-[0.01%]" data-name="Map_vector">
              {renderVectorAnimations(img3, img4)}
            </div>
            {renderMapMarkers()}
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full" data-name="Timeline_simplified">
          {positions}
        </div>
      </div>
    );
  }
  
  // Desktop view
  return (
    <div 
      ref={componentRef}
      className="content-stretch flex gap-4 items-start justify-center relative size-full h-auto" 
      data-name="breakpoint=desktop"
    >
      <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-[599px]" data-name="Timeline_simplified">
        {positions}
      </div>
      <div className="basis-0 box-border content-stretch flex flex-col grow h-auto items-center justify-center min-h-px min-w-px px-0 py-12 relative shrink-0" data-name="Map">
        <div className="aspect-[1884/929] relative shrink-0 w-full max-w-[600px] mx-auto overflow-hidden" data-name="Map_interactive">
          <div className="absolute bottom-[0.71%] left-0 right-[0.83%] top-[0.01%]" data-name="Map_vector">
            {renderVectorAnimations(img6, img7)}
          </div>
          {renderMapMarkers()}
        </div>
      </div>
    </div>
  );
});

// Simplified wrapper component for TimelineMap
function TimelineMap1({ 
  blackColor = "#000000", 
  amberColor = "#EEBA05",
  customIconUrl,
  mobileFontSize = 12,
  animationSpeed = 1,
  randomnessFactor = 5,
  parallaxIntensity = 5,
  parallaxEndPoint = 0.3,
  fadeDuringParallax = true,
  dotDelay = 0.5,
  dotDuration = 0.6,
  autoExpandFirstOnMobile = true,
  autoExpandDelay = 0.5,
  position1Date = "Mar 2025 - Sep 2025",
  position1Title = "Product Designer",
  position1Institute = "Felixheck Design",
  position1Location = "Munich, Germany",
  position1Details = "Details",
  position2Date = "Jan 2024 - Feb 2025",
  position2Title = "UX Designer",
  position2Institute = "Creative Agency",
  position2Location = "London, UK",
  position2Details = "Details",
  position3Date = "May 2023 - Dec 2023",
  position3Title = "UI Designer",
  position3Institute = "Tech Startup",
  position3Location = "Berlin, Germany",
  position3Details = "Details",
  position4Date = "Aug 2022 - Apr 2023",
  position4Title = "Graphic Designer",
  position4Institute = "Design Studio",
  position4Location = "Paris, France",
  position4Details = "Details",
  position5Date = "Feb 2022 - Jul 2022",
  position5Title = "Design Intern",
  position5Institute = "Fashion Brand",
  position5Location = "Milan, Italy",
  position5Details = "Details",
  position6Date = "Jan 2021 - Jan 2022",
  position6Title = "Junior Designer",
  position6Institute = "Marketing Agency",
  position6Location = "Barcelona, Spain",
  position6Details = "Details",
  position7Date = "Sep 2020 - Dec 2020",
  position7Title = "Design Freelancer",
  position7Institute = "Self-employed",
  position7Location = "Remote",
  position7Details = "Details",
  position8Date = "Feb 2020 - Aug 2020",
  position8Title = "Research Assistant",
  position8Institute = "University Design Lab",
  position8Location = "Copenhagen, Denmark",
  position8Details = "Details",
  position9Date = "Aug 2019 - Jan 2020",
  position9Title = "Exchange Student",
  position9Institute = "Design Academy",
  position9Location = "Stockholm, Sweden",
  position9Details = "Details",
  position10Date = "Sep 2017 - Jul 2019",
  position10Title = "Bachelor's Degree",
  position10Institute = "Design University",
  position10Location = "Amsterdam, Netherlands",
  position10Details = "Details",
  position11Date = "May 2016 - Aug 2017",
  position11Title = "Gap Year",
  position11Institute = "Travel & Volunteering",
  position11Location = "Southeast Asia",
  position11Details = "Details",
  position12Date = "Sep 2013 - Apr 2016",
  position12Title = "High School",
  position12Institute = "International School",
  position12Location = "Vienna, Austria",
  position12Details = "Details",
  position13Date = "Sep 2010 - Jun 2013",
  position13Title = "Middle School",
  position13Institute = "European School",
  position13Location = "Brussels, Belgium",
  position13Details = "Details",
  position14Date = "Mar 1986",
  position14Title = "Born",
  position14Institute = "",
  position14Location = "Fukuoka, Japan",
  position14Details = "",
  numPositions = 14
}) {
  const { width } = useActiveBreakpoint();
  const breakpoint = width < 800 ? "mobile" : width < 1280 ? "tablet" : "desktop";
  
  // Pass props directly to the main TimelineMap component
  return (
    <TimelineMap
      breakpoint={breakpoint}
      blackColor={blackColor}
      amberColor={amberColor}
      customIconUrl={customIconUrl}
      mobileFontSize={mobileFontSize}
      animationSpeed={animationSpeed}
      randomnessFactor={randomnessFactor}
      parallaxIntensity={parallaxIntensity}
      parallaxEndPoint={parallaxEndPoint}
      fadeDuringParallax={fadeDuringParallax}
      dotDelay={dotDelay}
      dotDuration={dotDuration}
      autoExpandFirstOnMobile={autoExpandFirstOnMobile}
      autoExpandDelay={autoExpandDelay}
      position1Date={position1Date}
      position1Title={position1Title}
      position1Institute={position1Institute}
      position1Location={position1Location}
      position1Details={position1Details}
      position2Date={position2Date}
      position2Title={position2Title}
      position2Institute={position2Institute}
      position2Location={position2Location}
      position2Details={position2Details}
      position3Date={position3Date}
      position3Title={position3Title}
      position3Institute={position3Institute}
      position3Location={position3Location}
      position3Details={position3Details}
      position4Date={position4Date}
      position4Title={position4Title}
      position4Institute={position4Institute}
      position4Location={position4Location}
      position4Details={position4Details}
      position5Date={position5Date}
      position5Title={position5Title}
      position5Institute={position5Institute}
      position5Location={position5Location}
      position5Details={position5Details}
      position6Date={position6Date}
      position6Title={position6Title}
      position6Institute={position6Institute}
      position6Location={position6Location}
      position6Details={position6Details}
      position7Date={position7Date}
      position7Title={position7Title}
      position7Institute={position7Institute}
      position7Location={position7Location}
      position7Details={position7Details}
      position8Date={position8Date}
      position8Title={position8Title}
      position8Institute={position8Institute}
      position8Location={position8Location}
      position8Details={position8Details}
      position9Date={position9Date}
      position9Title={position9Title}
      position9Institute={position9Institute}
      position9Location={position9Location}
      position9Details={position9Details}
      position10Date={position10Date}
      position10Title={position10Title}
      position10Institute={position10Institute}
      position10Location={position10Location}
      position10Details={position10Details}
      position11Date={position11Date}
      position11Title={position11Title}
      position11Institute={position11Institute}
      position11Location={position11Location}
      position11Details={position11Details}
      position12Date={position12Date}
      position12Title={position12Title}
      position12Institute={position12Institute}
      position12Location={position12Location}
      position12Details={position12Details}
      position13Date={position13Date}
      position13Title={position13Title}
      position13Institute={position13Institute}
      position13Location={position13Location}
      position13Details={position13Details}
      position14Date={position14Date}
      position14Title={position14Title}
      position14Institute={position14Institute}
      position14Location={position14Location}
      position14Details={position14Details}
      numPositions={numPositions}
    />
  );
}

export default TimelineMap1;

defineProperties(TimelineMap1, {
  blackColor: {
    label: "Black Elements Color",
    type: "string",
    defaultValue: "#000000"
  },
  amberColor: {
    label: "Amber Elements Color",
    type: "string",
    defaultValue: "#EEBA05"
  },
  customIconUrl: {
    label: "Education Icon URL",
    type: "string",
    defaultValue: ""
  },
  mobileFontSize: {
    label: "Mobile Font Size",
    type: "number",
    control: "slider",
    min: 10,
    max: 15,
    step: 1,
    defaultValue: 12
  },
  animationSpeed: {
    label: "Animation Speed",
    type: "number",
    control: "slider",
    min: 0.5,
    max: 2,
    step: 0.1,
    defaultValue: 1
  },
  randomnessFactor: {
    label: "Line Randomness",
    type: "number",
    control: "slider",
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 5
  },
  parallaxIntensity: {
    label: "Parallax Intensity",
    type: "number",
    control: "slider",
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 5
  },
  parallaxEndPoint: {
    label: "Parallax End Point",
    type: "number",
    control: "slider",
    min: 0.05,
    max: 0.95,
    step: 0.05, // finer granularity for more intermediate steps
    defaultValue: 0.3
  },
  fadeDuringParallax: {
    label: "Fade Lines In",
    type: "boolean",
    defaultValue: true
  },
  dotDelay: {
    label: "Dot Animation Delay (s)",
    type: "number",
    control: "slider",
    min: 0,
    max: 2,
    step: 0.1,
    defaultValue: 0.5
  },
  dotDuration: {
    label: "Dot Animation Duration (s)",
    type: "number",
    control: "slider",
    min: 0.1,
    max: 2,
    step: 0.1,
    defaultValue: 0.6
  },
  autoExpandFirstOnMobile: {
    label: "Auto-expand First Position on Mobile",
    type: "boolean",
    defaultValue: true
  },
  autoExpandDelay: {
    label: "Auto-expand Delay (s)",
    type: "number",
    control: "slider",
    min: 0,
    max: 2,
    step: 0.1,
    defaultValue: 0.5
  },
  numPositions: {
    label: "Number of Positions",
    type: "number",
    control: "slider",
    min: 1,
    max: 14,
    step: 1,
    defaultValue: 14
  },
  position1Date: {
    label: "Position 1: Date",
    type: "string",
    defaultValue: "Mar 2025 - Sep 2025"
  },
  position1Title: {
    label: "Position 1: Title",
    type: "string",
    defaultValue: "Product Designer"
  },
  position1Institute: {
    label: "Position 1: Institute",
    type: "string",
    defaultValue: "Felixheck Design"
  },
  position1Location: {
    label: "Position 1: Location",
    type: "string",
    defaultValue: "Munich, Germany"
  },
  position1Details: {
    label: "Position 1: Details",
    type: "string",
    defaultValue: "Details"
  },
  position2Date: {
    label: "Position 2: Date",
    type: "string",
    defaultValue: "Jan 2024 - Feb 2025"
  },
  position2Title: {
    label: "Position 2: Title",
    type: "string",
    defaultValue: "UX Designer"
  },
  position2Institute: {
    label: "Position 2: Institute",
    type: "string",
    defaultValue: "Creative Agency"
  },
  position2Location: {
    label: "Position 2: Location",
    type: "string",
    defaultValue: "London, UK"
  },
  position2Details: {
    label: "Position 2: Details",
    type: "string",
    defaultValue: "Details"
  },
  position3Date: {
    label: "Position 3: Date",
    type: "string",
    defaultValue: "May 2023 - Dec 2023"
  },
  position3Title: {
    label: "Position 3: Title",
    type: "string",
    defaultValue: "UI Designer"
  },
  position3Institute: {
    label: "Position 3: Institute",
    type: "string",
    defaultValue: "Tech Startup"
  },
  position3Location: {
    label: "Position 3: Location",
    type: "string",
    defaultValue: "Berlin, Germany"
  },
  position3Details: {
    label: "Position 3: Details",
    type: "string",
    defaultValue: "Details"
  },
  position4Date: {
    label: "Position 4: Date",
    type: "string",
    defaultValue: "Aug 2022 - Apr 2023"
  },
  position4Title: {
    label: "Position 4: Title",
    type: "string",
    defaultValue: "Graphic Designer"
  },
  position4Institute: {
    label: "Position 4: Institute",
    type: "string",
    defaultValue: "Design Studio"
  },
  position4Location: {
    label: "Position 4: Location",
    type: "string",
    defaultValue: "Paris, France"
  },
  position4Details: {
    label: "Position 4: Details",
    type: "string",
    defaultValue: "Details"
  },
  position5Date: {
    label: "Position 5: Date",
    type: "string",
    defaultValue: "Feb 2022 - Jul 2022"
  },
  position5Title: {
    label: "Position 5: Title",
    type: "string",
    defaultValue: "Design Intern"
  },
  position5Institute: {
    label: "Position 5: Institute",
    type: "string",
    defaultValue: "Fashion Brand"
  },
  position5Location: {
    label: "Position 5: Location",
    type: "string",
    defaultValue: "Milan, Italy"
  },
  position5Details: {
    label: "Position 5: Details",
    type: "string",
    defaultValue: "Details"
  },
  position6Date: {
    label: "Position 6: Date",
    type: "string",
    defaultValue: "Jan 2021 - Jan 2022"
  },
  position6Title: {
    label: "Position 6: Title",
    type: "string",
    defaultValue: "Junior Designer"
  },
  position6Institute: {
    label: "Position 6: Institute",
    type: "string",
    defaultValue: "Marketing Agency"
  },
  position6Location: {
    label: "Position 6: Location",
    type: "string",
    defaultValue: "Barcelona, Spain"
  },
  position6Details: {
    label: "Position 6: Details",
    type: "string",
    defaultValue: "Details"
  },
  position7Date: {
    label: "Position 7: Date",
    type: "string",
    defaultValue: "Sep 2020 - Dec 2020"
  },
  position7Title: {
    label: "Position 7: Title",
    type: "string",
    defaultValue: "Design Freelancer"
  },
  position7Institute: {
    label: "Position 7: Institute",
    type: "string",
    defaultValue: "Self-employed"
  },
  position7Location: {
    label: "Position 7: Location",
    type: "string",
    defaultValue: "Remote"
  },
  position7Details: {
    label: "Position 7: Details",
    type: "string",
    defaultValue: "Details"
  },
  position8Date: {
    label: "Position 8: Date",
    type: "string",
    defaultValue: "Feb 2020 - Aug 2020"
  },
  position8Title: {
    label: "Position 8: Title",
    type: "string",
    defaultValue: "Research Assistant"
  },
  position8Institute: {
    label: "Position 8: Institute",
    type: "string",
    defaultValue: "University Design Lab"
  },
  position8Location: {
    label: "Position 8: Location",
    type: "string",
    defaultValue: "Copenhagen, Denmark"
  },
  position8Details: {
    label: "Position 8: Details",
    type: "string",
    defaultValue: "Details"
  },
  position9Date: {
    label: "Position 9: Date",
    type: "string",
    defaultValue: "Aug 2019 - Jan 2020"
  },
  position9Title: {
    label: "Position 9: Title",
    type: "string",
    defaultValue: "Exchange Student"
  },
  position9Institute: {
    label: "Position 9: Institute",
    type: "string",
    defaultValue: "Design Academy"
  },
  position9Location: {
    label: "Position 9: Location",
    type: "string",
    defaultValue: "Stockholm, Sweden"
  },
  position9Details: {
    label: "Position 9: Details",
    type: "string",
    defaultValue: "Details"
  },
  position10Date: {
    label: "Position 10: Date",
    type: "string",
    defaultValue: "Sep 2017 - Jul 2019"
  },
  position10Title: {
    label: "Position 10: Title",
    type: "string",
    defaultValue: "Bachelor's Degree"
  },
  position10Institute: {
    label: "Position 10: Institute",
    type: "string",
    defaultValue: "Design University"
  },
  position10Location: {
    label: "Position 10: Location",
    type: "string",
    defaultValue: "Amsterdam, Netherlands"
  },
  position10Details: {
    label: "Position 10: Details",
    type: "string",
    defaultValue: "Details"
  },
  position11Date: {
    label: "Position 11: Date",
    type: "string",
    defaultValue: "May 2016 - Aug 2017"
  },
  position11Title: {
    label: "Position 11: Title",
    type: "string",
    defaultValue: "Gap Year"
  },
  position11Institute: {
    label: "Position 11: Institute",
    type: "string",
    defaultValue: "Travel & Volunteering"
  },
  position11Location: {
    label: "Position 11: Location",
    type: "string",
    defaultValue: "Southeast Asia"
  },
  position11Details: {
    label: "Position 11: Details",
    type: "string",
    defaultValue: "Details"
  },
  position12Date: {
    label: "Position 12: Date",
    type: "string",
    defaultValue: "Sep 2013 - Apr 2016"
  },
  position12Title: {
    label: "Position 12: Title",
    type: "string",
    defaultValue: "High School"
  },
  position12Institute: {
    label: "Position 12: Institute",
    type: "string",
    defaultValue: "International School"
  },
  position12Location: {
    label: "Position 12: Location",
    type: "string",
    defaultValue: "Vienna, Austria"
  },
  position12Details: {
    label: "Position 12: Details",
    type: "string",
    defaultValue: "Details"
  },
  position13Date: {
    label: "Position 13: Date",
    type: "string",
    defaultValue: "Sep 2010 - Jun 2013"
  },
  position13Title: {
    label: "Position 13: Title",
    type: "string",
    defaultValue: "Middle School"
  },
  position13Institute: {
    label: "Position 13: Institute",
    type: "string",
    defaultValue: "European School"
  },
  position13Location: {
    label: "Position 13: Location",
    type: "string",
    defaultValue: "Brussels, Belgium"
  },
  position13Details: {
    label: "Position 13: Details",
    type: "string",
    defaultValue: "Details"
  },
  position14Date: {
    label: "Position 14: Date",
    type: "string",
    defaultValue: "Mar 1986"
  },
  position14Title: {
    label: "Position 14: Title",
    type: "string",
    defaultValue: "Born"
  },
  position14Institute: {
    label: "Position 14: Institute",
    type: "string",
    defaultValue: ""
  },
  position14Location: {
    label: "Position 14: Location",
    type: "string",
    defaultValue: "Fukuoka, Japan"
  },
  position14Details: {
    label: "Position 14: Details",
    type: "string",
    defaultValue: ""
  }
});
