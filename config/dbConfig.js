import mongoose from "mongoose";

export const connectToDB = async () => {
    // mongoose.connect(process.env.DB_CONNECTION).then((con) => {
    //     console.log("mongoDB connected successfully!!!", con.connection.host);
    // }).catch((err) => {
    //     console.log("cannot connect mongoDB");
    //     console.log(err)
    //     process.exit(1);
    // })
    try {
        let con = await mongoose.connect(process.env.DB_CONNECTION);
        console.log("mongoDB connected successfully!!!", con.connection.host);
    } catch (err) {
        console.log("cannot connect mongoDB");
        console.log(err)
        process.exit(1);

    }
}