import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import images from '../../core/images.js';

import readme from './readme.md?raw';

import './carousel.component.js';
import '../carousel-list/carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../paginator.js';
import '../../image.js';

const textBlockStyle: Args = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-white)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud)',
  borderRadius: 'var(--sbb-border-radius-4x)',
};

const shadow: InputType = {
  control: {
    type: 'boolean',
  },
};

const imgType: InputType = {
  control: {
    type: 'select',
  },
  options: ['native', 'native-mobile', 'sbb-image', 'caption'],
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
        images.slice(0, 3),
        (images) => images,
        (img, index) => html`
          <sbb-carousel-item>
            ${choose(imgType, [
              ['native', () => html` <img src=${img} alt="SBB image" height="450" width="800" /> `],
              [
                'native-mobile',
                () => html` <img src=${img} alt="SBB image" height="150" width="267" /> `,
              ],
              [
                'sbb-image',
                () => html`
                  <sbb-image
                    image-src=${img}
                    alt="SBB image"
                    style="width: 800px; height: 450px;"
                  ></sbb-image>
                `,
              ],
              [
                'caption',
                () => html`
                  <div
                    style="display: flex; flex-direction: column; align-items: center; background-color: black; color: white;"
                  >
                    <img src=${img} alt="SBB image" width="800" height="450" />
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
  ${imgType === 'native-mobile'
    ? html` <div style=${styleMap(textBlockStyle)}>
        In mobile, scrolling the carousel can de-sync the paginator if the image is bigger than the
        viewport. Be sure to set the right dimensions for the slotted image.
      </div>`
    : nothing}
`;

export const Native: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs },
};

export const NativeMobile: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, imgType: imgType.options![1] },
};

export const SbbImage: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, imgType: imgType.options![2] },
};

export const Caption: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, imgType: imgType.options![3] },
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
