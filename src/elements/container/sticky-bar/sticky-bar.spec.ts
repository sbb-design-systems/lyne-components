import { assert, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';
import type { SbbContainerElement } from '../container.ts';

import { SbbStickyBarElement } from './sticky-bar.component.ts';

import '../container.ts';

describe(`sbb-sticky-bar`, () => {
  let container: SbbContainerElement;
  let stickyBar: SbbStickyBarElement;
  let beforeStickSpy: EventSpy<Event>;
  let stickSpy: EventSpy<Event>;
  let beforeUnstickSpy: EventSpy<Event>;
  let unstickSpy: EventSpy<Event>;

  const isSticking = (): boolean => stickyBar.matches(':state(sticking)');

  describe('sticky', () => {
    beforeEach(async () => {
      await setViewport({ width: 320, height: 500 });

      container = await fixture(html`
        <sbb-container>
          <div><p>Situation 1</p></div>
          <div><p>Situation 2</p></div>
          <div><p>Situation 3</p></div>
          <div><p>Situation 4</p></div>
          <div><p>Situation 5</p></div>
          <div><p>Situation 6</p></div>
          <div><p>Situation 7</p></div>
          <div><p>Situation 8</p></div>
          <div><p>Situation 9</p></div>
          <div><p>Situation 10</p></div>
          <div><p>Situation 11</p></div>
          <div><p>Situation 12</p></div>
          <sbb-sticky-bar></sbb-sticky-bar>
        </sbb-container>
      `);
      stickyBar = container.querySelector('sbb-sticky-bar')!;
      beforeStickSpy = new EventSpy(SbbStickyBarElement.events.beforestick, stickyBar);
      stickSpy = new EventSpy(SbbStickyBarElement.events.stick, stickyBar);
      beforeUnstickSpy = new EventSpy(SbbStickyBarElement.events.beforeunstick, stickyBar);
      unstickSpy = new EventSpy(SbbStickyBarElement.events.unstick, stickyBar);
    });

    it('renders', async () => {
      assert.instanceOf(stickyBar, SbbStickyBarElement);
    });

    it('stops sticking when scrolling to bottom', async () => {
      expect(isSticking()).to.equal(true);
      expect(stickyBar).to.match(':state(slide-vertically)');

      window.scrollTo(0, 400);

      await waitForCondition(async () => !isSticking());
      await waitForLitRender(container);

      expect(isSticking()).to.equal(false);
      expect(stickyBar).not.to.match(':state(slide-vertically)');
    });

    it('expands the sticky-bar when container is expanded', async () => {
      container.expanded = true;

      await waitForLitRender(container);

      expect(stickyBar).to.match(':state(expanded)');
    });

    it('gets unsticky when calling unstick()', async () => {
      stickyBar.unstick();

      await beforeUnstickSpy.calledOnce();
      await unstickSpy.calledOnce();

      expect(beforeUnstickSpy.count).to.be.equal(1);
      expect(unstickSpy.count).to.be.equal(1);
    });

    it('doesnt get unsticky when prevented', async () => {
      stickyBar.addEventListener(
        SbbStickyBarElement.events.beforeunstick,
        (e) => e.preventDefault(),
        { once: true },
      );
      stickyBar.unstick();

      await beforeUnstickSpy.calledOnce();

      expect(stickyBar).to.match(':state(state-sticky)');
      expect(beforeUnstickSpy.count).to.be.equal(1);
      expect(unstickSpy.count).to.be.equal(0);
    });

    it('send events when sticky but not currently sticking and calling unstick()', async () => {
      window.scrollTo(0, 400);
      await waitForCondition(async () => !isSticking());

      stickyBar.unstick();

      await beforeUnstickSpy.calledOnce();
      await unstickSpy.calledOnce();

      expect(beforeUnstickSpy.count).to.be.equal(1);
      expect(unstickSpy.count).to.be.equal(1);
    });

    it('gets sticky when calling stick()', async () => {
      stickyBar.unstick();
      await unstickSpy.calledOnce();

      stickyBar.stick();

      await beforeStickSpy.calledOnce();
      await stickSpy.calledOnce();

      expect(beforeStickSpy.count).to.be.equal(1);
      expect(stickSpy.count).to.be.equal(1);
    });

    it('doesnt get sticky when prevented', async () => {
      stickyBar.unstick();
      await unstickSpy.calledOnce();

      stickyBar.addEventListener(
        SbbStickyBarElement.events.beforestick,
        (e) => e.preventDefault(),
        {
          once: true,
        },
      );
      stickyBar.stick();

      await beforeStickSpy.calledOnce();

      expect(stickyBar).to.match(':state(state-unsticky)');
      expect(beforeStickSpy.count).to.be.equal(1);
      expect(stickSpy.count).to.be.equal(0);
    });

    it('works with non-zero animation duration', async () => {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      stickyBar.style.setProperty('--sbb-sticky-bar-slide-vertically-animation-duration', '1ms');

      stickyBar.unstick();
      await unstickSpy.calledOnce();

      stickyBar.stick();

      await beforeStickSpy.calledOnce();
      await stickSpy.calledOnce();

      expect(beforeStickSpy.count).to.be.equal(1);
      expect(stickSpy.count).to.be.equal(1);
    });
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
    stickyBar = container.querySelector('sbb-sticky-bar')!;

    expect(isSticking()).to.equal(false);
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
    stickyBar = container.querySelector('sbb-sticky-bar')!;

    expect(stickyBar).to.match(':state(expanded)');
  });
});
