import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';

import './autocomplete-grid-row.component.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-option.ts';
import '../autocomplete-grid-button.ts';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
};

const defaultArgs: Args = {
  negative: false,
};

const Template = ({ negative }: Args): TemplateResult => html`
  <sbb-autocomplete-grid-row ?data-negative=${negative}>
    <sbb-autocomplete-grid-option>Opt 1</sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button
        icon-name="pie-small"
        ?negative=${negative}
      ></sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row ?data-negative=${negative}>
    <sbb-autocomplete-grid-option>Opt 2</sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button
        icon-name="dog-small"
        ?negative=${negative}
      ></sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-autocomplete-grid/sbb-autocomplete-grid-row',
};

export default meta;
