// import { html, nothing, type TemplateResult } from 'lit';

import { describeViewports } from '../../core/testing/private.js';

import './header-environment.component.js';
import '../header-link.js';
import '../header-button.js';
import '../../menu.js';
import '../../logo.js';
import '../../signet.js';

describe(`sbb-header-environment`, () => {
  describeViewports({ viewports: ['zero', 'ultra'], viewportHeight: 300 }, () => {});
});
