import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbMapContainerElement } from './map-container.component.ts';

import '../title.ts';
import '../map-container.ts';

describe(`sbb-map-container ssr`, () => {
  let root: SbbMapContainerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-map-container>
        <div>
          <sbb-title level="4">Operations & Disruptions</sbb-title>
          <div><p>Situation 1</p></div>
          <div><p>Situation 2</p></div>
          <div><p>Situation 3</p></div>
          <div><p>Situation 4</p></div>
          <div><p>Situation 5</p></div>
          <div><p>Situation 6</p></div>
          <div><p>Situation 7</p></div>
          <div><p>Situation 8</p></div>
        </div>
        <div slot="map">
          <div style="height: 1200px">map</div>
        </div>
      </sbb-map-container>`,
      { modules: ['../title.ts', '../map-container.ts'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMapContainerElement);
  });
});
