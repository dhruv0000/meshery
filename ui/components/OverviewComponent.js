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
import dataFetch from "../lib/data-fetch";

const style = () => ({

  paperBack: {
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '4vh 3vw',
    height: '100%'
  },
});

class OverviewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      meshScan: {},
      activeMeshScanNamespace: {},
      meshScanNamespaces: {}
    };
  }

  componentDidMount() {
    this.fetchMeshScanData();
  }

  fetchMeshScanData = () => {
    const self = this;
    dataFetch(
      "/api/mesh/scan",
      {
        credentials: "same-origin",
        method: "GET",
        credentials: "include",
      },
      (result) => {
        if (result) {
          // Extract all the unique namespaces in the mesh scan
          const namespaces = {};
          const activeNamespaces = {};
          Object.keys(result).forEach(mesh => {
            if (Array.isArray(result[mesh])) {
              result[mesh].forEach(comp => {
                if (comp.metadata) {
                  if (namespaces[mesh]) namespaces[mesh].add(comp.metadata.namespace)
                  else namespaces[mesh] = new Set([comp.metadata.namespace])
                }
              })
              namespaces[mesh] = [...namespaces[mesh]]
              activeNamespaces[mesh] = namespaces[mesh][0] || "";
            }
          })
          self.setState({ meshScanNamespaces: namespaces, activeMeshScanNamespace: activeNamespaces });

          // Check if Istio data is present in the scan
          if (Array.isArray(result.Istio)) {
            const istioData = result.Istio.map(comp => {
              const compData = {
                name: self.generateMeshScanPodName(
                  comp.metadata.name, 
                  comp.metadata.labels["pod-template-hash"],
                  comp.metadata.generateName
                ),
                component: comp.metadata.labels?.app,
                version: self.generateMeshScanVersion(comp.spec.containers?.[0]?.image),
                namespace: comp.metadata.namespace
              }
              return compData;
            })
            self.setState(state => ({ meshScan: { ...state.meshScan, Istio: istioData } }));
          }

          // Check if Linkerd data is present in the scan
          if (Array.isArray(result.Linkerd)) {
            const linkerdData = result.Linkerd.map(comp => {
              const compData = {
                name: self.generateMeshScanPodName(
                  comp.metadata.name, 
                  comp.metadata.labels["pod-template-hash"],
                  comp.metadata.generateName
                ),
                component: comp.metadata.labels["linkerd.io/control-plane-component"],
                version: self.generateMeshScanVersion(comp.spec.containers?.[0]?.image),
                namespace: comp.metadata.namespace
              }
              return compData;
            })
            self.setState(state => ({ meshScan: { ...state.meshScan, Linkerd: linkerdData } }));
          }

          // Check if Consul data is present in the scan
          if (Array.isArray(result.Consul)) {
            const consulData = result.Consul.map(comp => {
              const compData = {
                name: self.generateMeshScanPodName(
                  comp.metadata.name, 
                  comp.metadata.labels["pod-template-hash"],
                  comp.metadata.generateName
                ),
                component: comp.metadata.labels?.app,
                // Extracting consul version name from the command with which consul containers 
                // were spinned up.
                // There are a bunch of commands in there so splitting the string on "\\\n"
                // and then looking for the string which has "consul-image"
                // Once the string is found, we match it against the regex to extract version
                // If any of this fails, it will fallback to "NA"
                version: self.generateMeshScanVersion(
                  comp.spec.containers?.[0]?.command[2]
                  .split("\\\n")
                  .find(str => str.includes("consul-image"))
                ),
                namespace: comp.metadata.namespace
              }
              return compData;
            })
            self.setState(state => ({ meshScan: { ...state.meshScan, Consul: consulData } }));
          }

          // Check if OSM data is present in the scan
          if (Array.isArray(result.osm)) {
            const osmData = result.osm.map(comp => {
              const compData = {
                name: self.generateMeshScanPodName(
                  comp.metadata.name, 
                  comp.metadata.labels["pod-template-hash"],
                  comp.metadata.generateName
                ),
                component: comp.metadata.labels?.app,
                version: self.generateMeshScanVersion(
                  comp.spec.containers?.[0]?.args
                  ?.find(str => str.includes("openservicemesh/init"))
                ),
                namespace: comp.metadata.namespace
              }
              return compData;
            })
            self.setState(state => ({ meshScan: { ...state.meshScan, osm: osmData } }));
          }

          // Check if NSM data is present in the scan
          if (Array.isArray(result["Network Service Mesh"])) {
            const nsmData = result["Network Service Mesh"].map(comp => {
              const compData = {
                name: self.generateMeshScanPodName(
                  comp.metadata.name, 
                  comp.metadata.labels["pod-template-hash"],
                  comp.metadata.generateName
                ),
                component: comp.metadata.labels?.app || comp.metadata.name,
                version: `v0.2.0`,
                namespace: comp.metadata.namespace
              }
              return compData;
            })
            self.setState(state => ({ meshScan: { ...state.meshScan, "Network Service Mesh": nsmData } }));
          }
        }

        console.log(this.state);
      },
      console.log("Unable to fetch mesh scan data.")
    );
  }

  generateMeshScanPodName = (podname, hash, custom) => {
    const str = (custom || podname)
    return {
      full: podname,
      trimmed: str.substring(0, (hash ? str.indexOf(hash) :  str.length) - 1)
    }
  }

  generateMeshScanVersion = (versionStr) => {
    if (typeof versionStr !== "string") return "NA";

    const matchResult = versionStr.match(/\d+(\.\d+){2,}/g);
    if (!matchResult) return "NA";
    
    // Add "v" iff we have a valid match result
    return `v${matchResult[0]}`;
  }

  

  render() {
    const { classes } = this.props
    let meshData = []
    if(this.state.meshScan.Istio && this.state.meshScanNamespaces.Istio){
      this.state.meshScanNamespaces.Istio.map( ns => {
        meshData.push(this.state.meshScan.Istio.filter(e => e.namespace == ns))
      })
    }
    if(this.state.meshScan.osm && this.state.meshScanNamespaces.osm){
      this.state.meshScanNamespaces.osm.map( ns => {
        meshData.push(this.state.meshScan.osm.filter(e => e.namespace == ns))
      })
    }
    console.log(meshData)
    return (
      <NoSsr>
        <Paper className={classes.paperBack} elevation="0">
          
          
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={8}
          >
            { meshData.map(data => <MeshCardComponent img="/static/img/osm.svg" meshName="istio" meshData={data} />)
            }
          </Grid>
        </Paper>
      </NoSsr>
    )
  }
}

export default withStyles(style)(OverviewComponent);