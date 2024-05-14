import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { EventEmitter } from '../../core/eventing.js';
import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbStateChange,
} from '../../core/interfaces.js';
import {
  SbbFormAssociatedCheckboxMixin,
  type Constructor,
  type SbbDisabledMixinType,
  type SbbFormAssociatedCheckboxMixinType,
  type SbbRequiredMixinType,
} from '../../core/mixins.js';
import type { SbbCheckboxGroupElement } from '../checkbox-group.js';

export type SbbCheckboxStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

export declare class SbbCheckboxCommonElementMixinType
  extends SbbFormAssociatedCheckboxMixinType
  implements Partial<SbbDisabledMixinType>, Partial<SbbRequiredMixinType>
{
  public indeterminate: boolean;

  public get group(): SbbCheckboxGroupElement | null;

  protected stateChange: EventEmitter<SbbCheckboxStateChange>;
  protected checkboxLoaded: EventEmitter<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbCheckboxCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbCheckboxCommonElementMixinType> & T => {
  abstract class SbbCheckboxCommonElement
    extends SbbFormAssociatedCheckboxMixin(superClass)
    implements Partial<SbbCheckboxCommonElementMixinType>
  {
    public static readonly events = {
      didChange: 'didChange',
      stateChange: 'stateChange',
      checkboxLoaded: 'checkboxLoaded',
    } as const;

    /** Whether the checkbox is indeterminate. */
    @property({ type: Boolean }) public indeterminate = false;

    /** Reference to the connected checkbox group. */
    public get group(): SbbCheckboxGroupElement | null {
      return this._group;
    }
    private _group: SbbCheckboxGroupElement | null = null;

    /**
     * @internal
     * Internal event that emits whenever the state of the checkbox
     * in relation to the parent selection panel changes.
     */
    protected stateChange: EventEmitter<SbbCheckboxStateChange> = new EventEmitter(
      this,
      SbbCheckboxCommonElement.events.stateChange,
      { bubbles: true },
    );

    /**
     * @internal
     * Internal event that emits when the checkbox is loaded.
     */
    protected checkboxLoaded: EventEmitter<void> = new EventEmitter(
      this,
      SbbCheckboxCommonElement.events.checkboxLoaded,
      { bubbles: true },
    );

    public override connectedCallback(): void {
      super.connectedCallback();
      this._group = this.closest('sbb-checkbox-group') as SbbCheckboxGroupElement;
    }

    protected override async willUpdate(changedProperties: PropertyValues<this>): Promise<void> {
      super.willUpdate(changedProperties);

      if (changedProperties.has('checked') || changedProperties.has('indeterminate')) {
        this.internals.ariaChecked = this.indeterminate ? 'mixed' : `${this.checked}`;
      }
    }

    protected override isDisabledExternally(): boolean {
      return this.group?.disabled ?? false;
    }

    protected override isRequiredExternally(): boolean {
      return this.group?.required ?? false;
    }

    protected override withUserInteraction(): void {
      if (this.indeterminate) {
        this.indeterminate = false;
      }
    }
  }
  return SbbCheckboxCommonElement as unknown as Constructor<SbbCheckboxCommonElementMixinType> & T;
};
