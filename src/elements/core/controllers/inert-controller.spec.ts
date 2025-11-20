import { expect } from '@open-wc/testing';
import { html, LitElement, type ReactiveControllerHost, type TemplateResult } from 'lit';

import type { SbbOpenCloseBaseElement } from '../base-elements.ts';
import { fixture } from '../testing/private.ts';

import { SbbInertController } from './inert-controller.ts';

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
  let element: HTMLElement;
  let inertElements: Set<HTMLElement>;
  let inertOverlays: Set<HTMLElement>;
  let inertControllerOverlay: SbbInertController;
  let inertControllerOverlay2: SbbInertController;

  const createInertController = (overlay: HTMLElement): SbbInertController =>
    new SbbInertController(
      overlay as unknown as ReactiveControllerHost & SbbOpenCloseBaseElement,
      inertElements,
      inertOverlays,
    );

  // Reset state for each test
  beforeEach(() => {
    inertElements = new Set<HTMLElement>();
    inertOverlays = new Set<HTMLElement>();
  });

  describe('light DOM', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<div>
          <div></div>
          <div inert></div>
          <div aria-hidden="true"></div>
          <div id="overlay"></div>
          <div>
            <div id="overlay2"></div>
          </div>
        </div>`,
      );

      inertControllerOverlay = createInertController(
        element.querySelector<HTMLDivElement>('#overlay')!,
      );
      inertControllerOverlay2 = createInertController(
        element.querySelector<HTMLDivElement>('#overlay2')!,
      );
    });

    it('should mark inert', async () => {
      inertControllerOverlay.activate();

      await expect(element).dom.to.equalSnapshot();
    });

    it('should remove inert', async () => {
      inertControllerOverlay.activate();
      inertControllerOverlay.deactivate();

      await expect(element).dom.to.equalSnapshot();
    });

    describe('stacked', () => {
      it('should mark inert', async () => {
        inertControllerOverlay.activate();
        inertControllerOverlay2.activate();

        await expect(element).dom.to.equalSnapshot();
      });

      it('should remove inert level 2', async () => {
        inertControllerOverlay.activate();
        inertControllerOverlay2.activate();
        inertControllerOverlay2.deactivate();

        await expect(element).dom.to.equalSnapshot();
      });

      it('should remove inert level 1', async () => {
        inertControllerOverlay.activate();
        inertControllerOverlay2.activate();
        inertControllerOverlay2.deactivate();
        inertControllerOverlay.deactivate();

        await expect(element).dom.to.equalSnapshot();
      });

      it('should handle level skip removal', async () => {
        inertControllerOverlay.activate();
        inertControllerOverlay2.activate();
        inertControllerOverlay.deactivate();
        inertControllerOverlay2.deactivate();

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
          <div inert></div>
          <div aria-hidden="true"></div>
          <shadow-element></shadow-element>
          <div>
            <div></div>
          </div>
        </div>`,
      );

      shadowElement = element.querySelector<ShadowElement>('shadow-element')!;
      inertControllerOverlay = createInertController(
        shadowElement.shadowRoot!.querySelector('#overlay')!,
      );
    });

    describe('should mark inert', () => {
      beforeEach(async () => {
        inertControllerOverlay.activate();
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
        inertControllerOverlay.activate();
        inertControllerOverlay.deactivate();
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
