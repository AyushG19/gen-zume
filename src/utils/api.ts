import type { Resume } from "@prisma/client";
import { normalizeResume } from "../helper/resume.helper";
import { generateResumeTex } from "./toTex";

export type ApiResponse = {
  status: "success" | "error";
  errors: string[];
  resultPath: string | null;
  outputFiles:
    | {
        type: string;
        content: string;
      }[]
    | null;
};

export async function fetchUrl(resume: Resume): Promise<string | null> {
  const normalizedResume = normalizeResume(resume);
  const resumeLatex = generateResumeTex(normalizedResume);
  const formData = new FormData();

  formData.append(
    "files",
    new Blob([resumeLatex], { type: "text/plain" }),
    "main.tex",
  );

  try {
    const url = process.env.TEXAPI_URL!;
    const key = process.env.TEXAPI_API_KEY!;
    const res = await fetch(url, {
      method: "POST",
      headers: { "X-API-KEY": key },
      body: formData,
    });

    const data = (await res.json()) as ApiResponse;
    if (data.status === "success" && data.resultPath) {
      return `https://texapi.ovh${data.resultPath}`;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in Fetching Pdf URL.");
    return null;
  }
}
