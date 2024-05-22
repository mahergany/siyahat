import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  // container: {
  //   padding: '25px',
  //   position:"absolute",top:"0%", left:"0%", zIndex:100,
  //   width:"40vw",
  //   height:"100vh",
  //   backgroundColor:"rgba(232, 169, 10, 0.6)",
  //   opacity:0.7,
  //   boxShadow:"2px 0 5px rgba(0,0,0,0.3)",
  //   transition:"transform 1s ease-in-out",
  // transform:"translateX(-100%)",
  // '&:hover': {
  //   opacity: 1, // Change opacity on hover
  // },
  // // transform:"translateX(100%)",

  
  // },
  container: {
    padding: '25px',
    position: "absolute",
    top: "0%",
    left: "0%",
    zIndex: 100,
    width: "40vw",
    // Adjusting the height to avoid outer scroll
    height: "calc(100vh - 50px)", // Adjusted height
    backgroundColor: "rgba(232, 169, 10, 0.6)",
    opacity: 0.7,
    boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
    transition: "transform 1s ease-in-out",
    transform: "translateX(-100%)",
    '&:hover': {
      opacity: 1, // Change opacity on hover
    },
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  full:{
    height: '100%'
  },

  show: {
    transform: 'translateX(0)', // Slide in
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '80vh', overflow: 'auto',
    // height: '70%', overflow: 'none',
    // position: 'absolute', x: '0px', y:'00px',
    zIndex: 1000,
    marginTop: '30px',
    width: '100%'
    // right:'10px'
  },

}));
