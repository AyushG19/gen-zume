import { z } from 'zod';
import type { Prisma } from '../prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ResumeScalarFieldEnumSchema = z.enum(['id','telegramId','summary','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// RESUME SCHEMA
/////////////////////////////////////////

export const ResumeSchema = z.object({
  id: z.string(),
  telegramId: z.string(),
  summary: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Resume = z.infer<typeof ResumeSchema>

/////////////////////////////////////////
// COMPOSITE TYPES
/////////////////////////////////////////
// HEADER
//------------------------------------------------------


/////////////////////////////////////////
// HEADER SCHEMA
/////////////////////////////////////////

export const HeaderSchema = z.object({
  name: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
})

export type Header = z.infer<typeof HeaderSchema>
// LINKS
//------------------------------------------------------


/////////////////////////////////////////
// LINKS SCHEMA
/////////////////////////////////////////

export const LinksSchema = z.object({
  github: z.string().nullable(),
  linkedin: z.string().nullable(),
  x: z.string().nullable(),
})

export type Links = z.infer<typeof LinksSchema>
// SKILLS
//------------------------------------------------------


/////////////////////////////////////////
// SKILLS SCHEMA
/////////////////////////////////////////

export const SkillsSchema = z.object({
  technical: z.string().nullable(),
  soft: z.string().nullable(),
  tools: z.string().nullable(),
})

export type Skills = z.infer<typeof SkillsSchema>
// EXPERIENCE
//------------------------------------------------------


/////////////////////////////////////////
// EXPERIENCE SCHEMA
/////////////////////////////////////////

export const ExperienceSchema = z.object({
  jobTitle: z.string(),
  companyName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
})

export type Experience = z.infer<typeof ExperienceSchema>
// PROJECT
//------------------------------------------------------


/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  projectName: z.string(),
  technologies: z.string(),
  bulletPoints: z.string().array(),
})

export type Project = z.infer<typeof ProjectSchema>
// EDUCATION
//------------------------------------------------------


/////////////////////////////////////////
// EDUCATION SCHEMA
/////////////////////////////////////////

export const EducationSchema = z.object({
  qualification: z.string(),
  institution: z.string(),
  startYear: z.string(),
  endYear: z.string(),
})

export type Education = z.infer<typeof EducationSchema>
// CERTIFICATION
//------------------------------------------------------


/////////////////////////////////////////
// CERTIFICATION SCHEMA
/////////////////////////////////////////

export const CertificationSchema = z.object({
  certificationName: z.string(),
  acronym: z.string().nullable(),
  organizationName: z.string(),
  dateEarned: z.string(),
  credentialId: z.string().nullable(),
})

export type Certification = z.infer<typeof CertificationSchema>
// AWARD
//------------------------------------------------------


/////////////////////////////////////////
// AWARD SCHEMA
/////////////////////////////////////////

export const AwardSchema = z.object({
  awardName: z.string(),
  issuer: z.string(),
  date: z.string(),
})

export type Award = z.infer<typeof AwardSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// RESUME
//------------------------------------------------------

export const ResumeIncludeSchema: z.ZodType<Prisma.ResumeInclude> = z.object({
}).strict();

export const ResumeArgsSchema: z.ZodType<Prisma.ResumeDefaultArgs> = z.object({
  select: z.lazy(() => ResumeSelectSchema).optional(),
  include: z.lazy(() => ResumeIncludeSchema).optional(),
}).strict();

