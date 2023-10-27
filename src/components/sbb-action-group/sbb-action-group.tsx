import { CSSResult, html, LitElement, TemplateResult, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Style from './sbb-action-group.scss?lit&inline';
import { SbbHorizontalFrom, SbbOrientation } from '../../global/types';
import { SbbButtonSize } from '../sbb-button';
import { SbbLinkSize } from '../sbb-link';

/**
 * @slot unnamed - Slot to render the content inside the container.
 */
@customElement('sbb-action-group')
export class SbbActionGroup extends LitElement {
  public static override styles: CSSResult = Style;

  /**
   * Set the slotted `<sbb-action-group>` children's alignment.
   */
  @property({ attribute: 'align-group', reflect: true })
  public alignGroup: 'start' | 'center' | 'stretch' | 'end' = 'start';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @property({ attribute: 'horizontal-from', reflect: true })
  public horizontalFrom?: SbbHorizontalFrom = 'medium';

  /**
   * Indicates the orientation of the components inside the `<sbb-action-group>`.
   */
  @property({ reflect: true })
  public orientation: SbbOrientation = 'horizontal';

  /**
   * Size of the nested sbb-button instances. This will overwrite the size attribute of nested
   * sbb-button instances.
   */
  @property({ attribute: 'button-size', reflect: true })
  public buttonSize?: SbbButtonSize = 'l';

  /**
   * Size of the nested sbb-link instances. This will overwrite the size attribute of nested
   * sbb-link instances.
   */
  @property({ attribute: 'link-size', reflect: true })
  public linkSize?: SbbLinkSize = 'm';

  private _syncButtons(): void {
    this.querySelectorAll('sbb-button').forEach((b) => (b.size = this.buttonSize));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('buttonSize')) {
      this._syncButtons();
    }
    if (changedProperties.has('linkSize')) {
      this._syncLinks();
    }
  }

  private _syncLinks(): void {
    this.querySelectorAll('sbb-link').forEach((link) => {
      link.variant = 'block';
      link.size = this.linkSize;
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-action-group">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-action-group': SbbActionGroup;
  }
}
