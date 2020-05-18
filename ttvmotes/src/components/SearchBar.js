import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Paper from '@material-ui/core/Paper'
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    searchIcon: {
        verticalAlign: "middle",
        padding: "2px 4px 2px 4px"
    }
}))

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    return (
        <Toolbar>
            <Paper variant="outlined" >
                <SearchIcon className={classes.searchIcon} />
                <InputBase
                    placeholder="Search…"
                    value={props.searchQuery}
                    onChange={props.handleSearchInput}
                />
            </Paper>
            <div style={{ flexGrow: 1 }} />
            <Tooltip
                placement="left-start"
                title="Disclaimer: All emotes on this extension are not my own and have been gathered from BetterTTV, FrankerFaceZ, and Twitch.tv."
                aria-label="info"
                arrow
            >
                <InfoOutlinedIcon color="primary" />
            </Tooltip>
        </Toolbar>
    );
}
