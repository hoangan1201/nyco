import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexPage from '../pages/IndexPage';
import DataStoryPage from '../pages/DataStoryPage';
import DataStoriesPage from '../pages/DataStoriesPage';
import CommonMetricsPage from '../pages/CommonMetricsPage';
import GenericPage from '../pages/GenericPage';
import ProgramsPage from '../pages/ProgramsPage';
import SubscribePage from '../pages/SubscribePage';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/:lang" component={IndexPage} />
      <Route exact path="/:lang/data-stories" component={DataStoriesPage} />
      <Route exact path="/:lang/data-stories/programs" component={ProgramsPage} />
      <Route path="/:lang/data-stories/programs/:program" component={ProgramsPage} />
      <Route path="/:lang/data-stories/:slug" component={DataStoryPage} />
      <Route exact path="/:lang/common-metrics" component={CommonMetricsPage} />
      <Route path="/:lang/common-metrics/:slug" component={CommonMetricsPage} />
      <Route exact path="/:lang/subscribe" component={SubscribePage} />
      <Route path="/:lang/:slug" component={GenericPage} />
    </Switch>
  </Router>
);

export default AppRouter;
