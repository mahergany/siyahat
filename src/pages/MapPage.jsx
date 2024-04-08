import Navbar  from "../components/Navbar";

import { CssBaseline, Grid} from '@material-ui/core';

import Header from '../components/MapComponents/Header/Header.jsx';
import List from '../components/MapComponents/List/List.jsx';
import Map from '../components/MapComponents/Map/Map.jsx';
import PlaceDetails from '../components/MapComponents/PlaceDetails/PlaceDetails.jsx';


function MapPage(){
    return(
        <>
        <Navbar />
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style= {{ width : '100%' }}>
            <Grid item xs={12} md={4}>
                <List />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map />
            </Grid>
        </Grid>
        </>
    );
}

export default MapPage;