import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbMenuElement } from './menu.js';

import '../../button.js';
import '../../divider.js';
import '../../link.js';
import '../menu-button.js';

describe(`sbb-menu ssr`, () => {
  let root: HTMLDivElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <div>
          <sbb-button id="menu-trigger">Menu trigger</sbb-button>
          <sbb-menu id="menu" trigger="menu-trigger">
            <sbb-block-link id="menu-link" href="#" size="xs">Profile</sbb-block-link>
            <sbb-menu-button id="menu-action-1" icon-name="tick-small">View</sbb-menu-button>
            <sbb-menu-button id="menu-action-2" icon-name="pen-small" sbb-badge="1" disabled
              >Edit</sbb-menu-button
            >
            <sbb-menu-button id="menu-action-3" icon-name="swisspass-small" sbb-badge="2"
              >Details</sbb-menu-button
            >
            <sbb-divider id="menu-divider"></sbb-divider>
            <sbb-menu-button id="menu-action-4" icon-name="cross-small">Cancel</sbb-menu-button>
          </sbb-menu>
        </div>
      `,
      {
        modules: [
          '../../button.js',
          '../../divider.js',
          '../../link.js',
          '../menu-button.js',
          './menu.js',
        ],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root.querySelector('sbb-menu'), SbbMenuElement);
  });
});
