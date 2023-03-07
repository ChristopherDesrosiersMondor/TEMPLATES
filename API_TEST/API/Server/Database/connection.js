// run the mongoDb_connection snippet
// Change config info in your .env file while devlopping
require('dotenv').config()
const mongoose = require("mongoose");

//[MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.set('strictQuery', true);

// Connecting to mongodb with mongoose
mongoose.connect(
    process.env.DB_URI, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  
  

let dbConnection;

// Exporting basic function to interact with the db
module.exports = {
    connectToServer: function (callback) {
        dbConnection = mongoose.connection;
        dbConnection.on("error", console.error.bind(console, "Connection error: "));
        dbConnection.once("open", function () {
            console.log("Connexion etablie.")
        })
    },

    getDb: function () {
        return dbConnection;
    },
}