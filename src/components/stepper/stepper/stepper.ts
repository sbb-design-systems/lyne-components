import {
  type CSSResultGroup,
  html,
  LitElement,
  type TemplateResult,
  type PropertyValues,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ConnectedAbortController, EventEmitter } from '../../core/eventing';

import style from './stepper.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 * @event {CustomEvent<any>} myEventName - TODO: Document this event
 */
@customElement('sbb-stepper')
export class SbbStepperElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    myEventName: 'myEventName',
  } as const;

  /** myProp documentation */
  @property({ attribute: 'my-prop', reflect: true }) public myProp: string = '';

  private _abort = new ConnectedAbortController(this);
  private _myEvent: EventEmitter<any> = new EventEmitter(
    this,
    SbbStepperElement.events.myEventName,
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
      <div class="sbb-stepper">
        <slot name="step-label"></slot>
        <slot name="step"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-stepper': SbbStepperElement;
  }
}