export const ResumeSelectSchema: z.ZodType<Prisma.ResumeSelect> = z.object({
  id: z.boolean().optional(),
  telegramId: z.boolean().optional(),
  header: z.union([z.boolean(),z.lazy(() => HeaderArgsSchema)]).optional(),
  links: z.union([z.boolean(),z.lazy(() => LinksArgsSchema)]).optional(),
  skills: z.union([z.boolean(),z.lazy(() => SkillsArgsSchema)]).optional(),
  summary: z.boolean().optional(),
  experience: z.union([z.boolean(),z.lazy(() => ExperienceArgsSchema)]).optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  education: z.union([z.boolean(),z.lazy(() => EducationArgsSchema)]).optional(),
  certification: z.union([z.boolean(),z.lazy(() => CertificationArgsSchema)]).optional(),
  awards: z.union([z.boolean(),z.lazy(() => AwardArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// HEADER
//------------------------------------------------------

export const HeaderArgsSchema: z.ZodType<Prisma.HeaderDefaultArgs> = z.object({
  select: z.lazy(() => HeaderSelectSchema).optional(),
}).strict();

export const HeaderSelectSchema: z.ZodType<Prisma.HeaderSelect> = z.object({
  name: z.boolean().optional(),
  phone: z.boolean().optional(),
  email: z.boolean().optional(),
}).strict()

// LINKS
//------------------------------------------------------

export const LinksArgsSchema: z.ZodType<Prisma.LinksDefaultArgs> = z.object({
  select: z.lazy(() => LinksSelectSchema).optional(),
}).strict();

export const LinksSelectSchema: z.ZodType<Prisma.LinksSelect> = z.object({
  github: z.boolean().optional(),
  linkedin: z.boolean().optional(),
  x: z.boolean().optional(),
}).strict()

// SKILLS
//------------------------------------------------------

export const SkillsArgsSchema: z.ZodType<Prisma.SkillsDefaultArgs> = z.object({
  select: z.lazy(() => SkillsSelectSchema).optional(),
}).strict();

export const SkillsSelectSchema: z.ZodType<Prisma.SkillsSelect> = z.object({
  technical: z.boolean().optional(),
  soft: z.boolean().optional(),
  tools: z.boolean().optional(),
}).strict()

// EXPERIENCE
//------------------------------------------------------

export const ExperienceArgsSchema: z.ZodType<Prisma.ExperienceDefaultArgs> = z.object({
  select: z.lazy(() => ExperienceSelectSchema).optional(),
}).strict();

export const ExperienceSelectSchema: z.ZodType<Prisma.ExperienceSelect> = z.object({
  jobTitle: z.boolean().optional(),
  companyName: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  description: z.boolean().optional(),
}).strict()

// PROJECT
//------------------------------------------------------

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectDefaultArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
}).strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  projectName: z.boolean().optional(),
  technologies: z.boolean().optional(),
  bulletPoints: z.boolean().optional(),
}).strict()

// EDUCATION
//------------------------------------------------------

export const EducationArgsSchema: z.ZodType<Prisma.EducationDefaultArgs> = z.object({
  select: z.lazy(() => EducationSelectSchema).optional(),
}).strict();

export const EducationSelectSchema: z.ZodType<Prisma.EducationSelect> = z.object({
  qualification: z.boolean().optional(),
  institution: z.boolean().optional(),
  startYear: z.boolean().optional(),
  endYear: z.boolean().optional(),
}).strict()

// CERTIFICATION
//------------------------------------------------------

export const CertificationArgsSchema: z.ZodType<Prisma.CertificationDefaultArgs> = z.object({
  select: z.lazy(() => CertificationSelectSchema).optional(),
}).strict();

export const CertificationSelectSchema: z.ZodType<Prisma.CertificationSelect> = z.object({
  certificationName: z.boolean().optional(),
  acronym: z.boolean().optional(),
  organizationName: z.boolean().optional(),
  dateEarned: z.boolean().optional(),
  credentialId: z.boolean().optional(),
}).strict()

// AWARD
//------------------------------------------------------

export const AwardArgsSchema: z.ZodType<Prisma.AwardDefaultArgs> = z.object({
  select: z.lazy(() => AwardSelectSchema).optional(),
}).strict();

export const AwardSelectSchema: z.ZodType<Prisma.AwardSelect> = z.object({
  awardName: z.boolean().optional(),
  issuer: z.boolean().optional(),
  date: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ResumeWhereInputSchema: z.ZodType<Prisma.ResumeWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ResumeWhereInputSchema), z.lazy(() => ResumeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResumeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResumeWhereInputSchema), z.lazy(() => ResumeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  telegramId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  header: z.union([ z.lazy(() => HeaderNullableCompositeFilterSchema), z.lazy(() => HeaderObjectEqualityInputSchema) ]).optional().nullable(),
  links: z.union([ z.lazy(() => LinksNullableCompositeFilterSchema), z.lazy(() => LinksObjectEqualityInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => SkillsNullableCompositeFilterSchema), z.lazy(() => SkillsObjectEqualityInputSchema) ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  experience: z.union([ z.lazy(() => ExperienceCompositeListFilterSchema), z.lazy(() => ExperienceObjectEqualityInputSchema).array() ]).optional(),
  projects: z.union([ z.lazy(() => ProjectCompositeListFilterSchema), z.lazy(() => ProjectObjectEqualityInputSchema).array() ]).optional(),
  education: z.union([ z.lazy(() => EducationCompositeListFilterSchema), z.lazy(() => EducationObjectEqualityInputSchema).array() ]).optional(),
  certification: z.union([ z.lazy(() => CertificationCompositeListFilterSchema), z.lazy(() => CertificationObjectEqualityInputSchema).array() ]).optional(),
  awards: z.union([ z.lazy(() => AwardCompositeListFilterSchema), z.lazy(() => AwardObjectEqualityInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const ResumeOrderByWithRelationInputSchema: z.ZodType<Prisma.ResumeOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  telegramId: z.lazy(() => SortOrderSchema).optional(),
  header: z.lazy(() => HeaderOrderByInputSchema).optional(),
  links: z.lazy(() => LinksOrderByInputSchema).optional(),
  skills: z.lazy(() => SkillsOrderByInputSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => ExperienceOrderByCompositeAggregateInputSchema).optional(),
  projects: z.lazy(() => ProjectOrderByCompositeAggregateInputSchema).optional(),
  education: z.lazy(() => EducationOrderByCompositeAggregateInputSchema).optional(),
  certification: z.lazy(() => CertificationOrderByCompositeAggregateInputSchema).optional(),
  awards: z.lazy(() => AwardOrderByCompositeAggregateInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ResumeWhereUniqueInputSchema: z.ZodType<Prisma.ResumeWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    telegramId: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    telegramId: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  telegramId: z.string().optional(),
  AND: z.union([ z.lazy(() => ResumeWhereInputSchema), z.lazy(() => ResumeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResumeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResumeWhereInputSchema), z.lazy(() => ResumeWhereInputSchema).array() ]).optional(),
  header: z.union([ z.lazy(() => HeaderNullableCompositeFilterSchema), z.lazy(() => HeaderObjectEqualityInputSchema) ]).optional().nullable(),
  links: z.union([ z.lazy(() => LinksNullableCompositeFilterSchema), z.lazy(() => LinksObjectEqualityInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => SkillsNullableCompositeFilterSchema), z.lazy(() => SkillsObjectEqualityInputSchema) ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  experience: z.union([ z.lazy(() => ExperienceCompositeListFilterSchema), z.lazy(() => ExperienceObjectEqualityInputSchema).array() ]).optional(),
  projects: z.union([ z.lazy(() => ProjectCompositeListFilterSchema), z.lazy(() => ProjectObjectEqualityInputSchema).array() ]).optional(),
  education: z.union([ z.lazy(() => EducationCompositeListFilterSchema), z.lazy(() => EducationObjectEqualityInputSchema).array() ]).optional(),
  certification: z.union([ z.lazy(() => CertificationCompositeListFilterSchema), z.lazy(() => CertificationObjectEqualityInputSchema).array() ]).optional(),
  awards: z.union([ z.lazy(() => AwardCompositeListFilterSchema), z.lazy(() => AwardObjectEqualityInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
}));

export const ResumeOrderByWithAggregationInputSchema: z.ZodType<Prisma.ResumeOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  telegramId: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ResumeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ResumeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ResumeMinOrderByAggregateInputSchema).optional(),
});

export const ResumeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ResumeScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema), z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema), z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  telegramId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  summary: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const ResumeCreateInputSchema: z.ZodType<Prisma.ResumeCreateInput> = z.strictObject({
  id: z.string().optional(),
  telegramId: z.string(),
  header: z.union([ z.lazy(() => HeaderNullableCreateEnvelopeInputSchema), z.lazy(() => HeaderCreateInputSchema) ]).optional().nullable(),
  links: z.union([ z.lazy(() => LinksNullableCreateEnvelopeInputSchema), z.lazy(() => LinksCreateInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => SkillsNullableCreateEnvelopeInputSchema), z.lazy(() => SkillsCreateInputSchema) ]).optional().nullable(),
  summary: z.string().optional().nullable(),
  experience: z.union([ z.lazy(() => ExperienceListCreateEnvelopeInputSchema), z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
  projects: z.union([ z.lazy(() => ProjectListCreateEnvelopeInputSchema), z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
  education: z.union([ z.lazy(() => EducationListCreateEnvelopeInputSchema), z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
  certification: z.union([ z.lazy(() => CertificationListCreateEnvelopeInputSchema), z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
  awards: z.union([ z.lazy(() => AwardListCreateEnvelopeInputSchema), z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ResumeUncheckedCreateInputSchema: z.ZodType<Prisma.ResumeUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  telegramId: z.string(),
  header: z.union([ z.lazy(() => HeaderNullableCreateEnvelopeInputSchema), z.lazy(() => HeaderCreateInputSchema) ]).optional().nullable(),
  links: z.union([ z.lazy(() => LinksNullableCreateEnvelopeInputSchema), z.lazy(() => LinksCreateInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => SkillsNullableCreateEnvelopeInputSchema), z.lazy(() => SkillsCreateInputSchema) ]).optional().nullable(),
  summary: z.string().optional().nullable(),
  experience: z.union([ z.lazy(() => ExperienceListCreateEnvelopeInputSchema), z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
  projects: z.union([ z.lazy(() => ProjectListCreateEnvelopeInputSchema), z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
  education: z.union([ z.lazy(() => EducationListCreateEnvelopeInputSchema), z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
  certification: z.union([ z.lazy(() => CertificationListCreateEnvelopeInputSchema), z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
  awards: z.union([ z.lazy(() => AwardListCreateEnvelopeInputSchema), z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ResumeUpdateInputSchema: z.ZodType<Prisma.ResumeUpdateInput> = z.strictObject({
  telegramId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.lazy(() => HeaderNullableUpdateEnvelopeInputSchema), z.lazy(() => HeaderCreateInputSchema) ]).optional().nullable(),
  links: z.union([ z.lazy(() => LinksNullableUpdateEnvelopeInputSchema), z.lazy(() => LinksCreateInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => SkillsNullableUpdateEnvelopeInputSchema), z.lazy(() => SkillsCreateInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.lazy(() => ExperienceListUpdateEnvelopeInputSchema), z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
  projects: z.union([ z.lazy(() => ProjectListUpdateEnvelopeInputSchema), z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
  education: z.union([ z.lazy(() => EducationListUpdateEnvelopeInputSchema), z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
  certification: z.union([ z.lazy(() => CertificationListUpdateEnvelopeInputSchema), z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
  awards: z.union([ z.lazy(() => AwardListUpdateEnvelopeInputSchema), z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ResumeUncheckedUpdateInputSchema: z.ZodType<Prisma.ResumeUncheckedUpdateInput> = z.strictObject({
  telegramId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.lazy(() => HeaderNullableUpdateEnvelopeInputSchema), z.lazy(() => HeaderCreateInputSchema) ]).optional().nullable(),
  links: z.union([ z.lazy(() => LinksNullableUpdateEnvelopeInputSchema), z.lazy(() => LinksCreateInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => SkillsNullableUpdateEnvelopeInputSchema), z.lazy(() => SkillsCreateInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.lazy(() => ExperienceListUpdateEnvelopeInputSchema), z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
  projects: z.union([ z.lazy(() => ProjectListUpdateEnvelopeInputSchema), z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
  education: z.union([ z.lazy(() => EducationListUpdateEnvelopeInputSchema), z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
  certification: z.union([ z.lazy(() => CertificationListUpdateEnvelopeInputSchema), z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
  awards: z.union([ z.lazy(() => AwardListUpdateEnvelopeInputSchema), z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ResumeCreateManyInputSchema: z.ZodType<Prisma.ResumeCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  telegramId: z.string(),
  header: z.union([ z.lazy(() => HeaderNullableCreateEnvelopeInputSchema), z.lazy(() => HeaderCreateInputSchema) ]).optional().nullable(),
  links: z.union([ z.lazy(() => LinksNullableCreateEnvelopeInputSchema), z.lazy(() => LinksCreateInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => SkillsNullableCreateEnvelopeInputSchema), z.lazy(() => SkillsCreateInputSchema) ]).optional().nullable(),
  summary: z.string().optional().nullable(),
  experience: z.union([ z.lazy(() => ExperienceListCreateEnvelopeInputSchema), z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
  projects: z.union([ z.lazy(() => ProjectListCreateEnvelopeInputSchema), z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
  education: z.union([ z.lazy(() => EducationListCreateEnvelopeInputSchema), z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
  certification: z.union([ z.lazy(() => CertificationListCreateEnvelopeInputSchema), z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
  awards: z.union([ z.lazy(() => AwardListCreateEnvelopeInputSchema), z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ResumeUpdateManyMutationInputSchema: z.ZodType<Prisma.ResumeUpdateManyMutationInput> = z.strictObject({
  telegramId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.lazy(() => HeaderNullableUpdateEnvelopeInputSchema), z.lazy(() => HeaderCreateInputSchema) ]).optional().nullable(),
  links: z.union([ z.lazy(() => LinksNullableUpdateEnvelopeInputSchema), z.lazy(() => LinksCreateInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => SkillsNullableUpdateEnvelopeInputSchema), z.lazy(() => SkillsCreateInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.lazy(() => ExperienceListUpdateEnvelopeInputSchema), z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
  projects: z.union([ z.lazy(() => ProjectListUpdateEnvelopeInputSchema), z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
  education: z.union([ z.lazy(() => EducationListUpdateEnvelopeInputSchema), z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
  certification: z.union([ z.lazy(() => CertificationListUpdateEnvelopeInputSchema), z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
  awards: z.union([ z.lazy(() => AwardListUpdateEnvelopeInputSchema), z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ResumeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ResumeUncheckedUpdateManyInput> = z.strictObject({
  telegramId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.lazy(() => HeaderNullableUpdateEnvelopeInputSchema), z.lazy(() => HeaderCreateInputSchema) ]).optional().nullable(),
  links: z.union([ z.lazy(() => LinksNullableUpdateEnvelopeInputSchema), z.lazy(() => LinksCreateInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => SkillsNullableUpdateEnvelopeInputSchema), z.lazy(() => SkillsCreateInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.lazy(() => ExperienceListUpdateEnvelopeInputSchema), z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
  projects: z.union([ z.lazy(() => ProjectListUpdateEnvelopeInputSchema), z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
  education: z.union([ z.lazy(() => EducationListUpdateEnvelopeInputSchema), z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
  certification: z.union([ z.lazy(() => CertificationListUpdateEnvelopeInputSchema), z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
  awards: z.union([ z.lazy(() => AwardListUpdateEnvelopeInputSchema), z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const HeaderNullableCompositeFilterSchema: z.ZodType<Prisma.HeaderNullableCompositeFilter> = z.strictObject({
  equals: z.lazy(() => HeaderObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => HeaderWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => HeaderWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const HeaderObjectEqualityInputSchema: z.ZodType<Prisma.HeaderObjectEqualityInput> = z.strictObject({
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
});

export const LinksNullableCompositeFilterSchema: z.ZodType<Prisma.LinksNullableCompositeFilter> = z.strictObject({
  equals: z.lazy(() => LinksObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => LinksWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LinksWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const LinksObjectEqualityInputSchema: z.ZodType<Prisma.LinksObjectEqualityInput> = z.strictObject({
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  x: z.string().optional().nullable(),
});

export const SkillsNullableCompositeFilterSchema: z.ZodType<Prisma.SkillsNullableCompositeFilter> = z.strictObject({
  equals: z.lazy(() => SkillsObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => SkillsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SkillsWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const SkillsObjectEqualityInputSchema: z.ZodType<Prisma.SkillsObjectEqualityInput> = z.strictObject({
  technical: z.string().optional().nullable(),
  soft: z.string().optional().nullable(),
  tools: z.string().optional().nullable(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const ExperienceCompositeListFilterSchema: z.ZodType<Prisma.ExperienceCompositeListFilter> = z.strictObject({
  equals: z.lazy(() => ExperienceObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => ExperienceWhereInputSchema).optional(),
  some: z.lazy(() => ExperienceWhereInputSchema).optional(),
  none: z.lazy(() => ExperienceWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional(),
});

export const ExperienceObjectEqualityInputSchema: z.ZodType<Prisma.ExperienceObjectEqualityInput> = z.strictObject({
  jobTitle: z.string(),
  companyName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export const ProjectCompositeListFilterSchema: z.ZodType<Prisma.ProjectCompositeListFilter> = z.strictObject({
  equals: z.lazy(() => ProjectObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => ProjectWhereInputSchema).optional(),
  some: z.lazy(() => ProjectWhereInputSchema).optional(),
  none: z.lazy(() => ProjectWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional(),
});

export const ProjectObjectEqualityInputSchema: z.ZodType<Prisma.ProjectObjectEqualityInput> = z.strictObject({
  projectName: z.string(),
  technologies: z.string(),
  bulletPoints: z.string().array().optional(),
});

export const EducationCompositeListFilterSchema: z.ZodType<Prisma.EducationCompositeListFilter> = z.strictObject({
  equals: z.lazy(() => EducationObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => EducationWhereInputSchema).optional(),
  some: z.lazy(() => EducationWhereInputSchema).optional(),
  none: z.lazy(() => EducationWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional(),
});

export const EducationObjectEqualityInputSchema: z.ZodType<Prisma.EducationObjectEqualityInput> = z.strictObject({
  qualification: z.string(),
  institution: z.string(),
  startYear: z.string(),
  endYear: z.string(),
});

export const CertificationCompositeListFilterSchema: z.ZodType<Prisma.CertificationCompositeListFilter> = z.strictObject({
  equals: z.lazy(() => CertificationObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => CertificationWhereInputSchema).optional(),
  some: z.lazy(() => CertificationWhereInputSchema).optional(),
  none: z.lazy(() => CertificationWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional(),
});

export const CertificationObjectEqualityInputSchema: z.ZodType<Prisma.CertificationObjectEqualityInput> = z.strictObject({
  certificationName: z.string(),
  acronym: z.string().optional().nullable(),
  organizationName: z.string(),
  dateEarned: z.string(),
  credentialId: z.string().optional().nullable(),
});

export const AwardCompositeListFilterSchema: z.ZodType<Prisma.AwardCompositeListFilter> = z.strictObject({
  equals: z.lazy(() => AwardObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => AwardWhereInputSchema).optional(),
  some: z.lazy(() => AwardWhereInputSchema).optional(),
  none: z.lazy(() => AwardWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional(),
});

export const AwardObjectEqualityInputSchema: z.ZodType<Prisma.AwardObjectEqualityInput> = z.strictObject({
  awardName: z.string(),
  issuer: z.string(),
  date: z.string(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const HeaderOrderByInputSchema: z.ZodType<Prisma.HeaderOrderByInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
});

export const LinksOrderByInputSchema: z.ZodType<Prisma.LinksOrderByInput> = z.strictObject({
  github: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
});

export const SkillsOrderByInputSchema: z.ZodType<Prisma.SkillsOrderByInput> = z.strictObject({
  technical: z.lazy(() => SortOrderSchema).optional(),
  soft: z.lazy(() => SortOrderSchema).optional(),
  tools: z.lazy(() => SortOrderSchema).optional(),
});

export const ExperienceOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.ExperienceOrderByCompositeAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ProjectOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.ProjectOrderByCompositeAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const EducationOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.EducationOrderByCompositeAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const CertificationOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.CertificationOrderByCompositeAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const AwardOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.AwardOrderByCompositeAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ResumeCountOrderByAggregateInputSchema: z.ZodType<Prisma.ResumeCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  telegramId: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ResumeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ResumeMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  telegramId: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ResumeMinOrderByAggregateInputSchema: z.ZodType<Prisma.ResumeMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  telegramId: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const HeaderNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.HeaderNullableCreateEnvelopeInput> = z.strictObject({
  set: z.lazy(() => HeaderCreateInputSchema).optional().nullable(),
});

export const HeaderCreateInputSchema: z.ZodType<Prisma.HeaderCreateInput> = z.strictObject({
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
});

export const LinksNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.LinksNullableCreateEnvelopeInput> = z.strictObject({
  set: z.lazy(() => LinksCreateInputSchema).optional().nullable(),
});

export const LinksCreateInputSchema: z.ZodType<Prisma.LinksCreateInput> = z.strictObject({
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  x: z.string().optional().nullable(),
});

export const SkillsNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.SkillsNullableCreateEnvelopeInput> = z.strictObject({
  set: z.lazy(() => SkillsCreateInputSchema).optional().nullable(),
});

export const SkillsCreateInputSchema: z.ZodType<Prisma.SkillsCreateInput> = z.strictObject({
  technical: z.string().optional().nullable(),
  soft: z.string().optional().nullable(),
  tools: z.string().optional().nullable(),
});

export const ExperienceListCreateEnvelopeInputSchema: z.ZodType<Prisma.ExperienceListCreateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
});

export const ExperienceCreateInputSchema: z.ZodType<Prisma.ExperienceCreateInput> = z.strictObject({
  jobTitle: z.string(),
  companyName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export const ProjectListCreateEnvelopeInputSchema: z.ZodType<Prisma.ProjectListCreateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
});

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.strictObject({
  projectName: z.string(),
  technologies: z.string(),
  bulletPoints: z.union([ z.lazy(() => ProjectCreatebulletPointsInputSchema), z.string().array() ]).optional(),
});

export const EducationListCreateEnvelopeInputSchema: z.ZodType<Prisma.EducationListCreateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
});

export const EducationCreateInputSchema: z.ZodType<Prisma.EducationCreateInput> = z.strictObject({
  qualification: z.string(),
  institution: z.string(),
  startYear: z.string(),
  endYear: z.string(),
});

export const CertificationListCreateEnvelopeInputSchema: z.ZodType<Prisma.CertificationListCreateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
});

export const CertificationCreateInputSchema: z.ZodType<Prisma.CertificationCreateInput> = z.strictObject({
  certificationName: z.string(),
  acronym: z.string().optional().nullable(),
  organizationName: z.string(),
  dateEarned: z.string(),
  credentialId: z.string().optional().nullable(),
});

export const AwardListCreateEnvelopeInputSchema: z.ZodType<Prisma.AwardListCreateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
});

export const AwardCreateInputSchema: z.ZodType<Prisma.AwardCreateInput> = z.strictObject({
  awardName: z.string(),
  issuer: z.string(),
  date: z.string(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const HeaderNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.HeaderNullableUpdateEnvelopeInput> = z.strictObject({
  set: z.lazy(() => HeaderCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => HeaderUpsertInputSchema).optional(),
  unset: z.boolean().optional(),
});

export const LinksNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.LinksNullableUpdateEnvelopeInput> = z.strictObject({
  set: z.lazy(() => LinksCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => LinksUpsertInputSchema).optional(),
  unset: z.boolean().optional(),
});

export const SkillsNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.SkillsNullableUpdateEnvelopeInput> = z.strictObject({
  set: z.lazy(() => SkillsCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => SkillsUpsertInputSchema).optional(),
  unset: z.boolean().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional(),
});

export const ExperienceListUpdateEnvelopeInputSchema: z.ZodType<Prisma.ExperienceListUpdateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => ExperienceCreateInputSchema), z.lazy(() => ExperienceCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => ExperienceUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => ExperienceDeleteManyInputSchema).optional(),
});

export const ProjectListUpdateEnvelopeInputSchema: z.ZodType<Prisma.ProjectListUpdateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => ProjectCreateInputSchema), z.lazy(() => ProjectCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => ProjectUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => ProjectDeleteManyInputSchema).optional(),
});

export const EducationListUpdateEnvelopeInputSchema: z.ZodType<Prisma.EducationListUpdateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => EducationCreateInputSchema), z.lazy(() => EducationCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => EducationUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => EducationDeleteManyInputSchema).optional(),
});

export const CertificationListUpdateEnvelopeInputSchema: z.ZodType<Prisma.CertificationListUpdateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => CertificationCreateInputSchema), z.lazy(() => CertificationCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => CertificationUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => CertificationDeleteManyInputSchema).optional(),
});

export const AwardListUpdateEnvelopeInputSchema: z.ZodType<Prisma.AwardListUpdateEnvelopeInput> = z.strictObject({
  set: z.union([ z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => AwardCreateInputSchema), z.lazy(() => AwardCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => AwardUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => AwardDeleteManyInputSchema).optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const HeaderWhereInputSchema: z.ZodType<Prisma.HeaderWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => HeaderWhereInputSchema), z.lazy(() => HeaderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HeaderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HeaderWhereInputSchema), z.lazy(() => HeaderWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const LinksWhereInputSchema: z.ZodType<Prisma.LinksWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LinksWhereInputSchema), z.lazy(() => LinksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LinksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LinksWhereInputSchema), z.lazy(() => LinksWhereInputSchema).array() ]).optional(),
  github: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const SkillsWhereInputSchema: z.ZodType<Prisma.SkillsWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SkillsWhereInputSchema), z.lazy(() => SkillsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillsWhereInputSchema), z.lazy(() => SkillsWhereInputSchema).array() ]).optional(),
  technical: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  soft: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tools: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const ExperienceWhereInputSchema: z.ZodType<Prisma.ExperienceWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ExperienceWhereInputSchema), z.lazy(() => ExperienceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExperienceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExperienceWhereInputSchema), z.lazy(() => ExperienceWhereInputSchema).array() ]).optional(),
  jobTitle: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  companyName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endDate: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema), z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema), z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  projectName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  technologies: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  bulletPoints: z.lazy(() => StringNullableListFilterSchema).optional(),
});

export const EducationWhereInputSchema: z.ZodType<Prisma.EducationWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EducationWhereInputSchema), z.lazy(() => EducationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EducationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EducationWhereInputSchema), z.lazy(() => EducationWhereInputSchema).array() ]).optional(),
  qualification: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  institution: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  startYear: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endYear: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const CertificationWhereInputSchema: z.ZodType<Prisma.CertificationWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CertificationWhereInputSchema), z.lazy(() => CertificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CertificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CertificationWhereInputSchema), z.lazy(() => CertificationWhereInputSchema).array() ]).optional(),
  certificationName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  acronym: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  organizationName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dateEarned: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  credentialId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const AwardWhereInputSchema: z.ZodType<Prisma.AwardWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AwardWhereInputSchema), z.lazy(() => AwardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AwardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AwardWhereInputSchema), z.lazy(() => AwardWhereInputSchema).array() ]).optional(),
  awardName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  issuer: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const ProjectCreatebulletPointsInputSchema: z.ZodType<Prisma.ProjectCreatebulletPointsInput> = z.strictObject({
  set: z.string().array(),
});

export const HeaderUpsertInputSchema: z.ZodType<Prisma.HeaderUpsertInput> = z.strictObject({
  set: z.lazy(() => HeaderCreateInputSchema).nullable(),
  update: z.lazy(() => HeaderUpdateInputSchema),
});

export const LinksUpsertInputSchema: z.ZodType<Prisma.LinksUpsertInput> = z.strictObject({
  set: z.lazy(() => LinksCreateInputSchema).nullable(),
  update: z.lazy(() => LinksUpdateInputSchema),
});

export const SkillsUpsertInputSchema: z.ZodType<Prisma.SkillsUpsertInput> = z.strictObject({
  set: z.lazy(() => SkillsCreateInputSchema).nullable(),
  update: z.lazy(() => SkillsUpdateInputSchema),
});

export const ExperienceUpdateManyInputSchema: z.ZodType<Prisma.ExperienceUpdateManyInput> = z.strictObject({
  where: z.lazy(() => ExperienceWhereInputSchema),
  data: z.lazy(() => ExperienceUpdateInputSchema),
});

export const ExperienceDeleteManyInputSchema: z.ZodType<Prisma.ExperienceDeleteManyInput> = z.strictObject({
  where: z.lazy(() => ExperienceWhereInputSchema),
});

export const ProjectUpdateManyInputSchema: z.ZodType<Prisma.ProjectUpdateManyInput> = z.strictObject({
  where: z.lazy(() => ProjectWhereInputSchema),
  data: z.lazy(() => ProjectUpdateInputSchema),
});

export const ProjectDeleteManyInputSchema: z.ZodType<Prisma.ProjectDeleteManyInput> = z.strictObject({
  where: z.lazy(() => ProjectWhereInputSchema),
});

export const EducationUpdateManyInputSchema: z.ZodType<Prisma.EducationUpdateManyInput> = z.strictObject({
  where: z.lazy(() => EducationWhereInputSchema),
  data: z.lazy(() => EducationUpdateInputSchema),
});

export const EducationDeleteManyInputSchema: z.ZodType<Prisma.EducationDeleteManyInput> = z.strictObject({
  where: z.lazy(() => EducationWhereInputSchema),
});

export const CertificationUpdateManyInputSchema: z.ZodType<Prisma.CertificationUpdateManyInput> = z.strictObject({
  where: z.lazy(() => CertificationWhereInputSchema),
  data: z.lazy(() => CertificationUpdateInputSchema),
});

export const CertificationDeleteManyInputSchema: z.ZodType<Prisma.CertificationDeleteManyInput> = z.strictObject({
  where: z.lazy(() => CertificationWhereInputSchema),
});

export const AwardUpdateManyInputSchema: z.ZodType<Prisma.AwardUpdateManyInput> = z.strictObject({
  where: z.lazy(() => AwardWhereInputSchema),
  data: z.lazy(() => AwardUpdateInputSchema),
});

export const AwardDeleteManyInputSchema: z.ZodType<Prisma.AwardDeleteManyInput> = z.strictObject({
  where: z.lazy(() => AwardWhereInputSchema),
});

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.strictObject({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional(),
});

export const HeaderUpdateInputSchema: z.ZodType<Prisma.HeaderUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const LinksUpdateInputSchema: z.ZodType<Prisma.LinksUpdateInput> = z.strictObject({
  github: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const SkillsUpdateInputSchema: z.ZodType<Prisma.SkillsUpdateInput> = z.strictObject({
  technical: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  soft: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tools: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ExperienceUpdateInputSchema: z.ZodType<Prisma.ExperienceUpdateInput> = z.strictObject({
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z.strictObject({
  projectName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  technologies: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bulletPoints: z.union([ z.lazy(() => ProjectUpdatebulletPointsInputSchema), z.string().array() ]).optional(),
});

export const EducationUpdateInputSchema: z.ZodType<Prisma.EducationUpdateInput> = z.strictObject({
  qualification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  institution: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startYear: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endYear: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CertificationUpdateInputSchema: z.ZodType<Prisma.CertificationUpdateInput> = z.strictObject({
  certificationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  acronym: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateEarned: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AwardUpdateInputSchema: z.ZodType<Prisma.AwardUpdateInput> = z.strictObject({
  awardName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issuer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProjectUpdatebulletPointsInputSchema: z.ZodType<Prisma.ProjectUpdatebulletPointsInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ResumeFindFirstArgsSchema: z.ZodType<Prisma.ResumeFindFirstArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereInputSchema.optional(), 
  orderBy: z.union([ ResumeOrderByWithRelationInputSchema.array(), ResumeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResumeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResumeScalarFieldEnumSchema, ResumeScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ResumeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ResumeFindFirstOrThrowArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereInputSchema.optional(), 
  orderBy: z.union([ ResumeOrderByWithRelationInputSchema.array(), ResumeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResumeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResumeScalarFieldEnumSchema, ResumeScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ResumeFindManyArgsSchema: z.ZodType<Prisma.ResumeFindManyArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereInputSchema.optional(), 
  orderBy: z.union([ ResumeOrderByWithRelationInputSchema.array(), ResumeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResumeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResumeScalarFieldEnumSchema, ResumeScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ResumeAggregateArgsSchema: z.ZodType<Prisma.ResumeAggregateArgs> = z.object({
  where: ResumeWhereInputSchema.optional(), 
  orderBy: z.union([ ResumeOrderByWithRelationInputSchema.array(), ResumeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResumeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ResumeGroupByArgsSchema: z.ZodType<Prisma.ResumeGroupByArgs> = z.object({
  where: ResumeWhereInputSchema.optional(), 
  orderBy: z.union([ ResumeOrderByWithAggregationInputSchema.array(), ResumeOrderByWithAggregationInputSchema ]).optional(),
  by: ResumeScalarFieldEnumSchema.array(), 
  having: ResumeScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ResumeFindUniqueArgsSchema: z.ZodType<Prisma.ResumeFindUniqueArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereUniqueInputSchema, 
}).strict();

export const ResumeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ResumeFindUniqueOrThrowArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereUniqueInputSchema, 
}).strict();

export const ResumeCreateArgsSchema: z.ZodType<Prisma.ResumeCreateArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  data: z.union([ ResumeCreateInputSchema, ResumeUncheckedCreateInputSchema ]),
}).strict();

export const ResumeUpsertArgsSchema: z.ZodType<Prisma.ResumeUpsertArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereUniqueInputSchema, 
  create: z.union([ ResumeCreateInputSchema, ResumeUncheckedCreateInputSchema ]),
  update: z.union([ ResumeUpdateInputSchema, ResumeUncheckedUpdateInputSchema ]),
}).strict();

export const ResumeCreateManyArgsSchema: z.ZodType<Prisma.ResumeCreateManyArgs> = z.object({
  data: z.union([ ResumeCreateManyInputSchema, ResumeCreateManyInputSchema.array() ]),
}).strict();

export const ResumeDeleteArgsSchema: z.ZodType<Prisma.ResumeDeleteArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereUniqueInputSchema, 
}).strict();

export const ResumeUpdateArgsSchema: z.ZodType<Prisma.ResumeUpdateArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  data: z.union([ ResumeUpdateInputSchema, ResumeUncheckedUpdateInputSchema ]),
  where: ResumeWhereUniqueInputSchema, 
}).strict();

export const ResumeUpdateManyArgsSchema: z.ZodType<Prisma.ResumeUpdateManyArgs> = z.object({
  data: z.union([ ResumeUpdateManyMutationInputSchema, ResumeUncheckedUpdateManyInputSchema ]),
  where: ResumeWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ResumeDeleteManyArgsSchema: z.ZodType<Prisma.ResumeDeleteManyArgs> = z.object({
  where: ResumeWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();