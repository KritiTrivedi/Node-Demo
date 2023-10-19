const mongoose = require("mongoose")
const dbconnect = async()=>{
     try {
      mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_DB_URI,()=>{
        console.log('DB Connected');
    });
  } catch (error) {
    handleError(error);
  }
};
module.exports=dbconnect;