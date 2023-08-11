// app.js
require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const formRoutes = require('./routes/formRoutes');

app.set('trust proxy', true);

// middlewares
app.use(express.json())
app.use(cors())


// database connection
const dbURI = process.env.MONGO_URI;
async function main() {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected Successfully to DB!");
    } catch (error) {
        console.log(error);
    }
}
main()

// Assigning PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Routing
app.use('/', formRoutes);