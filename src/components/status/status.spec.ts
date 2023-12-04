import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './status';
import '../icon';

describe('sbb-status', () => {
  it('renders', async () => {
    const root = await fixture(
      html` <sbb-status my-prop="Label" type="info"> Status info text </sbb-status>`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-status my-prop="Label" type="info">
        Status info text
      </sbb-status>`,
    );

    expect(root).shadowDom.to.be.equal(
      `
      <div class="sbb-status" type="info">
        <sbb-icon class="sbb-status__icon" name="circle-information-small" role="img" data-namespace="default" aria-hidden="true"></sbb-icon>
        <span class="sbb-status__content">
          <slot></slot>
        </span>
      </div>
    `,
    );
  });

  it('renders with the status title', async () => {
    const root = await fixture(
      html` <sbb-status type="info" extended="" title-content="Title" data-has-title="">
        Status info text
      </sbb-status>`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-status type="info" extended="" title-content="Title" data-has-title="">
        Status info text
      </sbb-status>`,
    );
    expect(root).shadowDom.to.be.equal(
      `
      <div class="sbb-status" type="info">
        <sbb-icon class="sbb-status__icon" name="circle-information-small" role="img" data-namespace="default" aria-hidden="true"></sbb-icon>
        <span class="sbb-status__content">
          <sbb-title class="sbb-status__title" visual-level="5" level="3" role="heading" aria-level="3">
            <slot name="title">Title</slot>
          </sbb-title>
          <slot></slot>
        </span>
      </div>
      `,
    );
  });
});
