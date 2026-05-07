import express from 'express'
import * as postsController from './controllers/posts.controller.ts';

const PORT = 3000;

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  return res.redirect(301, '/posts')
})
app.get("/posts", postsController.getAllPosts)
app.post("/posts", postsController.createPost)

app.get("/posts/:postId", postsController.getPostById)
app.put("/posts/:postId", postsController.updatePostById)
app.delete("/posts/:postId", postsController.deletePostById)

app.use((req, res) => {
  res.status(404)
  res.json({ message: "Wrong route buddy" })
})

app.listen(PORT, () => { console.log(`Server is running on PORT:${PORT}`) })
