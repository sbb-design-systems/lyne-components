import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbNotificationElement } from './notification.component.js';

import '../title.js';
import '../link/link.js';

describe(`sbb-notification ssr`, () => {
  let root: SbbNotificationElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-notification id="notification">
          <sbb-title>Title</sbb-title>
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
          <sbb-link href="/">Link one</sbb-link>
        </sbb-notification>
      `,
      { modules: ['./notification.component.js', '../link.js', '../title.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbNotificationElement);
  });
});
