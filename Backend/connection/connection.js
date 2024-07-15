import mongoose from "mongoose";


export const connection = async () => {
    try {
        await mongoose.connect(`${process.env.URI}`, {useNewUrlParser: true,
            useUnifiedTopology: true})
        console.log(`Connted to DataBase.`);
    } catch (error) {
        console.log("The error is:",error);
    }
}