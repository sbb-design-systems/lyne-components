import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType } from '../decorators/force-type.js';

import type { AbstractConstructor } from './constructor.js';

export declare class SbbReadonlyMixinType {
  public accessor readOnly: boolean;
}

/**
 * Enhance your component with a readonly property.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbReadonlyMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbReadonlyMixinType> & T => {
  abstract class SbbReadonlyElement extends superClass implements Partial<SbbReadonlyMixinType> {
    /**
     * Whether the component is readonly.
     */
    @forceType()
    @property({ type: Boolean, attribute: 'readonly' })
    public set readOnly(value: boolean) {
      this.toggleAttribute('readonly', value);
      this.requestUpdate?.();
    }
    public get readOnly(): boolean {
      return this.hasAttribute('readonly');
    }
  }

  return SbbReadonlyElement as unknown as AbstractConstructor<SbbReadonlyMixinType> & T;
};
