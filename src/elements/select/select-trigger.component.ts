import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { isSafari, SbbElement, SbbPropertyWatcherController } from '../core.ts';

import style from './select-trigger.scss?inline';
import type { SbbSelectElement } from './select.component.ts';

/**
 * Internal component for the select trigger
 *
 * @slot - Use the unnamed slot to add content
 */
export class SbbSelectTriggerElement<T = string> extends SbbElement {
  public static override readonly elementName: string = 'sbb-select-trigger';
  public static override readonly role = 'combobox';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  public set select(select: SbbSelectElement<T> | null) {
    if (select === this._select) {
      return;
    }
    if (this._select) {
      this._select.removeEventListener('open', this._openListener);
      this._select.removeEventListener('close', this._closeListener);
    }
    if (this._selectPropertyWatcher) {
      this.removeController(this._selectPropertyWatcher);
    }
    this.internals.ariaControlsElements = null;

    this._select = select;

    if (!this._select) {
      return;
    }

    this._selectPropertyWatcher = new SbbPropertyWatcherController(this, () => this._select, {
      required: (s) => (this.internals.ariaRequired = s.required ? `${s.required}` : null),
    });

    this._select.addEventListener('open', this._openListener);
    this._select.addEventListener('close', this._closeListener);

    // As the trigger is only used and controlled by the sbb-select, we can guarantee that the shadowRoot is ready.
    const overlay = this._select.shadowRoot!.querySelector('.sbb-option-panel__overlay')!;
    this.internals.ariaControlsElements = [isSafari ? this._select : overlay];
  }

  public get select(): SbbSelectElement<T> | null {
    return this._select;
  }
  private _select: SbbSelectElement<T> | null = null;

  private _selectPropertyWatcher: SbbPropertyWatcherController<SbbSelectElement<T>> | null = null;

  public constructor() {
    super();

    this.internals.ariaExpanded = 'false';
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this.toggleState('in-form-field', !!this.closest('sbb-form-field'));
  }

  private _closeListener: () => void = () => (this.internals.ariaExpanded = 'false');
  private _openListener: () => void = () => (this.internals.ariaExpanded = 'true');

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-select-trigger': SbbSelectTriggerElement;
  }
}
