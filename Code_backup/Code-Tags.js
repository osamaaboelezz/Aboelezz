import svgPaths from "./svg-wf8p67dsgr";
import { useActiveBreakpoint } from "figma:react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLayoutEffect } from "react";

interface SkillsTagProps {
  isExpanded?: "yes" | "no";
  breakpoint?: "Desktop" | "mobile";
  tag?: "Multidisciplinary" | "Multicultural" | "Multilingual";
  expanded?: boolean;
  onClick?: () => void;
}

// Helper accordion for smooth height animation on mobile
function SmoothHeight({ open, children }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState(0);

  useLayoutEffect(() => {
    if (open && ref.current) {
      setTarget(ref.current.scrollHeight);
    } else {
      setTarget(0);
    }
  }, [open, children]);

  // Update on window resize to keep height correct when open
  useEffect(() => {
    const handle = () => {
      if (open && ref.current) setTarget(ref.current.scrollHeight);
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [open]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: target, opacity: open ? 0.9 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

// Sequential Block Reveal component that shows hashtags with improved formatting
function SequentialBlockReveal({ textBlocks, isVisible, styles }) {
  // Process blocks to separate hashtags and regular text
  const processed = textBlocks.reduce((acc, txt, idx) => {
    if (txt.trim().startsWith('#')) {
      // This is a hashtag block - split it into individual hashtags
      const hashtags = txt.split(/\s+/).filter(word => word.startsWith('#'));
      
      // Add each hashtag with more spacing between them
      acc.push({
        type: 'hashtags',
        words: hashtags,
        style: styles[idx]
      });
    } else {
      // Regular text block
      acc.push({
        type: 'text',
        content: txt,
        style: styles[idx]
      });
    }
    return acc;
  }, []);

  // Calculate total items to animate (all hashtags + text blocks)
  const totalItems = processed.reduce((count, block) => {
    return count + (block.type === 'hashtags' ? block.words.length : 1);
  }, 0);

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setVisibleCount(0);
      return;
    }
    
    let cancelled = false;
    let i = 0;
    
    const reveal = () => {
      if (cancelled) return;
      setVisibleCount(prev => prev + 1);
      i += 1;
      if (i < totalItems) {
        setTimeout(reveal, 80); // 80ms delay between items
      }
    };
    
    setTimeout(reveal, 80);
    
    return () => {
      cancelled = true;
      setVisibleCount(0);
    };
  }, [isVisible, totalItems]);

  // Render hashtag blocks with inline spacing and text blocks with block display
  return (
    <>
      {processed.map((block, blockIndex) => {
        if (block.type === 'hashtags') {
          // Render hashtags inline with spacing
          return (
            <div key={blockIndex} className="flex flex-wrap gap-x-3 mb-[5px]">
              {block.words.map((hashtag, hashIndex) => {
                // Calculate item position in the global sequence
                let itemPosition = 0;
                for (let i = 0; i < blockIndex; i++) {
                  itemPosition += processed[i].type === 'hashtags' 
                    ? processed[i].words.length 
                    : 1;
                }
                itemPosition += hashIndex;
                
                return (
                  <motion.span
                    key={hashIndex}
                    className={`${block.style.replace('block', 'inline-block')} text-[#000000]`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: itemPosition < visibleCount ? 1 : 0 
                    }}
                    transition={{ duration: 0.12 }}
                    dir={block.style.includes('dir="auto"') ? 'auto' : undefined}
                  >
                    {hashtag}
                  </motion.span>
                );
              })}
            </div>
          );
        } else {
          // Render regular text as block
          // Calculate position in sequence
          let itemPosition = 0;
          for (let i = 0; i < blockIndex; i++) {
            itemPosition += processed[i].type === 'hashtags' 
              ? processed[i].words.length 
              : 1;
          }
          
          return (
            <motion.p
              key={blockIndex}
              className={block.style}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: itemPosition < visibleCount ? 1 : 0 
              }}
              transition={{ duration: 0.12 }}
              dir={block.style.includes('dir="auto"') ? 'auto' : undefined}
            >
              {block.content}
            </motion.p>
          );
        }
      })}
    </>
  );
}

// Define the heading content for each tag
const headingContent = {
  Multidisciplinary: "Multidisciplinary lens",
  Multicultural: "Multicultural insight",
  Multilingual: "Multilingual fluency"
};

