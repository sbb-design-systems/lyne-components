import type { TemplateResult } from 'lit';
import { html } from 'lit';

import '../../../elements/button.ts';
import '../../../elements/card.ts';
import '../../../elements/chip-label.ts';
import '../../../elements/container.ts';
import '../../../elements/divider.ts';
import '../../../elements/header.ts';
import '../../../elements/icon.ts';
import '../../../elements/icon-sidebar.ts';
import '../../../elements/link.ts';
import '../../../elements/menu.ts';
import '../../../elements/signet.ts';
import '../../../elements/status.ts';
import '../../../elements/tabs.ts';
import '../../../elements/tag.ts';
import '../../../elements/title.ts';
import '../../../elements/tooltip.ts';
import { sampleImages } from '../../../elements/core/images.private.ts';

export const leanDashboardTemplate = (): TemplateResult => html`
  <style>
    sbb-icon-sidebar [sbb-badge] {
      --sbb-badge-position-offset: var(--sbb-spacing-fixed-1x);
    }

    .page {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: 1fr auto auto;
      min-height: 100%;
    }

    @media (min-width: calc(64rem)) and (max-width: calc(89.9375rem)) {
      .page__title {
        margin-block-start: calc(
          var(--sbb-spacing-responsive-m-large) - var(--sbb-spacing-fixed-5x)
        );
      }
    }
    @media (min-width: calc(90rem)) {
      .page__title {
        margin-block-start: calc(
          var(--sbb-spacing-responsive-m-ultra) - var(--sbb-spacing-fixed-7x)
        );
      }
    }
    .add-button {
      margin-inline-start: auto;
    }

    @media (max-width: calc(37.4375rem)) {
      .header-info {
        display: none;
      }
    }
    .filter-bar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--sbb-spacing-fixed-4x);
      margin-bottom: var(--sbb-spacing-fixed-2x);
    }

    .filter-bar__sort {
      margin-inline-start: auto;
    }

    .filter-bar__status {
      flex-basis: 100%;
    }

    .filter-bar__show {
      display: none;
    }

    @media (max-width: calc(63.9375rem)) {
      .filter-bar:not([data-filters-visible]) .filter-bar__triggers > :not(.filter-bar__show) {
        display: none;
      }
      .filter-bar:not([data-filters-visible]) .filter-bar__show {
        display: inline-flex;
      }
    }
    .filter-bar__triggers,
    .filter-bar__sort {
      display: flex;
      align-items: center;
      gap: 0 var(--sbb-spacing-fixed-4x);
      flex-wrap: wrap;
    }

    .menu-content {
      display: flex;
      flex-direction: column;
      gap: var(--sbb-spacing-fixed-3x);
      padding: var(--sbb-spacing-fixed-4x);
    }

    @media (max-width: calc(63.9375rem)) {
      .menu-content sbb-form-field {
        width: 100%;
      }
    }

    html.sbb-dark .menu-content {
      color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      html.sbb-light-dark .menu-content {
        color-scheme: light;
      }
    }
    .edit-sidebar {
      width: min(var(--sbb-breakpoint-zero-max), 100%);
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      gap: var(--sbb-spacing-fixed-3x);
    }

    .edit-form sbb-form-field {
      width: 100%;
    }

    .edit-form__group {
      margin: 0;
      padding: 0;
      border: 0;
      min-width: 0;
    }

    .edit-form__group legend {
      padding: 0;
      margin-block-end: var(--sbb-spacing-fixed-2x);
      color: var(--sbb-color-4);
    }

    .edit-actions {
      display: flex;
      justify-content: space-between;
      gap: var(--sbb-spacing-fixed-2x);
      margin-block-start: var(--sbb-spacing-fixed-6x);
    }

    .card-list {
      display: flex;
      flex-direction: column;
      gap: var(--sbb-spacing-fixed-2x);
      margin-bottom: var(--sbb-spacing-responsive-xxxs);
    }

    .card-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x);
    }

    .card-row__title {
      grid-area: 1/1;
      align-self: start;
      min-width: 0;
      margin-block: 0;
    }

    .card-row__menu-trigger {
      grid-area: 1/2 / span 2;
      align-self: start;
    }

    .card-row__meta {
      grid-area: 2/1;
      align-items: flex-start;
      gap: var(--sbb-spacing-fixed-2x);
    }

    .card-row__details {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--sbb-spacing-fixed-2x) var(--sbb-spacing-fixed-4x);
    }

    @media (min-width: calc(64rem)) {
      .card-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: var(--sbb-spacing-fixed-4x);
      }
      .card-row__title {
        flex: 1 1 0;
        align-self: center;
      }
      .card-row__menu-trigger {
        order: 2;
        flex-shrink: 0;
        align-self: center;
      }
      .card-row__meta {
        align-items: center;
        gap: var(--sbb-spacing-fixed-4x);
        flex-shrink: 0;
      }
      .card-row__details {
        display: contents;
      }
      .card-row__category {
        order: -1;
      }
    }
    .card-row__avatar {
      width: var(--sbb-spacing-fixed-7x);
      height: var(--sbb-spacing-fixed-7x);
      border-radius: var(--sbb-border-radius-infinity);
      background-color: var(--sbb-color-4);
      color: var(--sbb-background-color-1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .dashboard-section {
      display: flex;
      flex-direction: column;
      gap: var(--sbb-spacing-fixed-3x);
    }

    .dashboard-section__heading {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: var(--sbb-spacing-fixed-6x);
    }
    .dashboard-section__heading sbb-title {
      flex: 1 1 auto;
      margin-block: 0;
    }
    .dashboard-section__heading sbb-block-link {
      flex: none;
    }

    sbb-tab .dashboard-section__heading {
      margin-block-start: var(--sbb-spacing-fixed-5x);
    }

    sbb-tab .dashboard-favorites:first-child {
      margin-block-start: var(--sbb-spacing-fixed-5x);
    }

    .dashboard-section__footer {
      margin-block-start: var(--sbb-spacing-fixed-3x);
    }

    .dashboard-favorites {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: var(--sbb-spacing-fixed-3x);
    }
    .dashboard-favorites sbb-title {
      margin-block-start: 0;
    }
    .dashboard-favorites sbb-secondary-button-static {
      margin-block-start: var(--sbb-spacing-fixed-2x);
    }

    .dashboard-tasks {
      display: flex;
      flex-direction: column;
      gap: var(--sbb-spacing-fixed-3x);
    }

    @media (max-width: calc(63.9375rem)) {
      .dashboard-favorites {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: calc(37.4375rem)) {
      .dashboard-section__heading {
        flex-direction: column;
        gap: var(--sbb-spacing-fixed-2x);
      }
      .dashboard-section__heading sbb-block-link {
        padding-block-start: 0;
      }
      .dashboard-favorites {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .dashboard-tabs {
      margin-block-end: calc(
        2 * var(--sbb-spacing-responsive-xxxs) + var(--sbb-spacing-responsive-s)
      );
    }

    sbb-tab-label[sbb-badge] {
      --sbb-badge-position-offset: var(--sbb-spacing-fixed-2x);
      padding-inline-end: var(--sbb-spacing-fixed-3x);
    }

    .key-figures {
      display: flex;
      flex-direction: column;
      gap: var(--sbb-spacing-fixed-3x);
    }

    .key-figures__head {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: var(--sbb-spacing-fixed-3x) var(--sbb-spacing-fixed-6x);
      margin-block-start: var(--sbb-spacing-fixed-5x);
    }

    .key-figures__title {
      flex: 1 1 auto;
      margin-block: 0;
    }

    .key-figures__periods {
      flex: none;
      max-width: 100%;
    }

    .key-figures__grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: var(--sbb-spacing-fixed-3x);
    }
    @media (max-width: calc(63.9375rem)) {
      .key-figures__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: calc(37.4375rem)) {
      .key-figures__grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .key-figures__card--wide {
      grid-column: 1/-1;
    }

    .key-figure {
      display: flex;
      flex-direction: column;
      gap: var(--sbb-spacing-fixed-3x);
      height: 100%;
    }

    .key-figure__head {
      display: flex;
      align-items: flex-start;
      gap: var(--sbb-spacing-fixed-2x);
    }

    .key-figure__label {
      flex: 1 1 0;
      min-width: 0;
    }

    .key-figure__value {
      display: flex;
      flex-direction: column;
      gap: var(--sbb-spacing-fixed-1x);
    }

    .key-figures__card--stat .key-figure__value {
      margin-block-start: auto;
    }

    .key-figure__title {
      margin-block: 0;
    }

    .key-figure__stat {
      font-size: var(--sbb-typo-scale-4x);
      font-weight: bold;
      letter-spacing: var(--sbb-letter-spacing-heading);
      line-height: var(--sbb-typo-line-height-heading);
    }

    .key-figure__muted {
      color: var(--sbb-color-4);
    }

    .key-figure__chart {
      height: calc(var(--sbb-spacing-fixed-1x) * 25);
      border-radius: var(--sbb-border-radius-4x);
      background-color: var(--sbb-background-color-3);
    }

    .key-figures__card--wide .key-figure__chart {
      height: calc(var(--sbb-spacing-fixed-1x) * 44);
    }
  </style>

  <sbb-header expanded>
    <sbb-header-button id="menu-trigger" icon-name="hamburger-menu-small" hide-label-below="small"
      >Menu</sbb-header-button
    >
    <span class="header-info">
      <strong>Example application</strong>
      <span>V. 1.0</span>
    </span>
    <div class="sbb-header-spacer"></div>
    <sbb-header-button id="user-menu-trigger" hide-label-below="small">
      <figure class="sbb-figure" slot="icon">
        <img
          class="sbb-image-border-radius-round"
          style="object-fit: cover; width: var(--sbb-size-icon-ui-small); height: var(--sbb-size-icon-ui-small)"
          width="24"
          height="24"
          src=${sampleImages[6]}
          alt=""
        />
      </figure>
      Petra Muster
    </sbb-header-button>
    <a href="#" class="sbb-header-logo" aria-label="Homepage">
      <sbb-signet protective-room="panel"></sbb-signet>
    </a>
  </sbb-header>

  <sbb-icon-sidebar-container>
    <sbb-icon-sidebar>
      <sbb-icon-sidebar-button
        class="sbb-active"
        aria-current="page"
        id="sidebar-home-link"
        icon-name="house-small"
        aria-label="Dashboard"
        sbb-badge="4"
      ></sbb-icon-sidebar-button>
      <sbb-icon-sidebar-button
        icon-name="list-small"
        aria-label="Card list"
      ></sbb-icon-sidebar-button>
      <sbb-icon-sidebar-button
        icon-name="four-squares-small"
        aria-label="Table view"
      ></sbb-icon-sidebar-button>
    </sbb-icon-sidebar>

    <sbb-icon-sidebar-content sbb-header-scroll-origin>
      <sbb-container class="page" color="transparent" expanded background-expanded>
        <sbb-title level="2" class="page__title">Dashboard.</sbb-title>

        <sbb-tab-group size="l" class="dashboard-tabs">
          <sbb-tab-label>Overview</sbb-tab-label>
          <sbb-tab>
            <div class="key-figures">
              <div class="key-figures__head">
                <sbb-tag-group
                  size="s"
                  value="kw23"
                  accessibility-label="Period"
                  class="key-figures__periods"
                >
                  <sbb-tag value="kw23" size="s">Week 23</sbb-tag>
                  <sbb-tag value="kw22" size="s">Week 22</sbb-tag>
                  <sbb-tag value="kw21" size="s">Week 21</sbb-tag>
                  <sbb-tag value="30d" size="s">30 days</sbb-tag>
                  <sbb-tag value="3m" size="s">3 months</sbb-tag>
                  <sbb-tag value="6m" size="s">6 months</sbb-tag>
                </sbb-tag-group>
              </div>
              <div class="key-figures__grid">
                <sbb-card class="sbb-card-spacing-xxs" color="transparent-bordered">
                  <div class="key-figure">
                    <div class="key-figure__head">
                      <span class="sbb-text-xxs key-figure__muted key-figure__label"
                        >Ticket sales</span
                      >
                      <sbb-chip-label size="xxs" color="milk">+14 %</sbb-chip-label>
                    </div>
                    <div class="key-figure__value">
                      <sbb-title level="4" class="key-figure__title">CHF 955,250</sbb-title>
                      <span class="sbb-text-xxs key-figure__muted">Rising for 6 weeks.</span>
                    </div>
                    <div
                      class="key-figure__chart"
                      data-chart="line"
                      role="img"
                      aria-label="Placeholder: line chart"
                    ></div>
                  </div>
                </sbb-card>
                <sbb-card
                  class="sbb-card-spacing-xxs key-figures__card--stat"
                  color="transparent-bordered"
                >
                  <div class="key-figure">
                    <div class="key-figure__head">
                      <span class="sbb-text-xxs key-figure__muted key-figure__label"
                        >Digital sales</span
                      >
                      <sbb-chip-label size="xxs" color="milk">+0.1 %</sbb-chip-label>
                    </div>
                    <div class="key-figure__value">
                      <span class="sbb-text-xxs key-figure__muted">Rising for 6 weeks.</span>
                      <span class="key-figure__stat">75.1%</span>
                    </div>
                  </div>
                </sbb-card>
                <sbb-card class="sbb-card-spacing-xxs" color="transparent-bordered">
                  <div class="key-figure">
                    <div class="key-figure__head">
                      <span class="sbb-text-xxs key-figure__muted key-figure__label"
                        >Visits sbb.ch</span
                      >
                      <sbb-chip-label size="xxs" color="charcoal">-8 %</sbb-chip-label>
                    </div>
                    <div class="key-figure__value">
                      <sbb-title level="4" class="key-figure__title">CHF 955,250</sbb-title>
                      <span class="sbb-text-xxs key-figure__muted">Falling for 8 days.</span>
                    </div>
                    <div
                      class="key-figure__chart"
                      data-chart="line"
                      role="img"
                      aria-label="Placeholder: line chart"
                    ></div>
                  </div>
                </sbb-card>
                <sbb-card class="sbb-card-spacing-xxs" color="transparent-bordered">
                  <div class="key-figure">
                    <div class="key-figure__head">
                      <span class="sbb-text-xxs key-figure__muted key-figure__label"
                        >Visits SBB Mobile</span
                      >
                      <sbb-chip-label size="xxs" color="milk">+14 %</sbb-chip-label>
                    </div>
                    <div class="key-figure__value">
                      <sbb-title level="4" class="key-figure__title">CHF 955,250</sbb-title>
                      <span class="sbb-text-xxs key-figure__muted">Rising for 6 weeks.</span>
                    </div>
                    <div
                      class="key-figure__chart"
                      data-chart="bar"
                      role="img"
                      aria-label="Placeholder: bar chart"
                    ></div>
                  </div>
                </sbb-card>
                <sbb-card
                  class="sbb-card-spacing-xxs key-figures__card--wide"
                  color="transparent-bordered"
                >
                  <div class="key-figure">
                    <div class="key-figure__head">
                      <span class="sbb-text-xxs key-figure__muted key-figure__label"
                        >Digital sales</span
                      >
                      <sbb-chip-label size="xxs" color="milk">+0.1 %</sbb-chip-label>
                    </div>
                    <div class="key-figure__value">
                      <span class="sbb-text-xxs key-figure__muted">Rising for 6 weeks.</span>
                      <sbb-title level="4" class="key-figure__title">75.1%</sbb-title>
                    </div>
                    <div
                      class="key-figure__chart"
                      data-chart="area"
                      role="img"
                      aria-label="Placeholder: area chart"
                    ></div>
                  </div>
                </sbb-card>
              </div>
            </div>
          </sbb-tab>

          <sbb-tab-label>Favorites</sbb-tab-label>
          <sbb-tab>
            <div class="dashboard-section">
              <div class="dashboard-favorites">
                <sbb-card color="milk" class="sbb-card-spacing-s">
                  <sbb-card-link href="#">Open feature A</sbb-card-link>
                  <div>
                    <sbb-icon name="hammer-wrench-medium"></sbb-icon>
                    <sbb-title level="5">Feature A</sbb-title>
                    <span class="sbb-text-s">Lorem ipsum Dolor est</span>
                  </div>
                  <sbb-secondary-button-static size="m">Open feature A</sbb-secondary-button-static>
                </sbb-card>
                <sbb-card color="milk" class="sbb-card-spacing-s">
                  <sbb-card-link href="#">Open feature A</sbb-card-link>
                  <div>
                    <sbb-icon name="hammer-wrench-medium"></sbb-icon>
                    <sbb-title level="5">Feature A</sbb-title>
                    <span class="sbb-text-s">Lorem ipsum Dolor est</span>
                  </div>
                  <sbb-secondary-button-static size="m">Open feature A</sbb-secondary-button-static>
                </sbb-card>
                <sbb-card color="milk" class="sbb-card-spacing-s">
                  <sbb-card-link href="#">Open feature A</sbb-card-link>
                  <div>
                    <sbb-icon name="hammer-wrench-medium"></sbb-icon>
                    <sbb-title level="5">Feature A</sbb-title>
                    <span class="sbb-text-s">Lorem ipsum Dolor est</span>
                  </div>
                  <sbb-secondary-button-static size="m">Open feature A</sbb-secondary-button-static>
                </sbb-card>
                <sbb-card color="milk" class="sbb-card-spacing-s">
                  <sbb-card-link href="#">Open feature A</sbb-card-link>
                  <div>
                    <sbb-icon name="hammer-wrench-medium"></sbb-icon>
                    <sbb-title level="5">Feature A</sbb-title>
                    <span class="sbb-text-s">Lorem ipsum Dolor est</span>
                  </div>
                  <sbb-secondary-button-static size="m">Open feature A</sbb-secondary-button-static>
                </sbb-card>
              </div>
              <div class="dashboard-section__footer">
                <sbb-block-link href="#" size="xs">Edit favorites</sbb-block-link>
              </div>
            </div>
          </sbb-tab>

          <sbb-tab-label id="tasks-tab-label" sbb-badge="4">Tasks</sbb-tab-label>
          <sbb-tab>
            <div class="dashboard-section">
              <div class="dashboard-section__heading">
                <sbb-tag-group
                  id="task-status-filter"
                  multiple
                  size="s"
                  accessibility-label="Filter by status"
                >
                  <sbb-tag value="all" checked>All</sbb-tag>
                  <sbb-tag value="not-started">Planned</sbb-tag>
                  <sbb-tag value="pending">In progress</sbb-tag>
                  <sbb-tag value="success">Completed</sbb-tag>
                </sbb-tag-group>
              </div>
              <div class="dashboard-tasks">
                <sbb-card color="milk" class="sbb-card-spacing-xxs">
                  <div class="card-row">
                    <sbb-title level="5" class="card-row__title"
                      >Innovative strategies for sustainability</sbb-title
                    >
                    <sbb-secondary-button
                      id="dashboard-task-menu-trigger-1"
                      class="card-row__menu-trigger"
                      icon-name="context-menu-small"
                      size="m"
                      aria-label="Actions"
                    ></sbb-secondary-button>
                    <sbb-menu trigger="dashboard-task-menu-trigger-1">
                      <sbb-menu-button icon-name="pen-small">Edit</sbb-menu-button>
                      <sbb-menu-button class="dashboard-task-view" data-id="1" icon-name="eye-small"
                        >View entry</sbb-menu-button
                      >
                      <sbb-menu-button icon-name="copy-small">Duplicate</sbb-menu-button>
                      <sbb-menu-button icon-name="trash-small">Delete</sbb-menu-button>
                    </sbb-menu>
                    <div class="card-row__meta sbb-orientation-horizontal-from-large">
                      <div class="card-row__details">
                        <div
                          id="dashboard-task-avatar-1"
                          class="card-row__avatar sbb-text-xxs sbb-text--bold"
                          role="img"
                          aria-label="Christine Müller"
                        >
                          CM
                        </div>
                        <sbb-tooltip trigger="dashboard-task-avatar-1"
                          >Christine Müller</sbb-tooltip
                        >
                        <span class="sbb-text-s card-row__date">15.10.2026</span>
                        <sbb-status
                          id="dashboard-task-status-1"
                          type="success"
                          aria-label="Completed"
                        ></sbb-status>
                        <sbb-tooltip trigger="dashboard-task-status-1">Completed</sbb-tooltip>
                        <sbb-chip-label size="xxs" color="white" class="card-row__category"
                          >Environment</sbb-chip-label
                        >
                      </div>
                    </div>
                  </div>
                </sbb-card>
                <sbb-card color="milk" class="sbb-card-spacing-xxs">
                  <div class="card-row">
                    <sbb-title level="5" class="card-row__title"
                      >Digital transformation in healthcare</sbb-title
                    >
                    <sbb-secondary-button
                      id="dashboard-task-menu-trigger-2"
                      class="card-row__menu-trigger"
                      icon-name="context-menu-small"
                      size="m"
                      aria-label="Actions"
                    ></sbb-secondary-button>
                    <sbb-menu trigger="dashboard-task-menu-trigger-2">
                      <sbb-menu-button icon-name="pen-small">Edit</sbb-menu-button>
                      <sbb-menu-button class="dashboard-task-view" data-id="2" icon-name="eye-small"
                        >View entry</sbb-menu-button
                      >
                      <sbb-menu-button icon-name="copy-small">Duplicate</sbb-menu-button>
                      <sbb-menu-button icon-name="trash-small">Delete</sbb-menu-button>
                    </sbb-menu>
                    <div class="card-row__meta sbb-orientation-horizontal-from-large">
                      <div class="card-row__details">
                        <div
                          id="dashboard-task-avatar-2"
                          class="card-row__avatar sbb-text-xxs sbb-text--bold"
                          role="img"
                          aria-label="Thomas Weber"
                        >
                          TW
                        </div>
                        <sbb-tooltip trigger="dashboard-task-avatar-2">Thomas Weber</sbb-tooltip>
                        <span class="sbb-text-s card-row__date">20.11.2026</span>
                        <sbb-status
                          id="dashboard-task-status-2"
                          type="not-started"
                          aria-label="Planned"
                        ></sbb-status>
                        <sbb-tooltip trigger="dashboard-task-status-2">Planned</sbb-tooltip>
                        <sbb-chip-label size="xxs" color="white" class="card-row__category"
                          >Technology</sbb-chip-label
                        >
                      </div>
                    </div>
                  </div>
                </sbb-card>
                <sbb-card color="milk" class="sbb-card-spacing-xxs">
                  <div class="card-row">
                    <sbb-title level="5" class="card-row__title"
                      >Promoting cultural diversity and integration</sbb-title
                    >
                    <sbb-secondary-button
                      id="dashboard-task-menu-trigger-3"
                      class="card-row__menu-trigger"
                      icon-name="context-menu-small"
                      size="m"
                      aria-label="Actions"
                    ></sbb-secondary-button>
                    <sbb-menu trigger="dashboard-task-menu-trigger-3">
                      <sbb-menu-button icon-name="pen-small">Edit</sbb-menu-button>
                      <sbb-menu-button class="dashboard-task-view" data-id="3" icon-name="eye-small"
                        >View entry</sbb-menu-button
                      >
                      <sbb-menu-button icon-name="copy-small">Duplicate</sbb-menu-button>
                      <sbb-menu-button icon-name="trash-small">Delete</sbb-menu-button>
                    </sbb-menu>
                    <div class="card-row__meta sbb-orientation-horizontal-from-large">
                      <div class="card-row__details">
                        <div
                          id="dashboard-task-avatar-3"
                          class="card-row__avatar sbb-text-xxs sbb-text--bold"
                          role="img"
                          aria-label="Anna Keller"
                        >
                          AK
                        </div>
                        <sbb-tooltip trigger="dashboard-task-avatar-3">Anna Keller</sbb-tooltip>
                        <span class="sbb-text-s card-row__date">05.12.2026</span>
                        <sbb-status
                          id="dashboard-task-status-3"
                          type="pending"
                          aria-label="In progress"
                        ></sbb-status>
                        <sbb-tooltip trigger="dashboard-task-status-3">In progress</sbb-tooltip>
                        <sbb-chip-label size="xxs" color="white" class="card-row__category"
                          >Social</sbb-chip-label
                        >
                      </div>
                    </div>
                  </div>
                </sbb-card>
                <sbb-card color="milk" class="sbb-card-spacing-xxs">
                  <div class="card-row">
                    <sbb-title level="5" class="card-row__title"
                      >Effective project management in agile teams</sbb-title
                    >
                    <sbb-secondary-button
                      id="dashboard-task-menu-trigger-4"
                      class="card-row__menu-trigger"
                      icon-name="context-menu-small"
                      size="m"
                      aria-label="Actions"
                    ></sbb-secondary-button>
                    <sbb-menu trigger="dashboard-task-menu-trigger-4">
                      <sbb-menu-button icon-name="pen-small">Edit</sbb-menu-button>
                      <sbb-menu-button class="dashboard-task-view" data-id="4" icon-name="eye-small"
                        >View entry</sbb-menu-button
                      >
                      <sbb-menu-button icon-name="copy-small">Duplicate</sbb-menu-button>
                      <sbb-menu-button icon-name="trash-small">Delete</sbb-menu-button>
                    </sbb-menu>
                    <div class="card-row__meta sbb-orientation-horizontal-from-large">
                      <div class="card-row__details">
                        <div
                          id="dashboard-task-avatar-4"
                          class="card-row__avatar sbb-text-xxs sbb-text--bold"
                          role="img"
                          aria-label="Markus Brunner"
                        >
                          MB
                        </div>
                        <sbb-tooltip trigger="dashboard-task-avatar-4">Markus Brunner</sbb-tooltip>
                        <span class="sbb-text-s card-row__date">12.01.2027</span>
                        <sbb-status
                          id="dashboard-task-status-4"
                          type="not-started"
                          aria-label="Planned"
                        ></sbb-status>
                        <sbb-tooltip trigger="dashboard-task-status-4">Planned</sbb-tooltip>
                        <sbb-chip-label size="xxs" color="white" class="card-row__category"
                          >Management</sbb-chip-label
                        >
                      </div>
                    </div>
                  </div>
                </sbb-card>
              </div>
            </div>
          </sbb-tab>
        </sbb-tab-group>
      </sbb-container>
    </sbb-icon-sidebar-content>
  </sbb-icon-sidebar-container>

  <sbb-menu id="user-menu" trigger="user-menu-trigger">
    <sbb-menu-button icon-name="user-small">Profile</sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button icon-name="exit-small">Sign out</sbb-menu-button>
  </sbb-menu>
`;
