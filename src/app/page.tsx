
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileImage,
  FileText,
  GitBranch,
  Layers3,
  Menu,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Event-driven processing",
    description:
      "Files enter an asynchronous processing pipeline. Uploads never need to wait for processing to finish.",
    tag: "ASYNC WORKFLOWS",
  },
  {
    icon: ShieldCheck,
    title: "Reliable by design",
    description:
      "Retries, failure handling and job tracking help make file processing dependable.",
    tag: "FAULT TOLERANCE",
  },
  {
    icon: Layers3,
    title: "Built to scale",
    description:
      "A serverless architecture that scales processing capacity with incoming workloads.",
    tag: "SERVERLESS",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload",
    description: "Upload your images and PDFs securely.",
  },
  {
    number: "02",
    title: "Process",
    description: "Background workers process files automatically.",
  },
  {
    number: "03",
    title: "Retrieve",
    description: "Access your processed files and job history.",
  },
];

function Brand() {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-background">
        <Layers3 size={20} strokeWidth={2.5} />
      </div>
      <span className="font-display text-xl font-bold tracking-tight">
        CloudDrop<span className="text-primary">.</span>
      </span>
    </a>
  );
}

function PipelinePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-10 rounded-full bg-primary/[0.06] blur-3xl" />

      <div className="relative rounded-2xl border border-border bg-surface p-5 shadow-2xl shadow-black/20">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted">
              PROCESSING PIPELINE
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold">
              File workflow
            </h3>
          </div>
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] text-primary">
            SYSTEM READY
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileImage size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">product-image.png</p>
              <p className="mt-1 font-mono text-[10px] text-muted">
                IMAGE · 2.4 MB
              </p>
            </div>
            <Check size={17} className="text-primary" />
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-1 text-primary">
              <div className="h-5 w-px bg-border-strong" />
              <ArrowDown size={15} />
            </div>
          </div>

          <div className="rounded-xl border border-primary/30 bg-primary/[0.06] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Processing worker</p>
                <p className="font-mono text-[10px] text-muted">
                  IMAGE RESIZE · OPTIMIZATION
                </p>
              </div>
              <span className="rounded-md bg-primary/10 px-2 py-1 font-mono text-[9px] text-primary">
                ACTIVE
              </span>
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-border">
              <div className="h-full w-2/3 rounded-full bg-primary" />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-1 text-primary">
              <div className="h-5 w-px bg-border-strong" />
              <ArrowDown size={15} />
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info">
              <FileText size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">product-image-optimized.png</p>
              <p className="mt-1 font-mono text-[10px] text-muted">
                OUTPUT · READY FOR RETRIEVAL
              </p>
            </div>
            <Check size={17} className="text-primary" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-border border-t border-border pt-4">
          <div className="px-2 text-center">
            <p className="font-display text-lg font-semibold">01</p>
            <p className="mt-1 font-mono text-[9px] text-muted">UPLOAD</p>
          </div>
          <div className="px-2 text-center">
            <p className="font-display text-lg font-semibold text-primary">
              02
            </p>
            <p className="mt-1 font-mono text-[9px] text-muted">PROCESS</p>
          </div>
          <div className="px-2 text-center">
            <p className="font-display text-lg font-semibold">03</p>
            <p className="mt-1 font-mono text-[9px] text-muted">RETRIEVE</p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-surface px-4 py-3 shadow-xl sm:block">
        <p className="font-mono text-[9px] text-muted">ARCHITECTURE</p>
        <p className="mt-1 text-xs font-medium">Event-driven · Serverless</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Brand />

          <div className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#features" className="transition-colors hover:text-primary">
              Features
            </a>
            <a href="#workflow" className="transition-colors hover:text-primary">
              How it works
            </a>
            <a href="#architecture" className="transition-colors hover:text-primary">
              Architecture
            </a>
          </div>

          <a
            href="#workflow"
            className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-primary-hover sm:flex"
          >
            Explore platform <ArrowUpRight size={16} />
          </a>

          <a href="#workflow" className="rounded-lg border border-border p-2 text-muted sm:hidden">
            <Menu size={20} />
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-32">
        <div className="absolute left-0 top-0 -z-0 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.14em] text-primary">
              A NEW WAY TO HANDLE FILES
            </span>
          </div>

          <h1 className="max-w-xl font-display text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-[68px]">
            Move files.
            <br />
            <span className="text-primary">Not complexity.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-muted sm:text-lg">
            Upload once. Let intelligent background workflows handle the rest.
            A streamlined platform for processing, organizing and retrieving
            your files.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#workflow"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              Explore CloudDrop <ArrowRight size={17} />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
            >
              View architecture
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-6">
            {["ASYNC PROCESSING", "SERVERLESS", "FAULT TOLERANT"].map((item) => (
              <span
                key={item}
                className="font-mono text-[9px] tracking-[0.12em] text-muted"
              >
                <span className="mr-2 text-primary">+</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <PipelinePreview />
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12">
          {[
            ["01", "Upload", "Secure file intake"],
            ["02", "Process", "Asynchronous workflows"],
            ["03", "Retrieve", "Organized outputs"],
          ].map(([number, title, description]) => (
            <div key={number} className="flex items-center gap-4 py-6 sm:px-7">
              <span className="font-mono text-xs text-primary">{number}</span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs text-muted">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.18em] text-primary">
            BUILT FOR RELIABILITY
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            More than file storage.
            <br />
            <span className="text-muted">A smarter workflow.</span>
          </h2>
          <p className="mt-5 leading-7 text-muted">
            CloudDrop focuses on what happens after a file is uploaded:
            processing, reliability and visibility into every job.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-xl border border-border bg-surface/50 p-7 transition-colors hover:border-primary/40 hover:bg-surface"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <Icon size={21} />
                </div>
                <p className="mt-7 font-mono text-[9px] tracking-[0.14em] text-primary">
                  {feature.tag}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {feature.description}
                </p>
                <div className="mt-7 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono text-[9px] text-muted">
                    CLOUDDROP CORE
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="text-muted transition-colors group-hover:text-primary"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-primary">
                SIMPLE BY DESIGN
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Three steps. One workflow.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted">
              From the moment a file arrives to the moment its processed
              version is ready.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex items-center justify-between border-b border-border pb-5">
                  <span className="font-mono text-sm text-primary">
                    / {step.number}
                  </span>
                  {index !== 2 && (
                    <ArrowRight className="hidden text-border-strong md:block" size={20} />
                  )}
                </div>
                <h3 className="mt-7 font-display text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-7 text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
        <div className="rounded-2xl border border-border bg-surface p-7 sm:p-10 lg:p-14">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] tracking-[0.18em] text-primary">
              UNDER THE HOOD
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Designed around events.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              CloudDrop is being built around an event-driven serverless
              architecture, separating file uploads from background processing.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["01", "Next.js", "Interface"],
              ["02", "Amazon S3", "File storage"],
              ["03", "AWS SQS", "Job queue"],
              ["04", "AWS Lambda", "Processing"],
            ].map(([number, name, role]) => (
              <div key={number} className="rounded-lg border border-border bg-background p-4">
                <p className="font-mono text-[10px] text-primary">{number}</p>
                <p className="mt-5 text-sm font-semibold">{name}</p>
                <p className="mt-1 text-xs text-muted">{role}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs leading-6 text-muted">
            Planned architecture. Cloud services and processing workflows
            will be integrated in subsequent development milestones.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.06] px-7 py-16 text-center sm:px-12">
          <p className="font-mono text-[10px] tracking-[0.18em] text-primary">
            THE NEXT STEP STARTS HERE
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold sm:text-5xl">
            Your files deserve a better workflow.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted">
            Explore the platform and discover a simpler approach to file
            processing and management.
          </p>
          <a
            href="#features"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-primary-hover"
          >
            Explore CloudDrop <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-8 lg:px-12">
          <Brand />
          <p className="text-xs text-muted">
            © 2026 CloudDrop. Move files. Not complexity.
          </p>
          <a
            href="https://github.com/Ashika0911/CloudDrop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CloudDrop GitHub repository"
            className="text-muted transition-colors hover:text-primary"
          >
            <GitBranch size={19} />
          </a>
        </div>
      </footer>
    </main>
  );
}
