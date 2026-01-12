import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
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

  private _resizeController = new ResizeController(this, {
    target: null,
    callback: () => this._onTabGroupElementResize(),
  });

  private _lastObservedTarget: Element | null = null;

  private _onTabGroupElementResize(): void {
    this.listChildren.forEach((anchor) => {
      anchor?.toggleAttribute(
        'data-has-divider',
        anchor === this.listChildren[0] || anchor.offsetLeft === this.listChildren[0].offsetLeft,
      );
    });

    this.style.setProperty(
      '--sbb-tab-nav-bar-width',
      `${this.shadowRoot?.firstElementChild?.clientWidth}px`,
    );
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._updateWidthObserver();

    // Whenever slotted element change, the target to observe might change as well
    // (change from single to multiple elements or vice versa).
    this.shadowRoot?.addEventListener('slotchange', () => this._updateWidthObserver());
  }

  private _updateWidthObserver(): void {
    const target = this.shadowRoot?.querySelector(`.${this.localName}`);

    if (target && this._lastObservedTarget !== target) {
      if (this._lastObservedTarget) {
        this._resizeController.unobserve(this._lastObservedTarget);
      }
      this._lastObservedTarget = target;
      this._resizeController.observe(target);
    } else if (!target && this._lastObservedTarget) {
      this._resizeController.unobserve(this._lastObservedTarget);
      this._lastObservedTarget = null;
    }
  }

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
