import axios from "axios";

// const fetchAttractions = async () => {
//     try {
//         console.log("line 22 map")
//         const response = await axios.get('/attractions'); // Make GET request to server
//         console.log('Attractions data:', response);
//     } catch (error) {
//         console.error('Error fetching attractions:', error);
//     }
// };
// const fetchAttractions = async () => {
//     try {
//         console.log("line 22 map")
//          const response = await fetch("http://localhost:3001/attractions",{
//             method: "GET"
//     }); 
//         // console.log('Attractions data:', response);
//         const data = await response.json();
//         console.log(data);

//     } catch (error) {
//         console.error('Error fetching attractions:', error);
//         // Handle the error appropriately
//     }
// };
// fetchAttractions();
// const fs = require('fs'); // Import the Node.js file system module
import fs from 'fs';
const fetchAttractions = async () => {
    try {
        console.log("line 22 map");
        const response = await fetch("http://localhost:3001/attractions", {
            method: "GET"
        }); 
        const data = await response.json();
        console.log(data);

        // Write the fetched JSON data to a file
        fs.writeFile('attractions.json', JSON.stringify(data), (err) => {
            if (err) {
                console.error('Error writing JSON data to file:', err);
            } else {
                console.log('JSON data saved to attractions.json');
            }
        });
    } catch (error) {
        console.error('Error fetching attractions:', error);
        // Handle the error appropriately
    }
};

fetchAttractions();