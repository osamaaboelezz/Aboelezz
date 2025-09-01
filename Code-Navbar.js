import React, { useState, useEffect, useRef, memo } from "react";
import { defineProperties } from "figma:react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";

interface ComponentsNavigationIconLineProps {
  isActivated?: "on" | "off";
  delay?: number;
  animationDuration: number;
}

// Improved line component with smooth width transition
const ComponentsNavigationIconLine = memo(({ isActivated = "on", delay = 0, animationDuration }: ComponentsNavigationIconLineProps) => {
  const width = isActivated === "on" ? 20 : 10;

  return (
    <motion.div
      className="absolute right-0 top-1/2 -translate-y-1/2 transform-gpu origin-right h-[3px] rounded-full bg-black will-change-[width]"
      animate={{ width }}
      transition={{
        duration: 0.15,
        delay: delay * animationDuration,
        ease: [0.4, 0, 0.2, 1],
      }}
    />
  );
});

type SectionType = "Home" | "About" | "Work" | "Contact";

// Up arrow icon for expanded state
const HamburgerIcon = memo(() => {
  return (
    <div className="relative h-12 w-12 flex items-center justify-center" data-name="is activated=off, page=-">
      <ChevronUp className="w-12 h-12 text-black" />
    </div>
  );
});

// Unified Nav Item that works in both collapsed and expanded states
const NavItem = memo(({ 
  section, 
  isActive, 
  isExpanded,
  onClick,
  animationDuration,
  index
}: { 
  section: SectionType; 
  isActive: boolean;
  isExpanded: boolean;
  onClick: (section: SectionType) => void;
  animationDuration: number;
  index: number;
}) => {
  const handleClick = React.useCallback(() => {
    if (isExpanded) {
      onClick(section);
    }
  }, [isExpanded, onClick, section]);

  // Text opacity - show text for active item in collapsed state, all items in expanded state
  const showText = isExpanded || isActive;

  return (
    <motion.div
      layout
      key={section}
      initial={false}
      className={`
        box-border content-stretch flex h-6 items-center 
        ${isExpanded ? 'mb-2.5 w-full cursor-pointer' : 'mb-[-16px] w-full'} 
        justify-between
        relative shrink-0
      `}
      onClick={handleClick}
      transition={{
        duration: animationDuration * 0.75,
        delay: isExpanded ? index * 0.05 * animationDuration : 0,
        ease: [0.2, 0, 0, 1],
        layout: { duration: animationDuration * 0.75 }
      }}
      data-name="NavItem"
    >
      {/* Text element - always rendered but conditionally visible */}
      <motion.div 
        layout
        initial={false}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ 
          duration: animationDuration * 0.5,
          ease: [0.2, 0, 0, 1] 
        }}
        className={`
          font-['Manrope:Regular',_sans-serif] font-normal leading-[0] 
          shrink-0 text-[16px] text-black w-[66px]
          ${isExpanded && isActive ? 'font-bold' : ''}
        `}
      >
        <p className="leading-[normal] text-left">{section}</p>
      </motion.div>

      {/* Line indicator - always visible */}
      <motion.div 
        layout
        className="h-1 relative shrink-0 w-[22px]" 
        data-name="Components / Navigation Icon/ line"
      >
        <ComponentsNavigationIconLine
          isActivated={isActive ? 'on' : 'off'}
          delay={0.1}
          animationDuration={animationDuration}
        />
      </motion.div>
    </motion.div>
  );
});

