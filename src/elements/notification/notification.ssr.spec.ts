import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbNotificationElement } from './notification.js';

import '../link/link.js';

describe(`sbb-notification ssr`, () => {
  let root: SbbNotificationElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-notification id="notification">
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
          <sbb-link href="/">Link one</sbb-link>
        </sbb-notification>
      `,
      { modules: ['./notification.js', '../link.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbNotificationElement);
  });
});
