import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/base-elements.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';
import { iconSidebarButtonCommonStyle } from '../../sidebar/common.ts';
import type { SbbTooltipDefaultPositions } from '../../tooltip.ts';

/**
 * Link to be placed inside `sbb-icon-sidebar`.
 *
 * @slot icon - Slot used to display the icon.
 */
export
@customElement('sbb-icon-sidebar-link')
class SbbIconSidebarLinkElement
  extends SbbIconNameMixin(SbbLinkBaseElement)
  implements SbbTooltipDefaultPositions
{
  public static override styles: CSSResultGroup = [boxSizingStyles, iconSidebarButtonCommonStyle];
  /** @internal */
  public readonly tooltipPositions = ['inline-end', 'inline-start'];

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-icon-sidebar-link': SbbIconSidebarLinkElement;
  }
}
