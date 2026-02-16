import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import images from '../../core/images.ts';

import readme from './readme.md?raw';

import './carousel.component.ts';
import '../carousel-list/carousel-list.component.ts';
import '../carousel-item/carousel-item.component.ts';
import '../../button.ts';
import '../../chip-label.ts';
import '../../card.ts';
import '../../image.ts';
import '../../paginator.ts';

const buttonCarouselStyle: Args = {
  height: '300px',
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
  options: ['native', 'native-mobile', 'sbb-image', 'figure', 'link'],
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
              [
                'native',
                () => html`
                  <img src=${img} alt="SBB image ${index + 1}" height="450" width="800" />
                `,
              ],
              [
                'native-mobile',
                () => html`
                  <img src=${img} alt="SBB image ${index + 1}" height="150" width="267" />
                `,
              ],
              [
                'sbb-image',
                () => html`
                  <sbb-image
                    image-src=${img}
                    alt="SBB image ${index + 1}"
                    style="width: 800px; height: 450px;"
                  ></sbb-image>
                `,
              ],
              [
                'figure',
                () => html`
                  <figure class="sbb-figure" style="width: 800px; height: 500px;">
                    <sbb-chip-label class="sbb-figure-overlap-start-start">
                      Chip label
                    </sbb-chip-label>
                    <img src=${img} alt="SBB image ${index + 1}" />
                    <figcaption style="text-align: center;">
                      Caption for picture ${index + 1}
                    </figcaption>
                  </figure>
                `,
              ],
              [
                'link',
                () => html`
                  <a
                    href="https://github.com/sbb-design-systems/lyne-components"
                    target="_blank"
                    tabindex="-1"
                  >
                    <sbb-image
                      image-src=${img}
                      alt="SBB image ${index + 1}"
                      style="width: 800px; height: 450px;"
                    ></sbb-image>
                  </a>
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
    ? html` <sbb-card color=${args.shadow ? 'white' : 'milk'}>
        In mobile, scrolling the carousel can de-sync the paginator if the image is bigger than the
        viewport. Be sure to set the right dimensions for the slotted image.
      </sbb-card>`
    : nothing}
`;

const buttonTemplate = ({ shadow }: Args): TemplateResult => html`
  <sbb-carousel ?shadow=${shadow}>
    <sbb-carousel-list>
      <sbb-carousel-item>
        <div style=${styleMap(buttonCarouselStyle)}>
          <p>sbb.ch</p>
          <p>Animation - Onboarding slides</p>
          <sbb-button>Start</sbb-button>
        </div>
      </sbb-carousel-item>
      <sbb-carousel-item>
        <div style=${styleMap(buttonCarouselStyle)}>
          <p>Another slide</p>
          <sbb-button>Another button</sbb-button>
        </div>
      </sbb-carousel-item>
      <sbb-carousel-item>
        <div style=${styleMap(buttonCarouselStyle)}>
          <p>End</p>
        </div>
      </sbb-carousel-item>
    </sbb-carousel-list>
    <sbb-compact-paginator></sbb-compact-paginator>
  </sbb-carousel>
`;

const teaserTemplate = ({ shadow }: Args): TemplateResult => html`
  <sbb-carousel ?shadow=${shadow}>
    <sbb-carousel-list>
      <sbb-carousel-item>
        <div
          style="position: relative; width: 800px; height: 450px; display: flex; justify-content: center;"
        >
          <div style="position: relative; margin: 50px; z-index: 1;">
            <div class="sbb-text--bold sbb-text-xl">Title slide 1</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies
              in tincidunt quis, mattis eu quam.
            </div>
          </div>
          <sbb-image
            image-src=${images[9]}
            alt="Helpteaser-Background-Landscape"
            class="sbb-image-border-radius-none"
            style="position: absolute; inset: 0;"
          ></sbb-image>
        </div>
      </sbb-carousel-item>
      <sbb-carousel-item>
        <div
          style="position: relative; width: 800px; height: 450px; display: flex; justify-content: center;"
        >
          <div style="position: relative; margin: 50px; z-index: 1;">
            <div class="sbb-text--bold sbb-text-xl">Title slide 2</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies
              in tincidunt quis, mattis eu quam.
            </div>
          </div>
          <sbb-image
            image-src=${images[9]}
            alt="Helpteaser-Background-Landscape"
            class="sbb-image-border-radius-none"
            style="position: absolute; inset: 0;"
          ></sbb-image>
        </div>
      </sbb-carousel-item>
    </sbb-carousel-list>
    <sbb-compact-paginator></sbb-compact-paginator>
  </sbb-carousel>
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

export const Figure: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, imgType: imgType.options![3] },
};

export const Link: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, imgType: imgType.options![4] },
};

export const Button: StoryObj = {
  render: buttonTemplate,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs },
};

export const ImageAndText: StoryObj = {
  render: teaserTemplate,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs },
};

export const NoShadow: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, shadow: false },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['beforeshow', 'show'],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.shadow ? 'var(--sbb-background-color-3)' : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-carousel/sbb-carousel',
};

export default meta;
