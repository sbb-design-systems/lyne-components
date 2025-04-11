import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import { SbbAutocompleteGridOptionElement } from './autocomplete-grid-option.component.js';
import readme from './readme.md?raw';

import '../../form-field.js';
import '../autocomplete-grid.js';
import '../autocomplete-grid-row.js';

const preserveIconSpace: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Wrapper property',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const numberOfOptions: InputType = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes: ArgTypes = {
  value,
  'icon-name': iconName,
  disabled,
  numberOfOptions,
  preserveIconSpace,
};

const defaultArgs: Args = {
  value: 'Value',
  'icon-name': undefined,
  disabled: false,
  numberOfOptions: 5,
  preserveIconSpace: false,
};

const createOptions = ({
  value,
  disabled,
  numberOfOptions,
  preserveIconSpace,
  ...args
}: Args): TemplateResult[] => {
  const style: Readonly<StyleInfo> = preserveIconSpace
    ? { '--sbb-option-icon-container-display': 'block' }
    : {};
  return [
    ...new Array(numberOfOptions).fill(null).map((_, i) => {
      return html`
        <sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-option
            style=${styleMap(style)}
            ?disabled=${disabled && i === 0}
            value=${`${value} ${i + 1}`}
            ${sbbSpread(args)}
            >${`${value} ${i + 1}`}</sbb-autocomplete-grid-option
          >
        </sbb-autocomplete-grid-row>
      `;
    }),
    html`
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option style=${styleMap(style)} ${sbbSpread(args)} value="long-value"
          >Option Lorem ipsum dolor sit amet.</sbb-autocomplete-grid-option
        >
      </sbb-autocomplete-grid-row>
    `,
  ];
};

const StandaloneTemplate = (args: Args): TemplateResult => html`${createOptions(args)}`;

const AutocompleteTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative}>
    <label>sbb-autocomplete-grid</label>
    <input placeholder="Please select." />
    <sbb-autocomplete-grid> ${createOptions(args)} </sbb-autocomplete-grid>
  </sbb-form-field>
`;

const borderDecorator: Decorator = (story) => html`
  <div style="border: 3px solid red;">${story()}</div>
`;

export const Standalone: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [borderDecorator],
};

export const WithIcon: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'clock-small' },
  decorators: [borderDecorator],
};

export const WithDisabledState: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
  decorators: [borderDecorator],
};

export const WithIconSpace: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, preserveIconSpace: true },
  decorators: [borderDecorator],
};

export const Autocomplete: StoryObj = {
  render: AutocompleteTemplate,
  argTypes: { ...defaultArgTypes, negative },
  args: { ...defaultArgs, negative: false },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    actions: {
      handles: [
        SbbAutocompleteGridOptionElement.events.selectionChange,
        SbbAutocompleteGridOptionElement.events.optionSelected,
      ],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '500px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid-option',
};

export default meta;
