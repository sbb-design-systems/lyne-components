import './checkbox-group';

import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

describe('sbb-checkbox-group', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-checkbox-group>
        <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `);

    expect(root).dom.to.be.equal(
      `
      <sbb-checkbox-group orientation="horizontal" data-slot-names="unnamed">
        <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `,
    );
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-checkbox-group">
        <slot></slot>
      </div>
      <div class="sbb-checkbox-group__error">
        <slot name="error">
        </slot>
      </div>
    `);
  });
});
