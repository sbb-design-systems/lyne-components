import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing/index.js';
import { fixture } from '../../core/testing/private/index.js';
import type { SbbCardElement } from '../card/index.js';

import type { SbbCardButtonElement } from './card-button.js';

import '../card/index.js';
import './card-button.js';

describe(`sbb-card-button with ${fixture.name}`, () => {
  let element: SbbCardElement;

  it('should render an active sbb-card-button', async () => {
    element = await fixture(
      html`<sbb-card><sbb-card-button active>Click me</sbb-card-button>Content</sbb-card>`,
      { modules: ['../card/index.ts', './card-button.ts'] },
    );

    expect(element).to.have.attribute('data-has-action');
    expect(element).to.have.attribute('data-has-active-action');
    expect(element).to.have.attribute('data-action-role', 'button');

    const cardAction = element.querySelector('sbb-card-button');

    expect(cardAction).dom.to.be.equal(
      `
      <sbb-card-button
        role="button"
        dir="ltr"
        tabindex="0"
        data-action
        data-button
        slot="action"
        active>
        Click me
      </sbb-card-button>
    `,
      { ignoreAttributes: ['defer-hydration'], ignoreTags: ['template'] },
    );
    await expect(cardAction).shadowDom.to.be.equalSnapshot();
  });

  it('should correctly toggle active state', async () => {
    element = await fixture(
      html`<sbb-card><sbb-card-button>Click me</sbb-card-button>Content</sbb-card>`,
      { modules: ['../card/index.ts', './card-button.ts'] },
    );
    expect(element).not.to.have.attribute('data-has-active-action');

    element.querySelector<SbbCardButtonElement>('sbb-card-button')!.toggleAttribute('active', true);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-has-active-action');
  });

  it('should remove data properties from host', async () => {
    element = await fixture(
      html` <sbb-card>
        <sbb-card-button active>Click me</sbb-card-button>
        <span>
          <button>Content</button>
        </span>
      </sbb-card>`,
      { modules: ['../card/index.ts', './card-button.ts'] },
    );

    expect(element).to.have.attribute('data-has-action');
    expect(element).to.have.attribute('data-has-active-action');
    expect(element).to.have.attribute('data-action-role', 'button');

    // Remove action from DOM
    element.querySelector<SbbCardButtonElement>('sbb-card-button')!.remove();
    await waitForLitRender(element);

    expect(element).not.to.have.attribute('data-has-action');
    expect(element).not.to.have.attribute('data-has-active-action');
    expect(element).not.to.have.attribute('data-action-role', 'button');
  });

  it('should detect added button in slotted content to update focusable elements', async () => {
    element = await fixture(
      html` <sbb-card>
        <sbb-card-button>Click me</sbb-card-button>
        <span id="content">
          <button>Content</button>
        </span>
      </sbb-card>`,
      { modules: ['../card/index.ts', './card-button.ts'] },
    );
    expect(element.querySelector('button')).to.have.attribute('data-card-focusable');

    // Add a second button in content
    element
      .querySelector('#content')!
      .insertBefore(document.createElement('button'), element.querySelector('button'));

    // Both buttons should be marked as focusable
    await waitForLitRender(element);
    const buttons = element.querySelectorAll('button');
    expect(buttons.length).to.be.equal(2);
    expect(
      Array.from(buttons).every((el) => el.getAttribute('data-card-focusable') !== null),
    ).to.be.equal(true);

    // Remove all buttons
    buttons.forEach((el) => el.remove());
    await waitForLitRender(element);

    // Card should not have marker anymore
    expect(element.querySelectorAll('button').length).to.be.equal(0);
  });

  it('should detect added second element of slot to update focusable elements', async () => {
    element = await fixture(
      html` <sbb-card>
        <sbb-card-button>Click me</sbb-card-button>
        <span id="content"></span>
      </sbb-card>`,
      { modules: ['../card/index.ts', './card-button.ts'] },
    );

    // Add a button to slot
    element.insertBefore(document.createElement('button'), element.querySelector('#content'));
    await waitForLitRender(element);

    // Button should be marked as focusable
    expect(element.querySelector('button')).to.have.attribute('data-card-focusable');
  });

  it('should detect focusable elements when action was added at later point', async () => {
    element = await fixture(
      html` <sbb-card>
        <span id="content"><button></button></span>
      </sbb-card>`,
      { modules: ['../card/index.ts'] },
    );

    // Add a sbb-card-button
    element.appendChild(document.createElement('sbb-card-button'));
    await waitForLitRender(element);

    // Button should be marked as focusable
    expect(element.querySelector('button')).to.have.attribute('data-card-focusable');
  });

  describe('events', () => {
    let action: SbbCardButtonElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-card><sbb-card-button id="focus-id">Card</sbb-card-button>Content</sbb-card>`,
        { modules: ['../card/index.ts', './card-button.ts'] },
      );
      action = element.querySelector<SbbCardButtonElement>('sbb-card-button')!;
    });

    it('dispatches event on click', async () => {
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');

      action.click();

      await waitForCondition(() => clickSpy.events.length === 1);
      expect(clickSpy.count).to.be.equal(1);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const clickSpy = new EventSpy('click');
      action.focus();
      await sendKeys({ press: 'Enter' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Space', async () => {
      const clickSpy = new EventSpy('click');
      action.focus();
      await sendKeys({ press: ' ' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      action.focus();
      await waitForLitRender(element);

      expect(document.activeElement!.id).to.be.equal('focus-id');
    });
  });
});
