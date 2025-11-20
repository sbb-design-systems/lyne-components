import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTableWrapperElement } from './table-wrapper.component.ts';

describe(`sbb-table-wrapper ssr`, () => {
  let root: SbbTableWrapperElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-table-wrapper>
        <table>
          <caption>
            Empty table
          </caption>
        </table>
      </sbb-table-wrapper>`,
      { modules: ['./table-wrapper.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTableWrapperElement);
  });
});
