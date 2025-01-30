import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.js';
import type { AbstractConstructor } from '../../core/mixins.js';

export declare abstract class SbbSidebarMixinType<C> extends LitElement {
  public accessor position: 'start' | 'end';
  public accessor color: 'white' | 'milk';
  public abstract get container(): C | null;
}

/**
 * Enhance your component with sidebar position and color properties.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbSidebarMixin = <C, T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbSidebarMixinType<C>> & T => {
  abstract class SbbSidebarElement extends superClass implements Partial<SbbSidebarMixinType<C>> {
    /** The side that the sidebar is attached to. */
    @forceType((v) => (v === 'end' ? 'end' : 'start'))
    @property({ reflect: true })
    public accessor position: 'start' | 'end' = 'start';

    /** Background color of the sidebar. Either `white` or `milk`. **/
    @forceType((v) => (v === 'milk' ? 'milk' : 'white'))
    @property({ reflect: true })
    public accessor color: 'white' | 'milk' = 'white';

    /** Returns the container element where this sidebar is contained. */
    public abstract get container(): C | null;
  }

  return SbbSidebarElement as unknown as AbstractConstructor<SbbSidebarMixinType<C>> & T;
};
