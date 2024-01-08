import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import '../../icon';
import './tooltip-trigger';

describe('sbb-tooltip-trigger', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-tooltip-trigger></sbb-tooltip-trigger>`);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `<sbb-tooltip-trigger role="button" tabindex="0" dir="ltr"></sbb-tooltip-trigger>`,
    );
    expect(root).shadowDom.to.be.equal(
      `<span class="sbb-tooltip-trigger">
        <slot>
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="circle-information-small"
            role="img">
          </sbb-icon>
        </slot>
      </span>
    `,
    );
  });

  it('renders with custom content', async () => {
    const root = await fixture(html`<sbb-tooltip-trigger>Custom Content</sbb-tooltip-trigger>`);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `<sbb-tooltip-trigger role="button" tabindex="0" dir="ltr">
        Custom Content
      </sbb-tooltip-trigger>`,
    );
    expect(root).shadowDom.to.be.equal(
      `<span class="sbb-tooltip-trigger">
        <slot>
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="circle-information-small"
            role="img">
          </sbb-icon>
        </slot>
      </span>`,
    );
  });
});
