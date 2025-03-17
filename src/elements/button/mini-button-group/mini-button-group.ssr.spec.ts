import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbMiniButtonGroupElement } from './mini-button-group.component.js';
import '../mini-button.js';
import '../../divider/divider.component.js';

describe(`sbb-mini-button-group ssr`, () => {
  let root: SbbMiniButtonGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-mini-button-group>
        <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
        <sbb-divider orientation="vertical"></sbb-divider>
        <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
      </sbb-mini-button-group>`,
      {
        modules: [
          './mini-button-group.component.js',
          '../../divider/divider.component.js',
          '../mini-button.js',
        ],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMiniButtonGroupElement);
  });
});
