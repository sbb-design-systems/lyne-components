import { html, nothing, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import './mini-button-group.js';
import '../mini-button.js';
import '../../divider/divider.js';

describe('sbb-mini-button-group', () => {
  const sizeCases = ['s', 'm', 'l', 'xl'];

  const template = (size?: string, negative?: boolean): TemplateResult => html`
    <sbb-mini-button-group size=${size || nothing} ?negative=${negative}>
      <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
      <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
      <sbb-divider orientation="vertical"></sbb-divider>
      <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
    </sbb-mini-button-group>
  `;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const size of sizeCases) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(size));
        }),
      );
    }

    it(
      `negative`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(undefined, true));
      }),
    );

    it(
      `focus`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(template());
      }),
    );
  });
});
