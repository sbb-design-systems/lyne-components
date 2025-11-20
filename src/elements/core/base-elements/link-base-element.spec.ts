import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType } from '../decorators.ts';
import { fixture } from '../testing/private.ts';
import { EventSpy, waitForLitRender } from '../testing.ts';

import { SbbLinkBaseElement } from './link-base-element.ts';

class GenericLink extends SbbLinkBaseElement {
  @forceType()
  @property({ type: Boolean })
  public accessor disabled: boolean = false;
  @forceType()
  @property({ type: Boolean })
  public accessor disabledInteractive: boolean = false;

  protected override renderTemplate(): TemplateResult {
    return html`<span>Link</span>`;
  }
}
customElements.define('generic-link', GenericLink);

describe(`SbbLinkBaseElement`, () => {
  describe('template', () => {
    let element: GenericLink;

    beforeEach(async () => {
      element = await fixture(html`<generic-link href="#"></generic-link>`);
    });

    it('renders', async () => {
      assert.instanceOf(element, GenericLink);
    });

    it('check host attributes and content', () => {
      const a = element.shadowRoot!.firstElementChild!;

      expect(a.classList.contains('generic-link')).to.be.true;
      expect(a.ariaLabel).to.be.null;
      expect(a.ariaCurrent).to.be.null;
      expect(element.shadowRoot!.textContent!.trim()).to.be.equal('Link');
    });

    it('should forward accessibility labels', async () => {
      const a = element.shadowRoot!.firstElementChild!;

      element.accessibilityLabel = 'label';
      element.accessibilityCurrent = 'page';
      await waitForLitRender(element);

      expect(a.ariaLabel).to.be.equal('label');
      expect(a.ariaCurrent).to.be.equal('page');
    });
  });

  describe('events', () => {
    let element: GenericLink;

    beforeEach(async () => {
      element = await fixture(html`<generic-link href="#"></generic-link>`);
    });

    it('no click dispatch if disabled', async () => {
      element.disabled = true;
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');
      element.click();
      await waitForLitRender(element);
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('dispatch click if disabled and disabledInteractive', async () => {
      const clickSpy = new EventSpy('click');
      const a = element.shadowRoot!.querySelector('a');

      expect(a).not.to.have.attribute('tabindex');
      expect(a).not.to.have.attribute('aria-disabled');

      element.disabled = true;
      await waitForLitRender(element);

      expect(a).to.have.attribute('tabindex', '-1');
      expect(a).to.have.attribute('aria-disabled', 'true');

      element.disabledInteractive = true;
      await waitForLitRender(element);

      expect(a).not.to.have.attribute('tabindex');
      expect(a).to.have.attribute('aria-disabled', 'true');

      element.click();
      await waitForLitRender(element);

      expect(clickSpy.count).to.be.equal(1);
    });

    it('dispatch event', async () => {
      const clickSpy = new EventSpy('click');
      element.click();
      await waitForLitRender(element);
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('enter keydown', async () => {
      const clickSpy = new EventSpy('click');
      element.focus();

      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);
      expect(clickSpy.count).to.be.equal(1);
    });
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'generic-link': GenericLink;
  }
}
