import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paperAttractions: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px', backgroundColor: 'pink'
  },
  paperRestaurants:{
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px', backgroundColor: '#E8A90A'
  },
  mapContainer: {
    // height: '85vh', width: '100%',
    height: '100vh', width: '100%',
    // width:'100%', height: 'auto'
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },
  pointer: {
    cursor: 'pointer',
  },
}));