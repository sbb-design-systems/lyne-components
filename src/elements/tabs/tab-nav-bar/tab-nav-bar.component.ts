import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isLean } from '../../core/dom/lean-context.ts';
import { SbbElementInternalsMixin, SbbNamedSlotListMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { tabLabelCommonStyles } from '../common.ts';

import style from './tab-nav-bar.scss?lit&inline';

/**
 * It displays one or more tab-label-like elements, each one is an anchor element.
 *
 * @slot - Use the unnamed slot to add anchors.
 */
export
@customElement('sbb-tab-nav-bar')
class SbbTabNavBarElement extends SbbNamedSlotListMixin(SbbElementInternalsMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, tabLabelCommonStyles, style];
  public static override readonly role = 'navigation';

  protected override listChildLocalNames = ['a'];

  /**
   * Size variant, either s, l or xl.
   * @default 'l' / 's' (lean)
   */
  @property({ reflect: true })
  public accessor size: 's' | 'l' | 'xl' = isLean() ? 's' : 'l';

  protected override render(): TemplateResult {
    return this.renderList();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab-nav-bar': SbbTabNavBarElement;
  }
}
