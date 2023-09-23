import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected: ${connect.connection.host}`.bgGreen.black
    );
  } catch (err) {
    console.error(`Error ${err}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
