import { Router } from '@vaadin/router';

import { routes } from './routes.js';

import '../../../../src/components/core/styles/standard-theme.scss';

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);
