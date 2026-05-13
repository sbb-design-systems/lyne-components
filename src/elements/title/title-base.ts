import { type CSSResultGroup, type PropertyValues, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbElement, type SbbHeadingLevel } from '../core.ts';

import style from './title-common.scss?inline';

/**
 * It displays a title with a heading role.
 */
export abstract class SbbTitleBase extends SbbElement {
  public static override role = 'heading';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  /** Title level */
  @property({ reflect: true }) public accessor level: SbbHeadingLevel = '1';

  /** Visual level for the title. */
  @property({ attribute: 'visual-level', reflect: true })
  public accessor visualLevel: SbbHeadingLevel | null = null;

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('level')) {
      this.internals.ariaLevel = this.level;
    }
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
