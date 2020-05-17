/* global chrome */

import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles';



const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});
class SettingsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
    };
    componentDidMount() {
        // chrome.storage.sync.get(['ttv_toggle', 'bttv_toggle', 'ffz_toggle', 'label_toggle'], (data) => {
        //     this.setState({
        //         ttv_toggle: data.ttv_toggle,
        //         bttv_toggle: data.bttv_toggle,
        //         ffz_toggle: data.ffz_toggle,
        //         label_toggle: data.label_toggle,
        //         loading: false
        //     });
        // })
        this.setState({
            ttv_toggle: false,
            bttv_toggle: true,
            ffz_toggle: true,
            label_toggle: true,
            loading: false
        });
    }

    handleChange(event) {
        const attr = event.target.name
        // this.setState(state => {
        //     const newVal = !state[attr]
        //     console.log({ attr: newVal })
        //     chrome.storage.sync.set({ [attr]: newVal }, function () {
        //         chrome.storage.sync.get([attr], (data) => {
        //             console.log(data)
        //         })
        //     });
        //     return ({
        //         [attr]: newVal
        //     })
        // })
    }

    render() {
        return (
            <FormControl style={{ paddingLeft: "20px" }} component="fieldset">
                <Typography variant="button" >General Settings</Typography>
                {this.state.loading ?
                    <Backdrop open={this.state.loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> :
                    <FormGroup>
                        <FormControlLabel
                            control={<IOSSwitch checked={this.state.ttv_toggle} onChange={this.handleChange} name="ttv_toggle" />}
                            label="Twitch TV emotes"
                        />
                        <br />
                        <FormControlLabel
                            control={<IOSSwitch checked={this.state.bttv_toggle} onChange={this.handleChange} name="bttv_toggle" />}
                            label="BetterTTV emotes"
                        />
                        <br />
                        <FormControlLabel
                            control={<IOSSwitch checked={this.state.ffz_toggle} onChange={this.handleChange} name="ffz_toggle" />}
                            label="FrankerFaceZ emotes"
                        />
                        <br />
                        <FormControlLabel
                            control={<IOSSwitch checked={this.state.label_toggle} onChange={this.handleChange} name="label_toggle" />}
                            label="Emote Labels"
                        />
                        <br />

                    </FormGroup>
                }

            </FormControl>
        )
    }
}

export default SettingsPage;