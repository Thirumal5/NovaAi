import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors"
import ConnectDb from "./Database/Db.js"
import resumerouter from "./Route/resume.js"
import router from "./Route/Auth.js"
import matchroute from './Route/job.js'
import Analysisroute from './Route/latestAnalysis.js'
import Aichatroute from './Route/Aichat.js'
import jobdb from './Route/dbjobs.js'
import studyplan from './Route/study.js'
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", router)
app.use("/api/resume", resumerouter)
app.use('/api/analysis',Analysisroute)
app.use('/api/refresh/jobs',matchroute)
app.use('/api',Aichatroute)
app.use('/api',jobdb)
app.use('/api',studyplan)



app.listen(5000, () => {
  ConnectDb()
  console.log("server is created")
})
