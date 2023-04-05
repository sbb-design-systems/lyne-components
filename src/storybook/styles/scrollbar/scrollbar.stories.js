import readme from './readme.md';
import './scrollbar-internal.scss';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

const Template = (args) => (
  <div class={`overflow-container scrollbar-${args.variant}`}>
    <div class="inner-box">{text}</div>
  </div>
);

const variant = {
  control: {
    type: 'inline-radio',
  },
  options: ['light', 'dark', 'light-thick', 'dark-thick'],
};

const defaultArgTypes = {
  variant,
};

const defaultArgs = {
  variant: variant.options[0],
};

export const Light = Template.bind({});
Light.argTypes = defaultArgTypes;
Light.args = { ...defaultArgs };

export const Dark = Template.bind({});
Dark.argTypes = defaultArgTypes;
Dark.args = { ...defaultArgs, variant: variant.options[1] };

export const LightThick = Template.bind({});
LightThick.argTypes = defaultArgTypes;
LightThick.args = { ...defaultArgs, variant: variant.options[2] };

export const DarkThick = Template.bind({});
DarkThick.argTypes = defaultArgTypes;
DarkThick.args = { ...defaultArgs, variant: variant.options[3] };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'styles/scrollbar',
};
