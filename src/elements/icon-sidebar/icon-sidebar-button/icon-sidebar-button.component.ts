import type { CSSResultGroup, TemplateResult } from 'lit';

import { SbbButtonBaseElement, boxSizingStyles } from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';
import { iconSidebarButtonCommonStyle } from '../../sidebar/common/styles.ts';
import type { SbbTooltipDefaultPositions } from '../../tooltip.pure.ts';

/**
 * Button to be placed inside `sbb-icon-sidebar`.
 *
 * @slot icon - Slot used to display the icon.
 */
export class SbbIconSidebarButtonElement
  extends SbbIconNameMixin(SbbButtonBaseElement)
  implements SbbTooltipDefaultPositions
{
  public static override readonly elementName: string = 'sbb-icon-sidebar-button';
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
    'sbb-icon-sidebar-button': SbbIconSidebarButtonElement;
  }
}
