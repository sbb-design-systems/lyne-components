import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbAlertGroupElement } from './alert-group.component.ts';

import '../alert/alert.component.ts';
import '../../title.ts';

describe(`sbb-alert-group ssr`, () => {
  let root: SbbAlertGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-alert-group accessibility-title="Disruptions" accessibility-title-level="3">
          <sbb-alert>
            <sbb-title level="4">Interruption</sbb-title>
            First
          </sbb-alert>
          <sbb-alert>
            <sbb-title level="4">Interruption</sbb-title>
            Second
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