function FitHeadline({ text, fontSize }) {
  // fontSize is expected to be a number (px)
  const baseFont = fontSize;
  const headlineRef = useRef<HTMLParagraphElement | null>(null);
  const [currentSize, setCurrentSize] = useState<number>(baseFont);

  useEffect(() => {
    const resizeText = () => {
      if (!headlineRef.current) return;

      // reset to base size first to measure correctly
      headlineRef.current.style.fontSize = `${baseFont}px`;
      const containerWidth = headlineRef.current.parentElement?.offsetWidth ?? 0;
      const textWidth = headlineRef.current.scrollWidth;

      if (containerWidth === 0) return;
      const scale = containerWidth / textWidth;
      const newSize = Math.min(baseFont * scale, baseFont * 1.25); // cap upscale 1.25
      setCurrentSize(newSize);
    };

    resizeText();
    window.addEventListener("resize", resizeText);
    return () => window.removeEventListener("resize", resizeText);
  }, [baseFont, text]);

  return (
    <p
      ref={headlineRef}
      className="block leading-tight w-full"
      style={{ fontSize: `${currentSize}px` }}
    >
      {text}
    </p>
  );
}

function SkillsTag({
  isExpanded = "no",
  breakpoint = "Desktop",
  tag = "Multidisciplinary",
  expanded = false,
  onClick = () => {},
}: SkillsTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  
  const handleMouseEnter = () => {
    if (breakpoint === "Desktop") {
      setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (breakpoint === "Desktop") {
      setIsHovered(false);
    }
  };
  
  // Content for each tag
  const hashtagsContent = {
    Multidisciplinary: {
      texts: [
        "#Automotive_UI #Design_Systems #HMI_SDK #Usability #Product_Design #Generative_Design",
        "and in my previous life i used to do",
        "#Architecture #3D #Motion_Design"
      ],
      styles: [
        "block mb-[5px] whitespace-normal",
        "block mb-[5px] text-[#EEBA05] font-semibold",
        "block mb-[5px] whitespace-normal"
      ]
    },
    Multicultural: {
      texts: [
        "#Japan #Egypt #USA #UK #South_Korea #Germany",
        "and I have a lot of stories to tell"
      ],
      styles: [
        "block mb-[5px] whitespace-normal",
        "block mb-[5px] text-[#EEBA05] font-semibold"
      ]
    },
    Multilingual: {
      texts: [
        "#English #German #اَلْعَرَبِيَّةُ",
        "and working my way through",
        "#Español"
      ],
      styles: [
        "block mb-[5px] whitespace-normal dir=\"auto\"",
        "block mb-[5px] text-[#EEBA05] font-semibold dir=\"auto\"",
        "block mb-[5px] whitespace-normal dir=\"auto\""
      ]
    }
  };

  const currentHashtags = hashtagsContent[tag];
  const isMobile = breakpoint === "mobile";
  const showContent = isMobile ? expanded : isHovered;
  const fontSize = isMobile ? 25 : 40;
  const headingText = headingContent[tag];

  if (
    isExpanded === "no" &&
    breakpoint === "Desktop" &&
    tag === "Multicultural"
  ) {
    return (
      <div
        className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-6 px-0 relative size-full"
        data-name="is expanded=no, Breakpoint=Desktop, Tag=Multicultural"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="basis-0 font-['Playfair_Display:SemiBold',_sans-serif] font-semibold grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] tracking-[-0.8px] w-full">
          <FitHeadline text={headingText} fontSize={fontSize} />
        </div>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 w-full flex flex-col font-['Manrope:Medium',_sans-serif] font-medium justify-center leading-[1.5] opacity-70 text-[16px] mt-4"
          >
            <SequentialBlockReveal 
              textBlocks={currentHashtags.texts} 
              isVisible={isHovered} 
              styles={currentHashtags.styles}
            />
          </motion.div>
        )}
      </div>
    );
  }
  if (
    isExpanded === "no" &&
    breakpoint === "Desktop" &&
    tag === "Multilingual"
  ) {
    return (
      <div
        className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-6 px-0 relative size-full"
        data-name="is expanded=no, Breakpoint=Desktop, Tag=Multilingual"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="basis-0 font-['Playfair_Display:SemiBold',_sans-serif] font-semibold grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] tracking-[-0.8px] w-full">
          <FitHeadline text={headingText} fontSize={fontSize} />
        </div>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 w-full flex flex-col font-['Manrope:Medium',_'Noto_Sans_Arabic:Regular',_sans-serif] font-medium justify-center leading-[1.5] opacity-70 text-[16px] mt-4"
          >
            <SequentialBlockReveal 
              textBlocks={currentHashtags.texts} 
              isVisible={isHovered} 
              styles={currentHashtags.styles}
            />
          </motion.div>
        )}
      </div>
    );
  }
  if (
    isExpanded === "yes" &&
    breakpoint === "Desktop" &&
    tag === "Multidisciplinary"
  ) {
    return (
      <div
        className="box-border content-stretch flex flex-col gap-4 items-start justify-start leading-[0] pb-0 pt-6 px-0 relative size-full text-[#000000] text-left"
        data-name="is expanded=yes, Breakpoint=Desktop, Tag=Multidisciplinary"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="font-['Playfair_Display:SemiBold',_sans-serif] font-semibold relative shrink-0 tracking-[-0.8px] w-full text-[#000000]">
          <FitHeadline text={headingText} fontSize={fontSize} />
        </div>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="flex flex-col font-['Manrope:Medium',_sans-serif] font-medium justify-center leading-[1.5] opacity-70 relative shrink-0 text-[16px] w-full text-[#000000]"
          >
            <SequentialBlockReveal 
              textBlocks={currentHashtags.texts} 
              isVisible={isHovered} 
              styles={currentHashtags.styles}
            />
          </motion.div>
        )}
      </div>
    );
  }
  if (
    isExpanded === "yes" &&
    breakpoint === "Desktop" &&
    tag === "Multicultural"
  ) {
    return (
      <div
        className="box-border content-stretch flex flex-col gap-4 items-start justify-start leading-[0] pb-0 pt-6 px-0 relative size-full text-[#000000] text-left"
        data-name="is expanded=yes, Breakpoint=Desktop, Tag=Multicultural"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="font-['Playfair_Display:SemiBold',_sans-serif] font-semibold relative shrink-0 tracking-[-0.8px] w-full text-[#000000]">
          <FitHeadline text={headingText} fontSize={fontSize} />
        </div>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="flex flex-col font-['Manrope:Medium',_sans-serif] font-medium justify-center leading-[1.5] opacity-70 relative shrink-0 text-[16px] w-full text-[#000000]"
          >
            <SequentialBlockReveal 
              textBlocks={currentHashtags.texts} 
              isVisible={isHovered} 
              styles={currentHashtags.styles}
            />
          </motion.div>
        )}
      </div>
    );
  }
  if (
    isExpanded === "yes" &&
    breakpoint === "Desktop" &&
    tag === "Multilingual"
  ) {
    return (
      <div
        className="box-border content-stretch flex flex-col gap-4 items-start justify-start leading-[0] pb-0 pt-6 px-0 relative size-full text-[#000000] text-left"
        data-name="is expanded=yes, Breakpoint=Desktop, Tag=Multilingual"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="font-['Playfair_Display:SemiBold',_sans-serif] font-semibold relative shrink-0 tracking-[-0.8px] w-full text-[#000000]">
          <FitHeadline text={headingText} fontSize={fontSize} />
        </div>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="flex flex-col font-['Manrope:Medium',_sans-serif] font-medium justify-center leading-[1.5] opacity-70 relative shrink-0 text-[16px] w-full text-[#000000]"
          >
            <SequentialBlockReveal 
              textBlocks={currentHashtags.texts} 
              isVisible={isHovered} 
              styles={currentHashtags.styles}
            />
          </motion.div>
        )}
      </div>
    );
  }
  // New mobile implementation for Multidisciplinary
  if (
    breakpoint === "mobile" &&
    tag === "Multidisciplinary"
  ) {
    return (
      <div className="w-full mb-[15px]">
        <div
          className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-6 px-0 relative w-full cursor-pointer"
          data-name="Mobile Tag=Multidisciplinary"
          onClick={onClick}
        >
          <div className="relative shrink-0 size-[30px]" data-name="ICN">
            <div className="absolute bottom-[18.75%] flex items-center justify-center left-[31.249%] right-[33.208%] top-[18.749%]">
              <motion.div 
                className="flex-none h-[17.061px] w-[30px]"
                animate={{ rotate: expanded ? 180 : 90 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative size-full"
                  data-name="Polygon 2 (Stroke)"
                >
                  <svg
                    aria-hidden="true"
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 19 11"
                  >
                    <path
                      d={svgPaths.p6233d80}
                      fill="#000000"
                      id="Polygon 2 (Stroke)"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="basis-0 font-['Playfair_Display:SemiBold',_sans-serif] font-semibold grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] tracking-[-0.5px] pr-2">
            <FitHeadline text={headingText} fontSize={fontSize} />
          </div>
        </div>
        
        <SmoothHeight open={expanded}>
          <div className="pl-10 pt-4 pb-4">
            <SequentialBlockReveal
              textBlocks={currentHashtags.texts}
              isVisible={expanded}
              styles={currentHashtags.styles}
            />
          </div>
        </SmoothHeight>
      </div>
    );
  }
  // New mobile implementation for Multicultural
  if (
    breakpoint === "mobile" &&
    tag === "Multicultural"
  ) {
    return (
      <div className="w-full mb-[15px]">
        <div
          className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-6 px-0 relative w-full cursor-pointer"
          data-name="Mobile Tag=Multicultural"
          onClick={onClick}
        >
          <div className="relative shrink-0 size-[30px]" data-name="ICN">
            <div className="absolute bottom-[18.75%] flex items-center justify-center left-[31.249%] right-[33.208%] top-[18.749%]">
              <motion.div 
                className="flex-none h-[17.061px] w-[30px]"
                animate={{ rotate: expanded ? 180 : 90 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative size-full"
                  data-name="Polygon 2 (Stroke)"
                >
                  <svg
                    aria-hidden="true"
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 19 11"
                  >
                    <path
                      d={svgPaths.p6233d80}
                      fill="#000000"
                      id="Polygon 2 (Stroke)"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="basis-0 font-['Playfair_Display:SemiBold',_sans-serif] font-semibold grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] tracking-[-0.5px] pr-2">
            <FitHeadline text={headingText} fontSize={fontSize} />
          </div>
        </div>
        
        <SmoothHeight open={expanded}>
          <div className="pl-10 pt-4 pb-4">
            <SequentialBlockReveal
              textBlocks={currentHashtags.texts}
              isVisible={expanded}
              styles={currentHashtags.styles}
            />
          </div>
        </SmoothHeight>
      </div>
    );
  }
  // New mobile implementation for Multilingual
  if (
    breakpoint === "mobile" &&
    tag === "Multilingual"
  ) {
    return (
      <div className="w-full mb-[15px]">
        <div
          className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-6 px-0 relative w-full cursor-pointer"
          data-name="Mobile Tag=Multilingual"
          onClick={onClick}
        >
          <div className="relative shrink-0 size-[30px]" data-name="ICN">
            <div className="absolute bottom-[18.75%] flex items-center justify-center left-[31.249%] right-[33.208%] top-[18.749%]">
              <motion.div 
                className="flex-none h-[17.061px] w-[30px]"
                animate={{ rotate: expanded ? 180 : 90 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative size-full"
                  data-name="Polygon 2 (Stroke)"
                >
                  <svg
                    aria-hidden="true"
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 19 11"
                  >
                    <path
                      d={svgPaths.p6233d80}
                      fill="#000000"
                      id="Polygon 2 (Stroke)"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="basis-0 font-['Playfair_Display:SemiBold',_sans-serif] font-semibold grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] tracking-[-0.5px] pr-2">
            <FitHeadline text={headingText} fontSize={fontSize} />
          </div>
        </div>
        
        <SmoothHeight open={expanded}>
          <div className="pl-10 pt-4 pb-4">
            <SequentialBlockReveal
              textBlocks={currentHashtags.texts}
              isVisible={expanded}
              styles={currentHashtags.styles}
            />
          </div>
        </SmoothHeight>
      </div>
    );
  }
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-0 pt-6 px-0 relative size-full"
      data-name="is expanded=no, Breakpoint=Desktop, Tag=Multidisciplinary"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="basis-0 font-['Playfair_Display:SemiBold',_sans-serif] font-semibold grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] tracking-[-0.8px] w-full">
        <FitHeadline text={headingText} fontSize={fontSize} />
      </div>
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          className="absolute top-full left-0 w-full flex flex-col font-['Manrope:Medium',_sans-serif] font-medium justify-center leading-[1.5] opacity-70 text-[16px] mt-4"
        >
          <SequentialBlockReveal 
            textBlocks={currentHashtags.texts} 
            isVisible={isHovered} 
            styles={currentHashtags.styles}
          />
        </motion.div>
      )}
    </div>
  );
}

function Frame1Desktop() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative w-full h-auto" style={{ gap: 'clamp(16px,4vw,48px)' }}>
      <div
        className="basis-0 max-w-[352px] box-border content-stretch flex flex-col gap-4 grow items-start justify-start leading-[0] min-h-px min-w-px pb-0 pt-6 px-0 relative shrink-0 text-[#000000] text-left"
        data-name="Skills tag"
      >
        <SkillsTag isExpanded="no" />
      </div>
      <div
        className="basis-0 max-w-[352px] box-border content-stretch flex flex-col gap-4 grow items-start justify-start leading-[0] min-h-px min-w-px pb-0 pt-6 px-0 relative shrink-0 text-[#000000] text-left"
        data-name="Skills tag"
      >
        <SkillsTag isExpanded="no" tag="Multicultural" />
      </div>
      <div
        className="basis-0 max-w-[352px] box-border content-stretch flex flex-col gap-4 grow items-start justify-start leading-[0] min-h-px min-w-px pb-0 pt-6 px-0 relative shrink-0 text-[#000000] text-left"
        data-name="Skills tag"
      >
        <SkillsTag isExpanded="no" tag="Multilingual" />
      </div>
    </div>
  );
}

