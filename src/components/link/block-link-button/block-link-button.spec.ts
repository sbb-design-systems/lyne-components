import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbBlockLinkButtonElement } from './block-link-button';
import '../../icon';
import './block-link-button';

describe('sbb-block-link-button', () => {
  let element: SbbBlockLinkButtonElement;

  beforeEach(async () => {
    element = await fixture(
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
    );
  });

  it('renders - DOM', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
