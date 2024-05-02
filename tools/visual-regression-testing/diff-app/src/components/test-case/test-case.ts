import type { BeforeEnterObserver, RouterLocation } from '@vaadin/router';
import { LitElement, html, type TemplateResult, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { screenshotService, type ScreenshotTestCase } from '../../screenshots.js';

import '../../../../../../src/components/button/secondary-button-link.js';
import '../../../../../../src/components/chip.js';
import '../../../../../../src/components/container.js';
import '../../../../../../src/components/header.js';
import '../../../../../../src/components/notification.js';
import '../../../../../../src/components/title.js';

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
export class TestCase extends LitElement implements BeforeEnterObserver {
  public static override styles: CSSResultGroup = style;

  @state() private _testCaseName?: string;
  @state() private _componentName?: string;
  @state() private _testCase?: ScreenshotTestCase;
  @state() private _filter: Filter = {};

  // Called by router
  public onBeforeEnter(location: RouterLocation): void {
    this._testCaseName = location.params.testcase as string;
    this._componentName = location.params.component as string;

    this._testCase = screenshotService.setCurrentTestCase(this._componentName, this._testCaseName);
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
          <sbb-chip color="charcoal">${this._componentName}</sbb-chip>
          <sbb-title level="2" visual-level="6">
            <span class="app-file-name-ellipsis">${this._testCaseName}</span>
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
