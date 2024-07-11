import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import sampleImages from '../../core/images.js';

import { SbbFlipCardElement } from './flip-card.js';
import readme from './readme.md?raw';

import '../../image/image.js';
import '../../title/title.js';
import '../flip-card-details.js';
import '../flip-card-summary.js';

const myProp: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'my-prop': myProp,
};

const defaultArgs: Args = {
  'my-prop': 'Label',
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-flip-card ${sbbSpread(args)}>
    <sbb-flip-card-summary>
      <sbb-title level="4">Summary</sbb-title>
      <sbb-image
        slot="image"
        image-src=${sampleImages[1]}
        border-radius="none"
        aspect-ratio="free"
      ></sbb-image>
    </sbb-flip-card-summary>
    <sbb-flip-card-details
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
      Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae
      tortor ullamcorper maximus. In convallis consectetur felis. Morbi non tempor nisi. Morbi
      consequat lectus et varius rhoncus. Aenean non sodales neque. Nullam pharetra justo euismod,
      pretium lectus sit amet, faucibus dui. Donec aliquet aliquet molestie. Vestibulum ante ipsum
      primis in faucibus orci <button @click=${() => console.log('details click')}>Lillo</button> luctus et ultrices posuere cubilia curae; Aliquam sollicitudin elit
      erat, sit amet egestas arcu accumsan sed. Proin finibus tempor pulvinar. Phasellus consectetur
      placerat nulla, vitae bibendum purus dignissim eget. Integer ullamcorper velit id lorem
      accumsan, id dapibus ipsum interdum. Etiam porta ex eu enim iaculis ullamcorper sed eget nibh.
      Etiam in neque eget ipsum ultricies consequat. Nulla facilisi. Nulla facilisi. In vel justo
      augue. Vivamus fermentum finibus velit in gravida. Vivamus ligula dolor, convallis et mollis
      ut, maximus vitae turpis. Cras at risus porta, pulvinar nibh ut, porta sapien. Praesent ligula
      risus, interdum vel purus ut, lacinia pharetra nibh. Vestibulum cursus dolor sed varius
      finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu massa porta,
      accumsan magna sit amet, tempus felis. Nam lobortis lacus posuere, dictum lectus eu, mattis
      ex. Donec convallis cursus est vehicula egestas. Vivamus eleifend nisl quis sodales convallis.
      Vivamus porttitor aliquet quam, non varius est convallis vel. Quisque sed nunc sit amet nulla
      commodo sodales. Cras laoreet metus sit amet felis ullamcorper, id bibendum purus vehicula.
      Pellentesque a purus eget nibh ornare ullamcorper. Aliquam sagittis, lorem eget faucibus
      blandit, lacus tellus vehicula orci, sed semper lorem justo lacinia ligula. Maecenas pharetra
      lorem vel vehicula pellentesque. Etiam volutpat vulputate elit, sed faucibus libero venenatis
      egestas. Praesent luctus nisi eu nunc viverra vehicula.</sbb-flip-card-details
    >
  </sbb-flip-card>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbFlipCardElement.events.myEventName],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-flip-card/sbb-flip-card',
};

export default meta;
