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
  container: {
    padding: '25px',
    position:"absolute",top:"15%", left:"15%", zIndex:100,
    width:"40vw",
    backgroundColor:"rgba(232, 169, 10, 0.6)",
    opacity:0.7,

  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '50vh', overflow: 'auto',
    // position: 'absolute', x: '50px', y:'50px'
  },

}));

// import { makeStyles } from '@material-ui/core/styles';

// export default makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   loading: {
//     height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
//   },
//   container: {
//     padding: '25px',
//   },
//   marginBottom: {
//     marginBottom: '30px',
//   },
//   list: {
//     position: 'absolute',
//     zIndex: 1, // Ensure it's on top of the map
//     top: 500,
//     left: 500,
//     right: 0,
//     padding: '25px',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust background color and opacity as needed
//     overflowY: 'auto',
//   },
// }));