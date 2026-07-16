"use client";

import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { Check, Code2, LockKeyhole } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { BrandMark } from "@/components/site/brand-mark";
import { runtimeAssets, type BrandAsset } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type Runtime = {
  asset: BrandAsset;
  title: string;
  description: string;
  examples: string[];
  expectations: string[];
};

const staticAsset: BrandAsset = {
  id: "static",
  name: "Static",
  monogram: "</>",
  sourceUrl: "",
  accessibleLabel: "Static sites",
  trademarkStatus: "generic mark",
  category: "runtime",
  logoPlate: "neutral",
};

const runtimeDetails = [
  ["node", "Node.js", "Node services and common web-framework projects with explicit build, start, port, and environment configuration.", ["Next.js", "Express / Fastify", "NestJS"], ["Declare the production start command", "Confirm the listening port"]],
  ["python", "Python", "Python web applications using project-defined dependency and start conventions.", ["Django", "Flask", "FastAPI"], ["Provide the start command", "Include required system dependencies"]],
  ["go", "Go", "Go modules compiled for a web service or API and started on the target VPS.", ["Go modules", "HTTP APIs", "Compiled services"], ["Expose the expected port", "Keep platform-specific build needs explicit"]],
  ["php", "PHP", "PHP projects and common framework structures with environment configuration.", ["PHP applications", "Laravel", "Custom web roots"], ["Confirm the web root", "Provide environment configuration"]],
  ["ruby", "Ruby", "Ruby web services using framework or process-file conventions.", ["Rails", "Rack", "Sinatra"], ["Declare the web process", "Confirm native dependency needs"]],
  ["java", "Java", "JAR-based services and Maven or Gradle project workflows with a configured start command.", ["JAR services", "Maven", "Gradle"], ["Select the correct runtime version", "Confirm memory requirements"]],
  ["rust", "Rust", "Cargo projects compiled into web services and run with explicit runtime configuration.", ["Cargo projects", "Compiled APIs", "Web services"], ["Declare the binary", "Confirm system library needs"]],
] as const;

const runtimes: Runtime[] = runtimeDetails.map(([id, title, description, examples, expectations]) => ({
  asset: runtimeAssets.find((asset) => asset.id === id)!,
  title,
  description,
  examples: [...examples],
  expectations: [...expectations],
}));

runtimes.push({
  asset: staticAsset,
  title: "Static sites",
  description: "Static HTML and generated front-end output served from the connected server.",
  examples: ["HTML / CSS / JavaScript", "Generated static output", "Custom domain workflow"],
  expectations: ["Select the correct output directory", "Confirm client-side routing needs"],
});

const MARQUEE_SPEED_PX_PER_MS = 0.032;

