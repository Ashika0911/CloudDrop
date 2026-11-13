
import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";


const STORAGE_DIR = path.join(process.cwd(), "storage");
const UPLOAD_DIR = path.join(STORAGE_DIR, "uploads");
const METADATA_DIR = path.join(STORAGE_DIR, "metadata");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "application/pdf": ".pdf",
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file was provided." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES[file.type]) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WebP and PDF files are allowed." },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File must be between 1 byte and 10 MB." },
        { status: 400 }
      );
    }

    await mkdir(UPLOAD_DIR, { recursive: true });
    await mkdir(METADATA_DIR, { recursive: true });

    const id = randomUUID();
    const extension = ALLOWED_TYPES[file.type];
    const storedName = `${id}${extension}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(
      path.join(UPLOAD_DIR, storedName),
      buffer,
      { flag: "wx" }
    );

    const metadata = {
      id,
      originalName: file.name,
      storedName,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: "Uploaded",
    };

    await writeFile(
      path.join(METADATA_DIR, `${id}.json`),
      JSON.stringify(metadata, null, 2)
    );

    return NextResponse.json(
      {
        message: "File uploaded successfully.",
        file: metadata,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Something went wrong while uploading the file." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await mkdir(METADATA_DIR, { recursive: true });

    const filenames = await readdir(METADATA_DIR);

    const files = await Promise.all(
      filenames
        .filter((name) => name.endsWith(".json"))
        .map(async (name) => {
          const content = await readFile(
            path.join(METADATA_DIR, name),
            "utf-8"
          );

          return JSON.parse(content);
        })
    );

    files.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() -
        new Date(a.uploadedAt).getTime()
    );

    return NextResponse.json({ files });
  } catch (error) {
    console.error("File retrieval error:", error);

    return NextResponse.json(
      { error: "Could not retrieve files." },
      { status: 500 }
    );
  }
}
