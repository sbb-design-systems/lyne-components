import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbConnectedAbortController } from '../../core/controllers.js';
import { hostAttributes } from '../../core/decorators.js';
import { setOrRemoveAttribute } from '../../core/dom.js';
import { EventEmitter, HandlerRepository, formElementHandlerAspect } from '../../core/eventing.js';
import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbStateChange,
} from '../../core/interfaces.js';
import type { AbstractConstructor } from '../../core/mixins.js';
import type { SbbRadioButtonGroupElement } from '../radio-button-group.js';

export type SbbRadioButtonSize = 'xs' | 's' | 'm';

export type SbbRadioButtonStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

export declare class SbbRadioButtonCommonElementMixinType {
  public get allowEmptySelection(): boolean;
  public set allowEmptySelection(boolean);
  public value?: string;
  public get disabled(): boolean;
  public set disabled(boolean);
  public get required(): boolean;
  public set required(boolean);
  public get group(): SbbRadioButtonGroupElement | null;
  public get checked(): boolean;
  public set checked(boolean);
  public select(): void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbRadioButtonCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbRadioButtonCommonElementMixinType> & T => {
  @hostAttributes({
    role: 'radio',
  })
  abstract class SbbRadioButtonCommonElement
    extends superClass
    implements Partial<SbbRadioButtonCommonElementMixinType>
  {
    public static readonly events = {
      stateChange: 'stateChange',
    } as const;

    /**
     * Whether the radio can be deselected.
     */
    @property({ attribute: 'allow-empty-selection', type: Boolean })
    public set allowEmptySelection(value: boolean) {
      this._allowEmptySelection = Boolean(value);
    }
    public get allowEmptySelection(): boolean {
      return this._allowEmptySelection || (this.group?.allowEmptySelection ?? false);
    }
    private _allowEmptySelection = false;

    /**
     * Value of radio button.
     */
    @property() public value?: string;

    /**
     * Whether the radio button is disabled.
     */
    @property({ reflect: true, type: Boolean })
    public set disabled(value: boolean) {
      this._disabled = Boolean(value);
    }
    public get disabled(): boolean {
      return this._disabled || (this.group?.disabled ?? false);
    }
    private _disabled = false;

    /**
     * Whether the radio button is required.
     */
    @property({ reflect: true, type: Boolean })
    public set required(value: boolean) {
      this._required = Boolean(value);
    }
    public get required(): boolean {
      return this._required || (this.group?.required ?? false);
    }
    private _required = false;

    /**
     * Reference to the connected radio button group.
     */
    public get group(): SbbRadioButtonGroupElement | null {
      return this._group;
    }
    private _group: SbbRadioButtonGroupElement | null = null;

    /**
     * Whether the radio button is checked.
     */
    @property({ reflect: true, type: Boolean })
    public set checked(value: boolean) {
      this._checked = Boolean(value);
    }
    public get checked(): boolean {
      return this._checked;
    }
    private _checked = false;

    private _abort = new SbbConnectedAbortController(this);
    private _handlerRepository = new HandlerRepository(this, formElementHandlerAspect);

    /**
     * @internal
     * Internal event that emits whenever the state of the radio option
     * in relation to the parent selection panel changes.
     */
    private _stateChange: EventEmitter<SbbRadioButtonStateChange> = new EventEmitter(
      this,
      SbbRadioButtonCommonElement.events.stateChange,
      { bubbles: true },
    );

    public select(): void {
      if (this.disabled) {
        return;
      }

      if (this.allowEmptySelection) {
        this.checked = !this.checked;
      } else if (!this.checked) {
        this.checked = true;
      }
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._group = this.closest('sbb-radio-button-group') as SbbRadioButtonGroupElement;

      const signal = this._abort.signal;
      this.addEventListener('click', (e) => this._handleClick(e), { signal });
      this.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal });
      this._handlerRepository.connect();

      // We need to call requestUpdate to update the reflected attributes
      ['disabled', 'required', 'size'].forEach((p) => this.requestUpdate(p));
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
    }

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (changedProperties.has('checked')) {
        this.setAttribute('aria-checked', `${this.checked}`);
        if (this.checked !== changedProperties.get('checked')!) {
          this._stateChange.emit({ type: 'checked', checked: this.checked });
        }
      }
      if (changedProperties.has('disabled')) {
        setOrRemoveAttribute(this, 'aria-disabled', this.disabled ? 'true' : null);
        if (this.disabled !== changedProperties.get('disabled')!) {
          this._stateChange.emit({ type: 'disabled', disabled: this.disabled });
        }
      }
      if (changedProperties.has('required')) {
        this.setAttribute('aria-required', `${this.required}`);
      }
    }

    private _handleClick(event: Event): void {
      event.preventDefault();
      this.select();
    }

    private _handleKeyDown(evt: KeyboardEvent): void {
      if (evt.code === 'Space') {
        this.select();
      }
    }
  }

  return SbbRadioButtonCommonElement as unknown as AbstractConstructor<SbbRadioButtonCommonElementMixinType> &
    T;
};
