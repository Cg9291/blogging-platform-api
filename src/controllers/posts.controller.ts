
import type { Request, Response } from 'express'
import * as postsServices from '../services/posts.services.ts'

export async function getAllPosts(req: Request, res: Response) {
  try {
    const result = await postsServices.getAllPosts()
    return res.send(result)
  } catch (err) {
    return res.send(err)
  }
}

export async function createPost(req: Request, res: Response) {
  let reqBody = req.body

  try {
    const result = await postsServices.createOnePost(reqBody)
    return res.send(result)
  } catch (err) {
    return res.send(err)
  }
}
export async function getPostById(req: Request, res: Response) {
  const postId = req.params.postId as string

  try {
    const result = await postsServices.getPostById(postId)
    return res.send(result)
  } catch (err) {
    return res.status(404).send({ err })
  }
}


export async function updatePostById(req: Request, res: Response) {
  const reqBody = req.body
  const postId = req.params.postId as string

  try {
    const result = await postsServices.updatePostById(postId, reqBody)

    if (result.matchedCount === 0) {
      return res.status(404).send({
        message: 'Post not found'
      })
    }
    return res.send(result)
  } catch (err) {
    return res.status(404).send({ err })
  }
}

export async function deletePostById(req: Request, res: Response) {
  const postId = req.params.postId as string

  try {
    const result = await postsServices.deletePostById(postId)
    return res.send(result)
  } catch (err) {
    return res.status(404).send({ err })
  }
}
