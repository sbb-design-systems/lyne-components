import { nothing } from 'lit';
import { html } from 'lit/static-html.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
} from '../../../elements/core/testing/private.ts';

import '../../../elements/icon.ts';

describe(`badge`, () => {
  const cases = {
    badgeContent: ['9', '99'],
    badgePosition: [undefined, 'before', 'after'],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ badgeContent, badgePosition }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-icon
              name="user-small"
              sbb-badge=${badgeContent}
              sbb-badge-position=${badgePosition || nothing}
            ></sbb-icon>
          `);
        }),
      );
    });
  });

  describeViewports({ viewports: ['zero'] }, () => {
    for (const { forcedColors, darkMode } of [
      { forcedColors: false, darkMode: true },
      { forcedColors: true, darkMode: false },
    ]) {
      it(
        `forcedColors=${forcedColors} darkMode=${darkMode}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`<sbb-icon name="user-small" sbb-badge="99"></sbb-icon>`, {
            darkMode,
            forcedColors,
          });
        }),
      );
    }
  });
});
