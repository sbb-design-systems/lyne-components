import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';
import type { SbbContainerElement } from '../container.ts';

import { SbbStickyBarElement } from './sticky-bar.component.ts';

import '../container.ts';

describe(`sbb-sticky-bar ssr`, () => {
  let root: SbbContainerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-container>
          <div><p>Situation 1</p></div>
          <div><p>Situation 2</p></div>
          <div><p>Situation 3</p></div>
          <div><p>Situation 4</p></div>
          <div><p>Situation 5</p></div>
          <div><p>Situation 6</p></div>
          <div><p>Situation 7</p></div>
          <div><p>Situation 8</p></div>
          <div><p>Situation 9</p></div>
          <div><p>Situation 10</p></div>
          <div><p>Situation 11</p></div>
          <div><p>Situation 12</p></div>
          <sbb-sticky-bar></sbb-sticky-bar>
        </sbb-container>
      `,
      { modules: ['../container.js', './sticky-bar.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root.querySelector('sbb-sticky-bar'), SbbStickyBarElement);
  });
});
