import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbSelectElement } from './select.js';
import '../option.js';

describe(`sbb-select ssr`, () => {
  let root: SbbSelectElement;

  it('renders', async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-select placeholder="Placeholder" value="1">
          <sbb-option id="option-1" value="1">First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3">Third</sbb-option>
        </sbb-select>
      `,
      { modules: ['./select.js', '../option.js'] },
    );

    assert.instanceOf(root, SbbSelectElement);
  });

  it('renders with value attribute', async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-select placeholder="Placeholder" value="1">
          <sbb-option id="option-1" value="1">First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3">Third</sbb-option>
        </sbb-select>
      `,
      { modules: ['./select.js', '../option.js'] },
    );

    assert.instanceOf(root, SbbSelectElement);
  });

  it('renders with value property', async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-select placeholder="Placeholder" .value=${1}>
          <sbb-option id="option-1" value="1">First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3">Third</sbb-option>
        </sbb-select>
      `,
      { modules: ['./select.js', '../option.js'] },
    );

    assert.instanceOf(root, SbbSelectElement);
  });
});
