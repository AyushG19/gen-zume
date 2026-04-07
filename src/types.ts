import type { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import type {
  Award,
  Certification,
  Education,
  Experience,
  Project,
} from "@prisma/client";
import type { Context, SessionFlavor } from "grammy";
import { z } from "zod";

import {
  AwardSchema,
  CertificationSchema,
  EducationSchema,
  ExperienceSchema,
  HeaderSchema,
  LinksSchema,
  ProjectSchema,
  SkillsSchema,
} from "../generated/zod/index.js";
export const Fields = z.enum([
  "Header",
  "Links",
  "Summary",
  "Skills",
  "Experience",
  "Projects",
  "Education",
  "Certification",
  "Awards",
]);
export type Fields = z.infer<typeof Fields>;
export const FeildsArr = Fields.options;

export const FieldWithSubFields = z.enum(["Header", "Links", "Skills"]);
export type FieldWithSubFields = z.infer<typeof FieldWithSubFields>;
export const FieldWithSubFieldsArr = FieldWithSubFields.options;

export const LeafFieldInFields = z.enum([
  "Summary",
  "Experience",
  "Projects",
  "Education",
  "Certification",
  "Awards",
]);
export type LeafFieldInFields = z.infer<typeof LeafFieldInFields>;

export const HeaderSubFeilds = z.enum(["Name", "Phone", "Email"]);
export type HeaderSubFeilds = z.infer<typeof HeaderSubFeilds>;

export const LinksSubfeild = z.enum(["Github", "Linkedin", "X"]);
export type LinksSubfeild = z.infer<typeof LinksSubfeild>;

export const SkillsSubFeilds = z.enum(["Technical", "Soft", "Tools"]);
export type SkillsSubFeilds = z.infer<typeof SkillsSubFeilds>;

export const LeafField = z.union([
  HeaderSubFeilds,
  LinksSubfeild,
  SkillsSubFeilds,
  LeafFieldInFields,
]);
export type LeafField = z.infer<typeof LeafField>;
export const LeafFieldArr = LeafField.options.flatMap(
  (o) => o.options,
) as Array<z.infer<typeof LeafField>>;
export const MultiStringLeafFieldArr = [
  "Experience",
  "Projects",
  "Education",
  "Certification",
  "Awards",
] as const;
export type MultiStringLeafFieldArr = (typeof MultiStringLeafFieldArr)[number];
export type SingleStringLeafField = Exclude<LeafField, MultiStringLeafFieldArr>;

export const SessionData = z.object({
  telegramId: z.string().nullable(),
  mode: z.enum(["Add", "Edit", "Delete"]).nullable(),
  step: z.enum(["feild", "subfeild", "value"]).nullable(),
  leafField: z
    .union([HeaderSubFeilds, LinksSubfeild, SkillsSubFeilds, LeafFieldInFields])
    .nullable(),
  selectedIndex: z.number().nullable(),
  _loading: z.boolean().default(false),
  lastPdf: z.number().nullable(),
});

export const ResumeSchema = z.object({
  id: z.string(),
  header: HeaderSchema.optional(),
  links: LinksSchema.optional(),
  skills: SkillsSchema.optional(),
  summary: z.string().optional(),
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
  education: z.array(EducationSchema),
  certification: z.array(CertificationSchema),
  awards: z.array(AwardSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Resume = z.infer<typeof ResumeSchema>;

export type SessionData = z.infer<typeof SessionData>;

export type MyContext = ConversationFlavor<
  Context & SessionFlavor<SessionData>
>;
export type MyConversation = Conversation<MyContext, Context>;

export const InsertPayloadSchema = z.discriminatedUnion("fieldName", [
  z.object({ fieldName: z.literal("Experience"), data: ExperienceSchema }),
  z.object({ fieldName: z.literal("Projects"), data: ProjectSchema }),
  z.object({ fieldName: z.literal("Education"), data: EducationSchema }),
  z.object({
    fieldName: z.literal("Certification"),
    data: CertificationSchema,
  }),
  z.object({ fieldName: z.literal("Awards"), data: AwardSchema }),
]);

export type InsertPayload = z.infer<typeof InsertPayloadSchema>;

export const SingleStringSchema = z.object({ input: z.string().min(1) });
export type SingleString = z.infer<typeof SingleStringSchema>;

export const FIELD_PATH_MAP: Record<SingleStringLeafField, string> = {
  Name: "header.name",
  Phone: "header.phone",
  Email: "header.email",
  Github: "links.github",
  Linkedin: "links.linkedin",
  X: "links.x",
  Technical: "skills.technical",
  Soft: "skills.soft",
  Tools: "skills.tools",
  Summary: "summary",
};

export type FieldData =
  | Project[]
  | Certification[]
  | Experience[]
  | Education[]
  | Award[];

export type FieldReturnTypeMap = {
  Experience: Experience[];
  Projects: Project[];
  Education: Education[];
  Certification: Certification[];
  Awards: Award[];
};
