import type { TemplateResult } from 'lit';
import { html } from 'lit';

import '../../../elements/button.ts';
import '../../../elements/container.ts';
import '../../../elements/date-input.ts';
import '../../../elements/datepicker.ts';
import '../../../elements/divider.ts';
import '../../../elements/form-field.ts';
import '../../../elements/header.ts';
import '../../../elements/icon.ts';
import '../../../elements/icon-sidebar.ts';
import '../../../elements/menu.ts';
import '../../../elements/option.ts';
import '../../../elements/paginator.ts';
import '../../../elements/radio-button.ts';
import '../../../elements/radio-button-group.ts';
import '../../../elements/select.ts';
import '../../../elements/sidebar.ts';
import '../../../elements/signet.ts';
import '../../../elements/status.ts';
import '../../../elements/table.ts';
import '../../../elements/tag.ts';
import '../../../elements/title.ts';
import '../../../elements/tooltip.ts';
import { sampleImages } from '../../../elements/core/images.private.ts';

export const leanTableTemplate = (): TemplateResult => html`
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

    .table-header__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--sbb-spacing-fixed-2x);
    }

    .table-header__actions {
      display: inline-flex;
      align-items: center;
    }

    .table-header__button {
      opacity: 0;
    }

    th:hover .table-header__button,
    th:focus-within .table-header__button,
    .table-header__button[data-active],
    .table-header__button[aria-expanded='true'] {
      opacity: 1;
    }

    @media (hover: none) {
      .table-header__button {
        opacity: 1;
      }
    }
    .col-actions {
      width: 1%;
      white-space: nowrap;
      position: relative;
    }

    sbb-table-wrapper {
      margin-bottom: var(--sbb-spacing-responsive-xxxs);
    }

    .table-view table {
      --sbb-table-data-cell-font-size: var(--sbb-text-font-size-s);
    }

    .status-filter {
      margin-bottom: var(--sbb-spacing-fixed-2x);
    }

    .sbb-table--hover tbody td:not(.col-actions) {
      cursor: var(--sbb-cursor-pointer);
    }

    .row-actions {
      display: flex;
      align-items: center;
      gap: var(--sbb-spacing-fixed-1x);
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
            icon-name="list-small"
            aria-label="Card list"
          ></sbb-icon-sidebar-button>
          <sbb-icon-sidebar-button
            class="sbb-active"
            aria-current="page"
            icon-name="four-squares-small"
            aria-label="Table view"
          ></sbb-icon-sidebar-button>
        </sbb-icon-sidebar>

        <sbb-icon-sidebar-content sbb-header-scroll-origin>
          <sbb-container class="page table-view" color="transparent" expanded background-expanded>
            <sbb-title level="2" class="page__title">Title</sbb-title>

            <div class="status-filter">
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
            </div>

            <sbb-table-wrapper>
              <table
                class="sbb-table-s sbb-table--striped sbb-table--hover"
                style="width: 100%;"
                aria-label="Entries"
              >
                <thead>
                  <tr>
                    <th data-sort-key="title" aria-sort="none">
                      <div class="table-header__content">
                        <span>Name</span>
                        <span class="table-header__actions">
                          <sbb-mini-button
                            id="search-trigger"
                            class="table-header__button table-header__filter"
                            icon-name="filter-small"
                            aria-label="Filter by name"
                          ></sbb-mini-button>
                          <sbb-mini-button
                            id="sort-trigger-title"
                            class="table-header__button table-header__sort"
                            data-sort="title"
                            icon-name="arrows-up-down-small"
                            aria-label="Sort by name"
                          ></sbb-mini-button>
                        </span>
                      </div>
                    </th>
                    <th data-sort-key="category" aria-sort="none">
                      <div class="table-header__content">
                        <span>Category</span>
                        <span class="table-header__actions">
                          <sbb-mini-button
                            id="category-trigger"
                            class="table-header__button table-header__filter"
                            icon-name="filter-small"
                            aria-label="Filter by category"
                          ></sbb-mini-button>
                          <sbb-mini-button
                            id="sort-trigger-category"
                            class="table-header__button table-header__sort"
                            data-sort="category"
                            icon-name="arrows-up-down-small"
                            aria-label="Sort by category"
                          ></sbb-mini-button>
                        </span>
                      </div>
                    </th>
                    <th data-sort-key="person" aria-sort="none">
                      <div class="table-header__content">
                        <span>User</span>
                        <span class="table-header__actions">
                          <sbb-mini-button
                            id="person-trigger"
                            class="table-header__button table-header__filter"
                            icon-name="filter-small"
                            aria-label="Filter by user"
                          ></sbb-mini-button>
                          <sbb-mini-button
                            id="sort-trigger-person"
                            class="table-header__button table-header__sort"
                            data-sort="person"
                            icon-name="arrows-up-down-small"
                            aria-label="Sort by user"
                          ></sbb-mini-button>
                        </span>
                      </div>
                    </th>
                    <th data-sort-key="date" aria-sort="none">
                      <div class="table-header__content">
                        <span>Date</span>
                        <span class="table-header__actions">
                          <sbb-mini-button
                            id="date-trigger"
                            class="table-header__button table-header__filter"
                            icon-name="filter-small"
                            aria-label="Filter by date"
                          ></sbb-mini-button>
                          <sbb-mini-button
                            id="sort-trigger-date"
                            class="table-header__button table-header__sort"
                            data-sort="date"
                            icon-name="arrows-up-down-small"
                            aria-label="Sort by date"
                          ></sbb-mini-button>
                        </span>
                      </div>
                    </th>
                    <th data-sort-key="status" aria-sort="none">
                      <div class="table-header__content">
                        <span>Status</span>
                        <span class="table-header__actions">
                          <sbb-mini-button
                            id="sort-trigger-status"
                            class="table-header__button table-header__sort"
                            data-sort="status"
                            icon-name="arrows-up-down-small"
                            aria-label="Sort by status"
                          ></sbb-mini-button>
                        </span>
                      </div>
                    </th>
                    <th class="col-actions"><span class="sbb-screen-reader-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  <tr data-id="1">
                    <td>Innovative strategies for sustainability</td>
                    <td>Environment</td>
                    <td>Christine Müller</td>
                    <td>15.10.2026</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-1"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-1">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-1"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-1">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-1"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-1">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-1"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-1">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="2">
                    <td>Digital transformation in healthcare</td>
                    <td>Technology</td>
                    <td>Thomas Weber</td>
                    <td>20.11.2026</td>
                    <td><sbb-status type="not-started">Planned</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-2"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-2">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-2"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-2">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-2"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-2">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-2"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-2">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="3">
                    <td>Promoting cultural diversity and integration</td>
                    <td>Social</td>
                    <td>Anna Keller</td>
                    <td>05.12.2026</td>
                    <td><sbb-status type="pending">In progress</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-3"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-3">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-3"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-3">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-3"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-3">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-3"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-3">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="4">
                    <td>Effective project management in agile teams</td>
                    <td>Management</td>
                    <td>Markus Brunner</td>
                    <td>12.01.2027</td>
                    <td><sbb-status type="not-started">Planned</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-4"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-4">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-4"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-4">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-4"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-4">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-4"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-4">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="5">
                    <td>Trends in artificial intelligence</td>
                    <td>Research</td>
                    <td>Laura Steiner</td>
                    <td>28.02.2027</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-5"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-5">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-5"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-5">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-5"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-5">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-5"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-5">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="6">
                    <td>Successful marketing campaigns 2027</td>
                    <td>Marketing</td>
                    <td>Thomas Weber</td>
                    <td>10.03.2027</td>
                    <td><sbb-status type="pending">In progress</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-6"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-6">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-6"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-6">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-6"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-6">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-6"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-6">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="7">
                    <td>Innovative strategies for sustainability</td>
                    <td>Environment</td>
                    <td>Anna Keller</td>
                    <td>15.10.2026</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-7"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-7">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-7"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-7">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-7"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-7">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-7"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-7">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="8">
                    <td>Digital transformation in healthcare</td>
                    <td>Technology</td>
                    <td>Christine Müller</td>
                    <td>20.11.2026</td>
                    <td><sbb-status type="not-started">Planned</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-8"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-8">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-8"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-8">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-8"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-8">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-8"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-8">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="9">
                    <td>Climate protection in urban areas</td>
                    <td>Environment</td>
                    <td>Thomas Weber</td>
                    <td>15.10.2026</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-9"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-9">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-9"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-9">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-9"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-9">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-9"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-9">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="10">
                    <td>Cloud migration for public authorities</td>
                    <td>Technology</td>
                    <td>Laura Steiner</td>
                    <td>21.11.2026</td>
                    <td><sbb-status type="not-started">Planned</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-10"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-10">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-10"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-10">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-10"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-10">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-10"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-10">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="11">
                    <td>Volunteering and social cohesion</td>
                    <td>Social</td>
                    <td>Anna Keller</td>
                    <td>28.12.2026</td>
                    <td><sbb-status type="pending">In progress</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-11"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-11">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-11"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-11">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-11"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-11">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-11"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-11">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="12">
                    <td>Leading remote teams</td>
                    <td>Management</td>
                    <td>Christine Müller</td>
                    <td>03.02.2027</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-12"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-12">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-12"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-12">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-12"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-12">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-12"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-12">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="13">
                    <td>New materials for energy storage</td>
                    <td>Research</td>
                    <td>Markus Brunner</td>
                    <td>12.03.2027</td>
                    <td><sbb-status type="not-started">Planned</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-13"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-13">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-13"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-13">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-13"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-13">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-13"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-13">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="14">
                    <td>Storytelling for brands</td>
                    <td>Marketing</td>
                    <td>Thomas Weber</td>
                    <td>18.04.2027</td>
                    <td><sbb-status type="pending">In progress</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-14"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-14">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-14"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-14">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-14"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-14">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-14"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-14">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="15">
                    <td>Circular economy in practice</td>
                    <td>Environment</td>
                    <td>Laura Steiner</td>
                    <td>25.05.2027</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-15"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-15">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-15"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-15">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-15"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-15">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-15"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-15">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="16">
                    <td>Data protection in digital administration</td>
                    <td>Technology</td>
                    <td>Anna Keller</td>
                    <td>01.07.2027</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-16"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-16">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-16"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-16">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-16"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-16">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-16"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-16">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="17">
                    <td>Intergenerational living</td>
                    <td>Social</td>
                    <td>Christine Müller</td>
                    <td>07.08.2027</td>
                    <td><sbb-status type="not-started">Planned</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-17"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-17">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-17"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-17">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-17"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-17">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-17"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-17">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="18">
                    <td>Change management in mid-sized companies</td>
                    <td>Management</td>
                    <td>Markus Brunner</td>
                    <td>17.11.2026</td>
                    <td><sbb-status type="pending">In progress</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-18"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-18">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-18"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-18">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-18"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-18">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-18"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-18">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="19">
                    <td>Quantum computing at a glance</td>
                    <td>Research</td>
                    <td>Thomas Weber</td>
                    <td>24.12.2026</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-19"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-19">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-19"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-19">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-19"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-19">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-19"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-19">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="20">
                    <td>Social media strategies in transition</td>
                    <td>Marketing</td>
                    <td>Laura Steiner</td>
                    <td>30.01.2027</td>
                    <td><sbb-status type="not-started">Planned</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-20"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-20">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-20"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-20">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-20"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-20">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-20"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-20">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="21">
                    <td>Climate protection in urban areas</td>
                    <td>Environment</td>
                    <td>Anna Keller</td>
                    <td>08.03.2027</td>
                    <td><sbb-status type="pending">In progress</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-21"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-21">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-21"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-21">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-21"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-21">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-21"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-21">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="22">
                    <td>Cloud migration for public authorities</td>
                    <td>Technology</td>
                    <td>Christine Müller</td>
                    <td>14.04.2027</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-22"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-22">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-22"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-22">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-22"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-22">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-22"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-22">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="23">
                    <td>Volunteering and social cohesion</td>
                    <td>Social</td>
                    <td>Markus Brunner</td>
                    <td>21.05.2027</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-23"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-23">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-23"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-23">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-23"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-23">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-23"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-23">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="24">
                    <td>Leading remote teams</td>
                    <td>Management</td>
                    <td>Thomas Weber</td>
                    <td>27.06.2027</td>
                    <td><sbb-status type="not-started">Planned</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-24"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-24">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-24"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-24">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-24"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-24">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-24"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-24">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="25">
                    <td>New materials for energy storage</td>
                    <td>Research</td>
                    <td>Laura Steiner</td>
                    <td>03.08.2027</td>
                    <td><sbb-status type="pending">In progress</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-25"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-25">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-25"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-25">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-25"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-25">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-25"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-25">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="26">
                    <td>Storytelling for brands</td>
                    <td>Marketing</td>
                    <td>Anna Keller</td>
                    <td>13.11.2026</td>
                    <td><sbb-status type="success">Completed</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-26"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-26">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-26"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-26">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-26"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-26">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-26"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-26">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="27">
                    <td>Circular economy in practice</td>
                    <td>Environment</td>
                    <td>Christine Müller</td>
                    <td>20.12.2026</td>
                    <td><sbb-status type="not-started">Planned</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-27"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-27">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-27"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-27">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-27"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-27">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-27"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-27">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr data-id="28">
                    <td>Data protection in digital administration</td>
                    <td>Technology</td>
                    <td>Markus Brunner</td>
                    <td>26.01.2027</td>
                    <td><sbb-status type="pending">In progress</sbb-status></td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <sbb-mini-button
                          id="row-edit-28"
                          data-action="edit"
                          icon-name="pen-small"
                          aria-label="Edit"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-edit-28">Edit</sbb-tooltip>
                        <sbb-mini-button
                          id="row-view-28"
                          data-action="view"
                          icon-name="eye-small"
                          aria-label="View"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-view-28">View</sbb-tooltip>
                        <sbb-mini-button
                          id="row-copy-28"
                          data-action="copy"
                          icon-name="copy-small"
                          aria-label="Duplicate"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-copy-28">Duplicate</sbb-tooltip>
                        <sbb-mini-button
                          id="row-delete-28"
                          data-action="delete"
                          icon-name="trash-small"
                          aria-label="Delete"
                        ></sbb-mini-button>
                        <sbb-tooltip trigger="row-delete-28">Delete</sbb-tooltip>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </sbb-table-wrapper>

            <sbb-paginator
              length="72"
              page-size="28"
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

  <sbb-menu class="sort-menu" data-sort="title" trigger="sort-trigger-title">
    <sbb-menu-button data-dir="asc" icon-name="arrow-down-small">A–Z (ascending)</sbb-menu-button>
    <sbb-menu-button data-dir="desc" icon-name="arrow-up-small">Z–A (descending)</sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button data-dir="none" icon-name="arrows-up-down-small"
      >Reset sorting</sbb-menu-button
    >
  </sbb-menu>
  <sbb-menu class="sort-menu" data-sort="category" trigger="sort-trigger-category">
    <sbb-menu-button data-dir="asc" icon-name="arrow-down-small">A–Z (ascending)</sbb-menu-button>
    <sbb-menu-button data-dir="desc" icon-name="arrow-up-small">Z–A (descending)</sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button data-dir="none" icon-name="arrows-up-down-small"
      >Reset sorting</sbb-menu-button
    >
  </sbb-menu>
  <sbb-menu class="sort-menu" data-sort="person" trigger="sort-trigger-person">
    <sbb-menu-button data-dir="asc" icon-name="arrow-down-small">A–Z (ascending)</sbb-menu-button>
    <sbb-menu-button data-dir="desc" icon-name="arrow-up-small">Z–A (descending)</sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button data-dir="none" icon-name="arrows-up-down-small"
      >Reset sorting</sbb-menu-button
    >
  </sbb-menu>
  <sbb-menu class="sort-menu" data-sort="date" trigger="sort-trigger-date">
    <sbb-menu-button data-dir="asc" icon-name="arrow-down-small">Oldest first</sbb-menu-button>
    <sbb-menu-button data-dir="desc" icon-name="arrow-up-small">Newest first</sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button data-dir="none" icon-name="arrows-up-down-small"
      >Reset sorting</sbb-menu-button
    >
  </sbb-menu>
  <sbb-menu class="sort-menu" data-sort="status" trigger="sort-trigger-status">
    <sbb-menu-button data-dir="asc" icon-name="arrow-down-small">A–Z (ascending)</sbb-menu-button>
    <sbb-menu-button data-dir="desc" icon-name="arrow-up-small">Z–A (descending)</sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button data-dir="none" icon-name="arrows-up-down-small"
      >Reset sorting</sbb-menu-button
    >
  </sbb-menu>
`;
