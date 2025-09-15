import { assert, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { spy } from 'sinon';

import images from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition } from '../../core/testing.js';
import type {
  SbbCarouselItemElement,
  SbbCarouselItemEventDetail,
} from '../carousel-item/carousel-item.component.js';

import { SbbCarouselListElement } from './carousel-list.component.js';

import '../carousel-item/carousel-item.component.js';

describe('sbb-carousel-list', () => {
  let element: SbbCarouselListElement;
  const loadSpyFirst = spy();
  const loadSpySecond = spy();
  const loadSpyThird = spy();
  let first: SbbCarouselItemElement, second: SbbCarouselItemElement, third: SbbCarouselItemElement;
  let beforeShowSpy: EventSpy<CustomEvent<SbbCarouselItemEventDetail>>;
  let showSpy: EventSpy<CustomEvent<SbbCarouselItemEventDetail>>;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-carousel-list>
        <sbb-carousel-item id="first">
          <img src=${images[0]} alt="SBB image" height="180" width="320" @load=${(e: Event) => loadSpyFirst(e)}></img>
        </sbb-carousel-item>
        <sbb-carousel-item id="second">
          <img src=${images[1]} alt="SBB image" height="180" width="320" @load=${(e: Event) => loadSpySecond(e)}></img>
        </sbb-carousel-item>
        <sbb-carousel-item id="third">
          <img src=${images[2]} alt="SBB image" height="180" width="320" @load=${(e: Event) => loadSpyThird(e)}></img>
        </sbb-carousel-item>
      </sbb-carousel-list>
    `);
    first = element.querySelector('#first')!;
    second = element.querySelector('#second')!;
    third = element.querySelector('#third')!;
    beforeShowSpy = new EventSpy('beforeshow', element);
    showSpy = new EventSpy('show', element);
    await waitForCondition(() => loadSpyFirst.called);
    expect(loadSpyFirst).to.have.been.called;
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCarouselListElement);
  });

  it('get dimensions from the first item', async () => {
    const elementHeight = getComputedStyle(element)
      .getPropertyValue('--sbb-carousel-list-height')
      .replaceAll('px', '');
    expect(+elementHeight).to.be.equal(180);
    const elementWidth = getComputedStyle(element)
      .getPropertyValue('--sbb-carousel-list-width')
      .replaceAll('px', '');
    expect(+elementWidth).to.be.equal(320);
  });

  it('sets accessibility-label on items', async () => {
    expect(first.ariaLabel).to.be.equal('1 of 3');
    expect(second.ariaLabel).to.be.equal('2 of 3');
    expect(third.ariaLabel).to.be.equal('3 of 3');
  });

  it('scroll events', async () => {
    await setViewport({ width: 1200, height: 800 });
    await beforeShowSpy.calledTimes(1);
    expect(beforeShowSpy.count).to.be.equal(1);
    await showSpy.calledTimes(1);
    expect(showSpy.count).to.be.equal(1);

    // scroll to second image
    element.scrollBy({ left: 320 });
    await waitForCondition(() => loadSpySecond.called);
    expect(loadSpySecond).to.have.been.called;
    await beforeShowSpy.calledTimes(2);
    expect(beforeShowSpy.count).to.be.equal(2);
    await showSpy.calledTimes(2);
    expect(showSpy.count).to.be.equal(2);

    // scroll to third image
    element.scrollBy({ left: 320 });
    await waitForCondition(() => loadSpyThird.called);
    expect(loadSpyThird).to.have.been.called;
    await beforeShowSpy.calledTimes(3);
    expect(beforeShowSpy.count).to.be.equal(3);
    await showSpy.calledTimes(3);
    expect(showSpy.count).to.be.equal(3);

    // scroll back to second image
    element.scrollBy({ left: -320 });
    await waitForCondition(() => loadSpyFirst.called);
    expect(loadSpyFirst).to.have.been.called;
    await beforeShowSpy.calledTimes(4);
    expect(beforeShowSpy.count).to.be.equal(4);
    await showSpy.calledTimes(4);
    expect(showSpy.count).to.be.equal(4);
  });
});
