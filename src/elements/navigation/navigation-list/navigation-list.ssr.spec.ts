import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbNavigationListElement } from './navigation-list.component.js';

import '../navigation-button.js';

describe(`sbb-navigation-list ssr`, () => {
  let root: SbbNavigationListElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-navigation-list>
          <sbb-navigation-button>Label</sbb-navigation-button>
          <sbb-navigation-button>Label 2</sbb-navigation-button>
        </sbb-navigation-list>
      `,
      { modules: ['./navigation-list.component.js', '../navigation-button.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbNavigationListElement);
  });
});
