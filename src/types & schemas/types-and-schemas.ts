import zod from "zod";

export const Post = zod.object({
  title: zod.string("title should be a string").trim().min(1, "title is required"),
  content: zod.string("content should be a string").trim().min(1, "content is required"),
  category: zod.string("category should be a string").trim().min(1, "category is required"),
  tags: zod.array(zod.string("tags should be an array of string").trim()).min(1, "tags are required")
})

export type PostType = zod.infer<typeof Post>

export const ExistingPost = Post.extend({
  // createdAt: zod.iso.datetime("CreatedAt must be in ISO string format").trim().min(1, "CreatedAt is required"),
  updatedAt: zod.iso.datetime("UpdatedAt must be in ISO string format").trim().min(1, "UpdatedAt is required")
})

export type ExistingPostType = zod.infer<typeof ExistingPost>
