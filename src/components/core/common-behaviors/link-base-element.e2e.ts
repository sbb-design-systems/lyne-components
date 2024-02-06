import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, type TemplateResult } from 'lit';

import { EventSpy, waitForLitRender } from '../testing';

import { SbbLinkBaseElement } from './link-base-element';

class GenericLink extends SbbLinkBaseElement {
  protected override renderTemplate(): TemplateResult {
    return html`<span>Link</span>`;
  }
}
customElements.define('generic-link', GenericLink);

describe('SbbLinkBaseElement', () => {
  describe('template', () => {
    let element: GenericLink;

    beforeEach(async () => {
      element = await fixture(html`<generic-link></generic-link>`);
    });

    it('renders', async () => {
      assert.instanceOf(element, GenericLink);
    });

    it('check host attributes and content', () => {
      expect(element.getAttribute('dir')).to.be.equal('ltr');
      expect(element.getAttribute('role')).to.be.equal('link');
      expect(element.getAttribute('tabindex')).to.be.equal('0');
      expect(element.shadowRoot!.firstElementChild!.classList.contains('generic-link')).to.be.true;
      expect(element.shadowRoot!.textContent!.trim()).to.be.equal('Link');
    });
  });

  describe('events', () => {
    let element: GenericLink;

    beforeEach(async () => {
      element = await fixture(html` <generic-link></generic-link> `);
    });

    it('no click dispatch if aria-disabled', async () => {
      element.setAttribute('aria-disabled', 'true');
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');
      element.click();
      await waitForLitRender(element);
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('dispatch event', async () => {
      element.href = '#';
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');
      element.click();
      await waitForLitRender(element);
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('enter keydown', async () => {
      element.focus();
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');

      await sendKeys({ down: 'Enter' });
      await waitForLitRender(element);
      expect(clickSpy.count).to.be.equal(1);
    });
  });
});
