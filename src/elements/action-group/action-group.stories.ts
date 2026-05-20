import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';

import '../action-group.ts';
import '../button.ts';
import '../link.ts';

const getStyle = (align?: string): string => {
  if (align === 'start') {
    return 'margin-inline-end: auto;';
  }

  if (align === 'end') {
    return 'margin-inline-start: auto;';
  }

  return '';
};

const secondaryButtonTemplate = (align?: string): TemplateResult => html`
  <sbb-secondary-button style=${getStyle(align)}>Button 1</sbb-secondary-button>
`;

const buttonTemplate = (align?: string): TemplateResult => html`
  <sbb-button style=${getStyle(align)}>Button 2</sbb-button>
`;

const linkTemplate = (align?: string): TemplateResult => html`
  <sbb-block-link
    icon-name="chevron-small-left-small"
    style=${`
      margin-block: auto;
     ${getStyle(align)}
    `}
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    Link
  </sbb-block-link>
`;

const TemplateTwoElements = (alignFirst?: string, alignSecond?: string): TemplateResult => html`
  ${secondaryButtonTemplate(alignFirst)} ${buttonTemplate(alignSecond)}
`;

const TemplateThreeElements = (
  alignFirst?: string,
  alignSecond?: string,
  alignThird?: string,
): TemplateResult => html`
  ${TemplateTwoElements(alignFirst, alignSecond)} ${linkTemplate(alignThird)}
`;

const getCssClasses = (
  orientation = 'horizontal',
  horizontalFrom = undefined,
  verticalFullWidth = false,
): string => {
  return `${orientation === 'vertical' ? 'sbb-orientation-vertical ' : ''}${horizontalFrom ? `sbb-orientation-horizontal-from-${horizontalFrom} ` : ''}${verticalFullWidth ? 'sbb-orientation-vertical-full-width ' : ''}`;
};

const CommonTemplateThreeElementsAllocation = ({
  orientation,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(orientation, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateThreeElements()}
  </sbb-action-group>
`;

const CommonTemplateTwoElementsAllocation = ({
  orientation,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(orientation, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateTwoElements()}</sbb-action-group
  >
`;

const TemplateHorizontalAllocation111 = ({
  orientation,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    style="justify-content: space-between;"
    class=${getCssClasses(orientation, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateThreeElements(undefined, 'center')}</sbb-action-group
  >
`;

const TemplateHorizontalAllocation201 = ({
  orientation,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(orientation, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateThreeElements(undefined, undefined, 'end')}</sbb-action-group
  >
`;

const TemplateHorizontalAllocation102 = ({
  orientation,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(orientation, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateThreeElements('start')}</sbb-action-group
  >
`;

const TemplateHorizontalAllocation101 = ({
  orientation,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(orientation, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateTwoElements('start', 'end')}</sbb-action-group
  >
`;

const TemplateVerticalAllocation300FullWidth = ({
  orientation,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(orientation, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateThreeElements(undefined, undefined, 'end')}</sbb-action-group
  >
`;

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFromLarge: InputType = {
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
  orientation: orientation,
  horizontalFromLarge: horizontalFromLarge,
  verticalFullWidth: verticalFullWidth,
};

const basicArgs: Args = {
  orientation: orientation.options![0],
  horizontalFromLarge: undefined,
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

export const HorizontalAllocation2_0_0: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const HorizontalAllocation1_0_1: StoryObj = {
  render: TemplateHorizontalAllocation101,
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
  args: { ...basicArgsVerticalFullWidth, horizontalFromLarge: horizontalFromLarge.options![1] },
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
