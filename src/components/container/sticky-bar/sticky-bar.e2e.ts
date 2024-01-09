import { assert, fixture, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForCondition, waitForLitRender } from '../../core/testing';
import { SbbContainerElement } from '../container';

import { SbbStickyBarElement } from './sticky-bar';

describe('sbb-sticky-bar', () => {
  let container: SbbContainerElement;
  let stickyBar: SbbStickyBarElement;
  const getSettled = (): boolean => {
    return stickyBar.hasAttribute('data-settled');
  };

  beforeEach(async () => {
    await setViewport({ width: 320, height: 600 });
    container = await fixture(html`
      <sbb-container>
        ${[...Array(10).keys()].map(
          (value) =>
            html` <div>
              <p>Situation ${value}</p>
            </div>`,
        )}
        <sbb-sticky-bar></sbb-sticky-bar>
      </sbb-container>
    `);
    stickyBar = container.querySelector('sbb-sticky-bar');
  });

  it('renders', async () => {
    assert.instanceOf(stickyBar, SbbStickyBarElement);
  });

  it('settles when content is not long enough', async () => {
    await setViewport({ width: 320, height: 600 });
    container = await fixture(html`
      <sbb-container>
        <button>Container button</button>
        <sbb-sticky-bar>
          <button>Sticky bar button</button>
        </sbb-sticky-bar>
      </sbb-container>
    `);
    stickyBar = container.querySelector('sbb-sticky-bar');

    await waitForCondition(async () => getSettled());

    expect(getSettled()).to.equal(true);
  });

  it('settles when scrolling to bottom', async () => {
    stickyBar = container.querySelector('sbb-sticky-bar');
    expect(getSettled()).to.equal(false);

    window.scrollTo(0, 400);

    await waitForCondition(async () => getSettled());

    expect(getSettled()).to.equal(true);
  });

  it('renders with expanded layout', async () => {
    container = await fixture(html`
      <sbb-container expanded>
        <button>Container button</button>
        <sbb-sticky-bar>
          <button>Sticky bar button</button>
        </sbb-sticky-bar>
      </sbb-container>
    `);
    stickyBar = container.querySelector('sbb-sticky-bar');

    expect(stickyBar).to.have.attribute('data-expanded');
  });

  it('expands the sticky-bar when container is expanded', async () => {
    container.expanded = true;

    await waitForLitRender(container);

    expect(stickyBar).to.have.attribute('data-expanded');
  });
});
