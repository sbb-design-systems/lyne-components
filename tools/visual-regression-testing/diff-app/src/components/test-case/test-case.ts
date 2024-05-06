import {
  LitElement,
  html,
  type TemplateResult,
  type CSSResultGroup,
  type PropertyValues,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { screenshotService, type ScreenshotTestCase } from '../../screenshots.js';

import '../../../../../../src/components/button/secondary-button-link.js';
import '../../../../../../src/components/chip.js';
import '../../../../../../src/components/container.js';
import '../../../../../../src/components/header.js';
import '../../../../../../src/components/notification.js';
import '../../../../../../src/components/title.js';

import type { TestCaseFilter } from './test-case-filter/test-case-filter.js';
import style from './test-case.scss?lit&inline';

import './test-case-filter/test-case-filter.js';
import './image-diff/image-diff.js';

interface Filter {
  viewport?: string;
  browser?: string;
}

/**
 * Displays a test case with its images.
 * Provides filtering functions.
 */
@customElement('app-test-case')
export class TestCase extends LitElement {
  public static override styles: CSSResultGroup = style;

  @property() public params?: { componentName: string; testCaseName: string };

  @state() private _testCase?: ScreenshotTestCase;
  @state() private _filter: Filter = {};

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('params')) {
      this._filter = {};
      this.shadowRoot!.querySelector<TestCaseFilter>('app-test-case-filter')?.reset();
      this._testCase = screenshotService.setCurrentTestCase(
        this.params!.componentName!,
        this.params!.testCaseName!,
      );
    }
  }

  private _viewportFilterChanged(event: CustomEvent<string>): void {
    this._filter = {
      ...this._filter,
      viewport: event.detail && event.detail !== 'all' ? event.detail : undefined,
    };
  }

  private _browserFilterChanged(event: CustomEvent<string>): void {
    this._filter = {
      ...this._filter,
      browser: event.detail && event.detail !== 'all' ? event.detail : undefined,
    };
  }

  public override render(): TemplateResult {
    return html`
      <sbb-header expanded>
        <div
          class="app-progress"
          style="--app-progress: ${screenshotService.progressFraction}"
        ></div>
        <div class="app-file-name-box sbb-header-shrinkable">
          <sbb-chip color="charcoal">${this.params?.componentName}</sbb-chip>
          <sbb-title level="2" visual-level="6">
            <span class="app-file-name-ellipsis">${this.params?.testCaseName}</span>
          </sbb-title>
        </div>
        <div class="sbb-header-spacer"></div>
        <div class="app-navigation-block" slot="logo">
          <sbb-header-link href="/" icon-name="house-small">Overview</sbb-header-link>
          <sbb-secondary-button-link
            href="/compare/${screenshotService.previous?.path}"
            size="s"
            icon-name="arrow-left-small"
            ?disabled=${!screenshotService.previous}
          ></sbb-secondary-button-link>
          <sbb-secondary-button-link
            href="/compare/${screenshotService.next?.path}"
            size="s"
            icon-name="arrow-right-small"
            ?disabled=${!screenshotService.next}
          ></sbb-secondary-button-link>
        </div>
      </sbb-header>
      ${this._testCase
        ? html`<div class="app-testcase">
            <sbb-container expanded>
              <app-test-case-filter
                .testCase=${this._testCase}
                @browserFilterChange=${this._browserFilterChanged}
                @viewportFilterChange=${this._viewportFilterChanged}
              ></app-test-case-filter>
            </sbb-container>
            <sbb-container expanded color="milk">
              <div class="app-image-diffs">
                ${this._testCase
                  ?.filter(this._filter.viewport, this._filter.browser)
                  .map(
                    (failedFile) =>
                      html`<app-image-diff .failedFile=${failedFile}></app-image-diff>`,
                  )}
              </div>
            </sbb-container>
          </div>`
        : html`<sbb-container expanded>
            <sbb-notification type="error" readonly>
              No screenshots found. Please check component and test case name.
            </sbb-notification>
          </sbb-container>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'app-test-case': TestCase;
  }
}
