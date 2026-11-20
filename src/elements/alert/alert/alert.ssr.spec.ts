import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbAlertElement } from './alert.component.ts';

import '../../alert.ts';

describe(`sbb-alert ssr`, () => {
  let root: SbbAlertElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-alert>
        <h3>Disruption</h3>
        Content
      </sbb-alert>`,
      {
        modules: ['../../alert.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAlertElement);
  });
});
