const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotEnv = require('dotenv')
const authRouter = require('./routes/auth')

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
app.use(express.json());
app.use('/api/v1', authRouter); // Auth route

// Server initiation
app.listen(process.env.PORT || 5000, () => {
    console.log('serve is running successfully');
});