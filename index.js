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

dotenv.config();

const app = express();


admin.initializeApp({
  credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUN),
});


const allowedOrigins = ['http://localhost:3000', 'https://my-class-sih.vercel.app/'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


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
