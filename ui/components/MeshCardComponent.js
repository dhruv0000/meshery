import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import Divider from "@material-ui/core/Divider";
import { Collapse, Grid, Paper, Typography, Select, MenuItem } from '@material-ui/core';
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
    flexDirection: 'column',
    alignItems: 'column',
    padding: spacing(2),
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 2px 10px 0 rgba(0,0,0,0.12)',
    },
  },
  media: {
    width: '5em',
    height: "5em",
    backgroundSize: 'contain',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
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
  image: {
    width: '5em',
    height: "5em",
    backgroundSize: 'contain',
    borderRadius: spacing(2),
    position: 'relative',
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
  h4: {
    color: "rgba(105, 105, 105)",
    

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
  const [isExpanded, setExpanded] = useState();
  const styles = useStyles()

  return (
    <Grid item >
      <Paper className={styles.root}>
        <Grid container spacing={1} onClick={() => setExpanded(!isExpanded)}>
          <Grid item >
            <div className={styles.media}>
              <img className={styles.image} src={props.img}></img>
            </div>
          </Grid >
          <Grid item xs={3} spacing={1}>
            <FontAwesomeIcon icon={faBell} transform="grow-4" color="#23C552" fixedWidth />{"5"}
            <FontAwesomeIcon icon={faBell} transform="grow-4" color="#23C552" fixedWidth />{"5"}
          </Grid>
        </Grid>
        <Grid container spacing={2} onClick={() => setExpanded(!isExpanded)}>
          <Grid item xs={12}>
            <h3 >{props.meshData && props.meshData[0].namespace}</h3>
          </Grid >
        </Grid>
        <Collapse in={isExpanded} timeout="auto">
          {props.meshData.map( data => 
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <h3 className={styles.h4}>{data && data.component}</h3>
              </Grid >
              <Grid item sm={12} md={6}>
              Version: {data.version}
              </Grid>
              <Grid item sm={12} md={6}>
              Control Pod: {data.name.trimmed}
              </Grid>
            </Grid>
          )}
        </Collapse>
      </Paper>
    </Grid>
  );
});

export default MeshCardComponent
