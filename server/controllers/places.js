import { response } from "express";
import Place from "../models/Place.js";

export const getPlaces = async (req, res) =>{
    try{
        // console.log("inside getPlaces")
        const places = await Place.find();
        res.status(200).json(places);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}