import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import '../autocomplete-grid-row.ts';
import './autocomplete-grid-cell.component.ts';
import '../autocomplete-grid-button.ts';

const numberOfButtons: InputType = {
  control: {
    type: 'number',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  numberOfButtons,
  disabled,
};

const defaultArgs: Args = {
  numberOfButtons: 1,
  disabled: false,
};

const Template = ({ numberOfButtons, ...args }: Args): TemplateResult => html`
  <sbb-autocomplete-grid-row>
    ${repeat(
      new Array(numberOfButtons),
      (_, i) => html`
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button
            ${sbbSpread(args)}
            icon-name=${i === 0 ? 'star-small' : i === 1 ? 'pen-small' : 'trash-small'}
          ></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      `,
    )}
  </sbb-autocomplete-grid-row>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const Multiple: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, numberOfButtons: 3 },
};

export const MultipleDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, numberOfButtons: 3, disabled: true },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-autocomplete-grid/sbb-autocomplete-grid-cell',
};

export default meta;
