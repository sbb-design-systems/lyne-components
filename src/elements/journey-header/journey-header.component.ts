import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbLanguageController } from '../core/controllers.ts';
import { forceType } from '../core/decorators.ts';
import { isLean } from '../core/dom.ts';
import { i18nConnectionFrom, i18nConnectionRoundtrip, i18nConnectionTo } from '../core/i18n.ts';
import { SbbNegativeMixin } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';
import { SbbTitleBase, type SbbTitleLevel } from '../title.ts';

import style from './journey-header.scss?lit&inline';

import '../icon.ts';
import '../screen-reader-only.ts';

export type JourneyHeaderSize = 's' | 'm' | 'l';

const sizeToLevel: Map<JourneyHeaderSize, SbbTitleLevel> = new Map<
  JourneyHeaderSize,
  SbbTitleLevel
>([
  ['s', '6'],
  ['m', '5'],
  ['l', '4'],
]);

/**
 * Combined with the `sbb-journey-summary`, it displays the journey's detail.
 */
export
@customElement('sbb-journey-header')
class SbbJourneyHeaderElement extends SbbNegativeMixin(SbbTitleBase) {
  public static override styles: CSSResultGroup = [boxSizingStyles, SbbTitleBase.styles, style];

  /** Origin location for the journey header. */
  @forceType()
  @property()
  public accessor origin: string = '';

  /** Destination location for the journey header. */
  @forceType()
  @property()
  public accessor destination: string = '';

  /** Whether the journey is a round trip. If so, the icon changes to a round-trip one. */
  @forceType()
  @property({ attribute: 'round-trip', type: Boolean })
  public accessor roundTrip: boolean = false;

  /**
   * Journey header size, either s, m or l.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: JourneyHeaderSize = isLean() ? 's' : 'm';

  private _language = new SbbLanguageController(this);

  public constructor() {
    super();

    this.level = '3' as this['level'];
    this.visualLevel = sizeToLevel.get(this.size) ?? null;
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('size')) {
      this.visualLevel = sizeToLevel.get(this.size) ?? null;
    }
  }

  protected override render(): TemplateResult {
    const iconName = this.roundTrip ? 'arrows-long-right-left-small' : 'arrow-long-right-small';
    const a11yString = `${i18nConnectionFrom[this._language.current]} ${this.origin} ${i18nConnectionTo[this._language.current]} ${this.destination} ${this.roundTrip ? i18nConnectionRoundtrip(this.origin)[this._language.current] : ''}`;

    return html`
      <span class="sbb-journey-header" aria-hidden="true">
        <span class="sbb-journey-header__origin">${this.origin}</span>
        <sbb-icon name=${iconName}></sbb-icon>
        <span class="sbb-journey-header__destination">${this.destination}</span>
      </span>
      <sbb-screen-reader-only>${a11yString}</sbb-screen-reader-only>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-journey-header': SbbJourneyHeaderElement;
  }
}
