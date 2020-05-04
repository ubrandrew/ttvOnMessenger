/* global chrome */

import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



class SettingsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
    };
    componentDidMount() {
        chrome.storage.sync.get(['ttv_toggle', 'bttv_toggle'], (data) => {
            this.setState({
                ttv_toggle: data.ttv_toggle,
                bttv_toggle: data.bttv_toggle,
                loading: false
            });
        })
    }

    handleChange(event) {
        const attr = event.target.name
        this.setState(state => {
            const newVal = !state[attr]
            console.log({ attr: newVal })
            chrome.storage.sync.set({ [attr]: newVal }, function () {
                chrome.storage.sync.get([attr], (data) => {
                    console.log(data)
                })
            });
            return ({
                [attr]: newVal
            })
        })
    }

    render() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">General Settings</FormLabel>
                {this.state.loading ?
                    <div>Loading...</div> :
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={this.state.ttv_toggle} onChange={this.handleChange} name="ttv_toggle" />}
                            label="Twitch TV emotes"
                        />
                        <FormControlLabel
                            control={<Switch checked={this.state.bttv_toggle} onChange={this.handleChange} name="bttv_toggle" />}
                            label="BetterTTV emotes"
                        />
                    </FormGroup>
                }

            </FormControl>
        )
    }
}

export default SettingsPage;