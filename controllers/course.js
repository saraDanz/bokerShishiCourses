import mongoose from "mongoose";
import { Course } from "../models/course.js";

const getAllCourses = async (req, res) => {
    //params -חובה
    //query params
    // http://localhost:4200/cake/1
    // http://localhost:4200/cake?price=50&category=70
    // http://localhost:4200/cake?search=ava

    let { search } = req.query;
    let perPage = req.query.perPage || 40;
    let page = req.query.page || 1;


    //let ex = /ava{1,6}$/
    let ex1 = new RegExp(`${search}`)//המחרוזת תיהיה חייבת להסתיים ב


    try {
        let filter = {};
        if (search);
        filter.name = ex1;//{ name: ex1 }


        let allCourses = await Course.find(filter)
        .skip(page*(perPage-1))//לדלג על כמות תואצות מסויימת
        .limit(perPage);//שולך כמות מוגבלת של נתונים

        res.json(allCourses);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

const getCourseById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        const course = await Course.findById(id);
        if (!course)
            return res.status(404).json({ type: "id not found", message: "didnt find " })
        res.json(course);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

const addCourse = async (req, res) => {
    try {
        let { name, price, tags, numLessons, speaker } = req.body;
        if (!name || !speaker || !price)
            return res.status(404).json({ type: "missing paramters", message: "name or price or speaker" })

        let sameCourse = await Course.findOne({ name, price });
        if (sameCourse)
            return res.status(409).json({ type: "same course", message: "same details" })

        // let newCourse= new Course({name,numLessons,price,tags,speaker});
        // await newCourse.save();

        let newCourse = await Course.create({ name, numLessons, price, tags, speaker });

        res.json(newCourse);

    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}



export { addCourse, getAllCourses, getCourseById };