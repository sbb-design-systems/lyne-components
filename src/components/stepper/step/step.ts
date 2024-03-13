import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/common-behaviors';
import { isValidAttribute } from '../../core/dom';
import { ConnectedAbortController, EventEmitter } from '../../core/eventing';
import type { SbbStepLabelElement } from '../step-label';
import type { SbbStepperElement } from '../stepper';

import style from './step.scss?lit&inline';

let nextId = 0;

/**
 * Combined with a `sbb-stepper`, it displays a step's content.
 *
 * @slot - Use the unnamed slot to provide a content.
 * @event {CustomEvent<void>} validate - Emits whenever step switch is triggered. Can be canceled.
 */
@hostAttributes({
  slot: 'step',
  role: 'tabpanel',
})
@customElement('sbb-step')
export class SbbStepElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    validate: 'validate',
  } as const;

  /**
   * Emits whenever step switch is triggered.
   */
  private _validate: EventEmitter = new EventEmitter(this, SbbStepElement.events.validate);

  private _abort = new ConnectedAbortController(this);
  private _stepper: SbbStepperElement | null = null;
  private _label: SbbStepLabelElement | null = null;

  public get label(): SbbStepLabelElement | null {
    return this._label;
  }

  public validate(eventData: any): boolean {
    return !!this._validate.emit(eventData);
  }

  private _handleClick(event: Event): void {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isGoNextElement(el as HTMLElement))) {
      this._stepper?.next();
    } else if (composedPathElements.some((el) => this._isGoPreviousElement(el as HTMLElement))) {
      this._stepper?.previous();
    }
  }

  private _isGoNextElement(element: HTMLElement): boolean {
    return element.hasAttribute('sbb-stepper-next') && !isValidAttribute(element, 'disabled');
  }

  private _isGoPreviousElement(element: HTMLElement): boolean {
    return element.hasAttribute('sbb-stepper-previous') && !isValidAttribute(element, 'disabled');
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.id = this.id || `sbb-step-${nextId++}`;
    this.addEventListener('click', (e) => this._handleClick(e), { signal });
    this._stepper = this.closest('sbb-stepper');
    if (this.previousElementSibling?.tagName === 'SBB-STEP-LABEL') {
      this._label = this.previousElementSibling as SbbStepLabelElement;
    }
  }

  protected override firstUpdated(): void {
    if (this.label) {
      this.setAttribute('aria-labelledby', this.label.id);
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-step">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-step': SbbStepElement;
  }
}
