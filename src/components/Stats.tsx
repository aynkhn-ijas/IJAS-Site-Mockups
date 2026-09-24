import { useEffect, useRef, useState } from "react";

import Counter from "@/components/react-bits/Counter";

const counterProps = {
  padding: 4,
  gap: 0,
  textColor: "white",
  fontWeight: 900,
  gradientFrom: "#1a4fa0",
  gradientTo: "transparent",
  gradientHeight: 12,
  horizontalPadding: 0,
  borderRadius: 0,
} as const;

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [schoolsValue, setSchoolsValue] = useState(0);
  const [projectsValue, setProjectsValue] = useState(0);
  const [participantsValue, setParticipantsValue] = useState(0);
  const [fontSize, setFontSize] = useState(68);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let t1: number | undefined;
    let t2: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
          setSchoolsValue(600);
          setProjectsValue(1200);
          setParticipantsValue(2300);
          return;
        }
        setSchoolsValue(600);
        t1 = window.setTimeout(() => setProjectsValue(1200), 120);
        t2 = window.setTimeout(() => setParticipantsValue(2300), 240);
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (t1) window.clearTimeout(t1);
      if (t2) window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = () => setFontSize(mq.matches ? 68 : 40);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section ref={sectionRef} className="bg-ijas-blue px-4 py-10 text-white sm:py-12">
      <div className="mx-auto grid max-w-[980px] gap-10 sm:grid-cols-3 sm:gap-6">
        <div className="flex flex-col items-center text-center">
          <img
            src="/icons/schools.png"
            alt=""
            className="mb-3 h-20 w-20 object-contain object-center sm:h-24 sm:w-24 lg:h-32 lg:w-32"
          />
          <div className="flex items-end justify-center">
            <Counter
              value={schoolsValue}
              places={[100, 10, 1]}
              fontSize={fontSize}
              {...counterProps}
            />
            <span className="font-black leading-none text-white" style={{ fontSize }}>
              +
            </span>
          </div>
          <p className="mt-2 text-[20px] font-semibold sm:text-[22px]">Participating Schools</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="/icons/projects.png"
            alt=""
            className="mb-3 h-20 w-20 object-contain object-center sm:h-24 sm:w-24 lg:h-32 lg:w-32"
          />
          <div className="flex items-end justify-center">
            <Counter
              value={projectsValue}
              places={[1000, 100, 10, 1]}
              fontSize={fontSize}
              {...counterProps}
            />
          </div>
          <p className="mt-2 text-[20px] font-semibold sm:text-[22px]">Projects</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="/icons/participants.png"
            alt=""
            className="mb-3 h-20 w-20 object-contain object-center sm:h-24 sm:w-24 lg:h-32 lg:w-32"
          />
          <div className="flex items-end justify-center">
            <Counter
              value={participantsValue}
              places={[1000, 100, 10, 1]}
              fontSize={fontSize}
              {...counterProps}
            />
            <span className="font-black leading-none text-white" style={{ fontSize }}>
              +
            </span>
          </div>
          <p className="mt-2 text-[20px] font-semibold sm:text-[22px]">Participants</p>
        </div>
      </div>
    </section>
  );
}
