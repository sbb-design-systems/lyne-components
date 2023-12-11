import { within } from '@storybook/testing-library';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import isChromatic from 'chromatic';
import { html, TemplateResult } from 'lit';

import { waitForComponentsReady } from '../../storybook/testing/wait-for-components-ready';
import { sbbSpread } from '../core/dom';
import images from '../core/images';

import readme from './readme.md?raw';

import './image';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);
  await waitForComponentsReady(() =>
    canvas.getByTestId('image').shadowRoot.querySelector('.image__img'),
  );

  await new Promise<void>((resolve: () => void) => {
    canvas
      .getByTestId('image')
      .shadowRoot.querySelector('.image__img')
      .addEventListener('load', resolve, { once: true });
  });
};

const Template = (args): TemplateResult =>
  html`<sbb-image data-testid="image" ${sbbSpread(args)}></sbb-image>`;

const imageSrc: InputType = {
  control: {
    type: 'select',
  },
  options: images,
};

const noBorderRadius: InputType = {
  control: {
    type: 'boolean',
  },
};

const aspectRatio: InputType = {
  control: { type: 'select' },
  options: ['free', '1-1', '1-2', '2-1', '2-3', '3-2', '3-4', '4-3', '4-5', '5-4', '9-16', '16-9'],
};

const copyright: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Legal',
  },
};

const copyrightHolder: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['Organization', 'Person'],
  table: {
    category: 'Legal',
  },
};

const customFocalPoint: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Focal Point',
  },
};

const focalPointDebug: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Focal Point',
  },
};

const focalPointX: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Focal Point',
  },
};

const focalPointY: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Focal Point',
  },
};

const loading: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['eager', 'lazy'],
  table: {
    category: 'Performance',
  },
};

const skipLqip: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Performance',
  },
};

const performanceMark: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Performance',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  alt: {},
  caption: {},
  'no-border-radius': noBorderRadius,
  'aspect-ratio': aspectRatio,
  copyright,
  'copyright-holder': copyrightHolder,
  'custom-focal-point': customFocalPoint,
  'focal-point-debug': focalPointDebug,
  'focal-point-x': focalPointX,
  'focal-point-y': focalPointY,
  'image-src': imageSrc,
  loading,
  'skip-lqip': skipLqip,
  'performance-mark': performanceMark,
  'disable-animation': disableAnimation,
};

const defaultArgs: Args = {
  alt: '',
  caption: undefined,
  // we need a string and not boolean, otherwise storybook add/remove the attribute but don't write the value
  'no-border-radius': false,
  'aspect-ratio': aspectRatio.options[0],
  copyright: '',
  'copyright-holder': copyrightHolder.options[0],
  'custom-focal-point': false,
  'focal-point-debug': false,
  'focal-point-x': '',
  'focal-point-y': '',
  'image-src': imageSrc.options[0],
  loading: loading.options[1],
  'skip-lqip': false,
  'performance-mark': '',
  'disable-animation': isChromatic(),
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    caption:
      'Mit Ihrem Halbtax profitieren Sie zudem von attraktiven Zusatzleistungen und Rabatten. Wenn Sie unter 25 Jahre jung sind, können Sie zu Ihrem Halbtax das beliebte <a href="https://www.sbb.ch/abos-billette/abonnemente/gleis-7-freie-fahrt-ab-19-uhr.html#jahrg_nger_halbtax">Gleis 7</a> dazu kaufen.',
  },
  play: isChromatic() ? playStory : undefined,
};

export const TransparentImage: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'image-src': imageSrc.options[9],
  },
  play: isChromatic() ? playStory : undefined,
};

export const NoCaptionNoRadius: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'no-border-radius': true,
  },
  play: isChromatic() ? playStory : undefined,
};

const meta: Meta = {
  decorators: [(story) => html` <div style="max-width: 1000px;">${story()}</div> `],
  parameters: {
    chromatic: { diffThreshold: 0.25, delay: 10000 },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-image',
};

export default meta;