export default function MobileTabbar1({ 
  isTestBackground = false,
  animationSpeed = 0.4
}: { 
  isTestBackground?: boolean;
  animationSpeed?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>("Home");
  const [pendingSection, setPendingSection] = useState<SectionType | null>(null);
  const expandComplete = useRef(true); // Track if expand/collapse animations are complete
  const interactable = useRef(true); // Track if component is ready for interaction
  const containerRef = useRef<HTMLButtonElement | null>(null);
  
  // Handle collapse
  const collapseNavbar = React.useCallback(() => {
    // Skip if already processing animation
    if (!expandComplete.current) return;
    
    expandComplete.current = false;
    interactable.current = false; // Disable interactions during animation
    setExpanded(false);
    
    // Enable interaction after animation completes
    setTimeout(() => {
      expandComplete.current = true;
      setTimeout(() => {
        interactable.current = true;
      }, 50);
    }, animationSpeed * 1000 + 50);
  }, [animationSpeed]);

  const handleClick = React.useCallback(() => {
    // Skip if not ready for interaction
    if (!interactable.current) return;
    
    if (expanded) {
      collapseNavbar();
    } else {
      interactable.current = false; // Disable interactions during animation
      expandComplete.current = false;
      setExpanded(true);
      
      // Mark expand as complete after animation
      setTimeout(() => {
        expandComplete.current = true;
        setTimeout(() => {
          interactable.current = true;
        }, 50);
      }, animationSpeed * 1000 + 50);
    }
  }, [expanded, collapseNavbar, animationSpeed]);

  const handleSectionChange = React.useCallback((section: SectionType) => {
    setActiveSection(section);
    setPendingSection(section); // keep section active until helper passes 50%
    scrollToSection(section);
    // Auto-collapse after selection
    collapseNavbar();
  }, [collapseNavbar]);

  // Close navbar when clicking outside or scrolling while expanded
  useEffect(() => {
    if (!expanded) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        collapseNavbar();
      }
    };

    const handleOutsideScroll = () => {
      collapseNavbar();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleOutsideScroll, { passive: true });
    window.addEventListener("touchmove", handleOutsideScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleOutsideScroll);
      window.removeEventListener("touchmove", handleOutsideScroll);
    };
  }, [expanded, collapseNavbar]);

  // Fixed implementation of getElementSafe
  const getElementSafe = React.useCallback((selector: string): HTMLElement | null => {
    if (typeof document === "undefined") return null;
    
    // Try by ID first
    const byId = document.getElementById(selector);
    if (byId) return byId;
    
    // Try escaping the selector for IDs with special characters
    let escapedSelector = `#${selector}`;
    
    try {
      const byEscaped = document.querySelector(escapedSelector) as HTMLElement | null;
      if (byEscaped) return byEscaped;
    } catch (e) {
      // Handle any selector syntax errors
    }
    
    // Fallback: any element with data-section attribute
    try {
      return document.querySelector(`[data-section="${selector}"]`) as HTMLElement | null;
    } catch (e) {
      return null;
    }
  }, []);

  // Function to check if an element top has passed a given viewport percentage (e.g. 0.5 for 50%)
  const isPastViewportRatio = React.useCallback((element: HTMLElement | null, ratio = 0.5): boolean => {
    if (!element || typeof window === "undefined") return false;
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    return rect.top < viewportHeight * ratio;
  }, []);

  const scrollToSection = React.useCallback((section: SectionType) => {
    if (typeof window === "undefined") return;
    switch (section) {
      case "Home": {
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      }
      case "About": {
        const aboutEl = getElementSafe("scrollHelperAbout");
        if (aboutEl) {
          const y = aboutEl.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        break;
      }
      case "Work": {
        const workEl = getElementSafe("scrollHelperWork");
        if (workEl) {
          const y = workEl.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        break;
      }
      case "Contact": {
        const contactEl = getElementSafe("scrollHelperContact");
        if (contactEl) {
          const y = contactEl.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        break;
      }
      default:
        break;
    }
  }, [getElementSafe]);

  // Update active section based on scroll position - debounced for better performance
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let scrollTimeout: number | null = null;
    
    const handleScroll = () => {
      // Debounce scroll events for better performance
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = window.requestAnimationFrame(() => {
        // Skip section detection when expanding/collapsing to avoid flicker
        if (expanded || !expandComplete.current || !interactable.current) return;
        
        const aboutEl = getElementSafe("scrollHelperAbout");
        const workEl = getElementSafe("scrollHelperWork");
        const contactEl = getElementSafe("scrollHelperContact");
        
        // If we are waiting for a pendingSection to reach 50%, keep it active until it does
        if (pendingSection) {
          const targetEl = pendingSection === "Home" ? null : getElementSafe(`scrollHelper${pendingSection}`);
          
          if (pendingSection === "Home") {
            if (aboutEl && isPastViewportRatio(aboutEl, 0.5)) {
              setPendingSection(null);
            }
          } else {
            // Use standard 50% check for all sections including Contact
            if (targetEl && isPastViewportRatio(targetEl, 0.5)) {
              setPendingSection(null);
            }
          }
        }
  
        if (pendingSection) {
          // Keep showing pendingSection as active
          setActiveSection(pendingSection);
          return;
        }
  
        // Avoid changing section too rapidly to prevent flicker
        let newSection = activeSection;
        
        // Determine active section based on helpers at 50% viewport
        if (contactEl && isPastViewportRatio(contactEl, 0.5)) {
          newSection = "Contact";
        } else if (workEl && isPastViewportRatio(workEl, 0.5)) {
          newSection = "Work";
        }
        // Rule 2: From scrollHelperAbout 50% to scrollHelperWork 50% → About active
        else if (aboutEl && isPastViewportRatio(aboutEl, 0.5)) {
          newSection = "About";
        }
        // Rule 1: From top to scrollHelperAbout 50% → Home active
        else {
          newSection = "Home";
        }
        
        // Only update if changed
        if (newSection !== activeSection) {
          setActiveSection(newSection);
        }
      });
    };
    
    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
    };
  }, [
    expanded,
    pendingSection,
    activeSection,
    getElementSafe,
    isPastViewportRatio
  ]);
  
  const sections: SectionType[] = ["Home", "About", "Work", "Contact"];

  return (
    <motion.button
      ref={containerRef}
      onClick={handleClick}
      className="relative cursor-pointer p-0 border-0 outline-none focus:outline-none touch-manipulation"
      initial={false}
      layout="position"
      style={{
        // Prevent touch highlight on mobile
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      }}
      data-name="Mobile tabbar"
    >
      <motion.div 
        layout="preserve-aspect"
        className={`${isTestBackground ? "bg-blue-500" : "backdrop-blur-[10px] backdrop-filter bg-[rgba(218,218,218,0.5)]"} overflow-hidden w-[150px] rounded-[28px] will-change-[height] isolation-auto`}
        initial={{ height: 56 }}
        animate={{ 
          height: expanded ? 212 : 56 
        }}
        transition={{ 
          duration: animationSpeed, 
          ease: [0.2, 0, 0, 1] // Ease-out curve
        }}
        onAnimationStart={() => {
          // At start of any animation, prevent interaction
          interactable.current = false;
        }}
        onAnimationComplete={() => {
          expandComplete.current = true;
          // Small delay before re-enabling interaction
          setTimeout(() => {
            interactable.current = true;
          }, 50);
        }}
      >
        <motion.div 
          layout
          className="flex flex-col h-full w-full px-[26px] pt-1 pb-6 will-change-contents"
          transition={{ duration: animationSpeed * 0.75 }}
        >
          {/* Hamburger icon shown only in expanded state */}
          {expanded && (
            <motion.div 
              layout
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: animationSpeed * 0.5 }}
              className="h-12 w-12 mb-2 flex items-center justify-center mx-auto"
            >
              <HamburgerIcon />
            </motion.div>
          )}
          
          {/* Navigation items - same component in both states */}
          <motion.div 
            layout
            className={`flex flex-col h-full ${expanded ? 'pt-0' : 'justify-center'} will-change-contents`}
            transition={{ duration: animationSpeed * 0.75 }}
          >
            {sections.map((section, index) => (
              <NavItem
                key={section}
                section={section}
                isActive={activeSection === section}
                isExpanded={expanded}
                onClick={handleSectionChange}
                animationDuration={animationSpeed}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

defineProperties(MobileTabbar1, {
  isTestBackground: {
    label: "Test background",
    type: "boolean",
    defaultValue: false,
  },
  animationSpeed: {
    label: "Animation speed (seconds)",
    type: "number",
    control: "slider",
    min: 0,
    max: 3,
    step: 0.1,
    defaultValue: 0.4
  }
});
