import { ObjectId } from 'mongodb'
import { db } from './db.ts'

const getPostsCollection = db.collection('posts')

export async function findAllPosts() {
  return await getPostsCollection.find({}).toArray()
}

export async function createOnePost(reqBody) {
  return await getPostsCollection.insertOne(reqBody)
}

export async function findOnePost(postId: string) {
  return await getPostsCollection.findOne({ _id: new ObjectId(postId) })
}

export async function updateOnePost(postId: string, reqBody) {
  return await getPostsCollection.updateOne({ _id: new ObjectId(postId) }, { $set: reqBody })
}

export async function deleteOnePost(postId: string) {
  return await getPostsCollection.deleteOne({ _id: new ObjectId(postId) })
}
