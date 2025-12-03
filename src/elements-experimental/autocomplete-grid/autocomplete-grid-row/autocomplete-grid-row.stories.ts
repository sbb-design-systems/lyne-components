import type { Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';

import readme from './readme.md?raw';

import './autocomplete-grid-row.component.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-option.ts';
import '../autocomplete-grid-button.ts';

const Template = (): TemplateResult => html`
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option>Opt 1</sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option>Opt 2</sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button icon-name="dog-small"></sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-autocomplete-grid/sbb-autocomplete-grid-row',
};

export default meta;
