// controllers/attractions.js

import { readFile } from 'fs/promises';
import csv from 'csvtojson';


export const getAttractions = async (req, res) => {
  try {
    // res.send("hello")
    
    const attractionsData = await csv().fromFile('C:/Users/mahee/Desktop/siyahat/server/attractions.csv');
    
    res.json(attractionsData);
    // res.send("hello");
  } catch (error) {
    console.error('Error reading attractions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
