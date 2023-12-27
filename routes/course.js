import { addCourse, getAllCourses, getCourseById } from '../controllers/course.js';
import express from "express";

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', addCourse);

export default router;