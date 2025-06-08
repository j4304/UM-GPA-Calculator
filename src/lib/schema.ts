import { z } from "zod";

export const validGrades = [4.0, 3.5, 3.0, 2.5, 2.0, 1.0];

export const SubjectSchema = z.object({
  subjects: z.array(
    z.object({
      name: z.string().optional(),
      units: z.coerce
        .number({ invalid_type_error: "Enter a valid number" })
        .positive("Must be more than 0"),
      grade: z.coerce
        .number({ invalid_type_error: "Enter a valid grade" })
        .refine((val) => validGrades.includes(val), {
          message: "Select a valid grade",
        }),
    })
  ),
});

export type SubjectFormValues = z.infer<typeof SubjectSchema>;
