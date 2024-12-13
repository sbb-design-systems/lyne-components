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

import { SbbChipGroupElement } from './chip-group.js';
import readme from './readme.md?raw';

import '../chip.js';
import '../../form-field/form-field.js';

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

const Template = (args: Args): TemplateResult => html`
  <sbb-form-field>
    <label>Label</label>
    <sbb-chip-group ${sbbSpread(args)}>
      <sbb-chip value="chip 1"></sbb-chip>
      <sbb-chip value="chip 2"></sbb-chip>
      <sbb-chip value="chip 3"></sbb-chip>
      <input />
    </sbb-chip-group>
  </sbb-form-field>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbChipGroupElement.events.input, SbbChipGroupElement.events.change],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-chip-group/sbb-chip-group',
};

export default meta;
