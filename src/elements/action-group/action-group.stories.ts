import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import type { SbbActionGroupElement } from './action-group.component.ts';
import readme from './readme.md?raw';

import '../action-group.ts';
import '../button.ts';
import '../link.ts';

const secondaryButtonTemplate = (alignSelf?: string): TemplateResult => html`
  <sbb-secondary-button align-self=${alignSelf || nothing}> Button 1 </sbb-secondary-button>
`;

const buttonTemplate = (alignSelf?: string): TemplateResult => html`
  <sbb-button align-self=${alignSelf || nothing}>Button 2</sbb-button>
`;

const linkTemplate = (alignSelf?: string): TemplateResult => html`
  <sbb-block-link
    align-self=${alignSelf || nothing}
    icon-name="chevron-small-left-small"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    Link
  </sbb-block-link>
`;

const TemplateTwoElements = (
  alignSelfFirst?: string,
  alignSelfSecond?: string,
): TemplateResult => html`
  ${secondaryButtonTemplate(alignSelfFirst)} ${buttonTemplate(alignSelfSecond)}
`;

const TemplateThreeElements = (
  alignSelfFirst?: string,
  alignSelfSecond?: string,
  alignSelfThird?: string,
): TemplateResult => html`
  ${TemplateTwoElements(alignSelfFirst, alignSelfSecond)} ${linkTemplate(alignSelfThird)}
`;

const getCssClasses = (
  vertical = false,
  horizontalFromLarge = false,
  verticalFullWidth = false,
): string => {
  return `${vertical ? 'sbb-action-group-vertical ' : ''}${horizontalFromLarge ? 'sbb-action-group-horizontal-from-large ' : ''}${verticalFullWidth ? 'sbb-action-group-vertical-full-width ' : ''}`;
};

const CommonTemplateThreeElementsAllocation = ({
  vertical,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(vertical, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateThreeElements()}</sbb-action-group
  >
`;

const CommonTemplateTwoElementsAllocation = ({
  vertical,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(vertical, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateTwoElements()}</sbb-action-group
  >
`;

const TemplateHorizontalAllocation111 = ({
  vertical,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(vertical, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateThreeElements(undefined, 'center')}</sbb-action-group
  >
`;

const TemplateHorizontalAllocation201 = ({
  vertical,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(vertical, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateThreeElements(undefined, undefined, 'end')}</sbb-action-group
  >
`;

const TemplateHorizontalAllocation102 = ({
  vertical,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(vertical, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateThreeElements('start')}</sbb-action-group
  >
`;

const TemplateHorizontalAllocation101 = ({
  vertical,
  horizontalFromLarge,
  verticalFullWidth,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group
    class=${getCssClasses(vertical, horizontalFromLarge, verticalFullWidth)}
    ${sbbSpread(args)}
    >${TemplateTwoElements('start', 'end')}</sbb-action-group
  >
`;

const TemplateVerticalAllocation300FullWidth = ({
  vertical,
  horizontalFromLarge,
  ...args
}: Args): TemplateResult => html`
  <sbb-action-group class=${getCssClasses(vertical, horizontalFromLarge, true)} ${sbbSpread(args)}
    >${TemplateThreeElements(undefined, undefined, 'end')}</sbb-action-group
  >
`;

const buttonSize: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 's', 'm', 'l'] satisfies SbbActionGroupElement['buttonSize'][],
};

const linkSize: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'xs', 's', 'm'] satisfies SbbActionGroupElement['linkSize'][],
};

const vertical: InputType = {
  control: {
    type: 'boolean',
  },
};

const horizontalFromLarge: InputType = {
  control: {
    type: 'boolean',
  },
};

const verticalFullWidth: InputType = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes: ArgTypes = {
  'button-size': buttonSize,
  'link-size': linkSize,
  vertical: vertical,
  horizontalFromLarge: horizontalFromLarge,
  verticalFullWidth: verticalFullWidth,
};

const basicArgs: Args = {
  'button-size': buttonSize.options![1],
  'link-size': linkSize.options![1],
  vertical: false,
  horizontalFromLarge: false,
  verticalFullWidth: false,
};

const basicArgsVertical = {
  ...basicArgs,
  vertical: true,
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

export const SizeS: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'button-size': buttonSize.options![2], 'link-size': linkSize.options![2] },
};

export const Vertical: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical },
};

export const VerticalFullWidth: StoryObj = {
  render: TemplateVerticalAllocation300FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};

export const HorizontalFromLarge: StoryObj = {
  render: TemplateVerticalAllocation300FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth, horizontalFromLarge: true },
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
