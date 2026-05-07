import * as postsData from "../database/posts.db.ts";
import type { ExistingPostType, PostType } from "../types & schemas/types-and-schemas.ts";

export async function getAllPosts() {
  const result = await postsData.findAllPosts()
  if (!Array.isArray(result)) {//todo: maybe remove,since redundant
    throw new Error("Wrong document format was returned")
  }

  return result
}


export async function createOnePost(reqBody: PostType) {
  const newIsoDate = new Date().toISOString()
  const formattedReqBody = { ...reqBody, createdAt: newIsoDate, updatedAt: newIsoDate }

  const result = await postsData.createOnePost(formattedReqBody)

  if (!result.acknowledged) {
    throw new Error("Insert failed")
  }

  return { message: "Post was successfully created!", insertedId: result.insertedId }
}


export async function getPostById(postId: string) {
  const result = await postsData.findOnePost(postId)
  if (result === null) {
    throw new Error("Could not find resource")
  }
  return result
}

export async function updatePostById(postId: string, reqBody: PostType) {
  const formattedReqBody: ExistingPostType = { ...reqBody, updatedAt: new Date().toISOString() }
  const result = await postsData.updateOnePost(postId, formattedReqBody)

  if (result.matchedCount === 0) {
    throw new Error('Post not found')
  }

  return {
    message: 'Post updated successfully',
    modifiedCount: result.modifiedCount,
  }
}

export async function deletePostById(postId: string) {
  const result = await postsData.deleteOnePost(postId)

  if (result.deletedCount === 0) {
    throw new Error('Post not found')
  }

  return {
    message: 'Post deleted successfully',
  }
}
