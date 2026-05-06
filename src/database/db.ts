import { MongoClient } from "mongodb";

const uri = 'mongodb://127.0.0.1:27017/blogging-platform'
const client = new MongoClient(uri);
export const db = client.db();

