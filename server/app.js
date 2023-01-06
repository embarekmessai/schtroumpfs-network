const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotEnv = require('dotenv')

dotEnv.config(0);

mongoose.set('strictQuery', false);

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log("DB Connection Successfull!"))
            .catch((err) => {
                console.log(err);
            });

}

app.listen(process.env.PORT || 3000, () => {
    console.log('serve is running successfully');
});