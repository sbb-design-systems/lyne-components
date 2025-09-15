import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { repeat } from 'lit/directives/repeat.js';
import type { InputType } from 'storybook/internal/types';

import images from '../../core/images.js';

import readme from './readme.md?raw';

import './carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../image.js';

const imgType: InputType = {
  control: {
    type: 'select',
  },
  options: ['native', 'sbb-image', 'caption'],
};

const defaultArgTypes: ArgTypes = {
  imgType,
};

const defaultArgs: Args = {
  imgType: imgType.options![0],
};

const Template = ({ imgType }: Args): TemplateResult => html`
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

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-carousel/sbb-carousel-list',
};

export default meta;
