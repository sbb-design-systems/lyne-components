import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';

import '../action-group.ts';
import '../button.ts';
import '../link.ts';

const alignment = (align?: 'start' | 'center' | 'end'): Record<string, string> => {
  switch (align) {
    case 'start':
      return { 'margin-inline-end': 'auto' };
    case 'end':
      return { 'margin-inline-start': 'auto' };
    default:
      return {};
  }
};

const applyCssClasses = ({
  orientation = 'horizontal',
  horizontalFrom = undefined,
  verticalFullWidth = false,
}: Args): string => {
  const classes = [];
  if (orientation === 'vertical') {
    classes.push('sbb-orientation-vertical');
  }
  if (horizontalFrom) {
    classes.push(`sbb-orientation-horizontal-from-${horizontalFrom}`);
  }
  if (verticalFullWidth) {
    classes.push('sbb-orientation-vertical-full-width');
  }
  return classes.join(' ');
};

const Items = ({
  first,
  second,
  third,
}: {
  first?: 'start' | 'center' | 'end';
  second?: 'start' | 'center' | 'end';
  third?: 'start' | 'center' | 'end';
} = {}): TemplateResult =>
  html`<sbb-secondary-button style=${styleMap(alignment(first))}> Button 1 </sbb-secondary-button>
    <sbb-button style=${styleMap(alignment(second))}>Button 2</sbb-button>
    <sbb-block-link
      icon-name="chevron-small-left-small"
      style=${styleMap({ 'margin-block': 'auto', ...alignment(third) })}
      href="https://github.com/sbb-design-systems/lyne-components"
    >
      Link
    </sbb-block-link>`;

const CommonTemplateThreeElementsAllocation = (args: Args): TemplateResult => html`
  <sbb-action-group class=${applyCssClasses(args)}>${Items()}</sbb-action-group>
`;

const TemplateHorizontalAllocation111 = (args: Args): TemplateResult => html`
  <sbb-action-group
    style=${styleMap({ 'justify-content': 'space-between' })}
    class=${applyCssClasses(args)}
  >
    ${Items({ second: 'center' })}
  </sbb-action-group>
`;

const TemplateHorizontalAllocation201 = (args: Args): TemplateResult => html`
  <sbb-action-group class=${applyCssClasses(args)}> ${Items({ third: 'end' })} </sbb-action-group>
`;

const TemplateHorizontalAllocation102 = (args: Args): TemplateResult => html`
  <sbb-action-group class=${applyCssClasses(args)}> ${Items({ first: 'start' })} </sbb-action-group>
`;

const TemplateVerticalAllocation300FullWidth = (args: Args): TemplateResult => html`
  <sbb-action-group class=${applyCssClasses(args)}> ${Items({ third: 'end' })} </sbb-action-group>
`;

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['small', 'large', 'ultra'],
};

const verticalFullWidth: InputType = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes: ArgTypes = {
  orientation,
  horizontalFrom,
  verticalFullWidth,
};

const basicArgs: Args = {
  orientation: orientation.options![0],
  horizontalFrom: undefined,
  verticalFullWidth: false,
};

const basicArgsVerticalFullWidth = {
  ...basicArgs,
  verticalFullWidth: true,
};

export const HorizontalAllocation3_0_0: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const HorizontalAllocation1_1_1: StoryObj = {
  render: TemplateHorizontalAllocation111,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const HorizontalAllocation2_0_1: StoryObj = {
  render: TemplateHorizontalAllocation201,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const HorizontalAllocation1_0_2: StoryObj = {
  render: TemplateHorizontalAllocation102,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const Vertical: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgs, orientation: orientation.options![1] },
};

export const VerticalFullWidth: StoryObj = {
  render: TemplateVerticalAllocation300FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};

export const HorizontalFromLarge: StoryObj = {
  render: TemplateVerticalAllocation300FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth, horizontalFrom: horizontalFrom.options![1] },
};

export const Complex: StoryObj = {
  render: (): TemplateResult => html`
    <style>
      .action-group {
        display: grid;
        grid-template-columns: repeat(4, auto) 1fr;
      }

      .order-button {
        grid-column: span 5;
      }

      @media screen and (min-width: 37.5rem) {
        .action-group {
          grid-template-columns: repeat(2, auto) 1fr repeat(4, auto);
        }

        .order-button {
          grid-column: auto;
        }
      }
    </style>
    <sbb-action-group class="action-group">
      <sbb-secondary-button icon-name="chevron-small-left-small"></sbb-secondary-button>
      <sbb-secondary-button icon-name="trash-small" aria-label="Delete"></sbb-secondary-button>
      <sbb-secondary-button
        icon-name="context-menu-small"
        aria-label="More actions"
      ></sbb-secondary-button>
      <sbb-secondary-button
        icon-name="magic-wand-small"
        aria-label="Autocomplete order"
      ></sbb-secondary-button>
      <sbb-secondary-button
        icon-name="checkpoints-small"
        aria-label="Open checklist"
      ></sbb-secondary-button>
      <sbb-button class="order-button">Order</sbb-button>
    </sbb-action-group>
  `,
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
  title: 'elements/Action Group',
};

export default meta;
