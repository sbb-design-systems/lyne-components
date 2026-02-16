import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbNavigationMarkerElement } from './navigation-marker.component.ts';

import '../navigation-button.ts';

describe(`sbb-navigation-marker ssr`, () => {
  let root: SbbNavigationMarkerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-navigation-marker size="l">
        <sbb-navigation-button id="nav-1" size="s">Tickets & Offers</sbb-navigation-button>
        <sbb-navigation-button id="nav-2">Vacations & Recreation</sbb-navigation-button>
        <sbb-navigation-button id="nav-3">Travel information</sbb-navigation-button>
        <sbb-navigation-button id="nav-4">Help & Contact</sbb-navigation-button>
      </sbb-navigation-marker>`,
      { modules: ['./navigation-marker.component.js', '../navigation-button.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbNavigationMarkerElement);
  });
});
