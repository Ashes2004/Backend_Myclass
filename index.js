import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRoutes from "./routes/StudentRoutes.js";
import teacherRoutes from "./routes/TeacherRoutes.js";
import classRoutineRoutes from "./routes/classRoutineRoutes.js";
import teacherRoutineRoutes from "./routes/TeacherRoutineRoutes.js";
import classRoutes from './routes/ClassRoutes.js';
import roomRoutes from './routes/RoomRoutes.js';
import studentEnrollRoutes from './routes/StudentEnrollment.js'
import cors from 'cors';
import quizRoutes from './routes/QuizRoutes.js';
// import studentQuizRoutes from './routes/StudentQuizRoutes.js';
import administrativeRoutes from './routes/AdminRoutes.js';
// import authenticateToken from './middleware/authMiddleware.js';
import errorHandler from "./middleware/errorHandler.js";
import admin from 'firebase-admin';
import onlineClassRoutes from "./routes/OnlineClassRoutes.js"
import attendenceRoutes from './routes/AttendenceRoutes.js';
import alertRoutes from './routes/AlertTokenRoutes.js';
import chatBotRoutes from './routes/ChatBot.js'
import pollRoutes from './routes/pollRoutes.js';
import resultRoutes from './routes/ResultRoutes.js'
import serviceAccount from './myclass-6cf84-firebase-adminsdk-r71sl-388ebdf077.json' assert { type: "json" };
dotenv.config();




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());



mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/class-routine", classRoutineRoutes);
app.use("/api/teacher-routine", teacherRoutineRoutes);
app.use('/api/classes',  classRoutes);
app.use('/api/quizzes', quizRoutes);
// app.use('/api/student-quizzes', studentQuizRoutes);
app.use('/api/attendence', attendenceRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/student-enroll', studentEnrollRoutes);
app.use('/api/admin',  administrativeRoutes);
app.use('/api/online-class' ,onlineClassRoutes );
app.use('/api/alert' , alertRoutes);
app.use('/api/chat' , chatBotRoutes);
app.use('/api/poll' , pollRoutes);
app.use('/api/result' , resultRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
