import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbNavigationElement } from './navigation.component.ts';

import '../navigation-button.ts';
import '../navigation-marker.ts';
import '../navigation-section.ts';

describe(`sbb-navigation ssr`, () => {
  let root: SbbNavigationElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-navigation id="navigation">
          <sbb-navigation-marker>
            <sbb-navigation-button id="action-1">Tickets & Offers</sbb-navigation-button>
            <sbb-navigation-button id="action-2">Vacations & Recreation</sbb-navigation-button>
            <sbb-navigation-button>Travel information</sbb-navigation-button>
            <sbb-navigation-button sbb-navigation-close>Help & Contact</sbb-navigation-button>
          </sbb-navigation-marker>

          <sbb-navigation-section trigger="action-1" id="first-section">
            <sbb-navigation-button sbb-navigation-section-close>Label</sbb-navigation-button>
            <sbb-navigation-button>Label</sbb-navigation-button>
          </sbb-navigation-section>
          <sbb-navigation-section trigger="action-2" id="second-section">
            <sbb-navigation-button>Label</sbb-navigation-button>
            <sbb-navigation-button>Label</sbb-navigation-button>
          </sbb-navigation-section>
        </sbb-navigation>
      `,
      {
        modules: [
          './navigation.component.js',
          '../navigation-button.js',
          '../navigation-marker.js',
          '../navigation-section.js',
        ],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbNavigationElement);
  });
});
