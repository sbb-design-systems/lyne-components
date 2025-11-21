import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender, waitForCondition } from '../../core/testing.ts';

import { SbbTableWrapperElement } from './table-wrapper.component.ts';

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
    expect(element).not.to.match(':state(has-horizontal-scrollbar)');
  });

  it('detect horizontal scrollbar', async () => {
    // ResizeObserver callbacks run outside the usual render flow
    await waitForCondition(() => element.classList.contains('sbb-table-wrapper-offset-none'));
    expect(element).to.have.class('sbb-table-wrapper-offset-none');

    // Expand the table so that the scrollbar appears
    const table = element.querySelector('table')!;

    table.style.setProperty('width', '140%');
    element.scroll(20, 0);

    // ResizeObserver callbacks run outside the usual render flow
    await waitForCondition(() => element.classList.contains('sbb-table-wrapper-offset-both'));
    expect(element).to.have.class('sbb-table-wrapper-offset-both');

    element.scroll(-20, 0);
    await waitForCondition(() => element.classList.contains('sbb-table-wrapper-offset-right'));
    expect(element).to.have.class('sbb-table-wrapper-offset-right');

    element.scroll(1000, 0);
    await waitForCondition(() => element.classList.contains('sbb-table-wrapper-offset-left'));
    expect(element).to.have.class('sbb-table-wrapper-offset-left');
  });

  it('should set tabindex 0 when focusable', async () => {
    element.focusable = true;
    await waitForLitRender(element);

    expect(element).to.have.attribute('tabindex', '0');
  });

  it('should not touch user set tabindex when focusable', async () => {
    element.tabIndex = 2;
    expect(element).to.have.attribute('tabindex', '2');

    element.focusable = true;
    await waitForLitRender(element);

    expect(element).to.have.attribute('tabindex', '2');
  });

  it('should remove tabindex when not focusable anymore', async () => {
    element.focusable = true;
    await waitForLitRender(element);

    expect(element).to.have.attribute('tabindex', '0');

    element.focusable = false;
    await waitForLitRender(element);

    expect(element).not.to.have.attribute('tabindex');
  });

  it('should sync scrollbar classes', async () => {
    expect(element).to.have.class('sbb-scrollbar-thick-track-visible');
    expect(element).not.to.have.class('sbb-scrollbar-thick-negative-track-visible');

    element.negative = true;
    await waitForLitRender(element);

    expect(element).not.to.have.class('sbb-scrollbar-thick-track-visible');
    expect(element).to.have.class('sbb-scrollbar-thick-negative-track-visible');

    element.negative = false;
    await waitForLitRender(element);

    expect(element).to.have.class('sbb-scrollbar-thick-track-visible');
    expect(element).not.to.have.class('sbb-scrollbar-thick-negative-track-visible');
  });
});
