import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.js';

import { SbbTableWrapperElement } from './table-wrapper.js';

describe(`sbb-table-wrapper ${fixture.name}`, () => {
  let root: SbbTableWrapperElement;

  beforeEach(async () => {
    root = await fixture(
      html`<sbb-table-wrapper>
        <table>
          <caption>
            Empty table
          </caption>
        </table>
      </sbb-table-wrapper>`,
      { modules: ['./table-wrapper.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTableWrapperElement);
  });
});
