import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../autocomplete-grid-button.js';
import './autocomplete-grid-cell.component.js';

describe('sbb-autocomplete-grid-cell', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
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
