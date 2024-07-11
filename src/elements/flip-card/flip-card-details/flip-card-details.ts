import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SbbConnectedAbortController } from '../../core/controllers.js';
import { hostAttributes } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';

import style from './flip-card-details.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @event {CustomEvent<any>} myEventName - TODO: Document this event
 */
@customElement('sbb-flip-card-details')
@hostAttributes({
  slot: 'details',
})
export class SbbFlipCardDetailsElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    myEventName: 'myEventName',
  } as const;

  /** myProp documentation */
  @property({ attribute: 'my-prop', reflect: true }) public myProp: string = '';

  /** _myState documentation */
  @state() private _myState = false;

  private _abort = new SbbConnectedAbortController(this);
  private _myEvent: EventEmitter<any> = new EventEmitter(
    this,
    SbbFlipCardDetailsElement.events.myEventName,
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
      <div class="sbb-flip-card-details--wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-flip-card-details': SbbFlipCardDetailsElement;
  }
}
