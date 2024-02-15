import * as z from "zod"

const emptyStringToUndefined = z.literal('').transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
    return schema.optional().or(emptyStringToUndefined);
}
export const PostValidation= z.object({
    post: z.string().nonempty().min(3, {message:"Minimum 3 characters"}),
    uploadedPic: asOptionalField(z.string().url()),
    accountId:z.string(), 
})


export const CommentValidation= z.object({
    post: z.string().nonempty().min(3, {message:"Minimum 3 characters"}),
    uploadedPic: asOptionalField(z.string().url()),
})
