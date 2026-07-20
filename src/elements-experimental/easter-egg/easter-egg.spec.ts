import { assert, aTimeout, expect, fixture } from '@open-wc/testing';
import type { SbbButtonElement } from '@sbb-esta/lyne-elements/button.js';
import { sbbBreakpointLargeMinPx } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { EventSpy, waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { isSafari } from '@sbb-esta/lyne-elements/core.js';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { stub, useFakeTimers } from 'sinon';

import { SbbEasterEggElement } from './easter-egg.component.ts';
import { i18nSnakeRestart, i18nSnakeScore, i18nSnakeTitle } from './i18n.ts';

import '../easter-egg.ts';

async function openDialog(element: SbbEasterEggElement): Promise<void> {
  const openSpy = new EventSpy(SbbEasterEggElement.events.open, element);
  element.open();
  await waitForLitRender(element);
  await openSpy.calledOnce();
  await waitForLitRender(element);
}

describe('sbb-easter-egg', () => {
  let element: SbbEasterEggElement;

  beforeEach(async () => {
    document.documentElement.setAttribute('lang', 'en');
    await setViewport({ width: sbbBreakpointLargeMinPx + 100, height: 800 });
    element = await fixture(html`<sbb-easter-egg></sbb-easter-egg>`);
  });

  afterEach(() => {
    element.close();
    document.documentElement.setAttribute('lang', 'en');
  });

  it('renders', () => {
    assert.instanceOf(element, SbbEasterEggElement);
  });

  it('exposes score getter that starts at 0', () => {
    expect(element.score).to.be.equal(0);
  });

  if (!isSafari) {
    it('keeps the high score across restarts and resets it on close', async () => {
      await openDialog(element);
      expect(element.highScore).to.be.equal(0);

      // Let the async image initialisation (data-URL SVGs decoded via img.decode()) settle
      // before installing fake timers, so _imagesReady is true when we click Start.
      await aTimeout(500);

      // Only fake setInterval/clearInterval (the game loop) so Lit's Promise-based
      // rendering is not affected.
      const clock = useFakeTimers({ toFake: ['setInterval', 'clearInterval'] });
      // Pinning Math.random to 0.99 puts the post-eat food at grid index 253 = [13, 15],
      // well away from the snake's leftward route, so the score stays exactly 1.
      const randomStub = stub(Math, 'random').returns(0.99);

      try {
        // Start the game via the overlay button.
        const startBtn = element.shadowRoot!.querySelector<HTMLElement>(
          '.sbb-easter-egg__overlay sbb-button',
        )!;
        assert.isNotNull(startBtn);
        startBtn.click();

        // Snake starts at head=[10,10] going right, food is hard-coded at [5,5].
        // Steer up for 5 ticks (y: 10 → 5), then left for 5 ticks (x: 10 → 5 = food).
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        clock.tick(230 * 5); // ticks 1-5: head reaches [10, 5]

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
        clock.tick(230 * 5); // ticks 6-10: head reaches [5, 5] → eats food

        expect(element.score).to.be.equal(1);
        expect(element.highScore).to.be.equal(0); // not committed yet — game still running

        // 6 more ticks left: [4,5]…[0,5], then [-1,5] triggers wall collision → game over.
        clock.tick(230 * 6);
        await waitForLitRender(element);

        expect(element.highScore).to.be.equal(1);

        // Restart via the button rendered in the game-over overlay.
        const restartBtn = element.shadowRoot!.querySelector<HTMLElement>(
          '.sbb-easter-egg__overlay sbb-button',
        )!;
        assert.isNotNull(restartBtn);
        restartBtn.click();
        await waitForLitRender(element);

        expect(element.score).to.be.equal(0);
        expect(element.highScore).to.be.equal(1);
      } finally {
        randomStub.restore();
        clock.restore();
      }

      // Closing the dialog must reset the high score.
      element.close();
      await waitForLitRender(element);
      expect(element.highScore).to.be.equal(0);
    });
  }

  it('is closed by default', () => {
    expect(element.isOpen).to.be.equal(false);
    expect(element).to.match(':state(state-closed)');
  });

  it('opens and closes the dialog', async () => {
    await openDialog(element);
    expect(element.isOpen).to.be.equal(true);
    expect(element).to.match(':state(state-opened)');

    const closeSpy = new EventSpy(SbbEasterEggElement.events.close, element);
    element.close();
    await waitForLitRender(element);
    await closeSpy.calledOnce();
    await waitForLitRender(element);

    expect(element.isOpen).to.be.equal(false);
    expect(element).to.match(':state(state-closed)');
  });

  it('closes the dialog via the close button', async () => {
    await openDialog(element);
    const closeSpy = new EventSpy(SbbEasterEggElement.events.close, element);

    const closeButton = element.shadowRoot!.querySelector<HTMLElement>('sbb-dialog-close-button')!;
    assert.isNotNull(closeButton);
    closeButton.click();
    await waitForLitRender(element);
    await closeSpy.calledOnce();
    await waitForLitRender(element);

    expect(element.isOpen).to.be.equal(false);
    expect(element).to.match(':state(state-closed)');
  });

  it('focuses the start button on open and the restart button on game over', async () => {
    await openDialog(element);
    let button = element.shadowRoot!.querySelector<SbbButtonElement>(
      '.sbb-easter-egg__overlay sbb-button',
    )!;
    assert.isNotNull(button);
    expect(element.shadowRoot!.activeElement).to.be.equal(button);

    // Move focus elsewhere to detect the automatic re-focus on game over.
    const closeButton = element.shadowRoot!.querySelector<HTMLElement>('sbb-dialog-close-button')!;
    closeButton.focus();
    expect(element.shadowRoot!.activeElement).to.be.equal(closeButton);

    // Trigger the actual game-over code path.
    (element as unknown as Record<string, () => void>)['_setGameOver']();
    await waitForLitRender(element);
    await element.updateComplete;
    button = element.shadowRoot!.querySelector<SbbButtonElement>(
      '.sbb-easter-egg__overlay sbb-button',
    )!;
    assert.isNotNull(button);
    expect(element.shadowRoot!.activeElement).to.be.equal(button);
  });

  it('renders the title and score labels for the current language', () => {
    const shadow = element.shadowRoot!;
    expect(shadow.querySelector('sbb-dialog-title')!.textContent!.trim()).to.be.equal(
      i18nSnakeTitle.en,
    );
    expect(shadow.querySelector('.sbb-easter-egg__score')!.textContent!.trim()).to.contain(
      i18nSnakeScore.en,
    );
  });

  it('re-renders labels when the html lang changes', async () => {
    document.documentElement.setAttribute('lang', 'de');
    await waitForLitRender(element);

    const shadow = element.shadowRoot!;
    expect(shadow.querySelector('sbb-dialog-title')!.textContent!.trim()).to.be.equal(
      i18nSnakeTitle.de,
    );
    expect(shadow.querySelector('.sbb-easter-egg__score')!.textContent!.trim()).to.contain(
      i18nSnakeScore.de,
    );
  });

  it('keeps accessibilityLabel in sync with the current language', async () => {
    expect(element.accessibilityLabel).to.be.equal(i18nSnakeTitle.en);
    document.documentElement.setAttribute('lang', 'fr');
    await waitForLitRender(element);
    expect(element.accessibilityLabel).to.be.equal(i18nSnakeTitle.fr);
    document.documentElement.setAttribute('lang', 'it');
    await waitForLitRender(element);
    expect(element.accessibilityLabel).to.be.equal(i18nSnakeTitle.it);
  });

  it('shows a restart button with the localized label on game over', async () => {
    document.documentElement.setAttribute('lang', 'de');
    (element as unknown as Record<string, unknown>)['_gameOver'] = true;
    await waitForLitRender(element);

    const button = element.shadowRoot!.querySelector<SbbButtonElement>('sbb-button');
    assert.isNotNull(button);
    expect(button!.textContent!.trim()).to.be.equal(i18nSnakeRestart.de);
  });
});
