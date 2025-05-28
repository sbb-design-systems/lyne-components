import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { type SinonSpy, spy } from 'sinon';

import type { SbbMiniButtonElement } from '../../button/mini-button.js';
import type { SbbPaginatorPageEventDetails } from '../../core/interfaces/paginator-page.js';
import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbOptionElement } from '../../option.js';
import { SbbSelectElement } from '../../select.js';

import { SbbPaginatorElement } from './paginator.component.js';

describe('sbb-paginator', () => {
  let element: SbbPaginatorElement;
  let pageEventSpy: SinonSpy<CustomEvent<SbbPaginatorPageEventDetails>[]>;

  beforeEach(async () => {
    pageEventSpy = spy();
    element = await fixture(
      html`<sbb-paginator
        @page=${(e: CustomEvent<SbbPaginatorPageEventDetails>) => pageEventSpy(e)}
        length="50"
        page-size="5"
      ></sbb-paginator>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbPaginatorElement);
  });

  it('change pages via prev/next buttons and emits `page` event', async () => {
    const goToPrev: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-prev-page',
    )!;
    const goToNext: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    expect(goToPrev).to.have.attribute('disabled');
    goToPrev.click();
    await waitForLitRender(element);
    expect(pageEventSpy).not.to.have.been.called;

    expect(goToNext).not.to.have.attribute('disabled');
    goToNext.click();
    await waitForLitRender(element);
    expect(pageEventSpy).to.have.been.calledOnce;
    expect(pageEventSpy.lastCall.firstArg.detail.pageIndex).to.be.equal(element.pageIndex);
    expect(element.pageIndex).to.be.equal(1);
    expect(goToPrev).not.to.have.attribute('disabled');
    expect(goToNext).not.to.have.attribute('disabled');

    goToPrev.click();
    await waitForLitRender(element);
    expect(pageEventSpy).to.have.been.calledTwice;
    expect(pageEventSpy.lastCall.firstArg.detail.pageIndex).to.be.equal(element.pageIndex);
    expect(element.pageIndex).to.be.equal(0);
  });

  it('changes to the correct selected page when pageSize changes', async () => {
    // go to page 5 / pageIndex=4, which includes items 21-25
    element.setAttribute('page-index', '4');
    await waitForLitRender(element);
    let selectedElement = element.shadowRoot!.querySelector('[data-selected]')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('4');

    // switching to pageSize=10, item 21 should be on page 3 / pageIndex=2
    element.setAttribute('page-size', '10');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('[data-selected]')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('2');

    // go to page 4 / pageIndex=3, which now includes items 31-40
    element.setAttribute('page-index', '3');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('[data-selected]')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('3');

    // switching to pageSize=2, item 31 should be on page 16 / pageIndex=15
    element.setAttribute('page-size', '2');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('[data-selected]')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('15');
  });

  it('emits `page` event when pageIndex changes via page button click', async () => {
    element.addEventListener('page', (event) => {
      expect(event.detail.pageSize).to.be.equal(element.pageSize);
      expect(event.detail.pageSize).to.be.equal(5);
      expect(event.detail.pageIndex).to.be.equal(2);
      expect(event.detail.previousPageIndex).to.be.equal(0);
      expect(event.detail.length).to.be.equal(50);
    });

    const pages = element.shadowRoot!.querySelectorAll('.sbb-paginator__page--number-item');
    pages[2].dispatchEvent(new Event('click'));
    await waitForLitRender(element);
    const pageEventDetail: SbbPaginatorPageEventDetails = pageEventSpy.lastCall.firstArg.detail;
    expect(pageEventSpy).to.have.been.calledOnce;
    expect(pageEventDetail.pageSize).to.be.equal(5);
    expect(pageEventDetail.pageIndex).to.be.equal(2);
    expect(pageEventDetail.previousPageIndex).to.be.equal(0);
    expect(pageEventDetail.length).to.be.equal(50);
  });

  it('emits `page` event when pageSize changes via select', async () => {
    element.setAttribute('page-size-options', '[10, 20, 50]');
    await waitForLitRender(element);
    const select: SbbSelectElement = element.shadowRoot!.querySelector('sbb-select')!;
    expect(select).not.to.be.null;

    const didOpen = new EventSpy(SbbSelectElement.events.didOpen, select);
    select.click();
    await didOpen.calledOnce();
    await waitForLitRender(element);

    const secondOption = select.querySelector<SbbOptionElement>('[value="20"]')!;
    expect(secondOption).not.to.be.null;
    expect(pageEventSpy).not.to.have.been.called;
    secondOption.click();
    await waitForLitRender(element);

    const pageEventDetail: SbbPaginatorPageEventDetails = pageEventSpy.lastCall.firstArg.detail;
    expect(pageEventSpy).to.have.been.calledOnce;
    expect(pageEventDetail.pageSize).to.be.equal(20);
    expect(pageEventDetail.pageIndex).to.be.equal(0);
    expect(pageEventDetail.previousPageIndex).to.be.equal(0);
    expect(pageEventDetail.length).to.be.equal(50);
  });

  it('the `page` event is not emitted when pageSize and pageIndex change programmatically', async () => {
    element.setAttribute('page-index', '4');
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(4);
    expect(pageEventSpy).to.have.been.calledOnce;

    element.setAttribute('page-size', '10');
    await waitForLitRender(element);
    expect(element.pageSize).to.be.equal(10);
    expect(pageEventSpy).to.have.been.calledTwice;
  });

  it('handles length change', () => {
    element.pageIndex = 9;
    element.length = 100;
    expect(element.pageIndex).to.be.equal(9);

    element.length = 10;
    expect(element.pageIndex).to.be.equal(1);

    element.length = -1;
    expect(element.length).to.be.equal(0);
    expect(element.pageIndex).to.be.equal(0);
  });

  it('handles pageSize change', () => {
    element.pageIndex = 9;
    expect(element.pageIndex).to.be.equal(9);

    element.pageSize = 1;
    expect(element.pageIndex).to.be.equal(45);

    element.pageSize = 10;
    expect(element.pageIndex).to.be.equal(4);

    element.pageSize = -1;
    expect(element.pageSize).to.be.equal(0);
    expect(element.pageIndex).to.be.equal(0);
  });

  it('handles pageIndex change', () => {
    element.pageIndex = 10;
    expect(element.pageIndex).to.be.equal(9);

    element.pageIndex = -1;
    expect(element.pageIndex).to.be.equal(0);

    element.pageIndex = 0;
    expect(element.pageIndex).to.be.equal(0);

    element.pageIndex = 5;
    expect(element.pageIndex).to.be.equal(5);
  });

  it('keyboard selection', async () => {
    // start sbb-mini-button-group
    await sendKeys({ press: tabKey });
    // end sbb-mini-button-group

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '0');

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '1');

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Space' });
    await waitForLitRender(element);
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '2');

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '3');

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '4');
    expect(
      element.shadowRoot!.querySelector('sbb-screen-reader-only')!.textContent?.trim(),
    ).to.be.equal('Page 5 selected.');

    const pageEventSpy = new EventSpy(SbbPaginatorElement.events.page);
    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Space' });
    await waitForLitRender(element);
    expect(pageEventSpy.count).to.be.equal(1);
  });

  it('should update items per page label on language change', async () => {
    element = await fixture(
      html`<sbb-paginator length="50" page-size="5" .pageSizeOptions=${[5, 10]}></sbb-paginator>`,
    );

    const comboBoxElement = element.shadowRoot!.querySelector('[role="combobox"]')!;

    expect(comboBoxElement).to.have.attribute('aria-label', 'Items per page');

    const lang = document.documentElement.getAttribute('lang')!;
    document.documentElement.setAttribute('lang', 'de');

    await waitForLitRender(element);
    // We have to wait a tick until the label sync can happen
    await aTimeout(0);

    expect(comboBoxElement).to.have.attribute('aria-label', 'Einträge pro Seite');

    // Restore language
    document.documentElement.setAttribute('lang', lang);
  });

  it('should handle nextPage() call', () => {
    element.nextPage();
    expect(element.pageIndex).to.be.equal(1);
  });

  it('should bound nextPage() call', () => {
    element.pageIndex = 9;
    element.nextPage();
    expect(element.pageIndex).to.be.equal(9);
  });

  it('should handle previousPage() call', () => {
    element.pageIndex = 1;

    element.previousPage();
    expect(element.pageIndex).to.be.equal(0);
  });

  it('should bound previousPage() call', () => {
    element.previousPage();
    expect(element.pageIndex).to.be.equal(0);
  });

  it('should handle firstPage() call', () => {
    element.pageIndex = 9;

    element.firstPage();
    expect(element.pageIndex).to.be.equal(0);
  });

  it('should handle lastPage() call', () => {
    element.lastPage();
    expect(element.pageIndex).to.be.equal(9);
  });

  it('should handle selectPage() call', () => {
    element.selectPage(2);
    expect(element.pageIndex).to.be.equal(2);
  });

  it('should bound selectPage() call', () => {
    element.selectPage(-1);
    expect(element.pageIndex).to.be.equal(0);

    element.selectPage(10);
    expect(element.pageIndex).to.be.equal(9);
  });

  it('should handle hasPreviousPage() call', () => {
    expect(element.hasPreviousPage()).to.be.false;

    element.selectPage(1);
    expect(element.hasPreviousPage()).to.be.true;
  });

  it('should handle hasPreviousPage() call if pageSize is 0', () => {
    element.pageSize = 0;
    expect(element.hasPreviousPage()).to.be.false;
  });

  it('should handle hasNextPage() call', () => {
    expect(element.hasNextPage()).to.be.true;

    element.selectPage(9);
    expect(element.hasNextPage()).to.be.false;
  });

  it('should handle hasNextPage() call if pageSize is 0', () => {
    element.pageSize = 0;
    expect(element.hasNextPage()).to.be.false;
  });

  it('should handle numberOfPages() call', () => {
    expect(element.numberOfPages()).to.be.equal(10);
  });

  it('should handle numberOfPages() call if pageSize is 0', () => {
    element.pageSize = 0;
    expect(element.numberOfPages()).to.be.equal(0);
  });

  it('should avoid emitting page event before updated', async () => {
    // Give some time to wait
    await aTimeout(30);
    expect(pageEventSpy).to.not.have.been.called;
  });
});
