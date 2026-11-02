import type { TemplateResult } from 'lit';
import { html } from 'lit';

import '../../../elements/button.ts';
import '../../../elements/card.ts';
import '../../../elements/chip-label.ts';
import '../../../elements/container.ts';
import '../../../elements/date-input.ts';
import '../../../elements/datepicker.ts';
import '../../../elements/divider.ts';
import '../../../elements/form-field.ts';
import '../../../elements/header.ts';
import '../../../elements/icon.ts';
import '../../../elements/icon-sidebar.ts';
import '../../../elements/link.ts';
import '../../../elements/menu.ts';
import '../../../elements/option.ts';
import '../../../elements/paginator.ts';
import '../../../elements/radio-button.ts';
import '../../../elements/radio-button-group.ts';
import '../../../elements/select.ts';
import '../../../elements/sidebar.ts';
import '../../../elements/signet.ts';
import '../../../elements/status.ts';
import '../../../elements/tag.ts';
import '../../../elements/title.ts';
import '../../../elements/tooltip.ts';
import { sampleImages } from '../../../elements/core/images.private.ts';

export const leanCardsTemplate = (): TemplateResult => html`
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

  <sbb-sidebar-container>
    <sbb-sidebar-content>
      <sbb-icon-sidebar-container>
        <sbb-icon-sidebar>
          <sbb-icon-sidebar-button
            id="sidebar-home-link"
            icon-name="house-small"
            aria-label="Dashboard"
            sbb-badge="4"
          ></sbb-icon-sidebar-button>
          <sbb-icon-sidebar-button
            class="sbb-active"
            aria-current="page"
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
            <sbb-title level="2" class="page__title">Title</sbb-title>

            <div class="filter-bar" id="filter-bar">
              <sbb-tag-group
                id="status-filter"
                class="filter-bar__status"
                multiple
                size="s"
                accessibility-label="Filter by status"
              >
                <sbb-tag value="all" checked>All</sbb-tag>
                <sbb-tag value="not-started">Planned</sbb-tag>
                <sbb-tag value="pending">In progress</sbb-tag>
                <sbb-tag value="success">Completed</sbb-tag>
              </sbb-tag-group>
              <div class="filter-bar__triggers">
                <sbb-block-link-button id="filters-show" class="filter-bar__show" size="xs"
                  >Show filters</sbb-block-link-button
                >
                <span class="sbb-legend">More filters</span>
                <sbb-block-link-button id="search-trigger" size="xs"
                  >Search term</sbb-block-link-button
                >
                <sbb-block-link-button id="category-trigger" size="xs"
                  >Category</sbb-block-link-button
                >
                <sbb-block-link-button id="person-trigger" size="xs">Person</sbb-block-link-button>
                <sbb-block-link-button id="date-trigger" size="xs">Date</sbb-block-link-button>
              </div>
              <div class="filter-bar__sort">
                <span class="sbb-legend">Sort by</span>
                <sbb-block-link-button id="sort-trigger" size="xs">Date</sbb-block-link-button>
              </div>
            </div>

            <div id="card-list" class="card-list">
              <sbb-card color="milk" data-id="1">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Innovative strategies for sustainability</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-1"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-1">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-1"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Christine Müller"
                      >
                        CM
                      </div>
                      <sbb-tooltip trigger="avatar-1">Christine Müller</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">15.10.2026</span>
                      <sbb-status id="status-1" type="success" aria-label="Completed"></sbb-status>
                      <sbb-tooltip trigger="status-1">Completed</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Environment</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="7">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Innovative strategies for sustainability</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-7"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-7">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-7"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Anna Keller"
                      >
                        AK
                      </div>
                      <sbb-tooltip trigger="avatar-7">Anna Keller</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">15.10.2026</span>
                      <sbb-status id="status-7" type="success" aria-label="Completed"></sbb-status>
                      <sbb-tooltip trigger="status-7">Completed</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Environment</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="9">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Climate protection in urban areas</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-9"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-9">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-9"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Thomas Weber"
                      >
                        TW
                      </div>
                      <sbb-tooltip trigger="avatar-9">Thomas Weber</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">15.10.2026</span>
                      <sbb-status id="status-9" type="success" aria-label="Completed"></sbb-status>
                      <sbb-tooltip trigger="status-9">Completed</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Environment</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="66">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Change management in mid-sized companies</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-66"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-66">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-66"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Anna Keller"
                      >
                        AK
                      </div>
                      <sbb-tooltip trigger="avatar-66">Anna Keller</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">24.10.2026</span>
                      <sbb-status
                        id="status-66"
                        type="not-started"
                        aria-label="Planned"
                      ></sbb-status>
                      <sbb-tooltip trigger="status-66">Planned</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Management</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="58">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Cloud migration for public authorities</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-58"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-58">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-58"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Markus Brunner"
                      >
                        MB
                      </div>
                      <sbb-tooltip trigger="avatar-58">Markus Brunner</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">28.10.2026</span>
                      <sbb-status id="status-58" type="success" aria-label="Completed"></sbb-status>
                      <sbb-tooltip trigger="status-58">Completed</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Technology</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="50">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title">Storytelling for brands</sbb-title>
                  <sbb-secondary-button
                    id="card-menu-trigger-50"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-50">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-50"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Laura Steiner"
                      >
                        LS
                      </div>
                      <sbb-tooltip trigger="avatar-50">Laura Steiner</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">01.11.2026</span>
                      <sbb-status id="status-50" type="success" aria-label="Completed"></sbb-status>
                      <sbb-tooltip trigger="status-50">Completed</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Marketing</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="42">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Change management in mid-sized companies</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-42"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-42">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-42"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Christine Müller"
                      >
                        CM
                      </div>
                      <sbb-tooltip trigger="avatar-42">Christine Müller</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">05.11.2026</span>
                      <sbb-status
                        id="status-42"
                        type="pending"
                        aria-label="In progress"
                      ></sbb-status>
                      <sbb-tooltip trigger="status-42">In progress</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Management</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="34">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Cloud migration for public authorities</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-34"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-34">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-34"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Thomas Weber"
                      >
                        TW
                      </div>
                      <sbb-tooltip trigger="avatar-34">Thomas Weber</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">09.11.2026</span>
                      <sbb-status
                        id="status-34"
                        type="not-started"
                        aria-label="Planned"
                      ></sbb-status>
                      <sbb-tooltip trigger="status-34">Planned</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Technology</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="26">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title">Storytelling for brands</sbb-title>
                  <sbb-secondary-button
                    id="card-menu-trigger-26"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-26">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-26"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Anna Keller"
                      >
                        AK
                      </div>
                      <sbb-tooltip trigger="avatar-26">Anna Keller</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">13.11.2026</span>
                      <sbb-status id="status-26" type="success" aria-label="Completed"></sbb-status>
                      <sbb-tooltip trigger="status-26">Completed</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Marketing</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="18">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Change management in mid-sized companies</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-18"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-18">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-18"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Markus Brunner"
                      >
                        MB
                      </div>
                      <sbb-tooltip trigger="avatar-18">Markus Brunner</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">17.11.2026</span>
                      <sbb-status
                        id="status-18"
                        type="pending"
                        aria-label="In progress"
                      ></sbb-status>
                      <sbb-tooltip trigger="status-18">In progress</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Management</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="2">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Digital transformation in healthcare</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-2"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-2">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-2"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Thomas Weber"
                      >
                        TW
                      </div>
                      <sbb-tooltip trigger="avatar-2">Thomas Weber</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">20.11.2026</span>
                      <sbb-status
                        id="status-2"
                        type="not-started"
                        aria-label="Planned"
                      ></sbb-status>
                      <sbb-tooltip trigger="status-2">Planned</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Technology</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="8">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Digital transformation in healthcare</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-8"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-8">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-8"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Christine Müller"
                      >
                        CM
                      </div>
                      <sbb-tooltip trigger="avatar-8">Christine Müller</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">20.11.2026</span>
                      <sbb-status
                        id="status-8"
                        type="not-started"
                        aria-label="Planned"
                      ></sbb-status>
                      <sbb-tooltip trigger="status-8">Planned</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Technology</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
              <sbb-card color="milk" data-id="10">
                <div class="card-row">
                  <sbb-title level="5" class="card-row__title"
                    >Cloud migration for public authorities</sbb-title
                  >
                  <sbb-secondary-button
                    id="card-menu-trigger-10"
                    class="card-row__menu-trigger"
                    icon-name="context-menu-small"
                    size="m"
                    aria-label="Actions"
                  ></sbb-secondary-button>
                  <sbb-menu trigger="card-menu-trigger-10">
                    <sbb-menu-button data-action="edit" icon-name="pen-small">Edit</sbb-menu-button>
                    <sbb-menu-button data-action="view" icon-name="eye-small"
                      >View entry</sbb-menu-button
                    >
                    <sbb-menu-button data-action="copy" icon-name="copy-small"
                      >Duplicate</sbb-menu-button
                    >
                    <sbb-menu-button data-action="delete" icon-name="trash-small"
                      >Delete</sbb-menu-button
                    >
                  </sbb-menu>
                  <div class="card-row__meta sbb-orientation-horizontal-from-large">
                    <div class="card-row__details">
                      <div
                        id="avatar-10"
                        class="card-row__avatar sbb-text-xxs sbb-text--bold"
                        role="img"
                        aria-label="Laura Steiner"
                      >
                        LS
                      </div>
                      <sbb-tooltip trigger="avatar-10">Laura Steiner</sbb-tooltip>
                      <span class="sbb-text-s card-row__date">21.11.2026</span>
                      <sbb-status
                        id="status-10"
                        type="not-started"
                        aria-label="Planned"
                      ></sbb-status>
                      <sbb-tooltip trigger="status-10">Planned</sbb-tooltip>
                      <sbb-chip-label size="xxs" color="white" class="card-row__category"
                        >Technology</sbb-chip-label
                      >
                    </div>
                  </div>
                </div>
              </sbb-card>
            </div>

            <sbb-paginator
              length="72"
              page-size="13"
              page-index="0"
              size="s"
              pager-position="end"
            ></sbb-paginator>

            <sbb-sticky-bar size="m">
              <sbb-button id="add-button" class="add-button" icon-name="plus-small" size="s"
                >Add</sbb-button
              >
            </sbb-sticky-bar>
          </sbb-container>
        </sbb-icon-sidebar-content>
      </sbb-icon-sidebar-container>
    </sbb-sidebar-content>
    <sbb-sidebar id="edit-sidebar" class="edit-sidebar" position="end" mode="over" focus-on-open>
      <sbb-sidebar-title slot="title-section" id="edit-sidebar-title" level="2"
        >Add entry</sbb-sidebar-title
      >
      <sbb-sidebar-close-button></sbb-sidebar-close-button>
      <form id="edit-form" class="edit-form">
        <sbb-form-field floating-label size="m">
          <label>Title</label>
          <input id="field-title" type="text" required />
        </sbb-form-field>
        <sbb-form-field floating-label size="m">
          <label>Category</label>
          <sbb-select id="field-category" size="m">
            <sbb-option value="Environment">Environment</sbb-option>
            <sbb-option value="Technology">Technology</sbb-option>
            <sbb-option value="Social">Social</sbb-option>
            <sbb-option value="Management">Management</sbb-option>
            <sbb-option value="Research">Research</sbb-option>
            <sbb-option value="Marketing">Marketing</sbb-option>
          </sbb-select>
        </sbb-form-field>
        <sbb-form-field floating-label size="m">
          <label>Person</label>
          <sbb-select id="field-person" size="m">
            <sbb-option value="Christine Müller">Christine Müller</sbb-option>
            <sbb-option value="Thomas Weber">Thomas Weber</sbb-option>
            <sbb-option value="Anna Keller">Anna Keller</sbb-option>
            <sbb-option value="Markus Brunner">Markus Brunner</sbb-option>
            <sbb-option value="Laura Steiner">Laura Steiner</sbb-option>
          </sbb-select>
        </sbb-form-field>
        <sbb-form-field size="m">
          <label>Date</label>
          <sbb-date-input id="field-date" value="2026-10-15"></sbb-date-input>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
        <fieldset class="edit-form__group">
          <legend class="sbb-text-xs">Status</legend>
          <sbb-radio-button-group
            id="field-status"
            orientation="vertical"
            size="m"
            value="not-started"
          >
            <sbb-radio-button value="not-started">Planned</sbb-radio-button>
            <sbb-radio-button value="pending">In progress</sbb-radio-button>
            <sbb-radio-button value="success">Completed</sbb-radio-button>
          </sbb-radio-button-group>
        </fieldset>
      </form>
      <div class="edit-actions">
        <sbb-secondary-button id="edit-cancel">Cancel</sbb-secondary-button>
        <sbb-button id="edit-save">Save</sbb-button>
      </div>
    </sbb-sidebar>
  </sbb-sidebar-container>

  <sbb-menu id="search-menu" trigger="search-trigger">
    <div class="menu-content">
      <sbb-form-field negative size="m" floating-label>
        <label>Search term</label>
        <sbb-icon slot="prefix" name="magnifying-glass-small"></sbb-icon>
        <input id="search-input" type="text" />
      </sbb-form-field>
    </div>
    <sbb-divider negative></sbb-divider>
    <sbb-menu-button id="search-reset" icon-name="filter-x-small">Reset filter</sbb-menu-button>
  </sbb-menu>

  <sbb-menu id="category-menu" trigger="category-trigger">
    <sbb-menu-button
      class="filter-option"
      data-value="Environment"
      icon-name="tick-small"
      aria-pressed="true"
      >Environment</sbb-menu-button
    >
    <sbb-menu-button
      class="filter-option"
      data-value="Technology"
      icon-name="tick-small"
      aria-pressed="true"
      >Technology</sbb-menu-button
    >
    <sbb-menu-button
      class="filter-option"
      data-value="Social"
      icon-name="tick-small"
      aria-pressed="true"
      >Social</sbb-menu-button
    >
    <sbb-menu-button
      class="filter-option"
      data-value="Management"
      icon-name="tick-small"
      aria-pressed="true"
      >Management</sbb-menu-button
    >
    <sbb-menu-button
      class="filter-option"
      data-value="Research"
      icon-name="tick-small"
      aria-pressed="true"
      >Research</sbb-menu-button
    >
    <sbb-menu-button
      class="filter-option"
      data-value="Marketing"
      icon-name="tick-small"
      aria-pressed="true"
      >Marketing</sbb-menu-button
    >
    <sbb-divider negative></sbb-divider>
    <sbb-menu-button id="category-reset" icon-name="filter-x-small">Reset filter</sbb-menu-button>
  </sbb-menu>

  <sbb-menu id="user-menu" trigger="user-menu-trigger">
    <sbb-menu-button icon-name="user-small">Profile</sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button icon-name="exit-small">Sign out</sbb-menu-button>
  </sbb-menu>

  <sbb-menu id="person-menu" trigger="person-trigger">
    <sbb-menu-button
      class="filter-option"
      data-value="Christine Müller"
      icon-name="tick-small"
      aria-pressed="true"
      >Christine Müller</sbb-menu-button
    >
    <sbb-menu-button
      class="filter-option"
      data-value="Thomas Weber"
      icon-name="tick-small"
      aria-pressed="true"
      >Thomas Weber</sbb-menu-button
    >
    <sbb-menu-button
      class="filter-option"
      data-value="Anna Keller"
      icon-name="tick-small"
      aria-pressed="true"
      >Anna Keller</sbb-menu-button
    >
    <sbb-menu-button
      class="filter-option"
      data-value="Markus Brunner"
      icon-name="tick-small"
      aria-pressed="true"
      >Markus Brunner</sbb-menu-button
    >
    <sbb-menu-button
      class="filter-option"
      data-value="Laura Steiner"
      icon-name="tick-small"
      aria-pressed="true"
      >Laura Steiner</sbb-menu-button
    >
    <sbb-divider negative></sbb-divider>
    <sbb-menu-button id="person-reset" icon-name="filter-x-small">Reset filter</sbb-menu-button>
  </sbb-menu>

  <sbb-menu id="date-menu" trigger="date-trigger">
    <div class="menu-content">
      <sbb-form-field negative size="m">
        <label>Date from</label>
        <sbb-date-input id="date-from" value="2026-12-01"></sbb-date-input>
        <sbb-datepicker-toggle negative></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
      <sbb-form-field negative size="m">
        <label>Date to</label>
        <sbb-date-input id="date-to" value="2026-12-31"></sbb-date-input>
        <sbb-datepicker-toggle negative></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
    </div>
    <sbb-divider negative></sbb-divider>
    <sbb-menu-button id="date-reset" icon-name="filter-x-small">Reset filter</sbb-menu-button>
  </sbb-menu>

  <sbb-menu id="sort-menu" trigger="sort-trigger">
    <sbb-menu-button class="sort-field" data-field="title" aria-pressed="false"
      >Title</sbb-menu-button
    >
    <sbb-menu-button class="sort-field" data-field="category" aria-pressed="false"
      >Category</sbb-menu-button
    >
    <sbb-menu-button class="sort-field" data-field="person" aria-pressed="false"
      >User</sbb-menu-button
    >
    <sbb-menu-button class="sort-field" data-field="date" icon-name="tick-small" aria-pressed="true"
      >Date</sbb-menu-button
    >
    <sbb-menu-button class="sort-field" data-field="status" aria-pressed="false"
      >Status</sbb-menu-button
    >
    <sbb-divider></sbb-divider>
    <sbb-menu-button class="sort-dir" data-dir="asc" icon-name="tick-small" aria-pressed="true"
      >Ascending</sbb-menu-button
    >
    <sbb-menu-button class="sort-dir" data-dir="desc" aria-pressed="false"
      >Descending</sbb-menu-button
    >
    <sbb-divider></sbb-divider>
    <sbb-menu-button id="sort-reset" icon-name="arrows-up-down-small"
      >Reset sorting</sbb-menu-button
    >
  </sbb-menu>
`;
