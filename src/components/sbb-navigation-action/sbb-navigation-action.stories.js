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

const defaultArgTypes = {
  size,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  size: size.options[0],
  'aria-label': undefined,
};

const Template = (args) => <sbb-navigation-action {...args}>Label</sbb-navigation-action>;

const style =
  'background-color: var(--sbb-color-midnight-default); width: max-content; padding: 1rem 2rem';

export const SizeL = Template.bind({});
SizeL.argTypes = defaultArgTypes;
SizeL.args = { ...defaultArgs };
SizeL.documentation = { title: 'Size L' };

export const SizeM = Template.bind({});
SizeM.argTypes = defaultArgTypes;
SizeM.args = { ...defaultArgs, size: size.options[1] };
SizeM.documentation = { title: 'Size M' };

export const SizeS = Template.bind({});
SizeS.argTypes = defaultArgTypes;
SizeS.args = { ...defaultArgs, size: size.options[2] };
SizeS.documentation = { title: 'Size S' };

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
