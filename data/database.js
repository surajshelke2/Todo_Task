const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URI, {
      dbName: "TODO_List",
    })
    .then((c) => console.log(`Database Connected `))
    .catch((e) => console.log(e));
};

module.exports = connectDB;
