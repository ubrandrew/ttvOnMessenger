/* global chrome */

/* might wanna refactor to functional component(?) wanna do some research why though */

import React from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import IOSSwitch from '../components/IOSSwitch';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
    };

    // Getting settings state from chrome.storage.sync
    componentDidMount() {
        chrome.storage.sync.get(['ttv_toggle', 'bttv_toggle', 'ffz_toggle', 'label_toggle'], (data) => {
            this.setState({
                ttv_toggle: data.ttv_toggle,
                bttv_toggle: data.bttv_toggle,
                ffz_toggle: data.ffz_toggle,
                label_toggle: data.label_toggle,
                loading: false
            });
        })
    }

    // handler for settings switch toggles
    handleChange(event) {
        const attr = event.target.name
        this.setState(state => {
            const newVal = !state[attr]
            chrome.storage.sync.set({ [attr]: newVal }, function () {
                console.log("settings changed")
            });
            return ({
                [attr]: newVal
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading
                    ?
                    <Backdrop open={this.state.loading}>
                        <CircularProgress />
                    </Backdrop>
                    :
                    <Box p={3}>
                        <Paper variant="outlined"  >
                            <FormControl style={{ paddingLeft: 10, paddingTop: 10 }} component="fieldset">
                                <Typography gutterBottom variant="h6">
                                    General Settings
                                </Typography>
                                <Divider />
                                <FormGroup style={{ paddingLeft: 20, paddingTop: 10 }}>
                                    <FormControlLabel
                                        control={
                                            <IOSSwitch checked={this.state.ttv_toggle} onChange={this.handleChange} name="ttv_toggle" />
                                        }
                                        label="Twitch TV emotes"
                                    />
                                    <br />
                                    <FormControlLabel
                                        control={
                                            <IOSSwitch checked={this.state.bttv_toggle} onChange={this.handleChange} name="bttv_toggle" />
                                        }
                                        label="BetterTTV emotes"
                                    />
                                    <br />
                                    <FormControlLabel
                                        control={
                                            <IOSSwitch checked={this.state.ffz_toggle} onChange={this.handleChange} name="ffz_toggle" />

                                        }
                                        label="FrankerFaceZ emotes"
                                    />
                                    <br />
                                    <FormControlLabel
                                        control={
                                            <IOSSwitch checked={this.state.label_toggle} onChange={this.handleChange} name="label_toggle" />
                                        }
                                        label="Emote Labels"
                                    />
                                    <br />
                                </FormGroup>
                            </FormControl>
                        </Paper>
                    </Box>
                }
            </React.Fragment>
        )
    }
}

export default SettingsPage;