import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender, waitForCondition } from '../../core/testing.js';

import { SbbTableWrapperElement } from './table-wrapper.js';

describe(`sbb-table-wrapper`, () => {
  let element: SbbTableWrapperElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-table-wrapper>
        <table>
          <thead>
            <tr>
              <th scope="col">Col 1</th>
              <th scope="col">Col 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data 1</td>
              <td>Data 2</td>
            </tr>
          </tbody>
        </table>
      </sbb-table-wrapper>`,
    );
    await waitForLitRender(element);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTableWrapperElement);
    expect(element).not.to.have.attribute('data-has-horizontal-scrollbar');
  });

  it('detect horizontal scrollbar', async () => {
    const table = element.querySelector('table')!;
    table.style.setProperty('width', '130%');

    // ResizeObserver callbacks run outside the usual render flow
    await waitForCondition(() => element.hasAttribute('data-has-horizontal-scrollbar'));

    expect(element).to.have.attribute('data-has-horizontal-scrollbar');
  });
});
