import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { spy } from 'sinon';

import type { SbbMiniButtonElement } from '../../button.js';
import images from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition } from '../../core/testing.js';
import type { SbbCompactPaginatorElement } from '../../paginator.js';
import type { SbbCarouselItemEventDetail } from '../carousel-item/carousel-item.component.js';

import { SbbCarouselElement } from './carousel.component.js';

import '../carousel-list/carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../paginator.js';

describe('sbb-carousel', () => {
  let element: SbbCarouselElement;
  const loadSpyFirst = spy();
  const loadSpySecond = spy();
  const loadSpyThird = spy();
  let beforeShowSpy: EventSpy<CustomEvent<SbbCarouselItemEventDetail>>;
  let showSpy: EventSpy<CustomEvent<SbbCarouselItemEventDetail>>;
  beforeEach(async () => {
    element = await fixture(html`
      <sbb-carousel>
        <sbb-carousel-list>
          <sbb-carousel-item id="first">
            <img src=${images[0]} alt="SBB image" height="300" width="400" @load=${(e: Event) => loadSpyFirst(e)}></img>
          </sbb-carousel-item>
          <sbb-carousel-item id="second">
            <img src=${images[1]} alt="SBB image" height="300" width="400" @load=${(e: Event) => loadSpySecond(e)}></img>
          </sbb-carousel-item>
          <sbb-carousel-item id="third">
            <img src=${images[2]} alt="SBB image" height="300" width="400" @load=${(e: Event) => loadSpyThird(e)}></img>
          </sbb-carousel-item>
        </sbb-carousel-list>
      </sbb-carousel>
    `);
    beforeShowSpy = new EventSpy('beforeshow', element);
    showSpy = new EventSpy('show', element);
    element.appendChild(document.createElement('sbb-compact-paginator'));
    await waitForCondition(() => loadSpyFirst.called);
    expect(loadSpyFirst).to.have.been.called;
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
    await beforeShowSpy.calledTimes(1);
    expect(beforeShowSpy.count).to.be.equal(1);
    await showSpy.calledTimes(1);
    expect(showSpy.count).to.be.equal(1);

    const paginator: SbbCompactPaginatorElement = element.querySelector('sbb-compact-paginator')!;
    expect(paginator).is.not.null;
    const goToPrev: SbbMiniButtonElement = paginator.shadowRoot!.querySelector(
      '#sbb-paginator-prev-page',
    )!;
    const goToNext: SbbMiniButtonElement = paginator.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    await goToNext.click();
    await waitForCondition(() => loadSpySecond.called);
    expect(loadSpySecond).to.have.been.called;
    await beforeShowSpy.calledTimes(2);
    expect(beforeShowSpy.count).to.be.equal(2);
    await showSpy.calledTimes(2);
    expect(showSpy.count).to.be.equal(2);

    await goToNext.click();
    await waitForCondition(() => loadSpyThird.called);
    expect(loadSpyThird).to.have.been.called;
    await beforeShowSpy.calledTimes(3);
    expect(beforeShowSpy.count).to.be.equal(3);
    await showSpy.calledTimes(3);
    expect(showSpy.count).to.be.equal(3);

    await goToPrev.click();
    await waitForCondition(() => loadSpyFirst.called);
    expect(loadSpyFirst).to.have.been.called;
    await beforeShowSpy.calledTimes(4);
    expect(beforeShowSpy.count).to.be.equal(4);
    await showSpy.calledTimes(4);
    expect(showSpy.count).to.be.equal(4);
  });
});
