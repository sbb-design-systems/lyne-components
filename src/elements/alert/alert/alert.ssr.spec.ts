import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbAlertElement } from './alert.component.ts';

import '../../title.ts';

describe(`sbb-alert ssr`, () => {
  let root: SbbAlertElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-alert>
        <sbb-title level="3">Disruption</sbb-title>
        Content
      </sbb-alert>`,
      {
        modules: ['./alert.component.js', '../../title.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAlertElement);
  });
});
