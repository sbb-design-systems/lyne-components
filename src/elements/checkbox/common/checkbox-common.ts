import { type PropertyValues, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbCheckboxGroupElement } from '../../checkbox-group/checkbox-group.component.ts';
import {
  type AbstractConstructor,
  forceType,
  SbbElement,
  SbbFormAssociatedCheckboxMixin,
} from '../../core.ts';

import checkboxCommonStyleString from './checkbox-common.scss?inline';

export const checkboxCommonStyle = unsafeCSS(checkboxCommonStyleString);

export type SbbCheckboxSize = 'xs' | 's' | 'm';

export declare abstract class SbbCheckboxCommonElementMixinType extends SbbFormAssociatedCheckboxMixin(
  SbbElement,
) {
  public accessor indeterminate: boolean;

  public get group(): SbbCheckboxGroupElement | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbCheckboxCommonElementMixin = <T extends AbstractConstructor<SbbElement>>(
  superClass: T,
): AbstractConstructor<SbbCheckboxCommonElementMixinType> & T => {
  abstract class SbbCheckboxCommonElement
    extends SbbFormAssociatedCheckboxMixin(superClass)
    implements Partial<SbbCheckboxCommonElementMixinType>
  {
    /** Whether the checkbox is indeterminate. */
    @forceType()
    @property({ type: Boolean })
    public accessor indeterminate: boolean = false;

    /** Reference to the connected checkbox group. */
    public get group(): SbbCheckboxGroupElement | null {
      return this._group;
    }
    private _group: SbbCheckboxGroupElement | null = null;

    public override connectedCallback(): void {
      super.connectedCallback();
      this._group = this.closest('sbb-checkbox-group') as SbbCheckboxGroupElement;

      // We need to call requestUpdate to update the reflected attributes
      ['disabled', 'required', 'size'].forEach((p) => this.requestUpdate(p));
    }

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
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
  return SbbCheckboxCommonElement as unknown as AbstractConstructor<SbbCheckboxCommonElementMixinType> &
    T;
};
