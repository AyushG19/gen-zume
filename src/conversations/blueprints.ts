import {
  getProjectStrings,
  getExperienceStrings,
  getEducationStrings,
  getCertificationStrings,
  getSingleStringStrings,
  getAwardStrings,
} from "./strings/index.js";
import { type LeafField } from "../types.js";
import { isMultiStringLeafField } from "../helper/index.js";

type Mode = "Add" | "Edit";
export type Step = {
  key: string; // maps to schema field
  prompt: string; // what to ask user
  type: "single" | "array";
  maxItems?: number; // only for array
  endKeyword?: string; // only for array
};

export type Blueprint = {
  steps: Step[];
  success: string;
  error: string;
};

export function getBlueprint(field: LeafField, mode: Mode): Blueprint {
  if (!isMultiStringLeafField(field)) {
    const ss = getSingleStringStrings(field, mode);
    return {
      steps: [{ key: "input", prompt: ss.prompt, type: "single" }],
      success: ss.success,
      error: ss.error,
    };
  }
  switch (field) {
    case "Projects":
      const ps = getProjectStrings(mode);
      return {
        steps: [
          { key: "projectName", prompt: ps.step1, type: "single" },
          { key: "technologies", prompt: ps.step2, type: "single" },
          {
            key: "bulletPoints",
            prompt: ps.step3,
            type: "array",
            maxItems: 5,
            endKeyword: "end",
          },
        ],
        success: ps.success,
        error: ps.error,
      };
    case "Experience":
      const es = getExperienceStrings(mode);
      return {
        steps: [
          { key: "jobTitle", prompt: es.step1, type: "single" },
          { key: "companyName", prompt: es.step2, type: "single" },
          { key: "startDate", prompt: es.step3, type: "single" },
          { key: "endDate", prompt: es.step4, type: "single" },
          { key: "description", prompt: es.step5, type: "single" },
        ],
        success: es.success,
        error: es.error,
      };
    case "Education":
      const edu = getEducationStrings(mode);
      return {
        steps: [
          { key: "qualification", prompt: edu.step1, type: "single" },
          { key: "institution", prompt: edu.step2, type: "single" },
          { key: "startYear", prompt: edu.step3, type: "single" },
          { key: "endYear", prompt: edu.step4, type: "single" },
        ],
        success: edu.success,
        error: edu.error,
      };
    case "Certification":
      const cs = getCertificationStrings(mode);
      return {
        steps: [
          { key: "certificationName", prompt: cs.step1, type: "single" },
          { key: "acronym", prompt: cs.step2, type: "single" },
          { key: "organizationName", prompt: cs.step3, type: "single" },
          { key: "dateEarned", prompt: cs.step4, type: "single" },
          { key: "credentialId", prompt: cs.step5, type: "single" },
        ],
        success: cs.success,
        error: cs.error,
      };
    case "Awards":
      const aws = getAwardStrings(mode);
      return {
        steps: [
          { key: "awardName", prompt: aws.step1, type: "single" },
          { key: "issuer", prompt: aws.step2, type: "single" },
          { key: "date", prompt: aws.step3, type: "single" },
        ],
        success: aws.success,
        error: aws.error,
      };
    default:
      throw new Error(`No blueprint for field: ${field}`);
  }
}
