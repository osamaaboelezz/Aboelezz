import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useActiveBreakpoint, defineProperties } from "figma:react";

// Import the image assets
import imgProjectImage from "figma:asset/839343fb69878e8381043fb552fb4606792b2215.png";
import imgProjectImage1 from "figma:asset/42fd5cc5fc608f914cc8cbf421096d823c2158e5.png";
import imgProjectImage2 from "figma:asset/26e8719ac2c93cf33f99ca2554d958b597fd46ac.png";
import imgProjectImage3 from "figma:asset/f31b1d04158a92e03f5c6a8138a790ac4dcfccdf.png";
import imgProjectImage4 from "figma:asset/5b459173c2aa49663712359c5f7872b70d3ae403.png";
import imgProjectImage5 from "figma:asset/b7f4240b0747342b4d7ffde3cbec757fcc750a58.png";
import imgProjectImage6 from "figma:asset/a6926551867872437e47da82044f0e223ca9cc71.png";
import imgProjectImage7 from "figma:asset/62c5c21fdf900582f8476b8335e34d789e0ae9a5.png";
import imgProjectImage8 from "figma:asset/d96c9dc88bc097e3e7d7bdce07113c1ba7c28492.png";
import imgProjectImage9 from "figma:asset/d2bebda24affecdc70a5e50cf90e5b9303c4aeee.png";
import imgProjectImage10 from "figma:asset/de999e8a02951fd4716e4d11571920f16fd9b150.png";
import imgProjectImage11 from "figma:asset/8aea919932f896cb790e6c7d099bca132fc33135.png";

