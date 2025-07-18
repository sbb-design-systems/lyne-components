import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import './dialog-actions.component.js';
import readme from './readme.md?raw';

import '../../button/button.js';
import '../../button/secondary-button.js';
import '../../link/block-link.js';

const Template = (): TemplateResult =>
  html`<sbb-dialog-actions align-group="stretch" orientation="vertical" horizontal-from="medium">
    <sbb-block-link
      align-self="start"
      icon-name="chevron-small-left-small"
      href="https://www.sbb.ch/en/"
      sbb-dialog-close
    >
      Link
    </sbb-block-link>
    <sbb-secondary-button sbb-dialog-close>Cancel</sbb-secondary-button>
    <sbb-button sbb-dialog-close sbb-focus-initial>Confirm</sbb-button>
  </sbb-dialog-actions>`;

export const Default: StoryObj = { render: Template };

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-dialog/sbb-dialog-actions',
};

export default meta;
