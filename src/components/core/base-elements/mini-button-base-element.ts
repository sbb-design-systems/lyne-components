import type { TemplateResult } from 'lit';

import { SbbIconNameMixin } from '../../icon/index.js';
import { SbbSlotStateController } from '../controllers/index.js';
import { SbbNegativeMixin } from '../mixins/index.js';

import { SbbButtonBaseElement } from './button-base-element.js';

export abstract class SbbMiniButtonBaseElement extends SbbNegativeMixin(
  SbbIconNameMixin(SbbButtonBaseElement),
) {
  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }
}
