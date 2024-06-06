import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { AbstractConstructor } from './constructor.js';

export declare class SbbPanelMixinType {
  public color: 'white' | 'milk';
  public borderless: boolean;
}

/**
 * Mixin for common panel behaviors
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbPanelMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbPanelMixinType> & T => {
  abstract class SbbPanelElement extends superClass implements SbbPanelMixinType {
    /** The background color of the panel. */
    @property() public color: 'white' | 'milk' = 'white';

    /** Whether the unselected panel has a border. */
    @property({ reflect: true, type: Boolean }) public borderless = false;
  }

  return SbbPanelElement as AbstractConstructor<SbbPanelMixinType> & T;
};