function Frame1Tablet() {
  return (
    <div className="[flex-flow:wrap] box-border content-end flex items-end justify-between p-0 relative w-full h-auto" style={{ gap: 'clamp(16px,4vw,48px)' }}>
      <div
        className="basis-0 max-w-[352px] box-border content-stretch flex flex-col gap-4 grow items-start justify-start leading-[0] min-h-px min-w-px pb-0 pt-6 px-0 relative shrink-0 text-[#000000] text-left"
        data-name="Skills tag"
      >
        <SkillsTag isExpanded="no" />
      </div>
      <div
        className="basis-0 max-w-[352px] box-border content-stretch flex flex-col gap-4 grow items-start justify-start leading-[0] min-h-px min-w-px pb-0 pt-6 px-0 relative shrink-0 text-[#000000] text-left"
        data-name="Skills tag"
      >
        <SkillsTag isExpanded="no" tag="Multicultural" />
      </div>
      <div
        className="basis-0 max-w-[352px] box-border content-stretch flex flex-col gap-4 grow items-start justify-start leading-[0] min-h-px min-w-px pb-0 pt-6 px-0 relative shrink-0 text-[#000000] text-left"
        data-name="Skills tag"
      >
        <SkillsTag isExpanded="no" tag="Multilingual" />
      </div>
    </div>
  );
}

