import type { TemplateResult } from 'lit';

import { SbbIconNameMixin } from '../../icon.js';
import { SbbSlotStateController } from '../controllers.js';
import { SbbNegativeMixin } from '../mixins.js';

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
