import { useMemo, useState, useEffect, useRef } from "react";
import { defineProperties } from "figma:react";

// Tooltip component
function Tooltip({ visible, label, bgColor = "#000", textColor = "#FFFFFF", isMobile = false }: { visible: boolean; label: string; bgColor?: string; textColor?: string; isMobile?: boolean }) {
  if (!visible) return null;

  // Reduce the top gap on mobile (width &lt; 800) to zero by moving tooltip closer
  const topOffset = isMobile ? "-32px" : "-37px";

  return (
    <div
      className="absolute left-0 p-2 whitespace-nowrap rounded-xl"
      style={{ 
        backgroundColor: bgColor, 
        fontSize: "16px", 
        color: textColor, 
        top: topOffset 
      }}
    >
      {label}
    </div>
  );
}

// Debounce helper function
function useDebounce(fn: Function, delay: number) {
  const timeoutRef = useRef<number | null>(null);

  function debouncedFn(...args: any[]) {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}

function TypewriterText({ 
  text, 
  speed = 100, 
  onDone,
  fontSize = "40px",
  fontWeight = "normal",
  style = {},
  animationOn = true,
}: { 
  text: string; 
  speed?: number; 
  onDone?: () => void;
  fontSize?: string;
  fontWeight?: string;
  style?: React.CSSProperties;
  animationOn?: boolean;
}) {
  const [displayed, setDisplayed] = useState(animationOn ? "" : text);
  const [index, setIndex] = useState(0);
  const isDoneRef = useRef(false);

  useEffect(() => {
    // Reset if animation is turned off
    if (!animationOn) {
      setDisplayed(text);
      return;
    }
    
    // Skip if animation already completed
    if (isDoneRef.current) return;
    
    if (index < text.length) {
      const timer = window.setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(i => i + 1);
      }, speed);
      
      return () => window.clearTimeout(timer);
    } else if (onDone && !isDoneRef.current) {
      isDoneRef.current = true;
      onDone();
    }
  }, [index, text, speed, onDone, animationOn]);

  return <span style={style}>{displayed}</span>;
}

function GreetingWithTooltip({ greeting, bgColor, tooltipTextColor, fontSize }: { greeting: string; bgColor: string; tooltipTextColor: string; fontSize: number }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  
  // Map greeting to language
  const languageLabel = useMemo(() => {
    switch (greeting) {
      case "مرحبا":
        return "Hello in Arabic";
      case "Hola":
        return "Hello in Spanish";
      case "Servus":
      default:
        return "Hello in German";
    }
  }, [greeting]);
  
  const handleShowTooltip = () => {
    setShowTooltip(true);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };
  
  const handleHideTooltip = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    setShowTooltip(false);
  };
  
  // Use mouse events for desktop and click for mobile
  const isMobile = useRef(typeof window !== 'undefined' && window.innerWidth < 800);
  
  // Calculate asterisk size as half of greeting font size
  const asteriskSize = Math.max(10, fontSize * 0.5);

  return (
    <span 
      className="relative inline-block cursor-pointer"
      onClick={isMobile.current ? handleShowTooltip : undefined}
      onMouseEnter={isMobile.current ? undefined : handleShowTooltip}
      onMouseLeave={isMobile.current ? undefined : handleHideTooltip}
    >
      {greeting}
      <span className="align-super" style={{ fontSize: `${asteriskSize}px` }}>*</span> <span aria-label="waving hand" role="img">👋</span>
      <Tooltip visible={showTooltip} label={languageLabel} bgColor={bgColor} textColor={tooltipTextColor} isMobile={isMobile.current} />
    </span>
  );
}

