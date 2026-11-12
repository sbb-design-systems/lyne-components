import { type CSSResultGroup, type PropertyValues, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import {
  type AbstractConstructor,
  SbbElement,
  SbbFormAssociatedRadioButtonMixin,
  SbbPropertyWatcherController,
} from '../../core.ts';
import type { SbbRadioButtonGroupElement } from '../../radio-button-group.pure.ts';

import style from './radio-button-common.scss?inline';

export declare abstract class SbbRadioButtonCommonElementMixinType extends SbbFormAssociatedRadioButtonMixin(
  SbbElement,
) {
  public get allowEmptySelection(): boolean;
  public set allowEmptySelection(boolean);
  public get group(): SbbRadioButtonGroupElement | null;
  public select(): void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbRadioButtonCommonElementMixin = <T extends AbstractConstructor<SbbElement>>(
  superClass: T,
): AbstractConstructor<SbbRadioButtonCommonElementMixinType> & T => {
  abstract class SbbRadioButtonCommonElement
    extends SbbFormAssociatedRadioButtonMixin(superClass)
    implements Partial<SbbRadioButtonCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [unsafeCSS(style)];
    public static readonly events = {
      change: 'change',
      input: 'input',
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

    protected constructor() {
      super();
      this.addEventListener?.('click', (e) => this._handleClick(e));
      this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));

      this.addController(
        new SbbPropertyWatcherController(
          this,
          () => this.closest('sbb-radio-button-group'),
          ['disabled', 'required', 'size'].reduce(
            (v, p) => Object.assign(v, { [p]: () => this.requestUpdate(p) }),
            {},
          ),
        ),
      );
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._group = this.closest('sbb-radio-button-group');
    }

    /**
     * Set the radio-button as 'checked'; if 'allowEmptySelection', toggle the checked property.
     * In both cases it emits the change events.
     */
    public select(): void {
      if (this.disabled || this.formDisabled) {
        return;
      }

      if (this.allowEmptySelection) {
        this.checked = !this.checked;
        this.emitChangeEvents();
      } else if (!this.checked) {
        this.checked = true;
        this.emitChangeEvents();
      }
    }

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (changedProperties.has('value')) {
        /** @internal */
        this.dispatchEvent(new Event('ɵradiobuttonvaluechange', { bubbles: true }));
      }
    }

    protected override isDisabledExternally(): boolean {
      return this.group?.disabled ?? false;
    }

    protected override isRequiredExternally(): boolean {
      return this.group?.required ?? false;
    }

    private _handleClick(event: Event): void {
      event.preventDefault();
      this.select();
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
