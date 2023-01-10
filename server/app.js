const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotEnv = require('dotenv')
const authRouter = require('./routes/auth')
const schtroumpfRouter = require('./routes/users')
const profileRouter = require('./routes/profile')
const dashboardRouter = require('./routes/dashboard')
const freindsRouter = require('./routes/freinds')

var cookieParser = require('cookie-parser')
const cors = require('cors')

// Get .env params
dotEnv.config();

// Mangodb connectio,
mongoose.set('strictQuery', false);

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log("DB Connection Successfull!"))
            .catch((err) => {
                console.log(err);
        });
}

// Routes
app.use(express.json()); // application/json 
app.use(cookieParser()); // Cookie parser
app.use(cors()); // Ad cors

app.use('/api/v1', authRouter); // Auth route
app.use('/api/v1/schtroumpfs', schtroumpfRouter); // Get all users route

app.use('/api/v1/profile', profileRouter); // Profile routes
app.use('/api/v1/dashboard', dashboardRouter); // Dashboard routes
app.use('/api/v1/freinds', freindsRouter); // Freinds routes

// Server initiation
app.listen(process.env.PORT || 5000, () => {
    console.log('serve is running successfully');
});