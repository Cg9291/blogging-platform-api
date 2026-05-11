import * as postsData from "../database/posts.db.ts";
import type { ExistingPostType, PostType } from "../types & schemas/types-and-schemas.ts";

export async function getAllPosts(term?: string) {
  let formattedResult;

  if (!term) {
    const result = await postsData.findAllPosts()

    formattedResult = result.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest,
    }))

    return formattedResult
  }

  const result = await postsData.findAllPostsByFilter({
    $or: [
      { title: { $regex: term, $options: 'i' } },
      { content: { $regex: term, $options: 'i' } },
      { category: { $regex: term, $options: 'i' } },
    ],
  })

  formattedResult = result.map(({ _id, ...rest }) => ({
    id: _id.toHexString(),
    ...rest,
  }))

  return formattedResult
}


export async function createOnePost(reqBody: PostType) {
  const newIsoDate = new Date().toISOString()
  const formattedReqBody = { ...reqBody, createdAt: newIsoDate, updatedAt: newIsoDate }

  const result = await postsData.createOnePost(formattedReqBody)

  if (!result.acknowledged) {
    throw new Error("Insert failed")
  }

  const formattedResult = { id: result.insertedId.toHexString(), ...formattedReqBody }
  return formattedResult
}


export async function getPostById(postId: string) {
  const result = await postsData.findOnePost(postId)
  if (result === null) {
    throw new Error("Could not find resource")
  }

  const { _id, ...rest } = result
  const formattedResult = { id: _id.toHexString(), ...rest }

  return formattedResult
}

export async function updatePostById(postId: string, reqBody: PostType) {
  const formattedReqBody: ExistingPostType = { ...reqBody, updatedAt: new Date().toISOString() }
  const result = await postsData.updateOnePost(postId, formattedReqBody)
  //todo:add the createdAt prop in the return body
  if (!result) {
    throw new Error('Post not found')
  }
  const { _id, ...rest } = result

  return {
    id: _id.toHexString(),
    ...rest
  }
}

export async function deletePostById(postId: string) {
  const result = await postsData.deleteOnePost(postId)

  if (result.deletedCount === 0) {
    throw new Error('Post not found')
  }

  return {}
}
