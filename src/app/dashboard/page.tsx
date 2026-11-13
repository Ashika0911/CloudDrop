

"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

import {
  Activity,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Cloud,
  File,
  FileImage,
  FileText,
  HardDrive,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  XCircle,
} from "lucide-react";

type UploadedFile = {
  id: string;
  originalName: string;
  storedName: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: string;
};

const stats = [
  {
    label: "Total files",
    value: "128",
    change: "+12 this week",
    icon: File,
  },
  {
    label: "Successfully processed",
    value: "96",
    change: "75% of total files",
    icon: CheckCircle2,
  },
  {
    label: "Currently processing",
    value: "08",
    change: "2 jobs in queue",
    icon: Activity,
  },
  {
    label: "Failed jobs",
    value: "02",
    change: "Requires attention",
    icon: XCircle,
  },
];

const navigation = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "My Files", icon: File, active: false },
  { label: "Processing Jobs", icon: Activity, active: false },
  { label: "Analytics", icon: HardDrive, active: false },
];

export default function DashboardPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [uploadMessage, setUploadMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch uploaded files when dashboard loads
  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch("/api/files");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load files.");
        }

        setUploadedFiles(data.files || []);
      } catch (error) {
        console.error("Could not load files:", error);
      } finally {
        setLoadingFiles(false);
      }
    }

    fetchFiles();
  }, []);

  // Upload selected file
  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setUploading(true);
    setUploadMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setUploadedFiles((previous) => [
        data.file,
        ...previous,
      ]);

      setUploadMessage("File uploaded successfully!");
    } catch (error) {
      setUploadMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-[#131F1F] px-5 py-6 md:flex">

          <a href="/" className="mb-12 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-[#101B1B]">
              <Cloud size={23} strokeWidth={2.5} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              CloudDrop
            </span>
          </a>

          <p className="mb-4 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.active ? "/dashboard" : "#"}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    item.active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto space-y-1">

            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted hover:bg-surface-hover"
            >
              <Settings size={18} />
              Settings
            </a>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-4">

              <div className="mb-3 flex items-center justify-between">
                <HardDrive size={17} className="text-primary" />
                <span className="font-mono text-xs text-muted">
                  68%
                </span>
              </div>

              <p className="text-sm font-medium">
                Storage used
              </p>

              <p className="mt-1 text-xs text-muted">
                6.8 GB of 10 GB
              </p>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                <div className="h-full w-[68%] rounded-full bg-primary" />
              </div>

            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">

          {/* Top bar */}
          <header className="flex h-[76px] items-center justify-between border-b border-border px-5 md:px-9">

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Workspace / Overview
              </p>

              <p className="mt-1 text-sm font-medium">
                My workspace
              </p>
            </div>

            <div className="flex items-center gap-3">

              <button className="hidden h-10 items-center gap-2 rounded-xl border border-border px-3 text-sm text-muted sm:flex">
                <Search size={16} />
                Search
                <span className="ml-3 font-mono text-xs">
                  ⌘ K
                </span>
              </button>

              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted hover:text-foreground">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-border p-1.5 pr-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#29413D] text-sm font-semibold text-primary">
                  A
                </div>

                <span className="hidden text-sm sm:block">
                  Ashika
                </span>

                <ChevronDown size={14} className="text-muted" />
              </button>

            </div>
          </header>

          {/* Dashboard body */}
          <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-9 md:py-10">

            {/* Welcome section */}
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-primary">
                  Workspace overview
                </p>

                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Good to see you.
                </h1>

                <p className="mt-2 text-sm text-muted">
                  Here's what's happening with your files today.
                </p>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Upload button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-[#101B1B] transition hover:bg-[#7AE2D2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus size={18} />
                {uploading ? "Uploading..." : "Upload files"}
              </button>

            </div>

            {/* Upload feedback */}
            {uploadMessage && (
              <p
                role="status"
                className="mb-5 text-sm text-primary"
              >
                {uploadMessage}
              </p>
            )}

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border bg-surface p-5 transition hover:border-[#405B56]"
                  >

                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-sm text-muted">
                        {stat.label}
                      </span>

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#263B38] text-primary">
                        <Icon size={18} />
                      </div>
                    </div>

                    <p className="text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </p>

                    <p className="mt-2 text-xs text-muted">
                      {stat.change}
                    </p>

                  </div>
                );
              })}

            </div>

            {/* Storage and activity */}
            <div className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_1fr]">

              {/* Storage card */}
              <div className="rounded-2xl border border-border bg-surface p-6">

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">
                      Storage overview
                    </h2>

                    <p className="mt-1 text-xs text-muted">
                      Your current storage consumption
                    </p>
                  </div>

                  <MoreHorizontal size={20} className="text-muted" />
                </div>

                <div className="mt-8 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    6.8
                  </span>

                  <span className="mb-1 text-sm text-muted">
                    GB used of 10 GB
                  </span>
                </div>

                <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-border">
                  <div className="w-[42%] bg-primary" />
                  <div className="w-[18%] bg-[#78A9FF]" />
                  <div className="w-[8%] bg-[#F2B86B]" />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">

                  {[
                    { label: "Images", value: "4.2 GB", color: "bg-primary" },
                    { label: "Documents", value: "1.8 GB", color: "bg-[#78A9FF]" },
                    { label: "Others", value: "0.8 GB", color: "bg-[#F2B86B]" },
                  ].map((item) => (
                    <div key={item.label}>

                      <div className="mb-2 flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${item.color}`} />
                        <span className="text-xs text-muted">
                          {item.label}
                        </span>
                      </div>

                      <p className="text-sm font-medium">
                        {item.value}
                      </p>

                    </div>
                  ))}

                </div>
              </div>

              {/* Processing activity */}
              <div className="rounded-2xl border border-border bg-surface p-6">

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">
                      Processing activity
                    </h2>

                    <p className="mt-1 text-xs text-muted">
                      Latest job updates
                    </p>
                  </div>

                  <Activity size={19} className="text-primary" />
                </div>

                <div className="mt-6 space-y-5">

                  {[
                    {
                      title: "Image compression",
                      file: "product-image.png",
                      status: "Completed",
                      icon: CheckCircle2,
                      color: "text-primary",
                    },
                    {
                      title: "PDF extraction",
                      file: "annual-report.pdf",
                      status: "In progress",
                      icon: Clock3,
                      color: "text-info",
                    },
                    {
                      title: "Thumbnail generation",
                      file: "profile-banner.jpg",
                      status: "Completed",
                      icon: CheckCircle2,
                      color: "text-primary",
                    },
                  ].map((job) => {
                    const Icon = job.icon;

                    return (
                      <div key={job.title} className="flex items-start gap-3">

                        <Icon size={18} className={`mt-0.5 ${job.color}`} />

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">
                            {job.title}
                          </p>

                          <p className="mt-1 truncate text-xs text-muted">
                            {job.file}
                          </p>
                        </div>

                        <span className="text-[11px] text-muted">
                          {job.status}
                        </span>

                      </div>
                    );
                  })}

                </div>

                <a
                  href="#"
                  className="mt-6 flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                >
                  View all activity
                  <ArrowUpRight size={14} />
                </a>

              </div>
            </div>

            {/* Recent files */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">

              <div className="flex flex-col justify-between gap-4 border-b border-border p-6 sm:flex-row sm:items-center">

                <div>
                  <h2 className="font-semibold">
                    Recent files
                  </h2>

                  <p className="mt-1 text-xs text-muted">
                    Your latest uploads and their processing status
                  </p>
                </div>

                <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                  View all files
                  <ArrowUpRight size={15} />
                </button>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[650px] text-left">

                  <thead>
                    <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted">
                      <th className="px-6 py-4 font-medium">File name</th>
                      <th className="px-6 py-4 font-medium">Size</th>
                      <th className="px-6 py-4 font-medium">Uploaded</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium"></th>
                    </tr>
                  </thead>

                  <tbody>

                    {uploadedFiles.map((file) => {
                      const isImage = file.type.startsWith("image/");
                      const Icon = isImage ? FileImage : FileText;

                      return (
                        <tr
                          key={file.id}
                          className="border-b border-border/70 last:border-0 hover:bg-surface-hover/50"
                        >

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#263B38] text-primary">
                                <Icon size={19} />
                              </div>

                              <div>
                                <p className="text-sm font-medium">
                                  {file.originalName}
                                </p>

                                <p className="mt-1 text-xs text-muted">
                                  {isImage ? "Image" : "PDF Document"}
                                </p>
                              </div>

                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-muted">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </td>

                          <td className="px-6 py-4 text-sm text-muted">
                            {new Date(file.uploadedAt).toLocaleDateString()}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                file.status === "Completed"
                                  ? "bg-primary/10 text-primary"
                                  : file.status === "Processing"
                                  ? "bg-info/10 text-info"
                                  : file.status === "Failed"
                                  ? "bg-error/10 text-error"
                                  : "bg-surface-hover text-muted"
                              }`}
                            >
                              {file.status}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              className="text-muted hover:text-foreground"
                              aria-label={`More options for ${file.originalName}`}
                            >
                              <MoreHorizontal size={18} />
                            </button>
                          </td>

                        </tr>
                      );
                    })}

                    {loadingFiles && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-10 text-center text-sm text-muted"
                        >
                          Loading your files...
                        </td>
                      </tr>
                    )}

                    {!loadingFiles && uploadedFiles.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-10 text-center text-sm text-muted"
                        >
                          No files uploaded yet. Upload your first file to get started.
                        </td>
                      </tr>
                    )}

                  </tbody>
                </table>

              </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-border pt-5 text-xs text-muted sm:flex-row">

              <p>
                © 2026 CloudDrop. Move files. Not complexity.
              </p>

              <p className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" />
                Secure workspace
              </p>

            </footer>

          </div>
        </section>
      </div>
    </main>
  );
}