function HeroText({ 
  typingSpeed = 100, 
  startDelay = 0, 
  animationOn = true, 
  tooltipBgColor = "#000", 
  tooltipTextColor = "#FFFFFF", 
  textColor = "#000000" 
}) {
  // Animation steps
  const [step, setStep] = useState<"greet" | "line" | "name">(animationOn ? "greet" : "name");
  const [started, setStarted] = useState(animationOn ? false : true);
  
  // Prevent re-triggering animations
  const animationStepsRef = useRef({
    greet: !animationOn,
    line: !animationOn,
    name: !animationOn
  });
  
  // Select random greeting
  const greeting = useMemo(() => {
    const greetings = ["Servus", "Hola", "مرحبا"];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }, []);
  
  // Start delay for animation
  useEffect(() => {
    if (!animationOn || started) return;
    
    const timer = window.setTimeout(() => {
      setStarted(true);
    }, startDelay);
    
    return () => window.clearTimeout(timer);
  }, [animationOn, startDelay, started]);
  
  // Container ref for measuring width
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Responsive design state
  const [nameFontSize, setNameFontSize] = useState(92); // Default for "OSAMA"
  const [headerFontSize, setHeaderFontSize] = useState(40); // Default for greeting and "My name is"
  
  // Handle screen resize with debounce
  const updateSizes = useDebounce(() => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    
    // Calculate OSAMA font size (as before)
    // Reference point: 327px container width = 92px font size
    const newNameFontSize = Math.floor((containerWidth / 327) * 92);
    setNameFontSize(newNameFontSize);
    
    // Calculate header font sizes
    // Standard is 40px for width >= 250px
    // For smaller widths, scale proportionally (40px at 250px = 0.16 ratio)
    const newHeaderFontSize = containerWidth < 250 
      ? Math.max(20, Math.floor(containerWidth * 0.16)) 
      : 40;
    
    setHeaderFontSize(newHeaderFontSize);
  }, 200);
  
  // Setup resize listener
  useEffect(() => {
    // Set initial font sizes
    updateSizes();
    
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [updateSizes]);
  
  // Handle animation steps
  const handleStepComplete = (currentStep: "greet" | "line" | "name") => {
    if (animationStepsRef.current[currentStep]) return;
    
    animationStepsRef.current[currentStep] = true;
    
    if (currentStep === "greet") {
      setStep("line");
    } else if (currentStep === "line") {
      setStep("name");
    }
  };

  // Calculate minimum heights based on font sizes
  const headerLineHeight = headerFontSize * 1.2;
  const nameLineHeight = nameFontSize * 1.1;

  // Detect mobile once on mount to adjust vertical padding
  const isMobileScreen = typeof window !== "undefined" && window.innerWidth < 800;

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-start justify-start w-full max-w-full overflow-visible ${isMobileScreen ? 'py-[20px]' : 'py-[50px]'}`}
    >
      <div className="flex flex-col items-start w-full" style={{ color: textColor }}>
        {/* First line - Greeting */}
        <h2 
          className="font-['Playfair_Display:Regular',_sans-serif] leading-[1.2] mb-[10px] text-left w-full whitespace-nowrap"
          style={{ 
            fontSize: `${headerFontSize}px`,
            minHeight: `${headerLineHeight}px`
          }}
        >
          {!started ? (
            <span className="invisible">{greeting}</span>
          ) : step === "greet" ? (
            <TypewriterText
              key="greet-text"
              text={greeting}
              speed={typingSpeed}
              onDone={() => handleStepComplete("greet")}
              style={{ fontSize: `${headerFontSize}px` }}
              animationOn={animationOn}
            />
          ) : (
            <GreetingWithTooltip 
              greeting={greeting} 
              bgColor={tooltipBgColor} 
              tooltipTextColor={tooltipTextColor}
              fontSize={headerFontSize}
            />
          )}
        </h2>

        {/* Second line - "My name is" */}
        <h2 
          className="font-['Playfair_Display:Regular',_sans-serif] leading-[1.2] mb-[20px] text-left w-full whitespace-nowrap"
          style={{ 
            fontSize: `${headerFontSize}px`,
            minHeight: `${headerLineHeight}px`
          }}
        >
          {!started ? (
            <span className="invisible">My name is</span>
          ) : step === "line" ? (
            <TypewriterText
              key="line-text"
              text="My name is"
              speed={typingSpeed}
              onDone={() => handleStepComplete("line")}
              style={{ fontSize: `${headerFontSize}px` }}
              animationOn={animationOn}
            />
          ) : step === "name" || !animationOn ? (
            "My name is"
          ) : (
            <span className="invisible">&nbsp;</span>
          )}
        </h2>
        
        {/* Third line - Name */}
        <h1 
          className="font-['Playfair_Display:SemiBold',_sans-serif] font-semibold leading-[1.1] uppercase text-left w-full"
          style={{ 
            fontSize: `${nameFontSize}px`,
            minHeight: `${nameLineHeight}px`,
          }}
        >
          {!started ? (
            <span className="invisible">OSAMA</span>
          ) : step === "name" ? (
            <TypewriterText 
              key="name-text"
              text="OSAMA" 
              speed={typingSpeed}
              style={{ 
                fontSize: `${nameFontSize}px`,
                fontWeight: 600 
              }}
              animationOn={animationOn}
            />
          ) : (
            <span className="invisible">&nbsp;</span>
          )}
        </h1>
      </div>
    </div>
  );
}

export default function Text({ 
  typingSpeed = 100, 
  startDelay = 0, 
  animationOn = true, 
  tooltipBgColor = "#000", 
  tooltipTextColor = "#FFFFFF", 
  textColor = "#000000" 
}) {
  return (
    <div className="flex w-full h-full">
      <HeroText 
        typingSpeed={typingSpeed} 
        startDelay={startDelay} 
        animationOn={animationOn}
        tooltipBgColor={tooltipBgColor}
        tooltipTextColor={tooltipTextColor}
        textColor={textColor}
      />
    </div>
  );
}

defineProperties(Text, {
  typingSpeed: {
    label: "Typing speed (ms)",
    type: "number",
    defaultValue: 100,
  },
  startDelay: {
    label: "Start delay (ms)",
    type: "number",
    defaultValue: 0,
  },
  animationOn: {
    label: "Animation On",
    type: "boolean",
    defaultValue: true
  },
  tooltipBgColor: {
    label: "Tooltip Background",
    type: "string",
    defaultValue: "#000000"
  },
  tooltipTextColor: {
    label: "Tooltip Text Color",
    type: "string",
    defaultValue: "#FFFFFF"
  },
  textColor: {
    label: "Main Text Color",
    type: "string",
    defaultValue: "#000000"
  }
});
