import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { spy } from 'sinon';

import images from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition } from '../../core/testing.js';

import { SbbCarouselListElement } from './carousel-list.component.js';

import '../carousel-item/carousel-item.component.js';

describe('sbb-carousel-list', () => {
  let element: SbbCarouselListElement;
  const loadSpyFirst = spy();
  const loadSpySecond = spy();
  const loadSpyThird = spy();
  beforeEach(async () => {
    element = await fixture(html`
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
    `);
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
    expect(+elementHeight).to.be.equal(300);
    const elementWidth = getComputedStyle(element)
      .getPropertyValue('--sbb-carousel-list-width')
      .replaceAll('px', '');
    expect(+elementWidth).to.be.equal(400);
  });

  it('scroll events', async () => {
    const scrollContext: HTMLDivElement = element.shadowRoot!.querySelector('.sbb-carousel-list')!;
    const second = element.querySelector('#second')!;
    const third = element.querySelector('#third')!;
    const beforeShowSpySecond = new EventSpy('beforeshow', second);
    const beforeShowSpyThird = new EventSpy('beforeshow', third);
    const showSpySecond = new EventSpy('show', second);
    const showSpyThird = new EventSpy('show', third);

    // scroll to second image
    scrollContext.scrollBy({ left: 400 });
    await waitForCondition(() => loadSpySecond.called);
    expect(loadSpySecond).to.have.been.called;
    await beforeShowSpySecond.calledOnce();
    expect(beforeShowSpySecond.count).to.be.equal(1);
    await showSpySecond.calledOnce();
    expect(showSpySecond.count).to.be.equal(1);

    // scroll to third image
    scrollContext.scrollBy({ left: 400 });
    await waitForCondition(() => loadSpyThird.called);
    expect(loadSpyThird).to.have.been.called;
    await beforeShowSpyThird.calledOnce();
    expect(beforeShowSpyThird.count).to.be.equal(1);
    await showSpyThird.calledOnce();
    expect(showSpyThird.count).to.be.equal(1);

    // scroll back to second image
    scrollContext.scrollBy({ left: -400 });
    await beforeShowSpySecond.calledTimes(2);
    expect(beforeShowSpySecond.count).to.be.equal(2);
    await showSpySecond.calledTimes(2);
    expect(showSpySecond.count).to.be.equal(2);
  });
});
