import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    childContainer: {
        flexGrow: 1,
        height: 450
    }
}));

export default function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles()

    return (
        <div
            className={classes.childContainer}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
        >
            {value === index && (
                <Typography>{children}</Typography>
            )}
        </div>
    )
}
