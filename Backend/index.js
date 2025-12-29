import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import ConnectDb from "./Database/Db.js"
import resumerouter from "./Route/resume.js"
import router from "./Route/Auth.js"

import Analysisroute from './Route/latestAnalysis.js'
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", router)
app.use("/api/resume", resumerouter)
app.use('/api/analysis',Analysisroute)




app.listen(5000, () => {
  ConnectDb()
  console.log("server is created")
})
