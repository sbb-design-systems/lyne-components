import { assert, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbMiniButtonElement } from '../../button.ts';
import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForImageReady, waitForLitRender } from '../../core/testing.ts';
import type { SbbCompactPaginatorElement } from '../../paginator.ts';
import { type SbbCarouselItemEventDetail } from '../carousel-item/carousel-item.component.ts';

import { SbbCarouselElement } from './carousel.component.ts';

import '../carousel-list/carousel-list.component.ts';
import '../carousel-item/carousel-item.component.ts';
import '../../paginator.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe('sbb-carousel', () => {
  let element: SbbCarouselElement;
  let beforeShowSpy: EventSpy<CustomEvent<SbbCarouselItemEventDetail>>;
  let showSpy: EventSpy<CustomEvent<SbbCarouselItemEventDetail>>;
  let paginator: SbbCompactPaginatorElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-carousel>
        <sbb-carousel-list>
          <sbb-carousel-item id="first">
            <img src=${imageUrl} alt="SBB image" height="180" width="320" />
          </sbb-carousel-item>
          <sbb-carousel-item id="second">
            <img src=${imageUrl} alt="SBB image" height="180" width="320" />
          </sbb-carousel-item>
          <sbb-carousel-item id="third">
            <img src=${imageUrl} alt="SBB image" height="180" width="320" />
          </sbb-carousel-item>
        </sbb-carousel-list>
      </sbb-carousel>
    `);

    await Promise.all(
      Array.from(element.querySelectorAll<HTMLImageElement>('img')).map((el) =>
        waitForImageReady(el),
      ),
    );

    beforeShowSpy = new EventSpy('beforeshow', element);
    showSpy = new EventSpy('show', element);
    element.appendChild(document.createElement('sbb-compact-paginator'));
    paginator = element.querySelector('sbb-compact-paginator')!;
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCarouselElement);
  });

  it('paginator should be configured', async () => {
    const paginator: SbbCompactPaginatorElement = element.querySelector('sbb-compact-paginator')!;
    expect(paginator).is.not.null;
    expect(paginator.pageSize).is.equal(1);
    expect(paginator.length).is.equal(3);
  });

  it('paginator should trigger a scroll', async () => {
    await setViewport({ width: 1200, height: 800 });
    await beforeShowSpy.calledTimes(1);
    expect(beforeShowSpy.count).to.be.equal(1);
    await showSpy.calledTimes(1);
    expect(showSpy.count).to.be.equal(1);

    expect(paginator).is.not.null;
    const goToPrev: SbbMiniButtonElement = paginator.shadowRoot!.querySelector(
      '#sbb-paginator-prev-page',
    )!;
    const goToNext: SbbMiniButtonElement = paginator.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    await goToNext.click();

    await beforeShowSpy.calledTimes(2);
    expect(beforeShowSpy.count).to.be.equal(2);
    await showSpy.calledTimes(2);
    expect(showSpy.count).to.be.equal(2);

    await goToNext.click();
    await beforeShowSpy.calledTimes(3);
    expect(beforeShowSpy.count).to.be.equal(3);
    await showSpy.calledTimes(3);
    expect(showSpy.count).to.be.equal(3);

    await goToPrev.click();
    await beforeShowSpy.calledTimes(4);
    expect(beforeShowSpy.count).to.be.equal(4);
    await showSpy.calledTimes(4);
    expect(showSpy.count).to.be.equal(4);
  });

  it('paginator should trigger a scroll after DOM re-connection', async () => {
    const parent = element.parentElement!;

    await setViewport({ width: 1200, height: 800 });

    await beforeShowSpy.calledTimes(1);
    await showSpy.calledTimes(1);

    element.remove();
    await waitForLitRender(element);
    parent.appendChild(element);
    await waitForLitRender(element);

    await beforeShowSpy.calledTimes(2);
    await showSpy.calledTimes(2);

    const goToNext: SbbMiniButtonElement = paginator.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    await goToNext.click();

    await beforeShowSpy.calledTimes(3);
    expect(beforeShowSpy.count).to.be.equal(3);
    await showSpy.calledTimes(3);
    expect(showSpy.count).to.be.equal(3);
  });

  it('paginator should trigger a scroll with offset container', async () => {
    const goToNext: SbbMiniButtonElement = paginator.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    await setViewport({ width: 1200, height: 800 });
    element.style.marginLeft = '500px';
    await showSpy.calledTimes(1);

    await goToNext.click();
    await showSpy.calledTimes(2);

    await goToNext.click();
    await showSpy.calledTimes(3);
    expect(showSpy.count).to.be.equal(3);
  });

  it('paginator should be updated after scrolling', async () => {
    const carouselList = element.querySelector('sbb-carousel-list')!;

    await setViewport({ width: 1200, height: 800 });

    await beforeShowSpy.calledTimes(1);
    await showSpy.calledTimes(1);

    // scroll to second image
    carouselList.scrollBy({ left: 320 });
    await beforeShowSpy.calledTimes(2);
    expect(beforeShowSpy.count).to.be.equal(2);
    await showSpy.calledTimes(2);
    expect(showSpy.count).to.be.equal(2);

    expect(paginator.pageIndex).to.be.equal(1);

    // scroll to second image
    carouselList.scrollBy({ left: 320 });
    await beforeShowSpy.calledTimes(3);
    expect(beforeShowSpy.count).to.be.equal(3);
    await showSpy.calledTimes(3);
    expect(showSpy.count).to.be.equal(3);

    expect(paginator.pageIndex).to.be.equal(2);
  });

  it('paginator should be updated after scrolling after DOM re-connection', async () => {
    const carouselList = element.querySelector('sbb-carousel-list')!;
    const parent = element.parentElement!;

    await setViewport({ width: 1200, height: 800 });

    await beforeShowSpy.calledTimes(1);
    await showSpy.calledTimes(1);

    element.remove();
    await waitForLitRender(element);
    parent.appendChild(element);
    await waitForLitRender(element);

    await beforeShowSpy.calledTimes(2);
    await showSpy.calledTimes(2);

    // scroll to second image
    carouselList.scrollBy({ left: 320 });
    await beforeShowSpy.calledTimes(3);
    expect(beforeShowSpy.count).to.be.equal(3);
    await showSpy.calledTimes(3);
    expect(showSpy.count).to.be.equal(3);
    expect(paginator.pageIndex).to.be.equal(1);
  });
});
