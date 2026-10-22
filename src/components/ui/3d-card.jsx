import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const MouseEnterContext = createContext(undefined);

const SPRING = { stiffness: 90, damping: 28, mass: 0.9 };
const MAX_TILT = 8;

export function CardContainer({ children, className, containerClassName }) {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  const handleMouseMove = (e) => {
    if (!containerRef.current || reduceMotion) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - left) / width - 0.5;
    const py = (e.clientY - top) / height - 0.5;
    rotateY.set(Math.max(-MAX_TILT, Math.min(MAX_TILT, px * 18)));
    rotateX.set(Math.max(-MAX_TILT, Math.min(MAX_TILT, -py * 18)));
  };

  const handleMouseEnter = () => {
    if (reduceMotion) return;
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center py-20", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("relative flex items-center justify-center", className)}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            willChange: "transform",
            transition: "none",
          }}
        >
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({ children, className }) {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className,
      )}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}

export function CardItem({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform =
        "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag ref={ref} className={cn("w-fit transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none", className)} {...rest}>
      {children}
    </Tag>
  );
}

export function useMouseEnter() {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
}
