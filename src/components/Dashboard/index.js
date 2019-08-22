import React, { Component } from "react";
import { Box, Grid } from "@material-ui/core";
import { withSnackbar } from "notistack";

import { api } from "../helpers/api-service.js";
import Device from "./device";

const devices = [
    {
        id: 1,
        name: "",
        description: ""
    },
    {
        id: 2,
        name: "",
        description: ""
    },
    {
        id: 3,
        name: "",
        description: ""
    }
];

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { devices: devices };
        api.getDevices()
            .then((devices) => {
                // console.log(devices);
                this.setState({ devices: devices });
            })
            .catch((error) => {
                this.props.enqueueSnackbar(error.message, {
                    variant: "error",
                    autoHideDuration: 4000
                });
            });
    }
    render() {
        return (
            <Box>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <>
                        {this.state.devices.map((device) => {
                            // console.log(device);
                            return (
                                <Device
                                    type="content"
                                    key={device.id}
                                    device={device}
                                />
                            );
                        })}
                    </>
                    <Device type="new" />
                </Grid>
            </Box>
        );
    }
}

export default withSnackbar(Dashboard);