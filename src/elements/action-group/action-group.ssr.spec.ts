import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbActionGroupElement } from './action-group.component.ts';

import '../button.ts';
import '../link.ts';

describe(`sbb-action-group ssr`, () => {
  let root: SbbActionGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-action-group align-group="start" orientation="horizontal">
          <sbb-secondary-button>Button</sbb-secondary-button>
          <sbb-block-link
            icon-name="chevron-small-left-small"
            icon-placement="start"
            href="https://github.com/sbb-design-systems/lyne-components"
          >
            Link
          </sbb-block-link>
        </sbb-action-group>
      `,
      { modules: ['./action-group.component.js', '../button.js', '../link.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbActionGroupElement);
  });
});
