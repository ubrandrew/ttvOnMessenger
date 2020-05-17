import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";


export default function TabPanel(props) {
    const { children, value, index, ...other } = props;
    console.log(`TAB PANEL VAL: ${value}, ${index}`)
    return (
        <div
            style={{ flexGrow: 1 }}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}

        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}
