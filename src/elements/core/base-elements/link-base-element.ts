import { html, isServer, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbLanguageController } from '../controllers.ts';
import { forceType, omitEmptyConverter } from '../decorators.ts';
import { i18nTargetOpensInNewWindow } from '../i18n.ts';

import { SbbActionBaseElement } from './action-base-element.ts';

import '../../screen-reader-only.ts';

/** Enumeration for 'target' attribute in <a> HTML tag. */
export type LinkTargetType = '_blank' | '_self' | '_parent' | '_top';

/** Link base class. */
export abstract class SbbLinkBaseElement extends SbbActionBaseElement {
  /** The href value you want to link to. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor href: string = '';

  /** Where to display the linked URL. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor target: LinkTargetType | string = '';

  /** The relationship of the linked URL as space-separated link types. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor rel: string = '';

  /** Whether the browser will show the download dialog on click. */
  @forceType()
  @property({ type: Boolean, reflect: true })
  public accessor download: boolean = false;

  /** This will be forwarded as aria-label to the inner anchor element. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /** This will be forwarded as aria-current to the inner anchor element. */
  @forceType()
  @property({ attribute: 'accessibility-current' })
  public accessor accessibilityCurrent: string = '';

  protected language = new SbbLanguageController(this);
  protected readonly anchorRole: string | null = null;

  public constructor() {
    super();
    this.internals.states.add('link');
    if (!isServer) {
      this.setupBaseEventHandlers();
    }
  }

  /** @internal */
  public override focus(options?: FocusOptions | undefined): void {
    this.shadowRoot!.querySelector<HTMLAnchorElement>('a')?.focus(options);
  }

  /** @internal */
  public override blur(): void {
    this.shadowRoot!.querySelector<HTMLAnchorElement>('a')?.blur();
  }

  /** @internal */
  public override click(): void {
    this.shadowRoot!.querySelector<HTMLAnchorElement>('a')?.click();
  }

  private _evaluateRelAttribute = (): string | typeof nothing => {
    return this.rel ? this.rel : this.target === '_blank' ? 'external noopener nofollow' : nothing;
  };

  /** Default render method for link-like components. Can be overridden if the LinkRenderVariables are not needed. */
  protected override render(): TemplateResult {
    return this.renderLink(this.renderTemplate());
  }

  protected renderLink(renderContent: TemplateResult): TemplateResult {
    return html`
      <a
        class="sbb-action-base ${this.localName}"
        href=${this.href || nothing}
        ?download=${this.download}
        target=${this.target || nothing}
        rel=${this._evaluateRelAttribute()}
        role=${this.anchorRole || nothing}
        aria-label=${this.accessibilityLabel || nothing}
        aria-current=${this.accessibilityCurrent || nothing}
        tabindex=${this.maybeDisabled && !this.maybeDisabledInteractive ? '-1' : nothing}
        aria-disabled=${this.maybeDisabled ? 'true' : nothing}
      >
        ${renderContent}
        ${!!this.href && this.target === '_blank'
          ? html`<sbb-screen-reader-only
              >. ${i18nTargetOpensInNewWindow[this.language.current]}</sbb-screen-reader-only
            >`
          : nothing}
      </a>
    `;
  }
}
