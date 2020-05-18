import React from 'react';

import TabPanel from './components/TabPanel';
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GitHubIcon from '@material-ui/icons/GitHub';
import FaceIcon from '@material-ui/icons/Face';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import { makeStyles } from "@material-ui/core/styles";

import SettingsPage from './pages/SettingsPage';
import EmotePage from './pages/EmotePage';
import GroupsPage from './pages/GroupsPage';
import LogoImage from './static/mmPopupIcon.png';
import { popupWidth, popupHeight, githubUrl } from './constants';

const useStyles = makeStyles(theme => ({
  tabPanel: {
    maxWidth: popupWidth,
    maxHeight: popupHeight,
    minWidth: popupWidth,
    minHeight: popupHeight
  },
  imgContainer: {
    height: "auto",
    width: "auto",
    maxWidth: 36,
    maxHeight: 36,
    paddingRight: 15
  },
  mainLogo: {
    flexGrow: 1
  },
  toolbar: {
    width: popupWidth
  }
}))
export default function App(props) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  return (
    <div>
      <CssBaseline />
      <AppBar color="primary" position="static">
        <Toolbar className={classes.toolbar}>
          <img className={classes.imgContainer} src={LogoImage} />
          <Typography className={classes.mainLogo} variant="h6"  >
            <b color="textSecondary">MessengerMotes</b>
          </Typography>
          <IconButton target="_blank" href={githubUrl} >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TabPanel className={classes.tabPanel} value={currentTab} index={0}>
        <EmotePage />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={currentTab} index={1}>
        <SettingsPage />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={currentTab} index={2}>
        <GroupsPage />
      </TabPanel>
      <BottomNavigation
        value={currentTab}
        onChange={handleTabChange}
        showLabels
      >
        <BottomNavigationAction label="Emotes" icon={<FaceIcon />} />
        <BottomNavigationAction label="Settings" icon={<TuneIcon />} />
        <BottomNavigationAction label="Groups" icon={<GroupSharpIcon />} />
      </BottomNavigation>
    </div >
  );

}
