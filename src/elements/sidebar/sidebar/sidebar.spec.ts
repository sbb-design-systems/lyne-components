import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import { fixture, tabKey } from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';
import type { SbbSidebarCloseButtonElement } from '../sidebar-close-button.ts';
import type { SbbSidebarContainerElement } from '../sidebar-container.ts';

import { SbbSidebarElement } from './sidebar.component.ts';

import '../sidebar-close-button.ts';
import '../sidebar-container.ts';
import '../sidebar-content.ts';
import '../sidebar-title.ts';

describe('sbb-sidebar', () => {
  let container: SbbSidebarContainerElement,
    element: SbbSidebarElement,
    closeButton: SbbSidebarCloseButtonElement,
    scrollContext: HTMLDivElement;

  beforeEach(async () => {
    container = await fixture(
      html`<sbb-sidebar-container>
        <sbb-sidebar>
          <sbb-sidebar-title>Title</sbb-sidebar-title>
          <sbb-sidebar-close-button></sbb-sidebar-close-button>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
        </sbb-sidebar>
        <sbb-sidebar-content>
          Content
          <button id="b1">Focusable element</button>
          <button id="b2">Focusable element 2</button>
        </sbb-sidebar-content>
      </sbb-sidebar-container>`,
    );

    // We run the tests in a defined size where we have enough space to open the sidebar in mode side.
    await setViewport({ width: 800, height: 600 });

    element = container.querySelector('sbb-sidebar')!;
    closeButton = container.querySelector('sbb-sidebar-close-button')!;
    scrollContext = element.shadowRoot!.querySelector('.sbb-sidebar-content-section')!;
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarElement);
  });

  describe('properties', () => {
    it('should return container', () => {
      expect(element.container).to.be.equal(container);
    });

    it('should coerce position property', async () => {
      expect(element.position, 'default position').to.be.equal('start');

      element.position = 'end';
      await waitForLitRender(element);

      expect(element.position, 'end position').to.be.equal('end');
      expect(element).to.have.attribute('position', 'end');

      element.position = 'inexisting' as 'start';
      await waitForLitRender(element);

      expect(element.position, 'fallback to default').to.be.equal('start');
      expect(element).to.have.attribute('position', 'start');

      element.position = null as unknown as 'start';
      await waitForLitRender(element);

      expect(element.position, 'fallback null to default').to.be.equal('start');
      expect(element).to.have.attribute('position', 'start');
    });

    it('should coerce position attribute', () => {
      expect(element.position, 'default position').to.be.equal('start');

      element.setAttribute('position', 'end');
      expect(element.position, 'end position').to.be.equal('end');

      element.setAttribute('position', 'inexisting');
      expect(element.position, 'fallback to default').to.be.equal('start');

      element.setAttribute('position', '');
      expect(element.position, 'fallback null to default').to.be.equal('start');
    });

    it('should change color property', async () => {
      expect(element.color, 'default color').to.be.equal('white');

      element.color = 'milk';
      await waitForLitRender(element);

      expect(element.color, 'milk color').to.be.equal('milk');
      expect(element).to.have.attribute('color', 'milk');
    });

    it('should change color attribute', () => {
      expect(element.color, 'default color').to.be.equal('white');

      element.setAttribute('color', 'milk');
      expect(element.color, 'milk color').to.be.equal('milk');
    });

    it('should coerce mode property', async () => {
      expect(element.mode, 'default mode').to.be.equal('side');

      element.mode = 'over';
      await waitForLitRender(element);

      expect(element.mode, 'over mode').to.be.equal('over');
      expect(element).to.have.attribute('mode', 'over');

      element.mode = 'inexisting' as 'side';
      await waitForLitRender(element);

      expect(element.mode, 'fallback to default').to.be.equal('side');
      expect(element).to.have.attribute('mode', 'side');

      element.mode = null as unknown as 'side';
      await waitForLitRender(element);

      expect(element.mode, 'fallback null to default').to.be.equal('side');
      expect(element).to.have.attribute('mode', 'side');
    });

    it('should coerce mode attribute', () => {
      expect(element.mode, 'default mode').to.be.equal('side');

      element.setAttribute('mode', 'over');
      expect(element.mode, 'over mode').to.be.equal('over');

      element.setAttribute('mode', 'inexisting');
      expect(element.mode, 'fallback to default').to.be.equal('side');

      element.setAttribute('mode', '');
      expect(element.mode, 'fallback null to default').to.be.equal('side');
    });

    it('should update sidebar width when changing position', () => {
      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('320px');
      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__end-width'),
      ).to.be.equal('');

      element.position = 'end';

      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('');
      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__end-width'),
      ).to.be.equal('320px');
    });

    it('should toggle sidebar with opened property', async () => {
      element.opened = true;
      await waitForLitRender(element);

      expect(element.isOpen).to.be.true;
      expect(element.opened).to.be.true;
      expect(element).to.have.attribute('opened', '');

      element.opened = false;
      await waitForLitRender(element);

      expect(element.isOpen).to.be.false;
      expect(element.opened).to.be.false;
      expect(element).not.to.have.attribute('opened');
    });

    it('should manage focus when mode changes', async () => {
      element.opened = true;

      await waitForLitRender(element);
      expect(element.isOpen).to.be.true;
      closeButton.focus();
      await sendKeys({ press: tabKey });

      // Expect that focus is not trapped as it is in side mode
      expect(document.activeElement).not.to.be.equal(closeButton);

      element.mode = 'over';
      await waitForLitRender(element);
      // Opening should focus the close button
      expect(document.activeElement, 'focus should be set to close button').to.be.equal(
        closeButton,
      );

      // Expect that focus is trapped as it is in over mode
      await sendKeys({ press: tabKey });
      expect(document.activeElement, 'focus trap should keep focus on close button').to.be.equal(
        closeButton,
      );

      element.mode = 'side';
      await waitForLitRender(element);
      await sendKeys({ press: tabKey });

      // Expect that focus is not trapped as it is in side mode
      expect(document.activeElement).not.to.be.equal(closeButton);
    });

    it('should ignore focus trap when mode changes and sidebar is closed', async () => {
      element.mode = 'over';
      await waitForLitRender(element);

      container.querySelector<HTMLButtonElement>('#b1')!.focus();
      await sendKeys({ press: tabKey });

      // Expect that focus is trapped as it is in over mode
      expect(document.activeElement!.id).to.be.equal('b2');
    });
  });

  describe('opening and closing', () => {
    it('should toggle the sidebar', async () => {
      const openSpy = new EventSpy(SbbSidebarElement.events.open, element);
      const closeSpy = new EventSpy(SbbSidebarElement.events.close, element);

      element.toggle();

      await openSpy.calledOnce();
      expect(element.isOpen).to.be.true;

      element.toggle();

      await closeSpy.calledOnce();
      expect(element.isOpen).to.be.false;
    });

    it('should open programmatically', async () => {
      const beforeOpenSpy = new EventSpy(SbbSidebarElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbSidebarElement.events.open, element);

      element.open();
      await beforeOpenSpy.calledOnce();
      await openSpy.calledOnce();
      await element.animationComplete;

      expect(beforeOpenSpy.count).to.be.equal(1);
      expect(openSpy.count).to.be.equal(1);
      expect(element.opened).to.be.true;
      expect(element.isOpen).to.be.true;

      await aTimeout(0);
      expect(element).not.to.match(':state(skip-animation)');
    });

    it('should abort opening when defaultPrevented', async () => {
      element.addEventListener(SbbSidebarElement.events.beforeopen, (ev) => ev.preventDefault());

      element.open();

      expect(element.isOpen).to.be.false;
    });

    it('should take focus when opening in mode over', async () => {
      element.mode = 'over';
      await waitForLitRender(container);

      element.open();
      expect(element.isOpen).to.be.true;

      // We simulate a tab key press to test focus trapping
      await sendKeys({ press: tabKey });

      expect(document.activeElement).to.be.equal(closeButton);
    });

    it('should release focus when closing in mode over', async () => {
      element.mode = 'over';
      await waitForLitRender(container);

      element.open();
      expect(element.isOpen).to.be.true;
      await waitForLitRender(container);

      element.close();
      expect(element.isOpen).to.be.false;
      await waitForLitRender(container);
      expect(document.activeElement!.localName).to.be.equal('body');

      // With the following test we ensure that the previously registered escape listener
      // doesn't run anymore (proofs that we called _windowEventsController?.abort()).
      element.mode = 'side';
      element.opened = true;
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);
      expect(element.isOpen).to.be.true;
    });

    it('should take focus with focusOnOpen=true', async () => {
      element.focusOnOpen = true;
      await waitForLitRender(element);

      element.open();
      expect(element.isOpen).to.be.true;

      expect(document.activeElement).to.be.equal(closeButton);

      // Should not trap focus
      await sendKeys({ press: tabKey });
      expect(document.activeElement!.id).to.be.equal('b1');
    });

    it('should release focus when closing in mode side', async () => {
      container.querySelector<HTMLButtonElement>('#b1')!.focus();
      element.open();
      expect(element.isOpen).to.be.true;

      closeButton.focus();

      element.close();
      expect(document.activeElement!.id).to.be.equal('b1');
    });

    it('should release focus when closing in mode side and no previous focused element', async () => {
      element.open();
      expect(element.isOpen).to.be.true;

      closeButton.focus();

      element.close();
      expect(document.activeElement!.localName).to.be.equal('body');
    });

    it('should open in forced mode over', async () => {
      await setViewport({ width: 400, height: 400 });

      // Wait for resizeObserver of container to be triggered
      await waitForCondition(() => element.matches(':state(mode-over-forced)'));

      element.open();
      expect(element.isOpen).to.be.true;

      // Escape key press is only activated in over mode and forced over mode,
      // therefore we can assert correct configuration when the sidebar closes with an Escape key press.
      await sendKeys({ press: 'Escape' });
      expect(element.isOpen).to.be.false;
    });

    it('should close programmatically', async () => {
      container.querySelector<HTMLButtonElement>('#b1')!.focus();

      element.open();
      await waitForLitRender(container);

      const beforeCloseSpy = new EventSpy(SbbSidebarElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbSidebarElement.events.close, element);

      // Focus should be inside sidebar to test changing focus
      closeButton.focus();
      element.close();

      await beforeCloseSpy.calledOnce();
      await closeSpy.calledOnce();
      await element.animationComplete;

      expect(beforeCloseSpy.count).to.be.equal(1);
      expect(closeSpy.count).to.be.equal(1);
      expect(element.opened).to.be.false;
      expect(element.isOpen).to.be.false;

      await aTimeout(0);
      expect(element).not.to.match(':state(skip-animation)');

      // As the sidebar is closed, focus should be on the last focused element before opening the sidebar;
      expect(document.activeElement!.id).to.be.equal('b1');
    });

    it('should abort closing when defaultPrevented', async () => {
      element.open();
      element.addEventListener(SbbSidebarElement.events.beforeclose, (ev) => ev.preventDefault());

      element.close();

      expect(element.isOpen).to.be.true;
    });

    it('opens and closes with non-zero animation duration', async function (this: Context) {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      container.style.setProperty('--sbb-sidebar-container-animation-duration', '1ms');
      const openSpy = new EventSpy(SbbSidebarElement.events.open, element);
      const closeSpy = new EventSpy(SbbSidebarElement.events.close, element);

      element.open();
      await openSpy.calledOnce();
      await element.animationComplete;

      element.close();
      await closeSpy.calledOnce();
      await element.animationComplete;

      expect(openSpy.count).to.be.equal(1);
      expect(closeSpy.count).to.be.equal(1);
    });

    it('should close on close button click', async () => {
      element.opened = true;
      await waitForLitRender(element);

      closeButton.click();
      await waitForLitRender(element);

      expect(element.opened).to.be.false;
    });

    for (const key of ['Enter', 'Space']) {
      it(`should close when pressing ${key} on close button`, async () => {
        element.opened = true;
        await waitForLitRender(element);

        closeButton.focus();
        await sendKeys({ press: key });

        await waitForLitRender(element);
        expect(element.opened).to.be.false;
      });
    }

    it('should close on backdrop click', async () => {
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);

      container
        .shadowRoot!.querySelector<HTMLDivElement>('.sbb-sidebar-container-backdrop')!
        .click();
      await waitForLitRender(element);

      expect(element.opened).to.be.false;
    });

    it('should close on Escape key press', async () => {
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      expect(element.opened).to.be.false;
    });

    it('should handle initial opened state', async () => {
      container = await fixture(
        html`<sbb-sidebar-container>
          <sbb-sidebar opened>Content</sbb-sidebar>
          <sbb-sidebar-content>Content</sbb-sidebar-content>
        </sbb-sidebar-container>`,
      );

      element = container.querySelector('sbb-sidebar')!;

      expect(element).to.match(':state(skip-animation)');

      await waitForCondition(() => !element.matches(':state(skip-animation)'));
    });

    it('should handle initial opened state with non-zero animation time', async () => {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      container = await fixture(
        html`<sbb-sidebar-container style="--sbb-sidebar-container-animation-duration: 1ms">
          <sbb-sidebar opened>Content</sbb-sidebar>
          <sbb-sidebar-content>Content</sbb-sidebar-content>
        </sbb-sidebar-container>`,
      );

      element = container.querySelector('sbb-sidebar')!;

      expect(element).to.match(':state(skip-animation)');

      await waitForCondition(() => !element.matches(':state(skip-animation)'));
    });

    describe('status change during animation', () => {
      beforeEach(() => {
        (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

        container.style.setProperty('--sbb-sidebar-container-animation-duration', '10ms');
      });

      it('should allow closing during opening', async () => {
        element.open();
        expect(element).to.match(':state(state-opening)');
        expect(element.opened).to.be.true;

        element.close();
        expect(element.opened).to.be.false;
        expect(element).to.match(':state(state-closing)');
      });

      it('should allow opening during closing', async () => {
        const openSpy = new EventSpy(SbbSidebarElement.events.open, element);

        element.open();
        await openSpy.calledOnce();

        element.close();
        expect(element).to.match(':state(state-closing)');
        expect(element.opened).to.be.false;

        element.open();
        expect(element.opened).to.be.true;
        expect(element).to.match(':state(state-opening)');
      });

      it('should allow toggling during opening', async () => {
        element.open();
        expect(element).to.match(':state(state-opening)');
        expect(element.opened).to.be.true;

        element.close();
        expect(element.opened).to.be.false;
        expect(element).to.match(':state(state-closing)');
      });

      it('should prevent double open() call', async () => {
        const beforeOpenSpy = new EventSpy(SbbSidebarElement.events.beforeopen, element);

        element.open();
        await aTimeout(2);
        element.open();

        await beforeOpenSpy.calledOnce();
        expect(element.opened).to.be.true;
        expect(beforeOpenSpy.count).to.be.equal(1);
      });

      it('should prevent double close() call', async () => {
        const openSpy = new EventSpy(SbbSidebarElement.events.open, element);
        const beforeCloseSpy = new EventSpy(SbbSidebarElement.events.beforeclose, element);

        element.open();
        await openSpy.calledOnce();

        element.close();
        await aTimeout(2);
        element.close();

        await beforeCloseSpy.calledOnce();
        expect(element.opened).to.be.false;
        expect(beforeCloseSpy.count).to.be.equal(1);
      });
    });
  });

  describe('reacting to environment', () => {
    it('should return correct container when moving', async () => {
      expect(element.container).to.be.equal(container);

      element.remove();
      expect(element.container).to.be.equal(null);

      container.appendChild(element);
      expect(element.container).to.be.equal(container);
    });

    it('should update sidebar width when re-connected', async () => {
      element.remove();
      element.style.width = '200px';

      expect(getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'))
        .to.be.empty;

      container.appendChild(element);

      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('200px');
    });

    it('should update sidebar width when resizing', async () => {
      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('320px');

      element.style.width = '330px';
      // It takes around 30ms to get the resize observer triggered
      await waitForCondition(
        () =>
          getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width') ===
          '330px',
      );

      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('330px');
    });

    it('should take focus when connecting in mode over', async () => {
      element.remove();
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);
      expect(element.isOpen).to.be.true;

      container.appendChild(element);
      await waitForLitRender(element);

      expect(document.activeElement).to.be.equal(closeButton);
    });

    it('should reset focus when disconnecting in mode over', async () => {
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);
      expect(element.isOpen).to.be.true;

      closeButton.focus();
      await sendKeys({ press: tabKey });

      // Expect that focus is trapped
      expect(document.activeElement).to.be.equal(closeButton);

      element.remove();
      await waitForLitRender(element);

      // When connected, escape would trigger a close, but after disconnection it shouldn't happen.
      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      expect(element.isOpen).to.be.true;
      expect(document.activeElement).not.to.be.equal(closeButton);
    });

    it('should detect scrolled state', async () => {
      element.opened = true;

      const scrollEventSpy = new EventSpy('scroll', scrollContext, { passive: true });

      await setViewport({ width: 800, height: 200 });
      await waitForLitRender(element);
      expect(element).not.to.match(':state(scrolled)');

      scrollContext.scrollTo({ top: 1, behavior: 'instant' });
      await scrollEventSpy.calledTimes(1);

      expect(element).to.match(':state(scrolled)');
    });
  });
});
