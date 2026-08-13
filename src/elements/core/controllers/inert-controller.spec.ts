import { expect } from '@open-wc/testing';
import { html, LitElement, type ReactiveControllerHost, type TemplateResult } from 'lit';

import type { SbbOpenCloseBaseElement } from '../base-elements/open-close-base-element.ts';
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

class ShadowWrapperElement extends LitElement {
  protected override render(): TemplateResult {
    return html`<div class="sbb-live-announcer-element"></div>
      <div id="sibling"></div>`;
  }
}

customElements.define('shadow-wrapper-element', ShadowWrapperElement);

/**
 * `HTMLElement.inert` only reflects the element's own `inert` attribute, not whether it is
 * effectively inert because an ancestor has `inert` set (native inert state is inherited by
 * descendants). This helper walks up the (Shadow DOM piercing) ancestor chain to determine
 * whether an element is effectively inert.
 */
function isEffectivelyInert(element: HTMLElement): boolean {
  let current: HTMLElement | null = element;

  while (current) {
    if (current.inert) {
      return true;
    }
    current =
      current.parentElement ?? ((current.getRootNode() as ShadowRoot)?.host as HTMLElement) ?? null;
  }

  return false;
}

describe('inert', () => {
  let element: HTMLElement;
  let inertElements: Set<HTMLElement>;
  let inertOverlays: Set<HTMLElement>;
  let exemptedElements: Set<HTMLElement>;
  let inertControllerOverlay: SbbInertController;
  let inertControllerOverlay2: SbbInertController;

  const createInertController = (overlay: HTMLElement): SbbInertController =>
    new SbbInertController(
      overlay as unknown as ReactiveControllerHost & SbbOpenCloseBaseElement,
      inertElements,
      inertOverlays,
      exemptedElements,
    );

  // Reset state for each test
  beforeEach(() => {
    inertElements = new Set<HTMLElement>();
    inertOverlays = new Set<HTMLElement>();
    exemptedElements = new Set<HTMLElement>();
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

  describe('ignored elements', () => {
    describe('as direct siblings', () => {
      let scriptElement: HTMLScriptElement;
      let templateElement: HTMLTemplateElement;
      let styleElement: HTMLStyleElement;

      beforeEach(async () => {
        element = await fixture(
          html`<div>
            <div id="overlay"></div>
            <script></script>
            <template></template>
            <style></style>
          </div>`,
        );

        scriptElement = element.querySelector<HTMLScriptElement>('script')!;
        templateElement = element.querySelector<HTMLTemplateElement>('template')!;
        styleElement = element.querySelector<HTMLStyleElement>('style')!;
        inertControllerOverlay = createInertController(
          element.querySelector<HTMLDivElement>('#overlay')!,
        );
      });

      it('should never mark ignored elements as inert', async () => {
        inertControllerOverlay.activate();

        for (const ignored of [scriptElement, templateElement, styleElement]) {
          expect(ignored.inert).to.be.false;
          expect(ignored.hasAttribute('aria-hidden')).to.be.false;
        }
        await expect(element).dom.to.equalSnapshot();
      });
    });

    describe('nested inside a wrapper', () => {
      let wrapperElement: HTMLDivElement;
      let overlayOutlet: HTMLDivElement;
      let siblingElement: HTMLDivElement;

      beforeEach(async () => {
        element = await fixture(
          html`<div>
            <div id="overlay"></div>
            <div id="wrapper">
              <div class="sbb-overlay-outlet"></div>
              <div id="sibling"></div>
            </div>
          </div>`,
        );

        wrapperElement = element.querySelector<HTMLDivElement>('#wrapper')!;
        overlayOutlet = wrapperElement.querySelector<HTMLDivElement>('.sbb-overlay-outlet')!;
        siblingElement = element.querySelector<HTMLDivElement>('#sibling')!;
        inertControllerOverlay = createInertController(
          element.querySelector<HTMLDivElement>('#overlay')!,
        );
      });

      it('should carve a path down to the ignored element, inerting its siblings instead', async () => {
        inertControllerOverlay.activate();

        expect(wrapperElement.inert).to.be.false;
        expect(isEffectivelyInert(overlayOutlet)).to.be.false;
        expect(isEffectivelyInert(siblingElement)).to.be.true;
        await expect(element).dom.to.equalSnapshot();
      });

      it('should fully remove the inert state again on deactivation', async () => {
        inertControllerOverlay.activate();
        inertControllerOverlay.deactivate();

        expect(wrapperElement.inert).to.be.false;
        expect(siblingElement.inert).to.be.false;
        await expect(element).dom.to.equalSnapshot();
      });
    });

    describe('nested through Shadow DOM', () => {
      let shadowWrapperElement: ShadowWrapperElement;
      let announcerElement: HTMLDivElement;
      let siblingElement: HTMLDivElement;

      beforeEach(async () => {
        element = await fixture(
          html`<div>
            <div id="overlay"></div>
            <shadow-wrapper-element></shadow-wrapper-element>
          </div>`,
        );

        shadowWrapperElement =
          element.querySelector<ShadowWrapperElement>('shadow-wrapper-element')!;
        announcerElement = shadowWrapperElement.shadowRoot!.querySelector<HTMLDivElement>(
          '.sbb-live-announcer-element',
        )!;
        siblingElement =
          shadowWrapperElement.shadowRoot!.querySelector<HTMLDivElement>('#sibling')!;
        inertControllerOverlay = createInertController(
          element.querySelector<HTMLDivElement>('#overlay')!,
        );
      });

      it('should pierce the Shadow DOM boundary to protect the ignored element', async () => {
        inertControllerOverlay.activate();

        expect(shadowWrapperElement.inert).to.be.false;
        expect(isEffectivelyInert(announcerElement)).to.be.false;
        expect(isEffectivelyInert(siblingElement)).to.be.true;
      });

      it('should fully remove the inert state again on deactivation', async () => {
        inertControllerOverlay.activate();
        inertControllerOverlay.deactivate();

        expect(shadowWrapperElement.inert).to.be.false;
        expect(siblingElement.inert).to.be.false;
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'shadow-wrapper-element': ShadowWrapperElement;
  }
}
