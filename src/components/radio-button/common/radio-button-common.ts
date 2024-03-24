import type { CSSResultGroup, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { hostAttributes, type AbstractConstructor } from '../../core/common-behaviors';
import {
  ConnectedAbortController,
  HandlerRepository,
  formElementHandlerAspect,
} from '../../core/eventing';
import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbStateChange,
} from '../../core/interfaces';
import type { SbbRadioButtonGroupElement } from '../radio-button-group';

import style from './radio-button-common.scss?lit&inline';

export type SbbRadioButtonSize = 's' | 'm';

export type SbbRadioButtonStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

export declare class SbbRadioButtonCommonElementMixinType {
  public allowEmptySelection: boolean;
  public value?: string;
  public disabled: boolean;
  public required: boolean;
  public get group(): SbbRadioButtonGroupElement | null;
  public checked: boolean;
  public size: SbbRadioButtonSize;
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
    public static styles: CSSResultGroup = style;

    /**
     * Whether the radio can be deselected.
     */
    @property({ attribute: 'allow-empty-selection', type: Boolean })
    public set allowEmptySelection(value: boolean) {
      this._allowEmptySelection = value;
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
      this._disabled = value;
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
      this._required = value;
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
    @property({ reflect: true, type: Boolean }) public checked = false;

    /**
     * Label size variant, either m or s.
     */
    @property({ reflect: true })
    public set size(value: SbbRadioButtonSize) {
      this._size = value;
    }
    public get size(): SbbRadioButtonSize {
      return this.group?.size ?? this._size;
    }
    private _size: SbbRadioButtonSize = 'm';

    private _abort = new ConnectedAbortController(this);
    private _handlerRepository = new HandlerRepository(this, formElementHandlerAspect);

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
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
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
