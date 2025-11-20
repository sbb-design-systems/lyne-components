import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbElementInternalsMixin } from '../core/mixins.ts';

import style from './title-common.scss?lit&inline';

export type SbbTitleLevel = '1' | '2' | '3' | '4' | '5' | '6';

/**
 * It displays a title with a heading role.
 */
export abstract class SbbTitleBase extends SbbElementInternalsMixin(LitElement) {
  public static override role = 'heading';
  public static override styles: CSSResultGroup = style;

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
