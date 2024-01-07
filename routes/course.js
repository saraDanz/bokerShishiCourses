import { addCourse, getAllCourses, getCourseById } from '../controllers/course.js';
import express from "express";
import { auth } from '../middlwares/auth.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', auth, addCourse);

export default router;