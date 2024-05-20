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
    // console.log("inside getPlacefromPlaceId")
    const {placeId} = req.params;
    try{
        const place = await Place.find({_id: placeId})
        if(place)
            res.status(200).json({place: place});
        else
            res.status(400).json({error: "Not Found"})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

export const updatePlaceStats = async (req, res) => {
    console.log("inside updateplacestats")
    const {placeId} = req.params;
    console.log(req.body)
    const {rating, priceLevel} = req.body;
    console.log(rating, priceLevel);
    try{
        const existingPlace = await Place.findOne({_id: placeId});
        if (!existingPlace) {
            return res.status(404).json({ message: "Place not found" });
        }
        console.log("the fetched",existingPlace);
        // Increment post count
        existingPlace.postCount += 1;

        // Update total rating and calculate new average rating
        existingPlace.totalRating += rating;
        existingPlace.avgRating = existingPlace.totalRating / existingPlace.postCount;

        // Update total price level and calculate new average price level
        existingPlace.totalPriceLevel += priceLevel;
        existingPlace.avgPriceLevel = existingPlace.totalPriceLevel / existingPlace.postCount;
        console.log("the updated ",existingPlace);
        // Save the updated place
        await existingPlace.save();
        return res.status(200).json({ message: "Place updated successfully", place: existingPlace });
    }
    catch(error){
        console.error("Error updating place:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}