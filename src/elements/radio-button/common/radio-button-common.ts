import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { setModalityOnNextFocus } from '../../core/a11y.js';
import { EventEmitter } from '../../core/eventing.js';
import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbStateChange,
} from '../../core/interfaces.js';
import {
  type AbstractConstructor,
  type Constructor,
  SbbFormAssociatedRadioButtonMixin,
  type SbbFormAssociatedRadioButtonMixinType,
} from '../../core/mixins.js';
import type { SbbRadioButtonGroupElement } from '../radio-button-group.js';

export type SbbRadioButtonSize = 'xs' | 's' | 'm';

export type SbbRadioButtonStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

export declare class SbbRadioButtonCommonElementMixinType extends SbbFormAssociatedRadioButtonMixinType {
  public get allowEmptySelection(): boolean;
  public set allowEmptySelection(boolean);
  public get group(): SbbRadioButtonGroupElement | null;
  public select(): void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbRadioButtonCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbRadioButtonCommonElementMixinType> & T => {
  abstract class SbbRadioButtonCommonElement
    extends SbbFormAssociatedRadioButtonMixin(superClass)
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
     * Reference to the connected radio button group.
     */
    public get group(): SbbRadioButtonGroupElement | null {
      return this._group;
    }
    private _group: SbbRadioButtonGroupElement | null = null;

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

    public override connectedCallback(): void {
      super.connectedCallback();
      this._group = this.closest('sbb-radio-button-group') as SbbRadioButtonGroupElement;

      const signal = this.abort.signal;
      this.addEventListener('click', (e) => this._handleClick(e), { signal });
      this.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal });

      // We need to call requestUpdate to update the reflected attributes
      ['disabled', 'required', 'size'].forEach((p) => this.requestUpdate(p));
    }

    public select(): void {
      if (this.disabled || this.formDisabled) {
        return;
      }

      if (this.allowEmptySelection) {
        this.checked = !this.checked;
      } else if (!this.checked) {
        this.checked = true;
      }
    }

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (changedProperties.has('checked')) {
        if (this.checked !== changedProperties.get('checked')!) {
          this._stateChange.emit({ type: 'checked', checked: this.checked });
        }
      }
      if (changedProperties.has('disabled')) {
        if (this.disabled !== changedProperties.get('disabled')!) {
          this._stateChange.emit({ type: 'disabled', disabled: this.disabled });
        }
      }
    }

    protected override isDisabledExternally(): boolean {
      return this.group?.disabled ?? false;
    }

    protected override isRequiredExternally(): boolean {
      return this.group?.required ?? false;
    }

    private async _handleClick(event: Event): Promise<void> {
      event.preventDefault();
      this.select();

      await this.updateComplete; // wait for 'tabindex' to be updated
      setModalityOnNextFocus(this);
      this.focus();
    }

    private _handleKeyDown(evt: KeyboardEvent): void {
      if (evt.code === 'Space') {
        evt.preventDefault();
        this.select();
      }
    }
  }

  return SbbRadioButtonCommonElement as unknown as AbstractConstructor<SbbRadioButtonCommonElementMixinType> &
    T;
};
