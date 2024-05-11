const fetchAttractions = async () => {
    try {
        console.log("line 22 map")
        // const response = await fetch('/attractions'); 
        // const response = await fetch('/attractions'); 
        const response = await fetch("http://localhost:3001/posts",{
            method: "GET"
    }); 
        console.log('Attractions data:', response);

    } catch (error) {
        console.error('Error fetching attractions:', error);
        // Handle the error appropriately
    }
};
fetchAttractions();