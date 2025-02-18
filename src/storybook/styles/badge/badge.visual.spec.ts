import { nothing } from 'lit';
import { html } from 'lit/static-html.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
} from '../../../elements/core/testing/private.js';

import '../../../elements/icon.js';

describe(`badge`, () => {
  const cases = {
    badgeContent: ['9', '99'],
    badgePosition: [undefined, 'before', 'middle', 'after'],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
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
});