function Frame1Mobile() {
  const [expandedTag, setExpandedTag] = useState(null);
  
  const toggleExpand = (tag) => {
    if (expandedTag === tag) {
      setExpandedTag(null);
    } else {
      setExpandedTag(tag);
    }
  };

  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full h-auto">
      <div className="w-full">
        <SkillsTag 
          breakpoint="mobile" 
          tag="Multidisciplinary" 
          expanded={expandedTag === "Multidisciplinary"}
          onClick={() => toggleExpand("Multidisciplinary")}
        />
      </div>
      <div className="w-full">
        <SkillsTag 
          breakpoint="mobile" 
          tag="Multicultural"
          expanded={expandedTag === "Multicultural"} 
          onClick={() => toggleExpand("Multicultural")}
        />
      </div>
      <div className="w-full">
        <SkillsTag 
          breakpoint="mobile" 
          tag="Multilingual"
          expanded={expandedTag === "Multilingual"} 
          onClick={() => toggleExpand("Multilingual")}
        />
      </div>
    </div>
  );
}

function Frame1() {
  const { width } = useActiveBreakpoint();
  if (width < 800) {
    return <Frame1Mobile />;
  }
  if (width < 1280) {
    return <Frame1Tablet />;
  }
  return <Frame1Desktop />;
}

export default Frame1;
