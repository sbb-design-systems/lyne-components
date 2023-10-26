import { SbbMenu } from './sbb-menu';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-menu', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenu],
      html: `
      <sbb-button id="menu-trigger">Menu trigger</sbb-button>
      <sbb-menu trigger="menu-trigger">
        <sbb-link href="https://www.sbb.ch/en" variant="block">Profile</sbb-link>
        <sbb-menu-action icon="tick-small">View</sbb-menu-action>
        <sbb-menu-action icon="pen-small" amount="1" disabled>Edit</sbb-menu-action>
        <sbb-menu-action icon="swisspass-small" amount="2">Details</sbb-menu-action>
        <sbb-divider />
        <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
      </sbb-menu>`,
    });

    expect(root).toEqualHtml(`
      <sbb-menu trigger="menu-trigger" data-state="closed" id="sbb-menu-1">
        <mock:shadow-root>
          <div class="sbb-menu__container">
            <div class="sbb-menu">
              <div class="sbb-menu__content">
                <slot></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <sbb-link href="https://www.sbb.ch/en" variant="block">
          Profile
        </sbb-link>
        <sbb-menu-action icon="tick-small">
          View
        </sbb-menu-action>
        <sbb-menu-action amount="1" disabled="" icon="pen-small">
          Edit
        </sbb-menu-action>
        <sbb-menu-action amount="2" icon="swisspass-small">
          Details
        </sbb-menu-action>
        <sbb-divider>
          <sbb-menu-action icon="cross-small">
            Cancel
          </sbb-menu-action>
        </sbb-divider>
      </sbb-menu>
    `);
  });

  it('renders with list', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenu],
      html: `
      <sbb-button id="menu-trigger">Menu trigger</sbb-button>
      <sbb-menu trigger="menu-trigger">
        <sbb-menu-action icon="tick-small">View</sbb-menu-action>
        <sbb-menu-action icon="pen-small" amount="1" disabled>Edit</sbb-menu-action>
        <sbb-menu-action icon="swisspass-small" amount="2">Details</sbb-menu-action>
        <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
      </sbb-menu>`,
    });

    expect(root).toEqualHtml(`
    <sbb-menu data-state="closed" id="sbb-menu-2" trigger="menu-trigger">
      <mock:shadow-root>
        <div class="sbb-menu__container">
          <div class="sbb-menu">
            <div class="sbb-menu__content">
              <ul class="sbb-menu-list">
                <li>
                  <slot name="action-0"></slot>
                </li>
                <li>
                  <slot name="action-1"></slot>
                </li>
                <li>
                  <slot name="action-2"></slot>
                </li>
                <li>
                  <slot name="action-3"></slot>
                </li>
              </ul>
              <span hidden="">
                <slot></slot>
              </span>
            </div>
          </div>
        </div>
      </mock:shadow-root>
      <sbb-menu-action icon="tick-small" slot="action-0">
        View
      </sbb-menu-action>
      <sbb-menu-action amount="1" disabled="" icon="pen-small" slot="action-1">
        Edit
      </sbb-menu-action>
      <sbb-menu-action amount="2" icon="swisspass-small" slot="action-2">
        Details
      </sbb-menu-action>
      <sbb-menu-action icon="cross-small" slot="action-3">
        Cancel
      </sbb-menu-action>
    </sbb-menu>
    `);
  });
});
