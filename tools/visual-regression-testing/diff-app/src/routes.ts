import type { Route } from '@vaadin/router';

import './components/overview/overview.js';
import './components/test-case/test-case.js';

export const routes: Route[] = [
  {
    path: '/',
    component: 'app-overview',
  },
  {
    path: '/compare/:component/:testcase',
    component: 'app-test-case',
  },
];
