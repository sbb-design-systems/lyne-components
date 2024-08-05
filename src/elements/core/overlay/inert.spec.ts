import { expect } from '@open-wc/testing';
import { html, LitElement, type TemplateResult } from 'lit';

import { fixture } from '../testing/private/fixture.js';

import { Inert } from './inert.js';

class ShadowElement extends LitElement {
  protected override render(): TemplateResult {
    return html`<div></div>
      <div>
        <div>Sibling</div>
        <div id="overlay"></div>
        <span>Another sibling</span>
      </div>`;
  }
}

customElements.define('shadow-element', ShadowElement);

describe('inert', () => {
  let inertController: Inert;
  let element: HTMLElement;
  let overlay: HTMLDivElement;
  let overlay2: HTMLDivElement;

  beforeEach(async () => {
    inertController = new Inert();
  });

  describe('light DOM', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<div>
          <div></div>
          <div .inert=${true}></div>
          <div aria-hidden="true"></div>
          <div id="overlay"></div>
          <div>
            <div id="overlay2"></div>
          </div>
        </div>`,
      );

      overlay = element.querySelector<HTMLDivElement>('#overlay')!;
      overlay2 = element.querySelector<HTMLDivElement>('#overlay2')!;
    });

    it('should mark inert', async () => {
      inertController.apply(overlay);

      await expect(element).dom.to.equalSnapshot();
    });

    it('should remove inert', async () => {
      inertController.apply(overlay);
      inertController.remove(overlay);

      await expect(element).dom.to.equalSnapshot();
    });

    describe('stacked', () => {
      it('should mark inert', async () => {
        inertController.apply(overlay);
        inertController.apply(overlay2);

        await expect(element).dom.to.equalSnapshot();
      });

      it('should remove inert level 2', async () => {
        inertController.apply(overlay);
        inertController.apply(overlay2);
        inertController.remove(overlay2);

        await expect(element).dom.to.equalSnapshot();
      });

      it('should remove inert level 1', async () => {
        inertController.apply(overlay);
        inertController.apply(overlay2);
        inertController.remove(overlay2);
        inertController.remove(overlay);

        await expect(element).dom.to.equalSnapshot();
      });

      it('should handle level skip removal', async () => {
        inertController.apply(overlay);
        inertController.apply(overlay2);
        inertController.remove(overlay);
        inertController.remove(overlay2);

        await expect(element).dom.to.equalSnapshot();
      });
    });
  });

  describe('with shadow DOM', () => {
    let shadowElement: ShadowElement;

    beforeEach(async () => {
      element = await fixture(
        html`<div>
          <div></div>
          <div .inert=${true}></div>
          <div aria-hidden="true"></div>
          <shadow-element></shadow-element>
          <div>
            <div></div>
          </div>
        </div>`,
      );

      shadowElement = element.querySelector<ShadowElement>('shadow-element')!;
      overlay = shadowElement.shadowRoot!.querySelector('#overlay')!;
    });

    describe('should mark inert', () => {
      beforeEach(async () => {
        inertController.apply(overlay);
      });

      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(shadowElement).shadowDom.to.be.equalSnapshot();
      });
    });

    describe('should remove inert', () => {
      beforeEach(async () => {
        inertController.apply(overlay);
        inertController.remove(overlay);
      });

      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(shadowElement).shadowDom.to.be.equalSnapshot();
      });
    });
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'shadow-element': ShadowElement;
  }
}
