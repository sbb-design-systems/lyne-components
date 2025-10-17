import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { type SinonSpy, spy } from 'sinon';

import type { SbbMiniButtonElement } from '../../button/mini-button.js';
import type { SbbPaginatorPageEventDetails } from '../../core/interfaces/paginator-page.js';
import { fixture, tabKey } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import { SbbCompactPaginatorElement } from './compact-paginator.component.js';

describe('sbb-compact-paginator', () => {
  let element: SbbCompactPaginatorElement;
  let pageEventSpy: SinonSpy<CustomEvent<SbbPaginatorPageEventDetails>[]>;
  let ɵpageEventSpy: SinonSpy<CustomEvent<SbbPaginatorPageEventDetails>[]>;

  beforeEach(async () => {
    pageEventSpy = spy();
    ɵpageEventSpy = spy();
    element = await fixture(
      html`<sbb-compact-paginator
        @page=${(e: CustomEvent<SbbPaginatorPageEventDetails>) => pageEventSpy(e)}
        @ɵpage=${(e: CustomEvent<SbbPaginatorPageEventDetails>) => ɵpageEventSpy(e)}
        length="50"
        page-size="5"
      ></sbb-compact-paginator>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCompactPaginatorElement);
  });

  it('change pages via prev/next buttons and emits `ɵpage` and `page` event', async () => {
    const goToPrev: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-prev-page',
    )!;
    const goToNext: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    expect(goToPrev).to.have.attribute('disabled');
    goToPrev.click();
    await waitForLitRender(element);
    expect(ɵpageEventSpy).not.to.have.been.called;
    expect(pageEventSpy).not.to.have.been.called;

    expect(goToNext).not.to.have.attribute('disabled');
    goToNext.click();
    await waitForLitRender(element);
    expect(ɵpageEventSpy).to.have.been.calledOnce;
    expect(ɵpageEventSpy.lastCall.firstArg.detail.pageIndex).to.be.equal(element.pageIndex);
    expect(pageEventSpy).to.have.been.calledOnce;
    expect(pageEventSpy.lastCall.firstArg.detail.pageIndex).to.be.equal(element.pageIndex);
    expect(element.pageIndex).to.be.equal(1);
    expect(goToPrev).not.to.have.attribute('disabled');
    expect(goToNext).not.to.have.attribute('disabled');

    goToPrev.click();
    await waitForLitRender(element);
    expect(ɵpageEventSpy).to.have.been.calledTwice;
    expect(ɵpageEventSpy.lastCall.firstArg.detail.pageIndex).to.be.equal(element.pageIndex);
    expect(pageEventSpy).to.have.been.calledTwice;
    expect(pageEventSpy.lastCall.firstArg.detail.pageIndex).to.be.equal(element.pageIndex);
    expect(element.pageIndex).to.be.equal(0);
  });

  /*
   * NOTE: when checking `selectedElement.textContent`, the sbb-divider is not considered,
   * so the current page and the last page are joined in a single value.
   */
  it('changes to the correct selected page when pageSize changes', async () => {
    // go to page 5 / pageIndex=4, which includes items 21-25
    element.setAttribute('page-index', '4');
    await waitForLitRender(element);
    let selectedElement = element.shadowRoot!.querySelector('.sbb-paginator__pages')!;
    // length = 50 / pageSize = 5 / numberOfPages = 10
    expect(selectedElement.textContent).to.be.equal('510');

    // switching to pageSize=10, item 21 should be on page 3 / pageIndex=2
    element.setAttribute('page-size', '10');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('.sbb-paginator__pages')!;
    // length = 50 / pageSize = 10 / numberOfPages = 5
    expect(selectedElement.textContent).to.be.equal('35');

    // go to page 4 / pageIndex=3, which now includes items 31-40
    element.setAttribute('page-index', '3');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('.sbb-paginator__pages')!;
    // length = 50 / pageSize = 10 / numberOfPages = 5
    expect(selectedElement.textContent).to.be.equal('45');

    // switching to pageSize=2, item 31 should be on page 16 / pageIndex=15
    element.setAttribute('page-size', '2');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('.sbb-paginator__pages')!;
    // length = 50 / pageSize = 2 / numberOfPages = 25
    expect(selectedElement.textContent).to.be.equal('1625');
  });

  it('the `page` event is not emitted when pageSize and pageIndex change programmatically', async () => {
    element.setAttribute('page-index', '4');
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(4);
    expect(ɵpageEventSpy).to.have.been.calledOnce;
    expect(pageEventSpy).not.to.have.been.called;

    element.setAttribute('page-size', '10');
    await waitForLitRender(element);
    expect(element.pageSize).to.be.equal(10);
    expect(ɵpageEventSpy).to.have.been.calledTwice;
    expect(pageEventSpy).not.to.have.been.called;
  });

  it('handles length change', async () => {
    element.pageIndex = 9;
    element.length = 100;
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(9);

    element.length = 10;
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(1);

    element.length = -1;
    await waitForLitRender(element);
    expect(element.length).to.be.equal(0);
    expect(element.pageIndex).to.be.equal(0);
  });

  it('handles pageSize change', async () => {
    element.pageIndex = 9;
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(9);

    element.pageSize = 1;
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(45);

    element.pageSize = 10;
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(4);

    element.pageSize = -1;
    await waitForLitRender(element);
    expect(element.pageSize).to.be.equal(0);
    expect(element.pageIndex).to.be.equal(0);
  });

  it('handles pageIndex change', async () => {
    element.pageIndex = 10;
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(9);

    element.pageIndex = -1;
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(0);

    element.pageIndex = 0;
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(0);

    element.pageIndex = 5;
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(5);
  });

  it('keyboard navigation with arrows', async () => {
    const goToPrev: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-prev-page',
    )!;
    const goToNext: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    goToNext.focus();
    expect(document.activeElement?.shadowRoot?.activeElement).to.be.equal(goToNext);

    // Next
    await sendKeys({ press: 'Enter' });
    expect(document.activeElement?.shadowRoot?.activeElement).to.be.equal(goToNext);

    // Previous
    await sendKeys({ press: `Shift+${tabKey}` });
    expect(document.activeElement?.shadowRoot?.activeElement).to.be.equal(goToPrev);

    await sendKeys({ press: 'Enter' });
    expect(goToPrev.disabled).to.be.true;
    expect(document.activeElement?.shadowRoot?.activeElement).to.be.equal(goToNext);

    // Jump to second last
    element.pageIndex = 8;
    await waitForLitRender(element);

    goToNext.focus();
    await sendKeys({ press: 'Enter' });
    expect(document.activeElement?.shadowRoot?.activeElement).to.be.equal(goToPrev);
  });
});
