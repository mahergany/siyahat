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

export const getPlaceFromPlaceId = async (req, res) => {
    console.log("inside getPlacefromPlaceId")
    const {placeId} = req.params;
    try{
        const place = await Place.find({_id: placeId})
        if(place)
            res.status(200).json(place);
        else
            res.status(400).json({error: "Not Found"})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}