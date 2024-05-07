// routes/attractions.js

import express from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import { getAttractions } from '../controllers/attractions.js';

const router = express.Router();

// Define route for fetching attractions data
router.get('/', getAttractions);

// router.get("/", (req,res)=>{
//     const results=[];
//     // res.status(200).send('hello');
//     fs.createReadStream('C:/Users/mahee/Desktop/siyahat/server/attractions.csv')
//         .pipe(csv({}))
//         .on('data', (data)=>results.push(data))
//         .on('end', ()=>{
//             console.log.json(results)
//             console.log(results)
//            return res.json(results)
//         })
// })

export default router;