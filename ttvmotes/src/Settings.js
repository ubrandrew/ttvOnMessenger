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
            ttv_toggle: false,
            bttv_toggle: true,
        }
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        const attr = event.target.name
        this.setState(state => {
            const newVal = !state[attr]
            localStorage.setItem(attr, newVal)
            return ({
                [attr]: !state[attr]
            })
        })
    }

    render() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">General Settings</FormLabel>
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
            </FormControl>
        )
    }
}

export default SettingsPage;