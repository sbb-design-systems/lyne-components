import { type LitElement, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbCheckboxSize } from '../../checkbox/common/checkbox-common.ts';
import type { SbbCheckboxGroupElement } from '../../checkbox-group.pure.ts';
import type { SbbRadioButtonSize } from '../../radio-button/common/radio-button-common.ts';
import type { SbbRadioButtonGroupElement } from '../../radio-button-group.pure.ts';
import { forceType } from '../decorators/force-type.ts';
import { getOverride } from '../decorators/get-override.ts';
import { isLean } from '../dom/lean-context.ts';

import type { AbstractConstructor } from './constructor.ts';
import panelCommonStyleString from './panel-common.scss?inline';

export const panelCommonStyle = unsafeCSS(panelCommonStyleString);

interface SbbPanelWithGroup {
  group: SbbCheckboxGroupElement | SbbRadioButtonGroupElement | null;
}

export declare class SbbPanelMixinType {
  public accessor color: 'white' | 'milk';
  public accessor borderless: boolean;
  public accessor expansionState: string;
  public accessor size: SbbCheckboxSize | SbbRadioButtonSize;
}

/**
 * Mixin for common panel behaviors
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbPanelMixin = <T extends AbstractConstructor<LitElement & SbbPanelWithGroup>>(
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

    /**
     * Size variant, either xs, s or m.
     * @default 'm' / 'xs' (lean)
     */
    @property({ reflect: true })
    @getOverride((p: SbbPanelElement, v) => p.group?.size ?? v)
    public accessor size: SbbCheckboxSize | SbbRadioButtonSize = isLean() ? 'xs' : 'm';

    public override connectedCallback(): void {
      super.connectedCallback();

      // TODO: Analyze and optimized maybe with PropertyWatcher or lit context
      /** @internal */
      this.dispatchEvent(new Event('panelconnected', { bubbles: true }));
    }
  }

  return SbbPanelElement as AbstractConstructor<SbbPanelMixinType> & T;
};
