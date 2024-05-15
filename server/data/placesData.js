// import restaurantsData from '../../restaurants.json' with { type: "json" };
import fs from 'fs';
// const firstRestaurant = restaurantsData[0];
// console.log(firstRestaurant)

//putting all data in a json format

fs.readFile('../../restaurants.json', 'utf-8', (err,data) => {
    if(err)
        console.log("error reading file");

    restaurantsData = JSON.parse(data);
    const modifiedData = restaurantsData.map((rData)=> ({
        name: rData.name,
        category: "Restaurant",
        type: null,
        description: null,
        latitude: rData.latitude,
        longitude: rData.longitude,
        postCount: rData.num_reviews,
        avgRating: rData.raw_ranking,
        placeRanking: rData.ranking_position,
        address: {
            street: rData.address_obj.street1 + rData.address_obj.street2,
            city: rData.address_obj.city,
            province: rData.address_obj.state,
            country: rData.address_obj.country
        },
        tags: rData.cuisine.name,
        priceLevel: rData.price_level,
        photos: rData.photo.images,
    }))
})
