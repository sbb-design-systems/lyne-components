import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { spy } from 'sinon';

import images from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';
import { waitForCondition } from '../../core/testing.js';
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
            <img src=${images[0]} alt="SBB image" height="180" width="320" @load=${(e: Event) => loadSpyFirst(e)}></img>
          </sbb-carousel-item>
          <sbb-carousel-item id="second">
            <img src=${images[1]} alt="SBB image" height="180" width="320" @load=${(e: Event) => loadSpySecond(e)}></img>
          </sbb-carousel-item>
          <sbb-carousel-item id="third">
            <img src=${images[2]} alt="SBB image" height="180" width="320" @load=${(e: Event) => loadSpyThird(e)}></img>
          </sbb-carousel-item>
        </sbb-carousel-list>
      </sbb-carousel>
    `);
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
});
