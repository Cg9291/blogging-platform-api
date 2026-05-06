import express from 'express'
import { db } from './database/db.ts';
import { ObjectId } from 'mongodb';

const PORT = 3000;

const app = express()
app.use(express.json())
app.get("/", (req, res) => {
  return res.redirect(301, '/posts')
})

app.get("/posts", async (req, res) => {
  try {
    const result = await db.collection('posts').find({}).toArray()
    return res.send(result)
  } catch (err) {
    return err
  }
})

app.post("/posts", async (req, res) => {
  let reqBody = req.body
  reqBody = { ...reqBody, createdAt: new Date().toISOString() }
  try {
    const result = await db.collection('posts').insertOne(reqBody)
    return res.send(result)
  } catch (err) {
    return res.send(err)
  }
})

app.get("/posts/:postId", async (req, res) => {
  const params = req.params
  const postId = params.postId

  try {
    const result = await db.collection('posts').findOne({ _id: new ObjectId(postId) })
    return res.send(result)
  } catch (err) {
    return res.status(404).send({ err })
  }
})

app.put("/posts/:postId", async (req, res) => {
  const params = req.params
  const postId = params.postId
  const reqBody = req.body

  try {
    const result = await db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: reqBody })
    return res.send(result)
  } catch (err) {
    return res.status(404).send({ error: err })
  }
})

app.delete("/posts/:postId", async (req, res) => {
  const params = req.params
  const postId = params.postId

  try {
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(postId) })
    return res.send(result)
  } catch (err) {
    return res.status(404).send({ error: err })
  }
})

app.use((req, res) => {
  res.status(404)
  res.json({ message: "Wrong route buddy" })
})

app.listen(PORT, () => { console.log(`Server is running on PORT:${PORT}`) })
