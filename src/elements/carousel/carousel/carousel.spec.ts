import { assert, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbMiniButtonElement } from '../../button.js';
import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForImageReady } from '../../core/testing.js';
import type { SbbCompactPaginatorElement } from '../../paginator.js';
import type {
  SbbCarouselItemElement,
  SbbCarouselItemEventDetail,
} from '../carousel-item/carousel-item.component.js';

import { SbbCarouselElement } from './carousel.component.js';

import '../carousel-list/carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../paginator.js';

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

  it('gives paginator priority over show event', async () => {
    paginator.nextPage();
    paginator.nextPage();
    await showSpy.calledTimes(2);

    expect(paginator.pageIndex).to.be.equal(2);

    // Scroll event afterward should still update paginator
    element
      .querySelector('sbb-carousel-list')
      ?.scrollTo({ left: element.querySelector<SbbCarouselItemElement>('#second')!.offsetLeft });

    await waitForCondition(() => paginator.pageIndex === 1);
    expect(paginator.pageIndex).to.be.equal(1);
  });
});
