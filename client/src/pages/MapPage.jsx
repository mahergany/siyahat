// import Navbar  from "../components/Navbar";

// import React, { useState, useEffect } from 'react';
// import { CssBaseline, Grid} from '@material-ui/core';

// // import { getPlacesData } from "../api/index.js";
// // import { savePlaces } from "../api/fetchAll.js";
// import Header from '../components/MapComponents/Header/Header.jsx';
// import List from '../components/MapComponents/List/List.jsx';
// import Map from '../components/MapComponents/Map/Map.jsx'
// import useStyles from '../components/MapComponents/List/styles.js';

// // import CustomizedSwitches from "../components/MapComponents/CustomizedSwitches.jsx";

// import './MapPage.css'

// function MapPage({setProgress}){
//     const classes = useStyles();
//     const [allPlaces, setAllPlaces] = useState([]);
//     const [places, setPlaces] = useState([]);
//     const [filteredPlaces, setFilteredPlaces] = useState([]);

//     const  [childClicked, setChildClicked]= useState(null);

//     const [coordinates, setCoordinates] = useState({});
//     const [bounds, setBounds] = useState({});

//     const [isLoading, setIsLoading] = useState(false);
    
//     const [type, setType] = useState('restaurants');
//     const [rating, setRating] = useState('');

//     const [filter, setFilter] = useState(false);

//     const [showList, setShowList] = useState(false);

//     const [showCards, setShowCards] = useState(true);


//     useEffect(() => {   
//         setProgress(40);
//         setTimeout(() => {
//             setProgress(100);
//         }, 2000);
//     }, []);


//     //fetching the places from the db

//     const getAllPlaces = async() =>{
//         try{
//             const response = await fetch(
//                 `http://localhost:3001/places`,
//                 {
//                     method: "GET",
//                     // headers: { "Content-Type": "application/json", }
//                 }
//             );
//             // if(!response.ok)
//             //     throw new Error("failed to fetch places");
//             const data = await response.json();
//             setAllPlaces(data);
//             // console.log(data.length)

//             // const filteredPlaces = allPlaces.filter(place => {
//             //     const { latitude, longitude } = place;
//             //     return (
//             //         latitude >= bounds.sw.lat &&
//             //         latitude <= bounds.ne.lat &&
//             //         longitude >= bounds.sw.lng &&
//             //         longitude <= bounds.ne.lng
//             //     );
//             // });
//             // setPlaces(filteredPlaces);
            
//         }
//         catch(error){
//             console.log("Error fetching places: ", error)
//         }
//     }
//     useEffect(()=>{
//         getAllPlaces();
//     }, []);

//     useEffect(() => {
//         console.log(places);
//     }, [places]);

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
//             setCoordinates({ lat: latitude, lng: longitude});
//         });
//     }, []);


//     // useEffect(() => {
//     //     if (bounds) {
//     //         setIsLoading(true);
            
//     //         /* DISPLAYING ONLY POSTS WITHIN BOUNDS */
//     //         const filteredPlaces = allPlaces.filter(place => {
//     //             const { latitude, longitude } = place;
//     //             return (
//     //                 latitude >= bounds.sw.lat &&
//     //                 latitude <= bounds.ne.lat &&
//     //                 longitude >= bounds.sw.lng &&
//     //                 longitude <= bounds.ne.lng
//     //             );
//     //         });
//     //         setPlaces(filteredPlaces);
//     //         setFilter(false);
//     //         setRating('');
//     //         setIsLoading(false);
                        

//     //     //     getPlacesData(type, bounds.sw, bounds.ne)
//     //     //     .then((data) => {
//     //     //             setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));

//     //     //             //uncomment for fetching and saving into JSON file
//     //     //             // if(data)
//     //     //             // { 
//     //     //             //     savePlaces(data)
//     //     //             // }   

//     //     //             // setFilteredPlaces([]);
//     //     //             setFilter(false);
//     //     //             setRating('');
//     //     //             setIsLoading(false);
//     //     // });

//     // }
//     // }, [bounds, type]);

//     const onLoad = (autoC) => setAutocomplete(autoC);

//   const onPlaceChanged = () => {
//     const lat = autocomplete.getPlace().geometry.location.lat();
//     const lng = autocomplete.getPlace().geometry.location.lng();
//     console.log(lat,lng)
//     setCoords({ lat, lng });
//   };


//     return(
//         <>
//         <Navbar />
//         <CssBaseline />
//         <div className="list-arrow" onClick={() => {setShowList(!showList)}}>
//         {/* <div className="list-arrow" onClick={() => {setShowList(true)}}> */}
//         {showList ? '>' : '<'}
//         {/* <CustomizedSwitches></CustomizedSwitches> */}
        

