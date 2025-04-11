import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender, waitForCondition } from '../../core/testing.js';

import { SbbTableWrapperElement } from './table-wrapper.component.js';

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
    // ResizeObserver callbacks run outside the usual render flow
    await waitForCondition(() => element.classList.contains('sbb-table-wrapper-offset-none'));
    expect(element).to.have.class('sbb-table-wrapper-offset-none');

    // Expand the table so that the scrollbar appears
    const table = element.querySelector('table')!;
    const tableWrapper = element.shadowRoot!.querySelector('.sbb-table-wrapper')!;

    table.style.setProperty('width', '140%');
    tableWrapper.scroll(20, 0);

    // ResizeObserver callbacks run outside the usual render flow
    await waitForCondition(() => element.classList.contains('sbb-table-wrapper-offset-both'));
    expect(element).to.have.class('sbb-table-wrapper-offset-both');

    tableWrapper.scroll(-20, 0);
    await waitForCondition(() => element.classList.contains('sbb-table-wrapper-offset-right'));
    expect(element).to.have.class('sbb-table-wrapper-offset-right');

    tableWrapper.scroll(1000, 0);
    await waitForCondition(() => element.classList.contains('sbb-table-wrapper-offset-left'));
    expect(element).to.have.class('sbb-table-wrapper-offset-left');
  });
});
