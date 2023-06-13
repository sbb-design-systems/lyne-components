/** @jsx h */
import { h, JSX } from 'jsx-dom';
import images from '../../global/images';
import readme from './readme.md';
import isChromatic from 'chromatic';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args): JSX.Element => <sbb-image {...args} />;

const imageSrc: InputType = {
  control: {
    type: 'select',
  },
  options: images,
};

const borderRadius: InputType = {
  control: {
    type: 'select',
  },
  options: ['true', 'false'],
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

const lqip: InputType = {
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
  'border-radius': borderRadius,
  'aspect-ratio': aspectRatio,
  copyright,
  'copyright-holder': copyrightHolder,
  'custom-focal-point': customFocalPoint,
  'focal-point-debug': focalPointDebug,
  'focal-point-x': focalPointX,
  'focal-point-y': focalPointY,
  'image-src': imageSrc,
  loading,
  lqip,
  'performance-mark': performanceMark,
  'disable-animation': disableAnimation,
};

const defaultArgs: Args = {
  alt: '',
  caption: undefined,
  // we need a string and not boolean, otherwise storybook add/remove the attribute but don't write the value
  'border-radius': 'true',
  'aspect-ratio': aspectRatio.options[0],
  copyright: '',
  'copyright-holder': copyrightHolder.options[0],
  'custom-focal-point': false,
  'focal-point-debug': false,
  'focal-point-x': '',
  'focal-point-y': '',
  'image-src': imageSrc.options[0],
  loading: loading.options[1],
  lqip: true,
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
};

export const TransparentImage: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'image-src': imageSrc.options[9],
  },
};

export const NoCaptionNoRadius: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'border-radius': 'false',
  },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ 'max-width': '1000px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { diffThreshold: 0.11, delay: 5000 },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-image',
};

export default meta;
