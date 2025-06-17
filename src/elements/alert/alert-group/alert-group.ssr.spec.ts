import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbAlertGroupElement } from './alert-group.component.js';

import '../alert/alert.component.js';
import '../../title.js';

describe(`sbb-alert-group ssr`, () => {
  let root: SbbAlertGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-alert-group accessibility-title="Disruptions" accessibility-title-level="3">
          <sbb-alert>
            <sbb-title level="4">Interruption</sbb-title>
            <p>First</p>
          </sbb-alert>
          <sbb-alert>
            <sbb-title level="4">Interruption</sbb-title>
            <p>Second</p>
          </sbb-alert>
        </sbb-alert-group>
      `,
      { modules: ['./alert-group.component.js', '../alert.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAlertGroupElement);
  });
});
