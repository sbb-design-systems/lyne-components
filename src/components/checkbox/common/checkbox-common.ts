import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbStateChange,
} from '../../core/interfaces/index.js';
import {
  SbbFormAssociatedCheckboxMixin,
  SbbHydrationMixin,
  type Constructor,
  type SbbDisabledMixinType,
  type SbbFormAssociatedCheckboxMixinType,
  type SbbHydrationMixinType,
  type SbbRequiredMixinType,
} from '../../core/mixins/index.js';
import type { SbbCheckboxGroupElement } from '../checkbox-group/index.js';

export type SbbCheckboxStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

export declare class SbbCheckboxCommonElementMixinType
  extends SbbFormAssociatedCheckboxMixinType
  implements
    Partial<SbbDisabledMixinType>,
    Partial<SbbRequiredMixinType>,
    Partial<SbbHydrationMixinType>
{
  public indeterminate: boolean;

  public get group(): SbbCheckboxGroupElement | null;

  public get hydrationComplete(): Promise<boolean>;

  protected recoverSsrState?(): void;
  protected getAndRemoveAttribute(name: string): string | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbCheckboxCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbCheckboxCommonElementMixinType> & T => {
  abstract class SbbCheckboxCommonElement
    extends SbbFormAssociatedCheckboxMixin(SbbHydrationMixin(superClass))
    implements Partial<SbbCheckboxCommonElementMixinType>
  {
    /** Whether the checkbox is indeterminate. */
    @property({ type: Boolean }) public indeterminate = false;

    /** Reference to the connected checkbox group. */
    public get group(): SbbCheckboxGroupElement | null {
      return this._group;
    }
    private _group: SbbCheckboxGroupElement | null = null;

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
