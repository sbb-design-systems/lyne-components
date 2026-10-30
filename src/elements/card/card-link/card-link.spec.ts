import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbCardElement } from '../card/card.component.ts';

import type { SbbCardLinkElement } from './card-link.component.ts';

import '../../card.ts';

describe(`sbb-card-link`, () => {
  let element: SbbCardElement;

  it('should render an sbb-card-link as a link opening in a new window', async () => {
    element = await fixture(html`
      <sbb-card>
        <sbb-card-link href="https://github.com/sbb-design-systems/lyne-components" target="_blank"
          >Follow me</sbb-card-link
        >
        Content text
      </sbb-card>
    `);

    expect(element).to.match(':state(has-action)');
    expect(element).not.to.match(':state(has-active-action)');
    expect(element).to.match(':state(action-role-link)');
  });

  it('should correctly toggle active state', async () => {
    element = await fixture(
      html`<sbb-card><sbb-card-link href="#">Click me</sbb-card-link>Content</sbb-card>`,
    );
    expect(element).not.to.match(':state(has-active-action)');

    element.querySelector<SbbCardLinkElement>('sbb-card-link')!.toggleAttribute('active', true);
    await waitForLitRender(element);

    expect(element).to.match(':state(has-active-action)');
  });

  it('should remove data properties from host', async () => {
    element = await fixture(
      html`<sbb-card
        ><sbb-card-link active href="#">Click me</sbb-card-link
        ><span><button>Content</button></span></sbb-card
      >`,
    );

    expect(element).to.match(':state(has-action)');
    expect(element).to.match(':state(has-active-action)');
    expect(element).to.match(':state(action-role-link)');

    // Remove action from DOM
    element.querySelector<SbbCardLinkElement>('sbb-card-link')!.remove();
    await waitForLitRender(element);

    expect(element).not.to.match(':state(has-action)');
    expect(element).not.to.match(':state(has-active-action)');
    expect(element).not.to.match(':state(action-role-button)');
  });

  describe('events', () => {
    let action: SbbCardLinkElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-card>
          <sbb-card-link id="focus-id" href="#">Card</sbb-card-link>
          Content
        </sbb-card>
      `);
      action = element.querySelector<SbbCardLinkElement>('sbb-card-link')!;
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
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      action.focus();
      await waitForLitRender(element);

      expect(document.activeElement!.id).to.be.equal('focus-id');
    });
  });
});