//         </div>
//             <div style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
//             <div className={`${classes.container} ${showList ? classes.show : ''} ${classes.full}`}>
//                 <List 
//                     // places={setFilter ? filteredPlaces : places} 
//                     places={allPlaces}
//                     childClicked = {childClicked}
//                     isLoading={isLoading}
//                     type={type}
//                     setType={setType}
//                     rating={rating}
//                     setRating={setRating}
//                 />
//             </div>
                
//                 <Map 
//                     setCoordinates={setCoordinates}
//                     setBounds={setBounds}
//                     coordinates={coordinates}
//                     // places={setFilter ? filteredPlaces : places}
//                     places={allPlaces}
//                     setChildClicked={setChildClicked}
//                 />
//             {/* </Grid> */}
//             </div>
//         {/* </Grid> */}

//         </>
//     );
// }

// export default MapPage;








import Navbar  from "../components/Navbar";

import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid} from '@material-ui/core';

// import { getPlacesData } from "../api/index.js";
// import { savePlaces } from "../api/fetchAll.js";
import Header from '../components/MapComponents/Header/Header.jsx';
import List from '../components/MapComponents/List/List.jsx';
import Map from '../components/MapComponents/Map/Map.jsx'
import useStyles from '../components/MapComponents/List/styles.js';

// import CustomizedSwitches from "../components/MapComponents/CustomizedSwitches.jsx";

import './MapPage.css'

function MapPage({setProgress}){
    const classes = useStyles();
    const [allPlaces, setAllPlaces] = useState([]);
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const  [childClicked, setChildClicked]= useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    const [filter, setFilter] = useState(false);

    const [showList, setShowList] = useState(false);

    const [showCards, setShowCards] = useState(true);


    useEffect(() => {   
        setProgress(40);
        setTimeout(() => {
            setProgress(100);
        }, 2000);
    }, []);


    //fetching the places from the db

    const getAllPlaces = async() =>{
        try{
            const response = await fetch(
                `http://localhost:3001/places`,
                {
                    method: "GET",
                    // headers: { "Content-Type": "application/json", }
                }
            );
            // if(!response.ok)
            //     throw new Error("failed to fetch places");
            const data = await response.json();
            setAllPlaces(data);
            // console.log(data.length)

            const filteredPlaces = allPlaces.filter(place => {
                const { latitude, longitude } = place;
                return (
                    latitude >= bounds.sw.lat &&
                    latitude <= bounds.ne.lat &&
                    longitude >= bounds.sw.lng &&
                    longitude <= bounds.ne.lng
                );
            });
            setPlaces(filteredPlaces);
            
        }
        catch(error){
            console.log("Error fetching places: ", error)
        }
    }
    useEffect(()=>{
        getAllPlaces();
    }, []);

    useEffect(() => {
        console.log(places);
    }, [places]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
            setCoordinates({ lat: latitude, lng: longitude});
        });
    }, []);


    useEffect(() => {
        if (bounds) {
            setIsLoading(true);
            
            /* DISPLAYING ONLY POSTS WITHIN BOUNDS */
            const filteredPlaces = allPlaces.filter(place => {
                const { latitude, longitude } = place;
                return (
                    latitude >= bounds.sw.lat &&
                    latitude <= bounds.ne.lat &&
                    longitude >= bounds.sw.lng &&
                    longitude <= bounds.ne.lng
                );
            });
            setPlaces(filteredPlaces);
            setFilter(false);
            setRating('');
            setIsLoading(false);
                        

        //     getPlacesData(type, bounds.sw, bounds.ne)
        //     .then((data) => {
        //             setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));

        //             //uncomment for fetching and saving into JSON file
        //             // if(data)
        //             // { 
        //             //     savePlaces(data)
        //             // }   

        //             // setFilteredPlaces([]);
        //             setFilter(false);
        //             setRating('');
        //             setIsLoading(false);
        // });

    }
    }, [bounds, type]);

//     const onLoad = (autoC) => setAutocomplete(autoC);

//   const onPlaceChanged = () => {
//     const lat = autocomplete.getPlace().geometry.location.lat();
//     const lng = autocomplete.getPlace().geometry.location.lng();
//     console.log(lat,lng)
//     setCoords({ lat, lng });
//   };


    return(
        <>
        <Navbar />
        <CssBaseline />
        <div className="list-arrow" onClick={() => {setShowList(!showList)}}>
        {/* <div className="list-arrow" onClick={() => {setShowList(true)}}> */}
        {showList ? '>' : '<'}
        {/* <CustomizedSwitches></CustomizedSwitches> */}
        

        </div>
            <div style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
            <div className={`${classes.container} ${showList ? classes.show : ''} ${classes.full}`}>
                <List 
                    // places={setFilter ? filteredPlaces : places} 
                    places={places}
                    childClicked = {childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                />
            </div>
                
                <Map 
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                    // places={setFilter ? filteredPlaces : places}
                    places={allPlaces}
                    setChildClicked={setChildClicked}
                />
            {/* </Grid> */}
            </div>
        {/* </Grid> */}

        </>
    );
}

export default MapPage;