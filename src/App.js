import React, { Component } from 'react';
import './App.styl';

import ReminderHeader from './components/Reminder-header/Reminder-header';
import ReminderFooter from './components/Reminder-footer/Reminder-footer';
import ReminderBody from './components/Reminder-body/Reminder-body';

const folders = [{ name: '文件夹一' }, { name: '文件夹二' }, { name: '文件夹三' }, { name: '文件夹四' }];

class App extends Component {
  render() {
    return (
      <>
        <ReminderHeader />
        <ReminderBody folders={ folders } />
        <ReminderFooter />
      </>
    );
  }
}

export default App;
