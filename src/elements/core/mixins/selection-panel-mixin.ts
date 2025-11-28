import type { LitElement } from 'lit';

import type { SbbCheckboxGroupElement } from '../../checkbox/checkbox-group.ts';
import type { SbbCheckboxPanelElement } from '../../checkbox/checkbox-panel.ts';
import type { SbbRadioButtonGroupElement } from '../../radio-button/radio-button-group.ts';
import type { SbbRadioButtonPanelElement } from '../../radio-button/radio-button-panel.ts';
import { SbbPropertyWatcherController } from '../controllers.ts';

import type { AbstractConstructor } from './constructor.ts';
import {
  SbbElementInternalsMixin,
  type SbbElementInternalsMixinType,
} from './element-internals-mixin.ts';

export declare class SbbSelectionPanelMixinType {
  public get panel(): SbbRadioButtonPanelElement | SbbCheckboxPanelElement | null;
  public get group(): SbbRadioButtonGroupElement | SbbCheckboxGroupElement | null;

  protected onInputStateChange?(): void;
}

/**
 * Mixin for common selection panel behaviors
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbSelectionPanelMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbSelectionPanelMixinType & SbbElementInternalsMixinType> & T => {
  abstract class SbbSelectionPanelElement
    extends SbbElementInternalsMixin(superClass)
    implements Partial<SbbSelectionPanelMixinType>
  {
    /** Group element if present */
    public get group(): SbbRadioButtonGroupElement | SbbCheckboxGroupElement | null {
      return this.closest?.('sbb-radio-button-group, sbb-checkbox-group') ?? null;
    }

    /** Input panel element */
    public get panel(): SbbCheckboxPanelElement | SbbRadioButtonPanelElement | null {
      return this.querySelector?.('sbb-radio-button-panel, sbb-checkbox-panel') ?? null;
    }

    private _previousSize?: (SbbCheckboxPanelElement | SbbRadioButtonPanelElement)['size'];
    private _previousColor?: (SbbCheckboxPanelElement | SbbRadioButtonPanelElement)['color'];

    private _propertyWatcher = new SbbPropertyWatcherController(this, () => this.panel, {
      checked: (panel) => {
        this.toggleState('checked', panel.checked);
        this.onInputStateChange?.();
      },
      disabled: (panel) => {
        this.toggleState('disabled', panel.disabled);
        this.onInputStateChange?.();
      },
      size: (panel) => {
        if (this._previousSize) {
          this.internals.states.delete(`size-${this._previousSize}`);
        }
        this._previousSize = panel.size;
        if (this._previousSize) {
          this.internals.states.add(`size-${this._previousSize}`);
        }
      },
      borderless: (panel) => {
        this.toggleState('borderless', panel.borderless);
      },
      color: (panel) => {
        if (this._previousColor) {
          this.internals.states.delete(`color-${this._previousColor}`);
        }
        this._previousColor = panel.color;
        if (this._previousColor) {
          this.internals.states.add(`color-${this._previousColor}`);
        }
      },
    });

    protected constructor(...args: any[]) {
      super(args);
      this.addEventListener?.('panelconnected', () => this._propertyWatcher.connect());
    }

    protected onInputStateChange?(): void {}
  }

  return SbbSelectionPanelElement as unknown as AbstractConstructor<
    SbbSelectionPanelMixinType & SbbElementInternalsMixinType
  > &
    T;
};
