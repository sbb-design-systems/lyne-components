import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbSkiplinkListElement } from './skiplink-list.component.ts';

import '../link/block-link.ts';

describe(`sbb-skiplink-list ssr`, () => {
  let root: SbbSkiplinkListElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-skiplink-list>
          <sbb-block-link href="#" id="link-1">Link 1</sbb-block-link>
          <sbb-block-link href="#" id="link-2">Link 2</sbb-block-link>
          <sbb-block-link href="#" id="link-3">Link 3</sbb-block-link>
        </sbb-skiplink-list>
        <button id="button">Focus me</button>
      `,
      { modules: ['./skiplink-list.component.js', '../link.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSkiplinkListElement);
  });
});
