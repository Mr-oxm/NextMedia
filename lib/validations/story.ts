import * as z from "zod"

export const StoryValidation= z.object({
    text: z.string().min(3).max(1000),
    bg: z.string(),
})