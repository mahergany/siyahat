import fs from 'fs';
// const firstRestaurant = restaurantsData[0];
// console.log(firstRestaurant)

// Read the JSON file

function processRestaurantsData(callback) {
    fs.readFile('restaurants.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
  
      const jsonData = JSON.parse(data);
  
      const formattedDataArray = [];
  
      for (const item of jsonData) {
        let photoUrls =  []; 

        if (item.photo && item.photo.images && item.photo.images.small && item.photo.images.small.url) {
            photoUrls.push(item.photo.images.small.url);
          }
        let street = ''; 
    
       
        if (item.address_obj && item.address_obj.street) {
          street += item.address_obj.street;
        }
        if (item.address_obj && item.address_obj.street2) {
          street += item.address_obj.street2;
        }
        let tags = []; 
        if (item.cuisine && item.cuisine.length > 0) {
           
            tags = item.cuisine.map(c => c.name);
          }
    
      
  
    const formattedData = {
        name: item.name,
        category:"Restaurant",
        type:null,
        description:null,
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        postCount: parseInt(item.num_reviews),
        avgRating: parseFloat(item.rating),
        placeRanking: parseInt(item.ranking_position),
        address:{
          street: street,
          city: item.address_obj? item.address_obj.city : null,
          province: item.address_obj? item.address_obj.province : null,
          country: item.address_obj? item.address_obj.country : null,
  
        },        
        tags: tags,
       priceLevel: item.price_level,
       photos: photoUrls
      };
  
        formattedDataArray.push(formattedData);
      }
  
      callback(formattedDataArray);
    });
  }
  

  function processAttractionsData(callback) {
    fs.readFile('attractions.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
  
      const jsonData = JSON.parse(data);
  
      const formattedDataArray = [];
  
      for (const item of jsonData) {
        let photoUrls = []; 

    let street = ''; 
    let tags = []; 



    if (item.street) {
      street = item.street; 
    }

    

    const formattedData = {
      name: item._key || null, 
      category: "attraction",
      description: item.Desc || null, 
      type:item.category || null,
      latitude: parseFloat(item.latitude) ,
      longitude: parseFloat(item.longitude),
      postCount: parseInt(item.num_reviews) || null, 
      avgRating: parseFloat(item.rating) || null, 
      placeRanking: parseInt(item.ranking_position) || null, 
      address: {
        street: street,
        city: item.district || null, 
        province: item.province || null,
        country: item.country || null,
      },
      tags: tags,
      priceLevel: null, 
      photos: photoUrls,
    };

        formattedDataArray.push(formattedData);
      }
  
      callback(formattedDataArray);
    });
  }
processRestaurantsData(restaurantsData => {

  processAttractionsData(attractionsData => {
 
    const mergedData = restaurantsData.concat(attractionsData);

   
    fs.writeFile('places.json', JSON.stringify(mergedData, null, 2), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Merged data has been written to places.json');
    });
  });
});
