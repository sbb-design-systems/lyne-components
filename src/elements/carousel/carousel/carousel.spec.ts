import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { spy } from 'sinon';

import type { SbbMiniButtonElement } from '../../button.js';
import images from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition } from '../../core/testing.js';
import type { SbbCompactPaginatorElement } from '../../paginator.js';

import { SbbCarouselElement } from './carousel.component.js';

import '../carousel-list/carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../paginator.js';

describe('sbb-carousel', () => {
  let element: SbbCarouselElement;
  const loadSpyFirst = spy();
  const loadSpySecond = spy();
  const loadSpyThird = spy();
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
        <sbb-compact-paginator></sbb-compact-paginator>
      </sbb-carousel>
    `);
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
    const paginator: SbbCompactPaginatorElement = element.querySelector('sbb-compact-paginator')!;
    expect(paginator).is.not.null;
    const goToPrev: SbbMiniButtonElement = paginator.shadowRoot!.querySelector(
      '#sbb-paginator-prev-page',
    )!;
    const goToNext: SbbMiniButtonElement = paginator.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;
    const second = element.querySelector('#second')!;
    const third = element.querySelector('#third')!;
    const beforeShowSpySecond = new EventSpy('beforeshow', second);
    const beforeShowSpyThird = new EventSpy('beforeshow', third);
    const showSpySecond = new EventSpy('show', second);
    const showSpyThird = new EventSpy('show', third);

    await goToNext.click();
    await waitForCondition(() => loadSpySecond.called);
    expect(loadSpySecond).to.have.been.called;
    await beforeShowSpySecond.calledOnce();
    expect(beforeShowSpySecond.count).to.be.equal(1);
    await showSpySecond.calledOnce();
    expect(showSpySecond.count).to.be.equal(1);

    await goToNext.click();
    await waitForCondition(() => loadSpyThird.called);
    expect(loadSpyThird).to.have.been.called;
    await beforeShowSpyThird.calledOnce();
    expect(beforeShowSpyThird.count).to.be.equal(1);
    await showSpyThird.calledOnce();
    expect(showSpyThird.count).to.be.equal(1);

    await goToPrev.click();
    await beforeShowSpySecond.calledTimes(2);
    expect(beforeShowSpySecond.count).to.be.equal(2);
    await showSpySecond.calledTimes(2);
    expect(showSpySecond.count).to.be.equal(2);
  });
});
