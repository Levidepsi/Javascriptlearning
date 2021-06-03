const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex:  true,
      useFindAndModify:  false,
      useUnifiedTopology: true
  })

  .then(() =>{

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  })
  
  .catch((error) => {
      console.error(`Error `);
  })

}

module.exports = connectDB;

