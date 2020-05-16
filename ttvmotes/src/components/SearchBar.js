import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";

export default function PrimarySearchAppBar(props) {
    return (
        <Toolbar>
            <InputBase
                placeholder="Search…"
                value={props.searchQuery}
                onChange={props.handleSearchInput}
            />
        </Toolbar>
    );
}
