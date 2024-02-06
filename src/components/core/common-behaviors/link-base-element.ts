import { html, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { getDocumentWritingMode } from '../dom';
import { isEventPrevented } from '../eventing';
import { i18nTargetOpensInNewWindow } from '../i18n';

import { SbbActionBaseElement } from './action-base-element';
import '../../screenreader-only';
import { dispatchClickEventWhenEnterKeypress } from './action-dispatch-click';
import { LanguageController } from './language-controller';

/** Enumeration for 'target' attribute in <a> HTML tag. */
export type LinkTargetType = '_blank' | '_self' | '_parent' | '_top';

/** The interface contains attributes that can be set on an <a> tag. */
export interface LinkProperties {
  href?: string;
  target?: LinkTargetType | string;
  rel?: string;
  download?: boolean;
  disabled?: boolean;
}

/** Link base class. */
export abstract class SbbLinkBaseElement extends SbbActionBaseElement implements LinkProperties {
  /** The href value you want to link to. */
  @property() public href?: string;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string;

  /** Whether the browser will show the download dialog on click. */
  @property({ type: Boolean }) public download?: boolean;

  /**
   * Trigger an anchor element click after the event has finished the bubbling phase and
   * preventDefault() has not been called for the event.
   */
  private async _triggerAnchorWhenNecessary(event: MouseEvent): Promise<void> {
    const target = event.target as Element;
    const composedTarget = event.composedPath()[0] as Element;
    // We only want to trigger a click event on the inner anchor element, if the host element is the
    // event origin, which means the inner anchor element has not actually been activated/clicked.
    if (
      !target.tagName.startsWith('SBB-') ||
      target !== composedTarget ||
      (await isEventPrevented(event))
    ) {
      return;
    }

    // We are using dispatchEvent here, instead of just .click() in order to
    // prevent another click event from bubbling up the DOM tree.
    // TODO: The CTRL case does not work exactly the same as with a use interaction PointerEvent
    //  as the newly created tab immediately receives focus, instead of remaining on the current page.
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    target.shadowRoot?.querySelector('a')?.dispatchEvent(
      // We need to use a MouseEvent here, as PointerEvent does not work on Firefox.
      new MouseEvent('click', {
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
      }),
    );
  }

  /** Handle the click logic for a link element. */
  private _handleLinkClick = (event: MouseEvent): void => {
    if (this.getAttribute('aria-disabled') === 'true') {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    } else if (this.href) {
      this._triggerAnchorWhenNecessary(event);
    }
  };

  private _evaluateRelAttribute = (): string | typeof nothing => {
    return this.rel ? this.rel : this.target === '_blank' ? 'external noopener nofollow' : nothing;
  };

  protected language = new LanguageController(this);

  public constructor() {
    super();
    this.addEventListener('click', this._handleLinkClick);
    this.addEventListener('keypress', dispatchClickEventWhenEnterKeypress, { passive: true });
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    this.setAttribute('role', 'link');
    this.setAttribute('dir', getDocumentWritingMode());
    this.setAttribute('tabindex', '0');
    return super.createRenderRoot();
  }

  /** Default render method for link-like components. Can be overridden if the LinkRenderVariables are not needed. */
  protected override render(): TemplateResult {
    return html`
      <a
        class=${this.tagName.toLowerCase()}
        role="presentation"
        tabindex="-1"
        href=${this.href ?? nothing}
        ?download=${this.download}
        target=${this.target ?? nothing}
        rel=${this._evaluateRelAttribute()}
      >
        ${this.renderTemplate()}
        ${!!this.href && this.target === '_blank'
          ? html`<sbb-screenreader-only
              >. ${i18nTargetOpensInNewWindow[this.language.current]}</sbb-screenreader-only
            >`
          : nothing}
      </a>
    `;
  }
}
