import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbSelectElement } from './select.component.ts';
import '../option.ts';

describe(`sbb-select ssr`, () => {
  let root: SbbSelectElement;

  it('renders', async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-select placeholder="Placeholder">
          <sbb-option id="option-1" value="1">First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3">Third</sbb-option>
        </sbb-select>
      `,
      { modules: ['./select.component.js', '../option.js'] },
    );

    assert.instanceOf(root, SbbSelectElement);
  });

  it('renders with value attribute', async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-select placeholder="Placeholder" value="2">
          <sbb-option id="option-1" value="1">First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3">Third</sbb-option>
        </sbb-select>
      `,
      { modules: ['./select.component.js', '../option.js'] },
    );

    assert.instanceOf(root, SbbSelectElement);
    expect(root.shadowRoot!.querySelector('.sbb-select__trigger')!.textContent!.trim()).to.be.equal(
      'Second',
    );
  });
});
