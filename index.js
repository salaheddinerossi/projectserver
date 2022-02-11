import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({limit:"30mb" , extended: true}))
app.use(bodyParser.urlencoded({limit:"30mb" , extended: true}))
app.use(cors());

import router from './routes/posts.js';

app.use('/posts',router);
app.get('/',(req,res) => {
    res.send('salaam')
})

// connect to databasse 

const PORT = 5000;
app.listen(PORT , console.log('serever is running in the next port: '+ PORT))

mongoose.connect('mongodb+srv://sdrosssi:053443478512@cluster0.2kunb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {useNewUrlParser :true},
    () => {
        console.log("connected to db")
    }
)