import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connect To", conn.connection.host);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1); // artinya jika kode 1 adalah failure sedangkan 0 adalah succes
  }
};
