import { z } from "zod";
export const registerOrganizationSchema = z.object({
    organizationName: z.string().min(2).max(200),
    organizationType: z.enum([
        "UNIVERSITY",
        "SCHOOL",
        "COMPANY",
        "NGO",
        "CHURCH",
        "TRAINING_ORGANIZATION",
        "PROFESSIONAL_BODY",
        "CONFERENCE_ORGANIZER",
        "OTHER",
    ]),
    country: z.string().min(2).max(100),
    phone: z.string().max(30).optional(),
    administratorName: z.string().min(2).max(200),
});
//# sourceMappingURL=auth.schemas.js.map