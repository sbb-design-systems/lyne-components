import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbCheckboxGroupElement } from '../../checkbox.ts';
import type { SbbRadioButtonGroupElement } from '../../radio-button.ts';
import { forceType } from '../decorators.ts';

import type { AbstractConstructor } from './constructor.ts';
import { ɵstateController } from './element-internals-mixin.ts';

export declare class SbbPanelMixinType {
  public accessor color: 'white' | 'milk';
  public accessor borderless: boolean;
  public accessor expansionState: string;
}

export type SbbPanelSize = 's' | 'm';

/**
 * Mixin for common panel behaviors
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbPanelMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbPanelMixinType> & T => {
  abstract class SbbPanelElement extends superClass implements SbbPanelMixinType {
    /** The background color of the panel. */
    @property({ reflect: true }) public accessor color: 'white' | 'milk' = 'white';

    /** Whether the unselected panel has a border. */
    @forceType()
    @property({ reflect: true, type: Boolean })
    public accessor borderless: boolean = false;

    /** @internal used for accessibility label when in expansion panel */
    @forceType()
    @property()
    public accessor expansionState: string = '';

    public override connectedCallback(): void {
      super.connectedCallback();

      /** @internal */
      this.dispatchEvent(new Event('panelconnected', { bubbles: true }));

      const element = this.closest<SbbRadioButtonGroupElement<unknown> | SbbCheckboxGroupElement>(
        'sbb-radio-button-group, sbb-checkbox-group',
      );
      ɵstateController(element)?.toggle('has-panel', true);
    }
  }

  return SbbPanelElement as AbstractConstructor<SbbPanelMixinType> & T;
};
