import { assert, aTimeout, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForImageReady, waitForLitRender } from '../../core/testing.ts';
import type { SbbOverlayElement } from '../../overlay/overlay.component.ts';
import type { SbbCarouselElement } from '../carousel/carousel.component.ts';
import type {
  SbbCarouselItemElement,
  SbbCarouselItemEventDetail,
} from '../carousel-item/carousel-item.component.ts';

import { SbbCarouselListElement } from './carousel-list.component.ts';

import '../carousel-item/carousel-item.component.ts';
import '../carousel/carousel.component.ts';
import '../../overlay/overlay.component.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe('sbb-carousel-list', () => {
  let element: SbbCarouselListElement;
  let first: SbbCarouselItemElement, second: SbbCarouselItemElement, third: SbbCarouselItemElement;
  let beforeShowSpy: EventSpy<CustomEvent<SbbCarouselItemEventDetail>>;
  let showSpy: EventSpy<CustomEvent<SbbCarouselItemEventDetail>>;

  describe('basic', () => {
    beforeEach(async () => {
      await setViewport({ width: 1200, height: 800 });

      const root = await fixture(html`
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
      element = root.querySelector('sbb-carousel-list')!;
      first = element.querySelector('#first')!;
      second = element.querySelector('#second')!;
      third = element.querySelector('#third')!;
      beforeShowSpy = new EventSpy('beforeshow', element);
      showSpy = new EventSpy('show', element);

      await Promise.all(
        Array.from(element.querySelectorAll<HTMLImageElement>('img')).map((el) =>
          waitForImageReady(el),
        ),
      );
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
      await beforeShowSpy.calledTimes(1);
      expect(beforeShowSpy.count).to.be.equal(1);
      await showSpy.calledTimes(1);
      expect(showSpy.count).to.be.equal(1);

      // scroll to second image
      element.scrollBy({ left: 320 });
      await beforeShowSpy.calledTimes(2);
      expect(beforeShowSpy.count).to.be.equal(2);
      await showSpy.calledTimes(2);
      expect(showSpy.count).to.be.equal(2);

      // scroll to third image
      element.scrollBy({ left: 320 });
      await beforeShowSpy.calledTimes(3);
      expect(beforeShowSpy.count).to.be.equal(3);
      await showSpy.calledTimes(3);
      expect(showSpy.count).to.be.equal(3);

      // scroll back to second image
      element.scrollBy({ left: -320 });
      await beforeShowSpy.calledTimes(4);
      expect(beforeShowSpy.count).to.be.equal(4);
      await showSpy.calledTimes(4);
      expect(showSpy.count).to.be.equal(4);
    });

    it('should handle disconnection', async () => {
      await showSpy.calledTimes(1);

      const carousel = element.parentElement! as SbbCarouselElement;

      element.remove();
      await waitForLitRender(element);

      carousel.appendChild(element);
      await waitForLitRender(element);

      // We need a timeout until the IntersectionObserver is living in Safari
      await aTimeout(30);

      // Scroll event should still be detected after reconnection
      element.scrollBy({ left: 320 });
      await aTimeout(30);
      await beforeShowSpy.calledTimes(2);
      expect(beforeShowSpy.count).to.be.equal(2);
      await showSpy.calledTimes(2);
      expect(showSpy.count).to.be.equal(2);
    });
  });

  it('detects size when later becoming visible', async () => {
    const carousel = await fixture(html`
      <sbb-carousel style="display:none">
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

    element = carousel.querySelector('sbb-carousel-list')!;

    beforeShowSpy = new EventSpy('beforeshow', element);
    showSpy = new EventSpy('show', element);

    expect(getComputedStyle(element).getPropertyValue('height')).to.be.equal('auto');
    expect(getComputedStyle(element).getPropertyValue('--sbb-carousel-list-width')).to.be.equal('');

    carousel.style.display = 'block';

    await beforeShowSpy.calledTimes(1);
    expect(beforeShowSpy.count).to.be.equal(1);

    await showSpy.calledTimes(1);
    expect(showSpy.count).to.be.equal(1);

    expect(getComputedStyle(element).getPropertyValue('height')).to.be.equal('180px');
    expect(getComputedStyle(element).getPropertyValue('width')).to.be.equal('320px');
  });

  it('sends show and beforeshow events with customized dimension', async () => {
    const carousel = await fixture(html`
      <sbb-carousel style="width: 320px;height:180px">
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

    element = carousel.querySelector('sbb-carousel-list')!;

    beforeShowSpy = new EventSpy('beforeshow', element);
    showSpy = new EventSpy('show', element);

    await beforeShowSpy.calledTimes(1);
    expect(beforeShowSpy.count).to.be.equal(1);

    await showSpy.calledTimes(1);
    expect(showSpy.count).to.be.equal(1);

    expect(getComputedStyle(element).getPropertyValue('--sbb-carousel-list-width')).to.be.equal(
      '320px',
    );
    expect(getComputedStyle(element).getPropertyValue('height')).to.be.equal('180px');
    expect(getComputedStyle(element).getPropertyValue('width')).to.be.equal('320px');
  });

  it('detects size when later becoming visible in overlay', async () => {
    const overlay: SbbOverlayElement = await fixture(html`
      <sbb-overlay>
        <sbb-carousel>
          <sbb-carousel-list style="width:320px;height:180px">
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
      </sbb-overlay>
    `);

    element = overlay.querySelector('sbb-carousel-list')!;

    beforeShowSpy = new EventSpy('beforeshow', element);
    showSpy = new EventSpy('show', element);

    overlay.open();
    await waitForLitRender(overlay);

    await beforeShowSpy.calledTimes(1);
    expect(beforeShowSpy.count).to.be.equal(1);

    await showSpy.calledTimes(1);
    expect(showSpy.count).to.be.equal(1);
  });

  it('detects size when later becoming visible in overlay with automatic dimension detection', async () => {
    const overlay: SbbOverlayElement = await fixture(html`
      <sbb-overlay>
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
      </sbb-overlay>
    `);

    element = overlay.querySelector('sbb-carousel-list')!;

    beforeShowSpy = new EventSpy('beforeshow', element);
    showSpy = new EventSpy('show', element);

    expect(getComputedStyle(element).getPropertyValue('height')).to.be.equal('auto');
    expect(getComputedStyle(element).getPropertyValue('--sbb-carousel-list-width')).to.be.equal('');

    overlay.open();
    await waitForLitRender(overlay);

    await beforeShowSpy.calledTimes(1);
    expect(beforeShowSpy.count).to.be.equal(1);

    await showSpy.calledTimes(1);
    expect(showSpy.count).to.be.equal(1);

    expect(getComputedStyle(element).getPropertyValue('height')).to.be.equal('180px');
    expect(getComputedStyle(element).getPropertyValue('width')).to.be.equal('320px');
    expect(getComputedStyle(element).getPropertyValue('--sbb-carousel-list-height')).to.be.equal(
      '180px',
    );
    expect(getComputedStyle(element).getPropertyValue('--sbb-carousel-list-width')).to.be.equal(
      '320px',
    );
  });
});
