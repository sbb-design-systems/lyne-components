import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { i18nOccupancy } from '../core/i18n';
import { OccupancyEnum } from '../core/timetable';

import style from './timetable-occupancy-icon.scss?lit&inline';
import '../icon';

/**
 * Icon for wagon's occupancy.
 */
@customElement('sbb-timetable-occupancy-icon')
export class SbbTimetableOccupancyIcon extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Wagon occupancy. */
  @property() public occupancy!: OccupancyEnum;

  /** Negative coloring variant flag. */
  @property({ type: Boolean }) public negative: boolean = false;

  /** The icon name which will be rendered. */
  @state() private _iconName: string;

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  private _setIconName(): void {
    if (!this.occupancy) {
      return;
    }

    if (window.matchMedia('(forced-colors: active)').matches) {
      // high contrast
      this._iconName = `utilization-${this._transformOccupancy()}-high-contrast`;
    } else if (
      this.hasAttribute('negative') ||
      window.matchMedia('(prefer-color-scheme: dark)').matches
    ) {
      // dark
      this._iconName = `utilization-${this._transformOccupancy()}-negative`;
    } else {
      this._iconName = `utilization-${this._transformOccupancy()}`;
    }
  }

  private _transformOccupancy(): string {
    return !this.occupancy || this.occupancy.toLowerCase() === 'unknown'
      ? 'none'
      : this.occupancy.toLowerCase();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._setIconName();
    window.matchMedia('(forced-colors: active)').onchange = () => this._setIconName();
    window.matchMedia('(prefer-color-scheme: dark)').onchange = () => this._setIconName();
    this._handlerRepository.connect();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('occupancy') || changedProperties.has('negative')) {
      this._setIconName();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.connect();
  }

  protected override render(): TemplateResult {
    return html`
      <sbb-icon name=${this._iconName}></sbb-icon>
      <span class="sbb-timetable-occupancy-icon--visually-hidden">
        ${i18nOccupancy[this.occupancy?.toLowerCase()] &&
        `${i18nOccupancy[this.occupancy.toLowerCase()][this._currentLanguage]}`}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-occupancy-icon': SbbTimetableOccupancyIcon;
  }
}
