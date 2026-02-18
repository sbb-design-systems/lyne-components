import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import '../link/block-link.ts';
import '../card.ts';
import './bar-container.component.ts';
import readme from './readme.md?raw';

const color: InputType = {
  control: {
    type: 'select',
  },
  options: ['white', 'milk'],
};

const cardColor: InputType = {
  control: {
    type: 'select',
  },
  options: ['white', 'milk'],
};

const defaultArgTypes: ArgTypes = {
  color,
  cardColor,
};

const defaultArgs: Args = {
  color: color.options![0],
  cardColor: cardColor.options![0],
};

const ContentText = (): TemplateResult => html`
  <span class="sbb-text-m">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio, ut
    blandit libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur
    malesuada, nibh ac blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac
    justo.
  </span>
`;

const Template = ({ cardColor, ...args }: Args): TemplateResult => html`
  <sbb-bar-container ${sbbSpread(args)}>
    <sbb-block-link icon-name="arrow-left-small" href="/" negative>Zurich</sbb-block-link>
    <sbb-card color=${cardColor}>${ContentText()}</sbb-card>
  </sbb-bar-container>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Milk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: 'milk' },
};

export const MilkCard: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, cardColor: 'milk' },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'elements/sbb-bar-container',
};

export default meta;
