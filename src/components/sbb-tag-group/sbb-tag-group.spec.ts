import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-tag-group';

describe('sbb-tag-group', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-tag-group>
        <sbb-tag value="tag-1">First tag</sbb-tag>
        <sbb-tag value="tag-2">Second tag</sbb-tag>
        <sbb-tag value="tag-3">Third tag</sbb-tag>
      </sbb-tag-group>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-tag-group role="group"> 
          <sbb-tag slot="tag-0" value="tag-1">
            First tag
          </sbb-tag>
          <sbb-tag slot="tag-1" value="tag-2">
            Second tag
          </sbb-tag>
          <sbb-tag slot="tag-2" value="tag-3">
            Third tag
          </sbb-tag>
        </sbb-tag-group>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-tag-group">
          <ul class="sbb-tag-group__list">
            <li class="sbb-tag-group__list-item">
              <slot name="tag-0"></slot>
            </li>
            <li class="sbb-tag-group__list-item">
              <slot name="tag-1"></slot>
            </li>
            <li class="sbb-tag-group__list-item">
              <slot name="tag-2"></slot>
            </li>
          </ul>
          <span hidden="">
            <slot></slot>
          </span>
        </div>
      `,
    );
  });
});
