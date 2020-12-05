import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import { withStyles } from '@material-ui/core/styles';
// import ReactDOM from 'react-dom';
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import clsx from 'clsx';
// import {
//   TopologyIcon,
// } from '@patternfly/react-icons';
import { Grid, Paper } from '@material-ui/core';
import MeshCardComponent from './MeshCardComponent';

const style = () => ({

  paperBack: {
    maxWidth: '100%',
    margin: 'auto',
    overflow: 'hidden',
    padding: '4vh 3vw',
  },

});

class OverviewComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props

    return (
      <NoSsr>
        {/* <div className={classes.wrapper} > */}
        {/* <div className={classes.div}> */}
        <Paper className={classes.paperBack} elevation="0">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <MeshCardComponent img="/static/img/osm.svg" gradient='linear-gradient(147deg, #00c9ff 0%, #92fe9d 74%)' />
            </Grid>
            <Grid item>
              <MeshCardComponent img="/static/img/kuma.svg" gradient='linear-gradient(147deg, #00c9ff 0%, #92fe9d 74%)'/>
            </Grid>
            <Grid item>
              <MeshCardComponent img="/static/img/osm.svg" gradient='linear-gradient(147deg, #00c9ff 0%, #92fe9d 74%)'/>
            </Grid>
            <Grid item>
              <MeshCardComponent img="/static/img/osm.svg" gradient='linear-gradient(147deg, #00c9ff 0%, #92fe9d 74%)'/>
            </Grid>
            <Grid item>
              <MeshCardComponent img="/static/img/osm.svg" gradient='linear-gradient(147deg, #00c9ff 0%, #92fe9d 74%)'/>
            </Grid>
            <Grid item>
              <MeshCardComponent img="/static/img/osm.svg" gradient='linear-gradient(147deg, #00c9ff 0%, #92fe9d 74%)'/>
            </Grid>
            <Grid item>
              <MeshCardComponent img="/static/img/osm.svg" gradient='linear-gradient(147deg, #00c9ff 0%, #92fe9d 74%)'/>
            </Grid>
          </Grid>
        </Paper>
        {/* </div> */}
        {/* </div> */}
      </NoSsr>
    )
  }
}

export default withStyles(style)(OverviewComponent);