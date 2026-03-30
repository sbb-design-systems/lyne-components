import { unsafeCSS, type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbElement } from '../core/base-elements.ts';

import style from './title-common.scss?inline';

export type SbbTitleLevel = '1' | '2' | '3' | '4' | '5' | '6';

/**
 * It displays a title with a heading role.
 */
export abstract class SbbTitleBase extends SbbElement {
  public static override role = 'heading';
  public static override styles: CSSResultGroup = unsafeCSS(style);

  /** Title level */
  @property({ reflect: true }) public accessor level: SbbTitleLevel = '1';

  /** Visual level for the title. */
  @property({ attribute: 'visual-level', reflect: true })
  public accessor visualLevel: SbbTitleLevel | null = null;

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
