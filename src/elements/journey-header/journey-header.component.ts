import {
  type CSSResultGroup,
  html,
  type PropertyDeclaration,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import {
  boxSizingStyles,
  forceType,
  i18nConnectionFrom,
  i18nConnectionRoundtrip,
  i18nConnectionTo,
  type SbbElementType,
  SbbLanguageController,
  SbbNegativeMixin,
} from '../core.ts';
import { SbbIconElement } from '../icon.pure.ts';
import { SbbTitleBase } from '../title.pure.ts';

import style from './journey-header.scss?inline';

/**
 * Combined with the `sbb-journey-summary`, it displays the journey's detail.
 */
export class SbbJourneyHeaderElement extends SbbNegativeMixin(SbbTitleBase) {
  public static override readonly elementName: string = 'sbb-journey-header';
  public static override elementDependencies: SbbElementType[] = [SbbIconElement];
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    SbbTitleBase.styles,
    unsafeCSS(style),
  ];

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

  private _language = new SbbLanguageController(this).withHandler(() => this._setAriaLabel());

  public constructor() {
    super();

    this.level = '3' as this['level'];
    this.visualLevel = '5' as this['visualLevel'];
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (name === 'origin' || name === 'destination' || name === 'roundTrip') {
      this._setAriaLabel();
    }
  }

  private _setAriaLabel(): void {
    this.internals.ariaLabel = `${i18nConnectionFrom[this._language.current]} ${this.origin} ${i18nConnectionTo[this._language.current]} ${this.destination} ${this.roundTrip ? i18nConnectionRoundtrip(this.origin)[this._language.current] : ''}`;
  }

  protected override render(): TemplateResult {
    return html`
      ${this.origin}
      <sbb-icon
        name=${this.roundTrip ? 'arrows-long-right-left-small' : 'arrow-long-right-small'}
      ></sbb-icon>
      ${this.destination}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-journey-header': SbbJourneyHeaderElement;
  }
}
