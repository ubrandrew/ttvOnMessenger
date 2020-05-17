import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Paper from '@material-ui/core/Paper'
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';

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
            <Paper variant="outlined">
                <SearchIcon className={classes.searchIcon} />
                <InputBase
                    placeholder="Search…"
                    value={props.searchQuery}
                    onChange={props.handleSearchInput}
                />
            </Paper>
        </Toolbar>
    );
}
