import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type AbstractConstructor,
  type SbbActionBaseElement,
  screenReaderOnlyStyles,
  ɵstateController,
} from '../../core.ts';
import type { SbbCardElement } from '../card/card.component.ts';

import style from './card-action.scss?inline';

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
    public static styles: CSSResultGroup = [screenReaderOnlyStyles, unsafeCSS(style)];

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

    private _onActiveChange(): void {
      if (this._card) {
        ɵstateController(this._card).toggle('has-active-action', this.active);
      }
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._card = this.closest?.('sbb-card');
      if (this._card) {
        const controller = ɵstateController(this._card);
        controller.add('has-action');
        controller.toggle('has-active-action', this.active);
        controller.add(`action-role-${this.actionRole}`);
        controller.delete(`action-role-${this.actionRole === 'button' ? 'link' : 'button'}`);
      }
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      if (this._card) {
        const controller = ɵstateController(this._card);
        controller.delete('has-action');
        controller.delete('has-active-action');
        controller.delete('action-role-button');
        controller.delete('action-role-link');
        this._card = null;
      }
    }

    protected override renderTemplate(): TemplateResult {
      return html`<span class="sbb-screen-reader-only"><slot></slot></span>`;
    }
  }
  return SbbCardActionCommonElement as unknown as AbstractConstructor<SbbCardActionCommonElementMixinType> &
    T;
};
