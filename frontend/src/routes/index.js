import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import MeetupDetails from '../pages/MeetupDetails';
import NewMeetup from '../pages/NewMeetup';
import EditMeetup from '../pages/EditMeetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetupDetails" component={MeetupDetails} isPrivate />
      <Route path="/newMeetup" component={NewMeetup} isPrivate />
      <Route path="/editMeetup" component={EditMeetup} isPrivate />
    </Switch>
  );
}
