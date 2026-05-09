import { ObjectId } from 'mongodb'
import { db } from './db.ts'
import type { ExistingPostType, PostType } from '../types & schemas/types-and-schemas.ts'

const getPostsCollection = db.collection('posts')

export async function findAllPosts() {
  return await getPostsCollection.find({}).toArray()
}

export async function findAllPostsByFilter(filter: Record<string, unknown>) {
  return await getPostsCollection.find(filter).toArray()
}

export async function createOnePost(reqBody: PostType) {
  return await getPostsCollection.insertOne(reqBody)
}

export async function findOnePost(postId: string) {
  return await getPostsCollection.findOne({ _id: new ObjectId(postId) })
}

export async function updateOnePost(postId: string, reqBody: ExistingPostType) {
  return await getPostsCollection.updateOne({ _id: new ObjectId(postId) }, { $set: reqBody })
}

export async function deleteOnePost(postId: string) {
  return await getPostsCollection.deleteOne({ _id: new ObjectId(postId) })
}
