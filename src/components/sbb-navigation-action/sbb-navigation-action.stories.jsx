import { h } from 'jsx-dom';
import readme from './readme.md';

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const href = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  size,
  href,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  size: size.options[0],
  href: undefined,
  'aria-label': undefined,
};

const Template = (args) => <sbb-navigation-action {...args}>Label</sbb-navigation-action>;

const style =
  'background-color: var(--sbb-color-midnight-default); width: max-content; padding: 1rem 2rem';

export const SizeL = Template.bind({});
SizeL.argTypes = defaultArgTypes;
SizeL.args = { ...defaultArgs };

export const SizeM = Template.bind({});
SizeM.argTypes = defaultArgTypes;
SizeM.args = { ...defaultArgs, size: size.options[1] };

export const SizeS = Template.bind({});
SizeS.argTypes = defaultArgTypes;
SizeS.args = { ...defaultArgs, size: size.options[2] };

export const Link = Template.bind({});
Link.argTypes = defaultArgTypes;
Link.args = { ...defaultArgs, href: 'https://www.sbb.ch' };

export default {
  decorators: [
    (Story) => (
      <div style={style}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-navigation-action',
};
