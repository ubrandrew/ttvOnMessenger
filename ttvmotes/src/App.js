import React from 'react';

import TabPanel from './components/TabPanel';
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'

import Box from '@material-ui/core/Box'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';


import SettingsPage from './pages/SettingsPage';
import EmotePage from './pages/EmotePage';

const useStyles = makeStyles(theme => ({
  tabPanel: {
    maxWidth: "500px",
    maxHeight: "400px",
    minWidth: "500px",
    minHeight: "400px"
  }
}))
export default function App(props) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setCurrentTab(newValue);
  }


  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar style={{ width: "600px" }}>
          {/* Add logo/icon */}
          <Typography variant="h6"  >
            MessengerMotes
          </Typography>
          {/* Add github link */}
        </Toolbar>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <Box className={classes.tabPanel}>
          <EmotePage></EmotePage>
        </Box>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={currentTab} index={1}>
        <Box className={classes.tabPanel}>

          <SettingsPage></SettingsPage>
        </Box>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={currentTab} index={2}>
        <Box className={classes.tabPanel}>

          <div>Coming soon</div>
        </Box>
      </TabPanel>
      <BottomNavigation
        value={currentTab}
        onChange={(event, newValue) => {
          setCurrentTab(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Emotes" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Settings" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Groups" icon={<RestoreIcon />} />
      </BottomNavigation>
    </div>
  );

}
