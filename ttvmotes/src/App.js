import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './components/TabPanel';
import SettingsPage from './pages/SettingsPage';
import EmotePage from './pages/EmotePage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, newValue) {
    console.log(newValue)
    this.setState({ currentTab: newValue })
  }

  render() {
    return (
      <div>
        <Tabs
          value={this.state.currentTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Settings" />
          <Tab label="Groups" />
          <Tab label="Explore" />
        </Tabs>
        <TabPanel value={this.state.currentTab} index={0}>
          <SettingsPage></SettingsPage>
        </TabPanel>
        <TabPanel value={this.state.currentTab} index={1}>
          <div>Coming soon</div>
        </TabPanel>
        <TabPanel value={this.state.currentTab} index={2}>
          <EmotePage></EmotePage>
        </TabPanel>

      </div>
    );
  }
}

export default App;