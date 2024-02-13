import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbRadioButtonGroupElement } from './radio-button-group';
import './radio-button-group';

describe('sbb-radio-button-group', () => {
  let element: SbbRadioButtonGroupElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-radio-button-group></sbb-radio-button-group>`);
  });

  it('renders - Dom', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDom', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
