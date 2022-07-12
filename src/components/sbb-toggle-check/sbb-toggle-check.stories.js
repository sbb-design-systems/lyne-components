import { h } from 'jsx-dom';
import readme from './readme.md';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const checked = {
  control: {
    type: 'boolean',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const label = {
  control: {
    type: 'text',
  },
};

const labelPosition = {
  control: {
    type: 'inline-radio',
  },
  options: ['before', 'after'],
};

const defaultArgTypes = {
  checked,
  disabled,
  'label-position': labelPosition,
  label,
};

const defaultArgs = {
  checked: false,
  disabled: false,
  'label-position': labelPosition[1],
  label: 'Title',
  name: 'toggle',
  icon: 'tick-small',
};

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const ToggleCheckDefaultTemplate = (args) => (
  <sbb-toggle-check {...args}>
    {args.label}
    <span slot="icon">{getMarkupForSvg(args.icon)}</span>
  </sbb-toggle-check>
);

export const sbbToggleCheckDefault = ToggleCheckDefaultTemplate.bind({});
export const sbbToggleCheckWithoutLabel = ToggleCheckDefaultTemplate.bind({});
export const sbbToggleCheckDisabled = ToggleCheckDefaultTemplate.bind({});
export const sbbToggleCheckDisabledChecked = ToggleCheckDefaultTemplate.bind({});

sbbToggleCheckDefault.argTypes = defaultArgTypes;
sbbToggleCheckDefault.args = {
  ...defaultArgs,
};

sbbToggleCheckWithoutLabel.argTypes = defaultArgTypes;
sbbToggleCheckWithoutLabel.args = {
  ...defaultArgs,
  'label-position': '',
};

sbbToggleCheckDisabled.argTypes = defaultArgTypes;
sbbToggleCheckDisabled.args = {
  ...defaultArgs,
  disabled: true,
};

sbbToggleCheckDisabledChecked.argTypes = defaultArgTypes;
sbbToggleCheckDisabledChecked.args = {
  ...defaultArgs,
  disabled: true,
  checked: true,
};

sbbToggleCheckDefault.documentation = {
  title: 'Default',
};

export default {
  title: 'components/sbb-toggle-check',

  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
};
