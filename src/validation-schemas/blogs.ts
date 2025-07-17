import z from "zod";

const createBlogsSchema = z.object({
  title: z.string().min(1, "Title cannot be empry"),
  content: z.string().min(1, "Please add the content"),
});

type CreateBlogType = z.infer<typeof createBlogsSchema>;

export { createBlogsSchema };
export type { CreateBlogType };
