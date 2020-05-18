import React from 'react';
import cat from '../static/ginger-cat-721.png'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    imgContainer: {
        height: "auto",
        width: "auto",
        maxWidth: 400,
        maxHeight: 400
    },
    imageCaption: {
        textAlign: "center"
    }
});


export default function GroupsPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            {/* Centering image and caption */}
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                height: 450
            }}>
                <img className={classes.imgContainer} src={cat} />
                <Typography className={classes.imageCaption}>
                    🔧 Custom emotes for groups coming soon...
                </Typography>
            </div>
        </React.Fragment>
    )
}