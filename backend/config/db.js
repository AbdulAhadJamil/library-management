import mongoose from "mongoose";

export const connectDB = async () => {
 mongoose.connect("mongodb+srv://<db_username>:<db_password>@cluster0.ck9o2dv.mongodb.net/LibraryManagement")
    .then(() => {
        console.log("DB CONNECTED");
    })
}