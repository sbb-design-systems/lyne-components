import { assert, expect, fixture } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForCondition, waitForLitRender } from '../../core/testing';
import { SbbContainerElement } from '../container';

import { SbbStickyBarElement } from './sticky-bar';


describe('sbb-sticky-bar', () => {
  let container: SbbContainerElement;
  let stickyBar: SbbStickyBarElement;
  const getIsSticking = (): boolean => {
    return stickyBar.hasAttribute('data-sticking');
  };

  beforeEach(async () => {
    await setViewport({ width: 320, height: 500 });
    container = await fixture(html`
      <sbb-container>
        ${[...Array(15).keys()].map(
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

  it('stops sticking when scrolling to bottom', async () => {
    await waitForCondition(async () => getIsSticking());
    expect(getIsSticking()).to.equal(true);

    window.scrollTo(0, 400);

    await waitForCondition(async () => !getIsSticking());

    expect(getIsSticking()).to.equal(false);
  });

  it('is settled when content is not long enough', async () => {
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

    await waitForCondition(async () => !getIsSticking());

    expect(getIsSticking()).to.equal(false);
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
