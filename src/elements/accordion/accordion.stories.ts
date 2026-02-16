import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import { SbbExpansionPanelElement } from '../expansion-panel.ts';

import readme from './readme.md?raw';
import './accordion.component.ts';

const numberOfPanels: InputType = {
  control: {
    type: 'number',
  },
};

const multi: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Accordion',
  },
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6, null],
  table: {
    category: 'Accordion',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 's'],
  table: {
    category: 'Accordion',
  },
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
  table: {
    category: 'Panel',
  },
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Panel',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Panel',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Panel',
  },
};

const headerText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header',
  },
};

const contentText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Content',
  },
};

const defaultArgTypes: ArgTypes = {
  numberOfPanels,
  multi,
  'title-level': titleLevel,
  size,
  color,
  expanded,
  borderless,
  disabled,
  headerText,
  iconName,
  contentText,
};

const defaultArgs: Args = {
  numberOfPanels: 3,
  multi: false,
  'title-level': titleLevel.options![2],
  size: size.options![0],
  color: color.options![0],
  expanded: false,
  borderless: false,
  disabled: false,
  headerText: 'This is the header',
  iconName: undefined,
  contentText: 'This is the content: "Lorem ipsum dolor sit amet".',
};

const Template = ({
  numberOfPanels,
  color,
  expanded,
  borderless,
  disabled,
  headerText,
  iconName,
  contentText,
  ...args
}: Args): TemplateResult => html`
  <sbb-accordion ${sbbSpread(args)}>
    ${repeat(
      new Array(numberOfPanels),
      (_, index: number) => html`
        <sbb-expansion-panel
          color=${color}
          ?expanded=${expanded}
          ?borderless=${borderless}
          ?disabled=${disabled && index === 0}
        >
          <sbb-expansion-panel-header icon-name=${iconName || nothing}>
            ${headerText} ${index + 1}
          </sbb-expansion-panel-header>
          <sbb-expansion-panel-content>
            <p>Content ${index + 1}</p>
            ${contentText}
          </sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `,
    )}
  </sbb-accordion>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Milk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1] },
};

export const Borderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const MilkBorderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1], borderless: true },
};

export const WithIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, iconName: 'swisspass-medium' },
};

export const Expanded: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

export const Multi: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, multi: true },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const SizeSWithIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1], iconName: 'swisspass-medium' },
};

const meta: Meta = {
  decorators: [withActions],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.borderless ? 'var(--sbb-background-color-4)' : 'var(--sbb-background-color-1)',
    actions: {
      handles: [
        SbbExpansionPanelElement.events.beforeopen,
        SbbExpansionPanelElement.events.open,
        SbbExpansionPanelElement.events.beforeclose,
        SbbExpansionPanelElement.events.close,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-accordion/sbb-accordion',
};

export default meta;
