import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SbbConnectedAbortController } from '../../core/controllers.js';
import { EventEmitter } from '../../core/eventing.js';
import '../../button/secondary-button.js';
import type { SbbFlipCardDetailsElement } from '../flip-card-details.js';
import type { SbbFlipCardSummaryElement } from '../flip-card-summary.js';

import style from './flip-card.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot summary - Use this slot to provide a sbb-flip-card-summary component.
 * @slot details - Use this slot to provide a sbb-flip-card-details component.
 *
 * @event {CustomEvent<any>} myEventName - TODO: Document this event
 */
@customElement('sbb-flip-card')
export class SbbFlipCardElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    myEventName: 'myEventName',
  } as const;

  /** myProp documentation */
  @property({ attribute: 'my-prop', reflect: true }) public myProp: string = '';

  /** Whether the card is flipped or not. */
  @state() private _flipped = false;

  /** TODO */
  public toggle(): void {
    this._flipped = !this._flipped;
    this.toggleAttribute('data-flipped', this._flipped);
  }

  public get summary(): SbbFlipCardSummaryElement {
    return this.querySelector('sbb-flip-card-summary')!;
  }

  public get details(): SbbFlipCardDetailsElement {
    return this.querySelector('sbb-flip-card-details')!;
  }

  private _abort = new SbbConnectedAbortController(this);
  private _myEvent: EventEmitter<any> = new EventEmitter(
    this,
    SbbFlipCardElement.events.myEventName,
  );

  private _onClickFn(): void {
    this._myEvent.emit();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', () => this._onClickFn(), { signal });
    // do stuff
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('myProp')) {
      // do stuff
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    // do stuff
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card--wrapper">
        <slot name="summary"></slot>
        <slot name="details"></slot>
        <sbb-secondary-button
        class="sbb-flip-card--toggle-button"
        icon-name=${this._flipped ? 'cross-small' : 'plus-small'}
        @click=${() => this.toggle()}
        ></sbb-secondary-button>
        <!-- <button @click=${() => this.toggle()}></button> -->
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-flip-card': SbbFlipCardElement;
  }
}
