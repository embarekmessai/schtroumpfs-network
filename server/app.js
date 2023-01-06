const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/db_schtroumpfs')
            .then(() => console.log("DB Connection Successfull!"))
            .catch((err) => {
                console.log(err);
            });

}

app.listen(process.env.PORT || 3000, () => {
    console.log('serve is running successfully');
});