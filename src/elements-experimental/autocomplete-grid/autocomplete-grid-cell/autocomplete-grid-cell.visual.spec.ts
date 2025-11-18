import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import '../autocomplete-grid-button.js';
import './autocomplete-grid-cell.component.js';

describe('sbb-autocomplete-grid-cell', () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-autocomplete-grid-cell>
            <sbb-autocomplete-grid-button
              icon-name="face-smiling-small"
            ></sbb-autocomplete-grid-button>
          </sbb-autocomplete-grid-cell>
        `);
      }),
    );
  });
});
