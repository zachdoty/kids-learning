import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/create/create.js';
import '../../ui/pages/edit/edit.js';
import '../../ui/pages/card/card.js';
import '../../ui/pages/scores/scores.js';
import '../../ui/pages/dashboard/dashboard.js';
import '../../ui/pages/not-found/not-found.js';

import '../../ui/components/loader/loader.js';
import '../../ui/components/navbar/navbar.js';
import '../../ui/components/recorder/recorder.js';
import '../../ui/components/player/player.js';
import '../../ui/components/cardList/cardList.js';
import '../../ui/components/cardAction/cardAction.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/create', {
  name: 'App.create',
  action() {
    BlazeLayout.render('App_body', { main: 'App_create' });
  },
});

FlowRouter.route('/card/:cardId/:qId?', {
  name: 'App.card',
  action() {
    BlazeLayout.render('App_body', { main: 'App_card' });
  },
});

FlowRouter.route('/scores/:cardId', {
  name: 'App.scores',
  action() {
    BlazeLayout.render('App_body', { main: 'App_scores' });
  },
});

FlowRouter.route('/card-update/:cardId', {
  name: 'App.edit',
  action() {
    BlazeLayout.render('App_body', { main: 'App_edit_card' });
  },
});

FlowRouter.route('/dashboard', {
  name: 'App.dashboard',
  action() {
    BlazeLayout.render('App_body', { main: 'App_dashboard' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
