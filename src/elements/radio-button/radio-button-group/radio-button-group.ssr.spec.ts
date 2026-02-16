import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbRadioButtonGroupElement } from './radio-button-group.component.ts';

import '../radio-button.ts';

describe(`sbb-radio-button-group ssr`, () => {
  let root: SbbRadioButtonGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-radio-button-group value="Value one">
          <sbb-radio-button id="sbb-radio-1" value="Value one">Value one</sbb-radio-button>
          <sbb-radio-button id="sbb-radio-2" value="Value two">Value two</sbb-radio-button>
          <sbb-radio-button id="sbb-radio-3" value="Value three" disabled
            >Value three</sbb-radio-button
          >
          <sbb-radio-button id="sbb-radio-4" value="Value four">Value four</sbb-radio-button>
        </sbb-radio-button-group>
      `,
      { modules: ['./radio-button-group.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbRadioButtonGroupElement);
  });
});
