import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import Divider from "@material-ui/core/Divider";
import { Collapse, Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCloud, } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2),
    boxShadow: '0px 7px 30px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 370,
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'row',
    paddingBottom: spacing(2),
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 2px 10px 0 rgba(0,0,0,0.12)',
    },
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: "5em",
    // paddingBottom: '48%',
    backgroundSize: 'contain',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(147deg, #00c9ff 0%, #92fe9d 74%)',
      borderRadius: spacing(2),
      opacity: 0.5,
    },
  },
  noBullets: {
    listStyleType: "none",
    padding: 0,
    margin:0,
    alignItems: "center",
  },
  iconStyle: {
    display: "inline-flex",
    textAlign: "left",
    paddingBottom: "1em",
  },
}));

export const MeshCardComponent = React.memo(function BlogCard(props) {
  const [isExpanded, setExpanded] = useState(false);
  const styles = useStyles()

  return (
    <Card className={styles.root} onClick={() => setExpanded(!isExpanded)}>
      <CardMedia
        className={styles.media}
        image={props.img}
      />
      <CardContent>
        <ul className={styles.noBullets} >
          <li>
            <div className={styles.iconStyle}>
              <FontAwesomeIcon icon={faBell} transform="grow-4" color="#23C552" fixedWidth />{"5"}
            </div>
          </li>
          <li>
            <div className={styles.iconStyle}>
              <FontAwesomeIcon icon={faCloud} transform="grow-4" color="#F84F31" fixedWidth />{"4"}
            </div>
          </li>
        </ul>
      </CardContent>
      <Collapse in={isExpanded} timeout="auto">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="left"
        >
          <Grid item xs={12}>
            <CardContent>
              <Typography>
                Collapse
              </Typography>
            </CardContent>
          </Grid>
          <Grid item>
            <CardContent>
              <CardContent>
                <Button>Read more</Button>
              </CardContent>
            </CardContent>
          </Grid>
        </Grid>
        <CardContent>
          <Typography>
                Collapse
          </Typography>
        </CardContent>
        <CardContent>
          <Typography>
                Collapse
          </Typography>
        </CardContent>
      </Collapse>

    </Card>
  );
});

export default MeshCardComponent

///////////////////////////////////////////////////////
//////////////////////////////////////////////////////

// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from "next/router";
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import { withSnackbar } from "notistack";
// import Button from '@material-ui/core/Button';
// import { Box, Collapse, Grid, Typography } from '@material-ui/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faCloud, faLaptopHouse, faPoll, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

// const styles = ({ breakpoints, spacing }) => ({
//   root: {
//     margin: 'auto',
//     borderRadius: spacing(2),
//     boxShadow: '0 2px 10px 0 rgba(0,0,0,0.12)',
//     position: 'relative',
//     maxWidth: 370,
//     overflow: 'initial',
//     background: '#ffffff',
//     display: 'flex',
//     // flexDirection: 'column',
//     // alignItems: 'row',
//     paddingBottom: spacing(2),
//     transition: '0.3s',
//     '&:hover': {
//       // transform: 'translateY(2px)',
//       boxShadow: '0px 7px 30px rgba(34, 35, 58, 0.2)',
//     },
//     [breakpoints.up('md')]: {
//       flexDirection: 'row',
//       paddingTop: spacing(2),
//     },
//   },
//   media: {
//     width: '100%',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     marginTop: spacing(-3),
//     height: 110,
//     // paddingBottom: '48%',
//     borderRadius: spacing(2),
//     backgroundColor: '#fff',
//     position: 'relative',
//     [breakpoints.up('md')]: {
//       width: '100%',
//       marginLeft: spacing(-3),
//       marginTop: 0,
//       transform: 'translateX(-8px)',
//     },
//     '&:after': {
//       content: '" "',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundImage: 'linear-gradient(147deg, #00c9ff 0%, #92fe9d 74%)',
//       borderRadius: spacing(2),
//       opacity: 0.5,
//     },
//   },
//   noBullets: {
//     listStyleType: "none",
//     padding: 0,
//     margin:0,
//     alignItems: "center",
//   },
//   iconStyle: {
//     display: "inline-flex",
//     textAlign: "left",
//     paddingBottom: "1em",
//   },
// });

// class MeshCardComponent extends React.Component {
//   constructor(props){
//     super(props);
//     this.state={
//       isExpanded: false,
//     }
//   }

//   handleClick() {

//   }
  

//   render() {
//     const { classes } = this.props;
//     return (
//       <Card className={classes.root} >
//         <CardMedia
//           className={classes.media}
//           image="https://openservicemesh.io//images/logo.svg"
//         />
//         <CardContent>
//           <ul className={classes.noBullets} >
//             <li>
//               <div className={classes.iconStyle}>
//                 <FontAwesomeIcon icon={faBell} transform="grow-4" color="#23C552" fixedWidth />{"5"}
//               </div>
//             </li>
//             <li>
//               <div className={classes.iconStyle}>
//                 <FontAwesomeIcon icon={faBell} transform="grow-4" color="#F84F31" fixedWidth />{"4"}
//               </div>
//             </li>
//           </ul>
//         </CardContent>
//         <Collapse >
//           {/* <TableContainer>
//             <Table aria-label="mesh details table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center">Control Plane Pods</TableCell>
//                   <TableCell align="center">Component</TableCell>
//                   <TableCell align="center">Version</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {components
//                   .filter(comp => comp.namespace === self.state.activeMeshScanNamespace[mesh.tag || mesh.name])
//                   .map((component) => (
//                     <TableRow key={component.name.full}>
//                       <TableCell scope="row" align="center">
//                         <Tooltip title={component.name.full}>
//                           <div style={{textAlign: "center"}}>
//                             {component.name.trimmed}
//                           </div>
//                         </Tooltip>
//                       </TableCell>
//                       <TableCell align="center">{component.component}</TableCell>
//                       <TableCell align="center">{component.version}</TableCell>
//                     </TableRow>)
//                   )}
//               </TableBody>
//             </Table>
//           </TableContainer> */}
//         </Collapse>
//       </Card>
//     );
//   }
// }

// // export default MeshCardComponent
// export default withStyles(styles)(withRouter(MeshCardComponent))
