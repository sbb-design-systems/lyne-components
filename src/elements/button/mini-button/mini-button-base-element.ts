import type { TemplateResult } from 'lit';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { slotState } from '../../core/decorators.js';
import { SbbNegativeMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';

export
@slotState()
abstract class SbbMiniButtonBaseElement extends SbbNegativeMixin(
  SbbIconNameMixin(SbbButtonBaseElement),
) {
  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }
}
