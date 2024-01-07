
import Joi from "joi";
import mongoose from "mongoose";
const minimumCourse = mongoose.Schema({
    name: String,
    numLessons: Number,
    speakerFullName: String,
    tags: [String]

})

let userSchema = mongoose.Schema({
    tz: String,
    userName: String,
    password: String,
    email: String,
    courses: [minimumCourse],
    role: { type: String, default: "user" } // admin/user

})

export const User = mongoose.model("users", userSchema)

export const userValidatorForLogin = (_user) => {

    const schema = Joi.object({
        userName: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
    });

    return schema.validate(_user);
}
export const userValidator = (_user) => {

    const schema = Joi.object({
        userName: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
        tz: Joi.string().min(9).max(9).pattern(/^[0-9]{9}$/).required(),
        email: Joi.string().email().required()
    });

    return schema.validate(_user);
}