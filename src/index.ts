import express from 'express'
import { MongoClient } from 'mongodb';

async function runGetStarted() {
  const uri = 'mongodb://127.0.0.1:27017/blogging-platform'
  const client = new MongoClient(uri);

  try {
    const database = client.db();
    const posts = database.collection('posts');
    const allPosts = await posts.find({}).toArray()

    console.log(allPosts)
  } finally {
    await client.close();
  }
}
runGetStarted().catch(console.dir);

const PORT = 3000;

const app = express()
app.get("/", (req, res) => {
  return res.redirect(301, '/posts')
})

app.get("/posts", (req, res) => {
  return res.send({ message: "Look at all these posts" })
})

app.post("/posts", (req, res) => {
  return res.send({ message: "We'll pretend we successfully created your post" })
})

app.get("/posts/:postId", (req, res) => {
  const params = req.params
  const postId = params.postId

  console.log({ postId })
  return res.send({ message: "get 1 post, let's pretend we did that" })
})

app.put("/posts/:postId", (req, res) => {
  const params = req.params
  const postId = params.postId

  console.log({ postId })
  return res.send({ message: "Put, we will pretend your put request was succesful" })
})

app.delete("/posts/:postId", (req, res) => {
  const params = req.params
  const postId = params.postId

  console.log({ postId })
  return res.send({ message: "Delete, right, we'll pretend the delete request was succesful" })
})

app.use((req, res) => {
  res.status(404)
  res.json({ message: "Wrong route buddy" })
})

app.listen(PORT, () => { console.log(`Server is running on PORT:${PORT}`) })
