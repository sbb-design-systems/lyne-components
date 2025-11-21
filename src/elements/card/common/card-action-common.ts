import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { IS_FOCUSABLE_QUERY } from '../../core/a11y.ts';
import type { SbbActionBaseElement } from '../../core/base-elements.ts';
import { ɵstateController, type AbstractConstructor } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbCardElement } from '../card.ts';

import style from './card-action.scss?lit&inline';

export declare class SbbCardActionCommonElementMixinType {
  public accessor active: boolean;
  protected actionRole: 'link' | 'button';
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbCardActionCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbCardActionCommonElementMixinType> & T => {
  abstract class SbbCardActionCommonElement
    extends superClass
    implements Partial<SbbCardActionCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [boxSizingStyles, style];

    /** Whether the card is active. */
    @property({ reflect: true, type: Boolean })
    public set active(value: boolean) {
      this._active = value;
      this._onActiveChange();
    }
    public get active(): boolean {
      return this._active;
    }
    private _active: boolean = false;

    protected abstract actionRole: 'link' | 'button';

    private _card: SbbCardElement | null = null;
    private _cardMutationObserver = new MutationController(this, {
      target: null,
      config: { childList: true, subtree: true },
      callback: () => this._checkForSlottedActions(),
    });

    private _onActiveChange(): void {
      if (this._card) {
        ɵstateController(this._card).toggle('has-active-action', this.active);
      }
    }

    private _checkForSlottedActions(): void {
      const cardFocusableAttributeName = 'data-card-focusable';

      Array.from(this._card?.querySelectorAll?.(IS_FOCUSABLE_QUERY) ?? [])
        .filter(
          (el) =>
            el.localName !== 'sbb-card-link' &&
            el.localName !== 'sbb-card-button' &&
            !el.hasAttribute(cardFocusableAttributeName),
        )
        .forEach((el: Element) => el.setAttribute(cardFocusableAttributeName, ''));
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._card = this.closest?.('sbb-card');
      if (this._card) {
        this.slot ||= 'action';
        const controller = ɵstateController(this._card);
        controller.add('has-action');
        controller.toggle('has-active-action', this.active);
        controller.add(`action-role-${this.actionRole}`);
        controller.delete(`action-role-${this.actionRole === 'button' ? 'link' : 'button'}`);

        this._checkForSlottedActions();
        this._cardMutationObserver.observe(this._card);
      }
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      if (this._card) {
        const controller = ɵstateController(this._card);
        controller.forEach((state) => {
          if (
            state.startsWith('action-role-') ||
            state === 'has-active-action' ||
            state === 'has-action'
          ) {
            controller.delete(state);
          }
        });
        this._card
          .querySelectorAll(`[data-card-focusable]`)
          .forEach((el) => el.removeAttribute('data-card-focusable'));
        this._card = null;
      }
    }

    protected override renderTemplate(): TemplateResult {
      // Due to problems detecting the click event in NVDA screen reader, we can't use the sbb-screen-reader-only component here
      return html`<span class="sbb-screen-reader-only"><slot></slot></span>`;
    }
  }
  return SbbCardActionCommonElement as unknown as AbstractConstructor<SbbCardActionCommonElementMixinType> &
    T;
};