export function RuntimeShowcase() {
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = runtimes[selectedIndex];

  const selectRuntime = (index: number, focus = false) => {
    setSelectedIndex(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % runtimes.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + runtimes.length) % runtimes.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = runtimes.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectRuntime(next, true);
  };

  return (
    <div className="space-y-6">
      <RuntimeMarquee />

      <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="border-b border-border bg-secondary/40 p-3 lg:border-b-0 lg:border-r">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1" role="tablist" aria-label="Released beta runtime targets">
            {runtimes.map((runtime, index) => {
              const selectedTab = selectedIndex === index;
              return (
                <button
                  key={runtime.asset.id}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  id={`runtime-tab-${runtime.asset.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedTab}
                  aria-controls="runtime-detail-panel"
                  tabIndex={selectedTab ? 0 : -1}
                  className={cn(
                    "flex min-h-14 items-center rounded-2xl border px-3 py-2.5 text-left transition-[transform,background-color,border-color,color] duration-200",
                    selectedTab
                      ? "border-brand/30 bg-brand-muted text-foreground"
                      : "border-transparent text-muted-foreground hover:-translate-y-0.5 hover:border-border hover:bg-card hover:text-foreground",
                  )}
                  onClick={() => selectRuntime(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  <span aria-hidden="true"><BrandMark asset={runtime.asset} compact /></span>
                  <span className="ml-2 truncate text-sm font-semibold">{runtime.title}</span>
                  {selectedTab ? <span className="ml-auto size-1.5 shrink-0 rounded-full bg-brand-bright" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div id="runtime-detail-panel" role="tabpanel" aria-labelledby={`runtime-tab-${selected.asset.id}`} tabIndex={0} className="min-h-[25rem] bg-inverse p-5 text-text-inverse sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.asset.id}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <BrandMark asset={selected.asset} />
                <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-border-inverse bg-inverse-2 px-3 text-xs font-semibold text-text-inverse">
                  <Check className="size-3.5 text-brand-bright" aria-hidden="true" />
                  Available beta path
                </span>
              </div>
              <h2 className="mt-8 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{selected.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-text-on-inverse-muted sm:text-base">{selected.description}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <RuntimeDetailList title="Common project shapes" items={selected.examples} icon="code" />
                <RuntimeDetailList title="Keep explicit" items={selected.expectations} icon="check" />
              </div>
              <p className="mt-6 text-xs leading-5 text-text-on-inverse-muted">Support describes the runtime target, not every framework release, native dependency, operating system, architecture, or repository configuration.</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning-muted p-4 text-sm text-foreground" role="note">
        <LockKeyhole className="mt-0.5 size-4 shrink-0 text-warning-text" aria-hidden="true" />
        <p><strong>Docker Compose is not included in the released-runtime selector.</strong> The production-stack workflow remains <span className="font-semibold text-warning-text">In development · gated</span> and is documented separately below.</p>
      </div>
    </div>
  );
}

function RuntimeMarquee() {
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const inView = useInView(rootRef, { amount: 0.2 });
  const [documentActive, setDocumentActive] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const groupWidth = useRef(0);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const measure = () => { groupWidth.current = group.getBoundingClientRect().width; };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setDocumentActive(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) x.set(0);
  }, [reduceMotion, x]);

  const moving = inView && documentActive && !reduceMotion && !hovered && !focused;
  useAnimationFrame((_time, delta) => {
    if (!moving || groupWidth.current <= 0) return;
    let next = x.get() - delta * MARQUEE_SPEED_PX_PER_MS;
    if (next <= -groupWidth.current) next += groupWidth.current;
    x.set(next);
  });

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl border border-border bg-secondary/40 p-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      tabIndex={0}
      aria-label={`Released beta runtime ecosystem: ${runtimes.map((runtime) => runtime.title).join(", ")}. Focus or hover to pause motion.`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={onBlur}
    >
      <span className="sr-only">Released beta runtime targets. The moving presentation is decorative and pauses while this region is focused.</span>
      <motion.div style={{ x }} className="flex w-max motion-reduce:w-full motion-reduce:flex-wrap" aria-hidden="true">
        <div ref={groupRef} className="flex shrink-0 gap-3 pr-3 motion-reduce:flex-wrap">
          {runtimes.map((runtime) => <RuntimeLogoTile key={runtime.asset.id} asset={runtime.asset} />)}
        </div>
        <div className="flex shrink-0 gap-3 pr-3 motion-reduce:hidden">
          {runtimes.map((runtime) => <RuntimeLogoTile key={`duplicate-${runtime.asset.id}`} asset={runtime.asset} />)}
        </div>
      </motion.div>
    </div>
  );
}

function RuntimeLogoTile({ asset }: { asset: BrandAsset }) {
  return <span className="flex min-h-14 min-w-40 items-center rounded-2xl border border-border bg-card px-4 shadow-sm"><BrandMark asset={asset} /></span>;
}

function RuntimeDetailList({ title, items, icon }: { title: string; items: string[]; icon: "code" | "check" }) {
  const Icon = icon === "code" ? Code2 : Check;
  return (
    <div className="rounded-2xl border border-border-inverse bg-inverse-2 p-5">
      <strong className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-inverse">{title}</strong>
      <div className="mt-4 space-y-3">
        {items.map((item) => <span key={item} className="flex items-start gap-2 text-sm text-text-on-inverse-muted"><Icon className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden="true" />{item}</span>)}
      </div>
    </div>
  );
}
