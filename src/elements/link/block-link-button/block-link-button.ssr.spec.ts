import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbBlockLinkButtonElement } from './block-link-button.component.ts';

describe(`sbb-block-link-button ssr`, () => {
  let root: SbbBlockLinkButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-block-link-button
        icon-placement="end"
        size="m"
        negative
        name="name"
        type="submit"
        form="formid"
      >
        <sbb-icon name="chevron-small-right-small" slot="icon"></sbb-icon>
        Travelcards &amp; tickets.
      </sbb-block-link-button>`,
      { modules: ['./block-link-button.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbBlockLinkButtonElement);
  });
});
