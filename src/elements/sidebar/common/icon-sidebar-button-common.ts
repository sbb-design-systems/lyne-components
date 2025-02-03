import type { TemplateResult } from 'lit';

import type { SbbActionBaseElement } from '../../core/base-elements.js';
import { slotState } from '../../core/decorators.js';
import type { AbstractConstructor } from '../../core/mixins.js';
import { SbbIconNameMixin, type SbbIconNameMixinType } from '../../icon.js';

export declare class SbbIconSidebarButtonCommonElementMixinType extends SbbIconNameMixinType {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbIconSidebarButtonCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbIconSidebarButtonCommonElementMixinType> & T => {
  @slotState()
  abstract class SbbIconSidebarButtonCommonElementClass
    extends SbbIconNameMixin(superClass)
    implements Partial<SbbIconSidebarButtonCommonElementMixinType>
  {
    protected override renderTemplate(): TemplateResult {
      return super.renderIconSlot();
    }
  }
  return SbbIconSidebarButtonCommonElementClass as unknown as AbstractConstructor<SbbIconSidebarButtonCommonElementMixinType> &
    T;
};
