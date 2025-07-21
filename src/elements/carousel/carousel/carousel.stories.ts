import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { repeat } from 'lit/directives/repeat.js';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import images from '../../core/images.js';

import readme from './readme.md?raw';

import './carousel.component.js';
import '../carousel-list/carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../paginator.js';
import '../../image.js';

const shadow: InputType = {
  control: {
    type: 'boolean',
  },
};

const imgType: InputType = {
  control: {
    type: 'select',
  },
  options: ['native', 'sbb-image', 'caption'],
};

const defaultArgTypes: ArgTypes = {
  shadow,
  imgType,
};

const defaultArgs: Args = {
  shadow: true,
  imgType: imgType.options![0],
};

const Template = ({ imgType, ...args }: Args): TemplateResult => html`
  <sbb-carousel ${sbbSpread(args)}>
    <sbb-carousel-list>
      ${repeat(
        images,
        (images) => images,
        (img, index) => html`
          <sbb-carousel-item>
            ${choose(imgType, [
              ['native', () => html` <img src=${img} alt="SBB image" height="300" width="400" /> `],
              [
                'sbb-image',
                () => html`
                  <sbb-image
                    image-src=${img}
                    alt="SBB image"
                    style="width: 800px; height: 600px;"
                  ></sbb-image>
                `,
              ],
              [
                'caption',
                () => html`
                  <div
                    style="display: flex; flex-direction: column; align-items: center; background-color: black; color: white;"
                  >
                    <img src=${img} alt="SBB image" height="300" width="400" />
                    Caption for picture ${index + 1}
                  </div>
                `,
              ],
            ])}
          </sbb-carousel-item>
        `,
      )}
    </sbb-carousel-list>
    <sbb-compact-paginator></sbb-compact-paginator>
  </sbb-carousel>
`;

export const Native: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs },
};

export const SbbImage: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, imgType: imgType.options![1] },
};

export const Caption: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, imgType: imgType.options![2] },
};

export const NoShadow: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, shadow: false },
};

const meta: Meta = {
  parameters: {
    backgroundColor: () => 'var(--sbb-color-milk)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-carousel/sbb-carousel',
};

export default meta;
