import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbMiniButtonElement } from '../button/mini-button.js';
import { tabKey } from '../core/testing/private/keys.js';
import { fixture } from '../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../core/testing.js';

import { SbbPaginatorElement } from './paginator.js';

describe('sbb-paginator', () => {
  let element: SbbPaginatorElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-paginator length="50" page-size="5"></sbb-paginator>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbPaginatorElement);
  });

  it('change pages via buttons', async () => {
    const pageChangedEventSpy = new EventSpy(SbbPaginatorElement.events.pageChanged);
    const goToPrev: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-prev-page',
    )!;
    const goToNext: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    expect(goToPrev).to.have.attribute('disabled');
    goToPrev.click();
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(0);

    expect(goToNext).not.to.have.attribute('disabled');
    goToNext.click();
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(1);
    expect(element.pageIndex).to.be.equal(1);
    expect(goToPrev).not.to.have.attribute('disabled');
    expect(goToNext).not.to.have.attribute('disabled');

    goToPrev.click();
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(2);
    expect(element.pageIndex).to.be.equal(0);
  });

  it('changes to the correct selected page when pageSize changes', async () => {
    // go to page 5 / pageIndex=4, which includes items 21-25
    const pageChangedEventSpy = new EventSpy(SbbPaginatorElement.events.pageChanged);
    element.setAttribute('page-index', '4');
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(1);
    let selectedElement = element
      .shadowRoot!.querySelector('[data-selected]')!
      .querySelector('span')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('4');

    // switching to pageSize=10, item 21 should be on page 3 / pageIndex=2
    element.setAttribute('page-size', '10');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('[data-selected]')!.querySelector('span')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('2');

    // go to page 4 / pageIndex=3, which now includes items 31-40
    element.setAttribute('page-index', '3');
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(3);
    selectedElement = element.shadowRoot!.querySelector('[data-selected]')!.querySelector('span')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('3');

    // switching to pageSize=2, item 31 should be on page 16 / pageIndex=15
    element.setAttribute('page-size', '2');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('[data-selected]')!.querySelector('span')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('15');
  });

  it('emits on click', async () => {
    const pageChangedEventSpy = new EventSpy(SbbPaginatorElement.events.pageChanged);
    const pages = element.shadowRoot!.querySelectorAll('.sbb-paginator__page--number-item');
    pages[2].dispatchEvent(new Event('click'));
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(1);
  });

  it('keyboard selection', async () => {
    const pageChangedEventSpy = new EventSpy(SbbPaginatorElement.events.pageChanged);
    await sendKeys({ press: tabKey });
    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '1',
    );
    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '2',
    );
    await sendKeys({ press: 'Space' });
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(1);
  });
});
