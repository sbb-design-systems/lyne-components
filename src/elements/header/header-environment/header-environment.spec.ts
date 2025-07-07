import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbHeaderEnvironmentElement } from './header-environment.component.js';
import '../header-button.js';
import '../header.js';

describe(`sbb-header-environment`, () => {
  let element: SbbHeaderEnvironmentElement;

  beforeEach(async () => {
    const root = await fixture(html`
      <div>
        <sbb-header>
          <sbb-header-button id="action-1">Action 1</sbb-header-button>
          <sbb-header-button id="action-2">Action 2</sbb-header-button>
          <sbb-header-environment>dev</sbb-header-environment>
        </sbb-header>
        <div style="height: 300px;"></div>
      </div>
    `);
    element = root.querySelector('sbb-header-environment')!;
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbHeaderEnvironmentElement);
    expect(element).to.have.attribute('data-env', 'dev');
  });
});