// Mobile Image Modal - Simplified version
function MobileImageModal({ 
  isOpen, 
  image, 
  onClose, 
  projectName, 
  modalBgColor = "#000000", 
  modalBgOpacity = 0.85,
  modalForegroundColor = "#FFFFFF",
  modalBgBlur = 0,
  allImages = [],
  allProjectNames = [],
  currentIndex = 0,
  onNavigate,
  backgroundPosition = "center",
  backgroundSize = "cover",
  backgroundRepeat = "no-repeat",
  animationSpeed = 0.3
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isScaled, setIsScaled] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const scrollPosRef = useRef(0);
  const originalStyleRef = useRef(null);
  
  // Reset touch points and swipe state when modal opens/closes
  useEffect(() => {
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
    setSwipeDirection(null);
    setSwipeProgress(0);
  }, [isOpen]);
  
  // Handle opening/closing of modal
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Store current scroll position
      scrollPosRef.current = window.scrollY;
      
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Store original styles for later restoration
      originalStyleRef.current = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight
      };
      
      // Hide scrollbar
      document.body.style.overflow = 'hidden';
      
      // Add padding to compensate for scrollbar disappearance
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Trigger scale animation after a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsScaled(true);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setIsScaled(false);
      
      // Small delay to allow slide-out animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        
        // Restore original body styles
        if (originalStyleRef.current) {
          if (originalStyleRef.current.overflow) {
            document.body.style.overflow = originalStyleRef.current.overflow;
          } else {
            document.body.style.removeProperty('overflow');
          }
          
          if (originalStyleRef.current.paddingRight) {
            document.body.style.paddingRight = originalStyleRef.current.paddingRight;
          } else {
            document.body.style.removeProperty('padding-right');
          }
        }
        
        // Restore scroll position
        window.scrollTo(0, scrollPosRef.current);
      }, animationSpeed * 1000); // Use animationSpeed for timing
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationSpeed]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          navigatePrev();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);
  
  if (!isVisible && !isOpen) return null;

  // Helper convert hex to rgba
  const hexToRgba = (hex, opacity) => {
    const parsedHex = hex.replace('#', '')
    const bigint = parseInt(parsedHex.length === 3 ? parsedHex.split('').map(c=>c+c).join('') : parsedHex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const overlayStyle = {
    backgroundColor: hexToRgba(modalBgColor, modalBgOpacity),
    backdropFilter: modalBgBlur > 0 ? `blur(${modalBgBlur}px)` : undefined,
    WebkitBackdropFilter: modalBgBlur > 0 ? `blur(${modalBgBlur}px)` : undefined,
    opacity: 1,
    transform: isScaled ? 'translateY(0)' : 'translateY(100%)',
    transition: swipeDirection ? 'none' : `transform ${animationSpeed}s ease-out`
  }
  
  const foregroundStyle = {
    color: modalForegroundColor
  }

  
  
  // Navigation helpers
  const navigateNext = () => {
    if (onNavigate) {
      const nextIndex = (currentIndex + 1) % allImages.length;
      onNavigate(nextIndex);
    }
  };
  
  const navigatePrev = () => {
    if (onNavigate) {
      const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
      onNavigate(prevIndex);
    }
  };
  
  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    e.stopPropagation();
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };
  
  const handleTouchMove = (e) => {
    e.stopPropagation();
    
    // Update current touch position
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
    
    // Calculate distances
    const horizontalDistance = touchStart.x - e.touches[0].clientX;
    const verticalDistance = touchStart.y - e.touches[0].clientY;
    
    // Determine primary swipe direction
    if (!swipeDirection) {
      if (Math.abs(horizontalDistance) > 10 || Math.abs(verticalDistance) > 10) {
        setSwipeDirection(
          Math.abs(horizontalDistance) > Math.abs(verticalDistance) 
            ? 'horizontal' 
            : 'vertical'
        );
      }
    }
    
    // Update swipe progress based on direction
    if (swipeDirection === 'horizontal') {
      // For horizontal, we calculate progress as percentage of screen width
      const progress = horizontalDistance / window.innerWidth;
      setSwipeProgress(progress);
      
      // Apply transform to image for visual feedback
      if (contentRef.current) {
        contentRef.current.style.transform = `translateX(${-horizontalDistance}px)`;
        contentRef.current.style.opacity = `${1 - Math.abs(progress * 0.5)}`;
      }
    } else if (swipeDirection === 'vertical' && verticalDistance < 0) {
      // For vertical (only downward), we calculate as percentage of 1/4 screen height
      const progress = Math.min(Math.abs(verticalDistance) / (window.innerHeight / 4), 1);
      setSwipeProgress(progress);
      
      // Apply transform to entire container for visual feedback
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${Math.abs(verticalDistance)}px)`;
        containerRef.current.style.opacity = `${1 - progress * 0.5}`;
      }
    }
  };
  
  const handleTouchEnd = (e) => {
    e.stopPropagation();
    
    // Only process if we have valid touch points
    if (!touchStart.x || !touchEnd.x) {
      resetSwipeState();
      return;
    }
    
    // Calculate final distances
    const horizontalDistance = touchStart.x - touchEnd.x;
    const verticalDistance = touchStart.y - touchEnd.y;
    
    // Process based on detected swipe direction
    if (swipeDirection === 'horizontal') {
      // Horizontal swipe - minimum threshold of 50px or 15% of screen width
      const threshold = Math.min(50, window.innerWidth * 0.15);
      
      if (Math.abs(horizontalDistance) > threshold) {
        if (horizontalDistance > 0) {
          // Swipe left - go to next
          navigateNext();
        } else {
          // Swipe right - go to previous
          navigatePrev();
        }
      }
      
      // Reset content transform regardless of threshold
      if (contentRef.current) {
        contentRef.current.style.transform = '';
        contentRef.current.style.opacity = '';
      }
    } else if (swipeDirection === 'vertical') {
      // Vertical swipe - minimum threshold of 75px or 20% of screen height
      const threshold = Math.min(75, window.innerHeight * 0.2);
      
      if (verticalDistance < -threshold) {
        // Swipe down - close modal
        onClose();
      } else {
        // Reset container transform
        if (containerRef.current) {
          containerRef.current.style.transform = '';
          containerRef.current.style.opacity = '';
        }
      }
    }
    
    // Reset swipe state
    resetSwipeState();
  };
  
  // Reset all swipe-related state
  const resetSwipeState = () => {
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
    setSwipeDirection(null);
    setSwipeProgress(0);
    
    // Reset any applied transforms
    if (contentRef.current) {
      contentRef.current.style.transform = '';
      contentRef.current.style.opacity = '';
    }
    
    if (containerRef.current) {
      containerRef.current.style.transform = '';
      containerRef.current.style.opacity = '';
    }
  };
  
  // Prevent default on touch events to avoid browser back/forward gestures
  const preventDefaultTouch = (e) => {
    if (swipeDirection) {
      e.preventDefault();
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col"
      style={overlayStyle}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => {
        handleTouchMove(e);
        preventDefaultTouch(e);
      }}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={resetSwipeState}
    >
      {/* Header - 64px height */}
      <div className="h-16 flex items-center px-4 relative">
        <button 
          className="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-75 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          style={foregroundStyle}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      
      {/* Main content area - fills remaining space */}
      <div 
        className="flex-1 relative flex items-center justify-center"
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="w-full h-full flex items-center justify-center px-4"
        >
          <img 
            src={image}
            alt={projectName || "Image"}
            className="max-w-full max-h-[calc(100vh-104px)] object-contain"
            style={{
              backgroundPosition,
              backgroundSize,
              backgroundRepeat,
              transform: isScaled ? 'scale(1)' : 'scale(0.95)',
              transition: `transform ${animationSpeed}s ease-in-out`
            }}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        
        {/* Swipe hints/indicators for mobile */}
        {allImages.length > 1 && (
          <div className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none">
            <div 
              className="px-3 py-1 bg-black bg-opacity-50 rounded-full text-white text-xs"
              style={{ opacity: swipeDirection ? 0 : 0.7 }}
            >
              Swipe to navigate • {currentIndex + 1}/{allImages.length}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer - 40px height */}
      <div className="h-10 flex flex-col items-center justify-center px-4 mb-4">
        {projectName && (
          <div 
            className="text-center text-sm font-medium"
            style={foregroundStyle}
          >
            {projectName}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageModal({ 
  isOpen, 
  image, 
  onClose, 
  projectName, 
  projectDescription = "",
  modalBgColor = "#000000", 
  modalBgOpacity = 0.85, 
  modalBgBlur = 0,
  modalForegroundColor = "#FFFFFF",
  allImages = [],
  allProjectNames = [],
  allProjectDescriptions = [],
  currentIndex = 0,
  onNavigate,
  animationSpeed = 0.4 // Default to 0.4s if not provided
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isScaled, setIsScaled] = useState(false);
  const modalContentRef = useRef(null);
  const scrollPosRef = useRef(0);
  const originalStyleRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Reset touch points when modal opens/closes
  useEffect(() => {
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  }, [isOpen]);
  
  // Handle modal open/close
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsScaled(true);
      
      // Store current scroll position
      scrollPosRef.current = window.scrollY;
      
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Store original styles for later restoration
      originalStyleRef.current = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight
      };
      
      // Hide scrollbar
      document.body.style.overflow = 'hidden';
      
      // Add padding to compensate for scrollbar disappearance
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      setIsScaled(false);
      
      // Small delay to allow slide-out animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        
        // Restore original body styles
        if (originalStyleRef.current) {
          if (originalStyleRef.current.overflow) {
            document.body.style.overflow = originalStyleRef.current.overflow;
          } else {
            document.body.style.removeProperty('overflow');
          }
          
          if (originalStyleRef.current.paddingRight) {
            document.body.style.paddingRight = originalStyleRef.current.paddingRight;
          } else {
            document.body.style.removeProperty('padding-right');
          }
        }
        
        // Restore scroll position
        window.scrollTo(0, scrollPosRef.current);
      }, animationSpeed * 1000); // Use animationSpeed for timing
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationSpeed]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrev(e);
          break;
        case 'ArrowRight':
          handleNext(e);
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);
  
  if (!isVisible && !isOpen) return null;

  // Helper convert hex to rgba
  const hexToRgba = (hex, opacity) => {
    const parsedHex = hex.replace('#', '')
    const bigint = parseInt(parsedHex.length === 3 ? parsedHex.split('').map(c=>c+c).join('') : parsedHex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const overlayStyle = {
    backgroundColor: hexToRgba(modalBgColor, modalBgOpacity),
    backdropFilter: modalBgBlur > 0 ? `blur(${modalBgBlur}px)` : undefined,
    WebkitBackdropFilter: modalBgBlur > 0 ? `blur(${modalBgBlur}px)` : undefined,
    transition: `transform ${animationSpeed}s ease-out`, // Use animationSpeed prop
    opacity: 1, // keep fully opaque; no fade during open/close
    transform: isOpen && isVisible ? 'translateY(0)' : 'translateY(100%)',
    pointerEvents: 'auto'
  }
  
  const foregroundStyle = {
    color: modalForegroundColor
  }
  
  // preserve original aspect ratio only for project 2 (index 1)
  const isProject2 = currentIndex === 1;
  
  // Calculate available height (viewport height - 160px for header/footer)
  const availableHeight = windowSize.height - 160;
  // Calculate max width to maintain 2:1 aspect ratio
  const maxWidth = availableHeight * 2;
  // Determine if we need to limit width based on viewport
  const shouldLimitWidth = windowSize.width > maxWidth;
  
  const imageContainerStyle = {
    width: shouldLimitWidth ? maxWidth : '100%',
    margin: shouldLimitWidth ? '0 auto' : undefined,
    maxHeight: 'calc(100vh - 160px)',
    aspectRatio: '16/9',
  };
  
  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (onNavigate) {
      const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
      onNavigate(prevIndex);
    }
  };
  
  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (onNavigate) {
      const nextIndex = (currentIndex + 1) % allImages.length;
      onNavigate(nextIndex);
    }
  };
  
  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };
  
  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;
    
    const horizontalDistance = touchStart.x - touchEnd.x;
    const verticalDistance = touchStart.y - touchEnd.y;
    
    // Determine if it's a horizontal or vertical swipe
    if (Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
      // Horizontal swipe - minimum threshold of 50px
      if (Math.abs(horizontalDistance) > 50) {
        if (horizontalDistance > 0) {
          // Swipe left - go to next
          handleNext();
        } else {
          // Swipe right - go to previous
          handlePrev();
        }
      }
    } else {
      // Vertical swipe - minimum threshold of 100px
      if (verticalDistance < -100) {
        // Swipe down - close modal
        onClose();
      }
    }
    
    // Reset touch points
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col"
      style={overlayStyle}
      onClick={onClose}
    >
      <div className="relative w-full h-full">
        {/* Header with minimized button horizontally aligned with left arrow */}
        <div className="absolute top-0 left-0 w-[80px] h-[80px] flex items-center justify-center z-30">
          <button 
            className="h-[48px] flex items-center justify-center transition-opacity hover:opacity-75 cursor-pointer"
            onClick={onClose}
            aria-label="Close"
            style={foregroundStyle}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="12 18 24 30 36 18"></polyline>
            </svg>
          </button>
        </div>
        
        {/* Main content area - fills remaining space */}
        <div 
          className="h-full flex items-center justify-center px-[80px]"
          ref={modalContentRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left arrow navigation */}
          {allImages.length > 1 && (
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[80px] h-[80px] flex items-center justify-center transition-opacity hover:opacity-75 cursor-pointer"
              onClick={handlePrev}
              aria-label="Previous image"
              style={foregroundStyle}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="30 12 18 24 30 36"></polyline>
              </svg>
            </button>
          )}
          
          {/* Right arrow navigation */}
          {allImages.length > 1 && (
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[80px] h-[80px] flex items-center justify-center transition-opacity hover:opacity-75 cursor-pointer"
              onClick={handleNext}
              aria-label="Next image"
              style={foregroundStyle}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 12 30 24 18 36"></polyline>
              </svg>
            </button>
          )}
          
          <div className="w-full h-full flex items-center justify-center p-6" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                ...imageContainerStyle,
                backgroundImage: `url('${image}')`,
                backgroundPosition: 'center',
                backgroundSize: isProject2 ? 'contain' : 'cover',
                backgroundRepeat: 'no-repeat',
                transform: isScaled ? 'scale(1)' : 'scale(0.95)',
                transition: `transform ${animationSpeed}s ease-in-out` // Use animationSpeed
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        
        {/* Footer - centered project name and description */}
        <div className="absolute bottom-0 left-0 right-0 h-[80px] flex items-center justify-center">
          <div className="text-center">
            {projectName && (
              <div className="text-lg font-medium" style={foregroundStyle}>
                {projectName}
              </div>
            )}
            {projectDescription && (
              <div className="mt-1 opacity-80" style={foregroundStyle}>
                {projectDescription}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Smooth height based ExpandedItemDetails component (no jump, respects animationSpeed)
function ExpandedItemDetails({
  projectName,
  projectDescription,
  descriptionBgColor = "transparent",
  descriptionTextColor = "#FFFFFF",
  descriptionFontSize = 16,
  fontFamily = "Inter, sans-serif",
  animationSpeed = 0.3,
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: animationSpeed, ease: "easeInOut" }}
      style={{ backgroundColor: descriptionBgColor, overflow: "hidden" }}
      className="w-full"
    >
      <div className="px-4 py-3 text-center">
        <h3
          className="font-medium"
          style={{ color: descriptionTextColor, fontSize: descriptionFontSize, fontFamily }}
        >
          {projectName}
        </h3>
        {projectDescription && (
          <p
            className="mt-1 opacity-80"
            style={{ color: descriptionTextColor, fontSize: descriptionFontSize * 0.9, fontFamily }}
          >
            {projectDescription}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function MobileGalleryItem({
  image,
  backgroundPosition = "center",
  backgroundSize = "cover",
  backgroundRepeat = "no-repeat",
  className = "",
  projectName = "Project Name",
  projectDescription = "",
  onImageClick,
  imageIndex,
  itemRef,
  expandedIndex,
  handleExpandToggle,
  displayMode,
  descriptionBgColor,
  descriptionTextColor,
  descriptionFontSize,
  fontFamily,
  animationSpeed = 0.3, // Animation speed parameter
}) {
  const containerRef = useRef(null);
  
  // Use the forwarded ref if provided, otherwise use internal ref
  const ref = itemRef || containerRef;
  
  // Define isExpanded before using it in the imageLayerStyle
  const isExpanded = expandedIndex === imageIndex;
  
  const imageLayerStyle = {
    backgroundImage: `url('${image}')`,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat,
    transform: isExpanded ? 'scale(1.05)' : 'scale(1)',
    transition: `transform ${animationSpeed}s ease-in-out` // Use animationSpeed
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (displayMode === 'overlay') {
      if (onImageClick && typeof imageIndex === 'number') {
        onImageClick(imageIndex, {
          backgroundPosition,
          backgroundSize,
          backgroundRepeat
        });
      }
    } else {
      // Inline expansion mode
      handleExpandToggle(imageIndex);
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={ref}
        className={`relative rounded-2xl shrink-0 w-full overflow-hidden cursor-pointer ${className}`}
        onClick={handleClick}
      >
        <div className="absolute inset-0" style={imageLayerStyle} />
      </div>
      
      {/* Show expanded details if this item is expanded */}
      <AnimatePresence mode="wait">
        {isExpanded && displayMode === 'inline' && (
          <ExpandedItemDetails 
            projectName={projectName}
            projectDescription={projectDescription}
            descriptionBgColor={descriptionBgColor}
            descriptionTextColor={descriptionTextColor}
            descriptionFontSize={descriptionFontSize}
            fontFamily={fontFamily}
            animationSpeed={animationSpeed} // Pass animation speed
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryItem({
  image, 
  backgroundPosition = "center",
  backgroundSize = "cover",
  backgroundRepeat = "no-repeat",
  className = "",
  projectName = "Project Name",
  projectDescription = "",
  overlayColor = "#FFFFFF",
  overlayOpacity = 0.1,
  textContent = "Project Name",
  fontFamily = "Inter, sans-serif",
  fontColor = "#FFFFFF",
  fontSize = 18,
  textVAlign = "bottom", // "top" | "middle" | "bottom"
  isLink = false,
  onImageClick,
  imageIndex,
  isMobile = false,
  itemRef,
  expandedIndex,
  handleExpandToggle,
  displayMode,
  descriptionBgColor,
  descriptionTextColor,
  descriptionFontSize,
  animationSpeed = 0.3, // Animation speed parameter
}) {
  const [isHovered, setIsHovered] = useState(false);

  // If mobile version, use the mobile item component
  if (isMobile) {
    return (
      <MobileGalleryItem
        image={image}
        backgroundPosition={backgroundPosition}
        backgroundSize={backgroundSize}
        backgroundRepeat={backgroundRepeat}
        className={className}
        projectName={projectName}
        projectDescription={projectDescription}
        onImageClick={onImageClick}
        imageIndex={imageIndex}
        itemRef={itemRef}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        fontFamily={fontFamily}
        animationSpeed={animationSpeed} // Pass animation speed
      />
    );
  }

  const containerStyle = {
    overflow: "hidden"
  };

  const imageLayerStyle = {
    backgroundImage: `url('${image}')`,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat,
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: `transform ${animationSpeed}s ease-in-out` // Use animationSpeed
  };

  const overlayStyle = {
    backgroundColor: overlayColor,
    opacity: isHovered ? overlayOpacity : 0,
    transition: `opacity ${animationSpeed}s ease-in-out` // Use animationSpeed
  };

  const textStyle = {
    opacity: isHovered ? 1 : 0,
    transition: `opacity ${animationSpeed}s ease-in-out`, // Use animationSpeed
    fontFamily,
    color: fontColor,
    fontSize: `${fontSize}px`
  };

  const alignItems = textVAlign === "top" ? "flex-start" : textVAlign === "bottom" ? "flex-end" : "center";
  const extraPadding = textVAlign === "top" ? { paddingTop: "16px" } : textVAlign === "bottom" ? { paddingBottom: "16px" } : {};

  const content = (
    <>
      <div className="absolute inset-0" style={imageLayerStyle} />
      <div 
        className="absolute inset-0 rounded-2xl z-10"
        style={overlayStyle}
      />
      <div 
        className="absolute inset-0 flex justify-center z-20"
        style={{ ...textStyle, alignItems, ...extraPadding }}
      >
        <span className="text-center font-medium px-4">{textContent}</span>
      </div>
    </>
  );

  const handleClick = (e) => {
    e.preventDefault();
    
    // For desktop/tablet, always use overlay mode regardless of displayMode setting
    if (onImageClick && typeof imageIndex === 'number') {
      onImageClick(imageIndex, {
        backgroundPosition,
        backgroundSize,
        backgroundRepeat
      });
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={itemRef}
        className={`relative rounded-2xl shrink-0 w-full overflow-hidden cursor-pointer ${className}`}
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {content}
      </div>
    </div>
  );
}

// Updated column components to handle expanded items
function Column1Desktop({ projectNames, projectDescriptions, onImageClick, isMobile = false, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Column 1"
    >
      <GalleryItem
        image={imgProjectImage}
        className="aspect-[368/368]"
        textContent={projectNames[0]}
        projectName={projectNames[0]}
        projectDescription={projectDescriptions[0]}
        isLink={true}
        onImageClick={onImageClick}
        imageIndex={0}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage1}
        className="aspect-[368/552]"
        textContent={projectNames[1]}
        projectName={projectNames[1]}
        projectDescription={projectDescriptions[1]}
        onImageClick={onImageClick}
        imageIndex={1}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage2}
        className="aspect-[368/245]"
        backgroundSize="100.95% 100%"
        backgroundPosition="top"
        textContent={projectNames[2]}
        projectName={projectNames[2]}
        projectDescription={projectDescriptions[2]}
        onImageClick={onImageClick}
        imageIndex={2}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage3}
        className="h-[245px]"
        textContent={projectNames[3]}
        projectName={projectNames[3]}
        projectDescription={projectDescriptions[3]}
        onImageClick={onImageClick}
        imageIndex={3}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
    </div>
  );
}

function Column2Desktop({ projectNames, projectDescriptions, onImageClick, isMobile = false, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Column 2"
    >
      <GalleryItem
        image={imgProjectImage4}
        className="aspect-[292/194.402]"
        backgroundPosition="67.86% 7.59%"
        backgroundSize="126.24% 126.03%"
        textContent={projectNames[4]}
        projectName={projectNames[4]}
        projectDescription={projectDescriptions[4]}
        onImageClick={onImageClick}
        imageIndex={4}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage5}
        className="aspect-[368/552]"
        textContent={projectNames[5]}
        projectName={projectNames[5]}
        projectDescription={projectDescriptions[5]}
        onImageClick={onImageClick}
        imageIndex={5}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage6}
        className="aspect-[268/268]"
        backgroundPosition="46.86% 61.05%"
        backgroundSize="244.11% 137.31%"
        textContent={projectNames[6]}
        projectName={projectNames[6]}
        projectDescription={projectDescriptions[6]}
        onImageClick={onImageClick}
        imageIndex={6}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage7}
        className="aspect-[229.812/153]"
        backgroundPosition="50.33% 31.14%"
        backgroundSize="354.3% 299.48%"
        textContent={projectNames[7]}
        projectName={projectNames[7]}
        projectDescription={projectDescriptions[7]}
        onImageClick={onImageClick}
        imageIndex={7}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
    </div>
  );
}

function Column3Desktop({ projectNames, projectDescriptions, onImageClick, isMobile = false, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Column 3"
    >
      <GalleryItem
        image={imgProjectImage8}
        className="aspect-[368/552]"
        backgroundPosition="48.62% 21.91%"
        backgroundSize="245.24% 122.64%"
        textContent={projectNames[8]}
        projectName={projectNames[8]}
        projectDescription={projectDescriptions[8]}
        onImageClick={onImageClick}
        imageIndex={8}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage9}
        className="aspect-[368/245]"
        textContent={projectNames[9]}
        projectName={projectNames[9]}
        projectDescription={projectDescriptions[9]}
        onImageClick={onImageClick}
        imageIndex={9}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage10}
        className="aspect-[276.376/184]"
        backgroundPosition="69.49% 52.63%"
        backgroundSize="161.54% 161.78%"
        textContent={projectNames[10]}
        projectName={projectNames[10]}
        projectDescription={projectDescriptions[10]}
        onImageClick={onImageClick}
        imageIndex={10}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage11}
        className="aspect-[368/368]"
        backgroundPosition="30.19% 0%"
        backgroundSize="157.73% 100%"
        textContent={projectNames[11]}
        projectName={projectNames[11]}
        projectDescription={projectDescriptions[11]}
        onImageClick={onImageClick}
        imageIndex={11}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
    </div>
  );
}

function GalleryDesktop({ projectNames, projectDescriptions, onImageClick, isMobile = false, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-start justify-start p-0 relative size-full"
      data-name="Gallery"
    >
      <Column1Desktop 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={onImageClick} 
        isMobile={isMobile} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
      <Column2Desktop 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={onImageClick} 
        isMobile={isMobile} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
      <Column3Desktop 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={onImageClick} 
        isMobile={isMobile} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
    </div>
  );
}

function Column2Tablet({ projectNames, projectDescriptions, onImageClick, isMobile = false, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Column 2"
    >
      <GalleryItem
        image={imgProjectImage4}
        className="aspect-[208/139]"
        backgroundPosition="67.86% 7.59%"
        backgroundSize="126.24% 126.03%"
        textContent={projectNames[4]}
        projectName={projectNames[4]}
        projectDescription={projectDescriptions[4]}
        onImageClick={onImageClick}
        imageIndex={4}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage5}
        className="aspect-[208/312]"
        textContent={projectNames[5]}
        projectName={projectNames[5]}
        projectDescription={projectDescriptions[5]}
        onImageClick={onImageClick}
        imageIndex={5}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage6}
        className="aspect-[208/208]"
        backgroundPosition="46.86% 61.05%"
        backgroundSize="244.11% 137.31%"
        textContent={projectNames[6]}
        projectName={projectNames[6]}
        projectDescription={projectDescriptions[6]}
        onImageClick={onImageClick}
        imageIndex={6}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage7}
        className="aspect-[208/139]"
        backgroundPosition="50.33% 31.14%"
        backgroundSize="354.3% 299.48%"
        textContent={projectNames[7]}
        projectName={projectNames[7]}
        projectDescription={projectDescriptions[7]}
        onImageClick={onImageClick}
        imageIndex={7}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
    </div>
  );
}

function Column1Tablet({ projectNames, projectDescriptions, onImageClick, isMobile = false, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Column 1"
    >
      <GalleryItem
        image={imgProjectImage}
        className="aspect-[208/208]"
        textContent={projectNames[0]}
        projectName={projectNames[0]}
        projectDescription={projectDescriptions[0]}
        isLink={true}
        onImageClick={onImageClick}
        imageIndex={0}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage1}
        className="aspect-[208/312]"
        textContent={projectNames[1]}
        projectName={projectNames[1]}
        projectDescription={projectDescriptions[1]}
        onImageClick={onImageClick}
        imageIndex={1}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage2}
        className="aspect-[208/139]"
        backgroundSize="100.95% 100%"
        backgroundPosition="top"
        textContent={projectNames[2]}
        projectName={projectNames[2]}
        projectDescription={projectDescriptions[2]}
        onImageClick={onImageClick}
        imageIndex={2}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage3}
        className="aspect-[208/139]"
        textContent={projectNames[3]}
        projectName={projectNames[3]}
        projectDescription={projectDescriptions[3]}
        onImageClick={onImageClick}
        imageIndex={3}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
    </div>
  );
}

function Column3Tablet({ projectNames, projectDescriptions, onImageClick, isMobile = false, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Column 3"
    >
      <GalleryItem
        image={imgProjectImage8}
        className="aspect-[208/312]"
        backgroundPosition="48.62% 21.91%"
        backgroundSize="245.24% 122.64%"
        textContent={projectNames[8]}
        projectName={projectNames[8]}
        projectDescription={projectDescriptions[8]}
        onImageClick={onImageClick}
        imageIndex={8}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage9}
        className="aspect-[208/139]"
        textContent={projectNames[9]}
        projectName={projectNames[9]}
        projectDescription={projectDescriptions[9]}
        onImageClick={onImageClick}
        imageIndex={9}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage10}
        className="aspect-[208/139]"
        backgroundPosition="69.49% 52.63%"
        backgroundSize="161.54% 161.78%"
        textContent={projectNames[10]}
        projectName={projectNames[10]}
        projectDescription={projectDescriptions[10]}
        onImageClick={onImageClick}
        imageIndex={10}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage11}
        className="aspect-[208/208]"
        backgroundPosition="30.19% 0%"
        backgroundSize="157.73% 100%"
        textContent={projectNames[11]}
        projectName={projectNames[11]}
        projectDescription={projectDescriptions[11]}
        onImageClick={onImageClick}
        imageIndex={11}
        isMobile={isMobile}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
    </div>
  );
}

function GalleryTablet({ projectNames, projectDescriptions, onImageClick, isMobile = false, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-start justify-start p-0 relative size-full"
      data-name="Gallery"
    >
      <Column2Tablet 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={onImageClick} 
        isMobile={isMobile} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
      <Column1Tablet 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={onImageClick} 
        isMobile={isMobile} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
      <Column3Tablet 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={onImageClick} 
        isMobile={isMobile} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
    </div>
  );
}

function Column1Mobile({ projectNames, projectDescriptions, onImageClick, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Column 1"
    >
      <GalleryItem
        image={imgProjectImage}
        className="aspect-[247/247]"
        textContent={projectNames[0]}
        projectName={projectNames[0]}
        projectDescription={projectDescriptions[0]}
        isLink={true}
        onImageClick={onImageClick}
        imageIndex={0}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage1}
        className="aspect-[327/489.838]"
        textContent={projectNames[1]}
        projectName={projectNames[1]}
        projectDescription={projectDescriptions[1]}
        onImageClick={onImageClick}
        imageIndex={1}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage2}
        className="aspect-[247/164]"
        backgroundSize="100.95% 100%"
        backgroundPosition="top"
        textContent={projectNames[2]}
        projectName={projectNames[2]}
        projectDescription={projectDescriptions[2]}
        onImageClick={onImageClick}
        imageIndex={2}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage3}
        className="aspect-[247/164]"
        textContent={projectNames[3]}
        projectName={projectNames[3]}
        projectDescription={projectDescriptions[3]}
        onImageClick={onImageClick}
        imageIndex={3}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
    </div>
  );
}

function Column2Mobile({ projectNames, projectDescriptions, onImageClick, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Column 2"
    >
      <GalleryItem
        image={imgProjectImage4}
        className="aspect-[247/164]"
        backgroundPosition="67.86% 7.59%"
        backgroundSize="126.24% 126.03%"
        textContent={projectNames[4]}
        projectName={projectNames[4]}
        projectDescription={projectDescriptions[4]}
        onImageClick={onImageClick}
        imageIndex={4}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage5}
        className="aspect-[247/370]"
        textContent={projectNames[5]}
        projectName={projectNames[5]}
        projectDescription={projectDescriptions[5]}
        onImageClick={onImageClick}
        imageIndex={5}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage6}
        className="aspect-[247/247]"
        backgroundPosition="46.86% 61.05%"
        backgroundSize="244.11% 137.31%"
        textContent={projectNames[6]}
        projectName={projectNames[6]}
        projectDescription={projectDescriptions[6]}
        onImageClick={onImageClick}
        imageIndex={6}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage7}
        className="aspect-[247/164]"
        backgroundPosition="50.33% 31.14%"
        backgroundSize="354.3% 299.48%"
        textContent={projectNames[7]}
        projectName={projectNames[7]}
        projectDescription={projectDescriptions[7]}
        onImageClick={onImageClick}
        imageIndex={7}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
    </div>
  );
}

function Column3Mobile({ projectNames, projectDescriptions, onImageClick, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Column 3"
    >
      <GalleryItem
        image={imgProjectImage9}
        className="aspect-[247/164]"
        textContent={projectNames[9]}
        projectName={projectNames[9]}
        projectDescription={projectDescriptions[9]}
        onImageClick={onImageClick}
        imageIndex={9}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage8}
        className="aspect-[247/370]"
        backgroundPosition="48.62% 21.91%"
        backgroundSize="245.24% 122.64%"
        textContent={projectNames[8]}
        projectName={projectNames[8]}
        projectDescription={projectDescriptions[8]}
        onImageClick={onImageClick}
        imageIndex={8}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage10}
        className="aspect-[247/164]"
        backgroundPosition="69.49% 52.63%"
        backgroundSize="161.54% 161.78%"
        textContent={projectNames[10]}
        projectName={projectNames[10]}
        projectDescription={projectDescriptions[10]}
        onImageClick={onImageClick}
        imageIndex={10}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
      <GalleryItem
        image={imgProjectImage11}
        className="aspect-[247/247]"
        backgroundPosition="30.19% 0%"
        backgroundSize="157.73% 100%"
        textContent={projectNames[11]}
        projectName={projectNames[11]}
        projectDescription={projectDescriptions[11]}
        onImageClick={onImageClick}
        imageIndex={11}
        isMobile={true}
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props}
      />
    </div>
  );
}

function GalleryMobile({ projectNames, projectDescriptions, onImageClick, expandedIndex, handleExpandToggle, displayMode, descriptionBgColor, descriptionTextColor, descriptionFontSize, animationSpeed, ...props }) {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative size-full"
      data-name="Gallery"
    >
      <Column1Mobile 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={onImageClick} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
      <Column2Mobile 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={onImageClick} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
      <Column3Mobile 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={onImageClick} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
    </div>
  );
}

function Gallery({
  overlayColor = "#FFFFFF",
  overlayOpacity = 0.1,
  textContent = "Project Name",
  fontFamily = "Inter, sans-serif",
  fontColor = "#FFFFFF",
  fontSize = 18,
  textVAlign = "middle",
  projectName1 = "Coffee Machine",
  projectDesc1 = "",
  projectName2 = "Digital Interface",
  projectDesc2 = "",
  projectName3 = "LED Display",
  projectDesc3 = "",
  projectName4 = "Product Design",
  projectDesc4 = "",
  projectName5 = "Dashboard UI",
  projectDesc5 = "",
  projectName6 = "Interior Design",
  projectDesc6 = "",
  projectName7 = "Car Interface",
  projectDesc7 = "",
  projectName8 = "Navigation System",
  projectDesc8 = "",
  projectName9 = "HUD Display",
  projectDesc9 = "",
  projectName10 = "Infotainment System",
  projectDesc10 = "",
  projectName11 = "Car Interface",
  projectDesc11 = "",
  projectName12 = "Boat Tour",
  projectDesc12 = "",
  modalBgColor = "#000000",
  modalBgOpacity = 0.85,
  modalBgBlur = 0,
  modalForegroundColor = "#FFFFFF",
  descriptionBgColor = "transparent",
  descriptionTextColor = "#FFFFFF",
  descriptionFontSize = 16,
  displayMode = "inline",
  animationSpeed = 0.3, // Animation speed property
  modalAnimationSpeed = 0.4 // New modal-specific animation speed property
}) {
  const { width } = useActiveBreakpoint();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageInfo, setCurrentImageInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileViewOpen, setMobileViewOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const scrollRef = useRef(null);
  
  // Removed auto-collapse on scroll per new requirement
  useEffect(() => {
    // Intentionally left blank – scrolling no longer affects expanded panels
  }, []);
  
  // Define all project images and names
  const allImages = [
    imgProjectImage,
    imgProjectImage1,
    imgProjectImage2,
    imgProjectImage3,
    imgProjectImage4,
    imgProjectImage5,
    imgProjectImage6,
    imgProjectImage7,
    imgProjectImage8,
    imgProjectImage9,
    imgProjectImage10,
    imgProjectImage11
  ];
  
  const projectNames = [
    projectName1,
    projectName2,
    projectName3,
    projectName4,
    projectName5,
    projectName6,
    projectName7,
    projectName8,
    projectName9,
    projectName10,
    projectName11,
    projectName12
  ];
  
  const projectDescriptions = [
    projectDesc1,
    projectDesc2,
    projectDesc3,
    projectDesc4,
    projectDesc5,
    projectDesc6,
    projectDesc7,
    projectDesc8,
    projectDesc9,
    projectDesc10,
    projectDesc11,
    projectDesc12
  ];

  const props = {
    overlayColor,
    overlayOpacity,
    fontFamily,
    fontColor,
    fontSize,
    textVAlign,
    animationSpeed
  };

  const handleImageClick = (index, imageInfo) => {
    setCurrentImageIndex(index);
    
    // For mobile, respect displayMode
    if (width < 800) {
      if (displayMode === 'overlay') {
        // Save image info for mobile view
        setCurrentImageInfo(imageInfo);
        setMobileViewOpen(true);
      } else {
        // Inline mode
        handleExpandToggle(index);
      }
    } else {
      // For desktop and tablet, always use overlay mode
      setModalOpen(true);
    }
  };

  const handleExpandToggle = (index) => {
    // Only used for mobile inline view
    // If we click the same item that's already expanded, close it
    if (index === expandedIndex) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const handleModalNavigate = (index) => {
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  
  const closeMobileView = () => {
    setMobileViewOpen(false);
  };
  
  let galleryView;
  if (width < 800) {
    galleryView = (
      <GalleryMobile 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={handleImageClick} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
    );
  } else if (width < 1280) {
    galleryView = (
      <GalleryTablet 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={handleImageClick} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
    );
  } else {
    galleryView = (
      <GalleryDesktop 
        projectNames={projectNames} 
        projectDescriptions={projectDescriptions} 
        onImageClick={handleImageClick} 
        expandedIndex={expandedIndex}
        handleExpandToggle={handleExpandToggle}
        displayMode={displayMode}
        descriptionBgColor={descriptionBgColor}
        descriptionTextColor={descriptionTextColor}
        descriptionFontSize={descriptionFontSize}
        animationSpeed={animationSpeed}
        {...props} 
      />
    );
  }
  
  return (
    <div className="flex flex-col w-full" ref={scrollRef}>
      {galleryView}
      
      {/* Desktop/Tablet Modal - always shown when clicking on images */}
      {width >= 800 && (
        <ImageModal 
          isOpen={modalOpen} 
          image={allImages[currentImageIndex]} 
          onClose={closeModal} 
          projectName={projectNames[currentImageIndex]}
          projectDescription={projectDescriptions[currentImageIndex]}
          modalBgColor={modalBgColor}
          modalBgOpacity={modalBgOpacity}
          modalBgBlur={modalBgBlur}
          modalForegroundColor={modalForegroundColor}
          allImages={allImages}
          allProjectNames={projectNames}
          allProjectDescriptions={projectDescriptions}
          currentIndex={currentImageIndex}
          onNavigate={handleModalNavigate}
          animationSpeed={modalAnimationSpeed} // Pass the modalAnimationSpeed to the ImageModal
        />
      )}
      
      {/* Mobile Image Modal - only shown when in overlay mode */}
      {displayMode === 'overlay' && width < 800 && (
        <MobileImageModal
          isOpen={mobileViewOpen}
          image={allImages[currentImageIndex]}
          onClose={closeMobileView}
          projectName={projectNames[currentImageIndex]}
          modalBgColor={modalBgColor}
          modalBgOpacity={modalBgOpacity}
          modalForegroundColor={modalForegroundColor}
          modalBgBlur={modalBgBlur}
          allImages={allImages}
          allProjectNames={projectNames}
          currentIndex={currentImageIndex}
          onNavigate={handleModalNavigate}
          backgroundPosition={currentImageInfo?.backgroundPosition || "center"}
          backgroundSize={currentImageInfo?.backgroundSize || "cover"}
          backgroundRepeat={currentImageInfo?.backgroundRepeat || "no-repeat"}
          animationSpeed={modalAnimationSpeed} // Pass the modalAnimationSpeed to the MobileImageModal
        />
      )}
    </div>
  );
}

defineProperties(Gallery, {
  // Appearance properties
  overlayColor: {
    label: "Overlay color (hex)",
    type: "string",
    defaultValue: "#FFFFFF"
  },
  overlayOpacity: {
    label: "Overlay opacity",
    type: "number",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 0.1
  },
  fontFamily: {
    label: "Font family",
    type: "string",
    control: "select",
    options: [
      { value: "Inter, sans-serif", label: "Inter" },
      { value: "Arial, sans-serif", label: "Arial" },
      { value: "Helvetica, sans-serif", label: "Helvetica" },
      { value: "Georgia, serif", label: "Georgia" },
      { value: "monospace", label: "Monospace" }
    ],
    defaultValue: "Inter, sans-serif"
  },
  fontColor: {
    label: "Font color (hex)",
    type: "string",
    defaultValue: "#FFFFFF"
  },
  fontSize: {
    label: "Font size (px)",
    type: "number",
    control: "slider",
    min: 12,
    max: 36,
    step: 1,
    defaultValue: 18
  },
  textVAlign: {
    label: "Text vertical align",
    type: "string",
    control: "select",
    options: [
      { value: "top", label: "Top" },
      { value: "middle", label: "Middle" },
      { value: "bottom", label: "Bottom" }
    ],
    defaultValue: "bottom"
  },
  
  // Animation properties
  animationSpeed: {
    label: "Animation speed (seconds)",
    type: "number",
    control: "slider",
    min: 0.1,
    max: 1.5,
    step: 0.1,
    defaultValue: 0.3
  },
  
  // Modal animation speed control
  modalAnimationSpeed: {
    label: "Modal animation speed (seconds)",
    type: "number",
    control: "slider",
    min: 0.1,
    max: 1.5,
    step: 0.1,
    defaultValue: 0.4
  },
  
  // Modal properties
  modalBgColor: {
    label: "Modal background color (hex)",
    type: "string",
    defaultValue: "#000000"
  },
  modalBgOpacity: {
    label: "Modal background opacity",
    type: "number",
    control: "slider",
    min: 0.1,
    max: 1,
    step: 0.05,
    defaultValue: 0.85
  },
  modalBgBlur: {
    label: "Modal background blur (px)",
    type: "number",
    control: "slider",
    min: 0,
    max: 20,
    step: 1,
    defaultValue: 0
  },
  modalForegroundColor: {
    label: "Modal foreground color (hex)",
    type: "string",
    defaultValue: "#FFFFFF"
  },
  
  // Description properties
  descriptionBgColor: {
    label: "Description background color (hex)",
    type: "string",
    defaultValue: "transparent"
  },
  descriptionTextColor: {
    label: "Description text color (hex)",
    type: "string",
    defaultValue: "#FFFFFF"
  },
  descriptionFontSize: {
    label: "Description font size (px)",
    type: "number",
    control: "slider",
    min: 12,
    max: 24,
    step: 1,
    defaultValue: 16
  },
  
  // Display mode
  displayMode: {
    label: "Mobile display mode",
    type: "string",
    control: "select",
    options: [
      { value: "inline", label: "Inline View" },
      { value: "overlay", label: "Overlay View" }
    ],
    defaultValue: "inline"
  },
  
  // Project 1
  projectName1: {
    label: "01 Project 1 Name",
    type: "string",
    defaultValue: "Coffee Machine"
  },
  projectDesc1: {
    label: "01 Project 1 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 2
  projectName2: {
    label: "02 Project 2 Name",
    type: "string",
    defaultValue: "Digital Interface"
  },
  projectDesc2: {
    label: "02 Project 2 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 3
  projectName3: {
    label: "03 Project 3 Name",
    type: "string",
    defaultValue: "LED Display"
  },
  projectDesc3: {
    label: "03 Project 3 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 4
  projectName4: {
    label: "04 Project 4 Name",
    type: "string",
    defaultValue: "Product Design"
  },
  projectDesc4: {
    label: "04 Project 4 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 5
  projectName5: {
    label: "05 Project 5 Name",
    type: "string",
    defaultValue: "Dashboard UI"
  },
  projectDesc5: {
    label: "05 Project 5 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 6
  projectName6: {
    label: "06 Project 6 Name",
    type: "string",
    defaultValue: "Interior Design"
  },
  projectDesc6: {
    label: "06 Project 6 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 7
  projectName7: {
    label: "07 Project 7 Name",
    type: "string",
    defaultValue: "Car Interface"
  },
  projectDesc7: {
    label: "07 Project 7 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 8
  projectName8: {
    label: "08 Project 8 Name",
    type: "string",
    defaultValue: "Navigation System"
  },
  projectDesc8: {
    label: "08 Project 8 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 9
  projectName9: {
    label: "09 Project 9 Name",
    type: "string",
    defaultValue: "HUD Display"
  },
  projectDesc9: {
    label: "09 Project 9 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 10
  projectName10: {
    label: "10 Project 10 Name",
    type: "string",
    defaultValue: "Infotainment System"
  },
  projectDesc10: {
    label: "10 Project 10 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 11
  projectName11: {
    label: "11 Project 11 Name",
    type: "string",
    defaultValue: "Car Interface"
  },
  projectDesc11: {
    label: "11 Project 11 Description",
    type: "string",
    defaultValue: ""
  },
  
  // Project 12
  projectName12: {
    label: "12 Project 12 Name",
    type: "string",
    defaultValue: "Boat Tour"
  },
  projectDesc12: {
    label: "12 Project 12 Description",
    type: "string",
    defaultValue: ""
  }
});

export default Gallery;
