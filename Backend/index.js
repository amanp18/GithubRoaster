import express from 'express'
import { roastRoutes } from './routes/roastRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
const PORT = 5000
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

dotenv.config()
app.use(express.json())

app.use("/api",roastRoutes)


app.listen(PORT,()=>console.log(`🔥 Server running at http://localhost:${PORT}`))