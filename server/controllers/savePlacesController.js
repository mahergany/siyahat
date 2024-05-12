import fs from "fs";

export const savePlaces = async (req, res) => {
// console.log(req.body)
  const { newPlaces } = req.body;
console.log('there are ' + newPlaces.length + ' places here');
try {
    // Parse and save data to JSON file
    fs.readFile('../restaurants.json', (err, data) => {
      if (err) throw err;
      let restaurantsData = JSON.parse(data);
    //   console.log(restaurantsData);

    const existingIds = restaurantsData.map(restaurant => restaurant.location_id);
    //only keeping the ids that didn't exist from before
    let newPlacesFiltered =[]
    let temp;
    if(newPlaces)
        temp = newPlaces.filter(place => !existingIds?.includes(place.location_id));
    if(temp)
        newPlacesFiltered =temp;

    if(newPlacesFiltered.length == 0){
        console.log("all places already exist in the json file");
        return res.status(200).send('All places already exist in the JSON file');
    }
    else{
    restaurantsData.push(...newPlacesFiltered);
    //for keeping track
    console.log('there are ' + newPlacesFiltered.length + ' places to be added');
    console.log('new length of restaurantsData: ', restaurantsData.length);
    //saving to json
    fs.writeFile('../restaurants.json', JSON.stringify(restaurantsData), (err) => {
      if (err) {
        console.error('Error writing JSON data to file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('New places added to restaurants.json');
        res.status(200).send('Data saved successfully');
      }
    });
    }
    });
  } catch (error) {
    console.error('Error saving places:', error);
    res.status(500).send('Internal Server Error');
  }
};