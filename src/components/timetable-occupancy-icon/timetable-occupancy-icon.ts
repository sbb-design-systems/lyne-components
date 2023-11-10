import { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { i18nOccupancy } from '../core/i18n';
import { OccupancyEnum } from '../core/timetable';
// eslint-disable-next-line import/no-duplicates
import { SbbIcon } from '../icon';

import style from './timetable-occupancy-icon.scss?lit&inline';
// eslint-disable-next-line import/no-duplicates
import '../icon';

/**
 * It displays a wagon's occupancy icon.
 */
@customElement('sbb-timetable-occupancy-icon')
export class SbbTimetableOccupancyIcon extends SbbIcon {
  public static override styles: CSSResultGroup = style;

  /** Wagon occupancy. */
  @property() public occupancy!: OccupancyEnum;

  /** Negative coloring variant flag. */
  @property({ type: Boolean }) public negative: boolean = false;

  @property({ attribute: 'aria-hidden', reflect: true }) public override ariaHidden = 'false';

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => {
      this._currentLanguage = l;
      this._setAriaLabel();
    }),
  );

  private _setNameAndAriaLabel(): void {
    if (!this.occupancy) {
      return;
    }

    if (window.matchMedia('(forced-colors: active)').matches) {
      // high contrast
      this.name = `utilization-${this._transformOccupancy()}-high-contrast`;
    } else if (
      this.hasAttribute('negative') ||
      window.matchMedia('(prefer-color-scheme: dark)').matches
    ) {
      // dark
      this.name = `utilization-${this._transformOccupancy()}-negative`;
    } else {
      this.name = `utilization-${this._transformOccupancy()}`;
    }

    this._setAriaLabel();
  }

  private _setAriaLabel(): void {
    this.ariaLabel = i18nOccupancy[this.occupancy?.toLowerCase()]
      ? `${i18nOccupancy[this.occupancy.toLowerCase()][this._currentLanguage]}.`
      : null;
  }

  private _transformOccupancy(): string {
    return !this.occupancy || this.occupancy.toLowerCase() === 'unknown'
      ? 'none'
      : this.occupancy.toLowerCase();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._setNameAndAriaLabel();
    window.matchMedia('(forced-colors: active)').onchange = () => this._setNameAndAriaLabel();
    window.matchMedia('(prefer-color-scheme: dark)').onchange = () => this._setNameAndAriaLabel();
    this._handlerRepository.connect();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('occupancy') || changedProperties.has('negative')) {
      this._setNameAndAriaLabel();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.matchMedia('(forced-colors: active)').onchange = null;
    window.matchMedia('(prefer-color-scheme: dark)').onchange = null;
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    return super.render();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-occupancy-icon': SbbTimetableOccupancyIcon;
  }
}
