import { assert, expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, tabKey } from '../../core/testing/private.js';
import { waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbSidebarCloseButtonElement } from '../sidebar-close-button.js';
import type { SbbSidebarContainerElement } from '../sidebar-container.js';

import { SbbSidebarElement } from './sidebar.js';

import '../sidebar-close-button.js';
import '../sidebar-container.js';
import '../sidebar-content.js';
import '../sidebar-title.js';

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

    element = container.querySelector('sbb-sidebar')!;
    closeButton = container.querySelector('sbb-sidebar-close-button')!;
    scrollContext = element.shadowRoot!.querySelector('.sbb-sidebar-content-section')!;
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarElement);
  });

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

  it('should coerce color property', async () => {
    expect(element.color, 'default color').to.be.equal('white');

    element.color = 'milk';
    await waitForLitRender(element);

    expect(element.color, 'milk color').to.be.equal('milk');
    expect(element).to.have.attribute('color', 'milk');

    element.color = 'inexisting' as 'white';
    await waitForLitRender(element);

    expect(element.color, 'fallback to default').to.be.equal('white');
    expect(element).to.have.attribute('color', 'white');

    element.color = null as unknown as 'white';
    await waitForLitRender(element);

    expect(element.color, 'fallback null to default').to.be.equal('white');
    expect(element).to.have.attribute('color', 'white');
  });

  it('should coerce color attribute', () => {
    expect(element.color, 'default color').to.be.equal('white');

    element.setAttribute('color', 'milk');
    expect(element.color, 'milk color').to.be.equal('milk');

    element.setAttribute('color', 'inexisting');
    expect(element.color, 'fallback to default').to.be.equal('white');

    element.setAttribute('color', '');
    expect(element.color, 'fallback null to default').to.be.equal('white');
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
    expect(document.activeElement?.localName).to.be.equal('button');

    element.mode = 'over';
    await waitForLitRender(element);
    await sendKeys({ press: tabKey });

    // Expect that focus is trapped as it is in over mode
    expect(document.activeElement).to.be.equal(closeButton);

    element.mode = 'side';
    await waitForLitRender(element);
    await sendKeys({ press: tabKey });

    // Expect that focus is not trapped as it is in side mode
    expect(document.activeElement?.localName).to.be.equal('button');
  });

  it('should ignore focus trap when mode changes and sidebar is closed', async () => {
    element.mode = 'over';
    await waitForLitRender(element);

    container.querySelector<HTMLButtonElement>('#b1')!.focus();
    await sendKeys({ press: tabKey });

    // Expect that focus is trapped as it is in over mode
    expect(document.activeElement!.id).to.be.equal('b2');
  });

  it('should detect scrolled state', async () => {
    element.opened = true;

    await setViewport({ width: 800, height: 200 });
    await waitForLitRender(element);
    expect(element).not.to.have.attribute('data-scrolled');

    scrollContext.scrollTo({ top: 1, behavior: 'instant' });

    // It takes around 30ms to get the scrolled event parsed
    await waitForCondition(() => element.hasAttribute('data-scrolled'));
    expect(element).to.have.attribute('data-scrolled');
  });
});
