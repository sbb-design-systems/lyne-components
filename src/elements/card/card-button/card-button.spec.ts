import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbCardElement } from '../card/card.component.ts';

import type { SbbCardButtonElement } from './card-button.component.ts';

import '../../card.ts';

describe(`sbb-card-button`, () => {
  let element: SbbCardElement;

  it('should render an active sbb-card-button', async () => {
    element = await fixture(
      html`<sbb-card><sbb-card-button active>Click me</sbb-card-button>Content</sbb-card>`,
    );

    expect(element).to.match(':state(has-action)');
    expect(element).to.match(':state(has-active-action)');
    expect(element).to.match(':state(action-role-button)');
  });

  it('should correctly toggle active state', async () => {
    element = await fixture(
      html`<sbb-card><sbb-card-button>Click me</sbb-card-button>Content</sbb-card>`,
    );
    expect(element).not.to.match(':state(has-active-action)');

    element.querySelector<SbbCardButtonElement>('sbb-card-button')!.toggleAttribute('active', true);
    await waitForLitRender(element);

    expect(element).to.match(':state(has-active-action)');
  });

  it('should remove data properties from host', async () => {
    element = await fixture(
      html` <sbb-card>
        <sbb-card-button active>Click me</sbb-card-button>
        <span>
          <button>Content</button>
        </span>
      </sbb-card>`,
    );

    expect(element).to.match(':state(has-action)');
    expect(element).to.match(':state(has-active-action)');
    expect(element).to.match(':state(action-role-button)');

    // Remove action from DOM
    element.querySelector<SbbCardButtonElement>('sbb-card-button')!.remove();
    await waitForLitRender(element);

    expect(element).not.to.match(':state(has-action)');
    expect(element).not.to.match(':state(has-active-action)');
    expect(element).not.to.match(':state(action-role-button)');
  });

  describe('events', () => {
    let action: SbbCardButtonElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-card><sbb-card-button id="focus-id">Card</sbb-card-button>Content</sbb-card>`,
      );
      action = element.querySelector<SbbCardButtonElement>('sbb-card-button')!;
    });

    it('dispatches event on click', async () => {
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');

      action.click();

      await clickSpy.calledOnce();
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
