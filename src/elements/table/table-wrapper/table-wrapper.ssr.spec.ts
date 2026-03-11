import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTableWrapperElement } from './table-wrapper.component.ts';

import '../../table.ts';

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
      { modules: ['../../table.ts'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTableWrapperElement);
  });
});
