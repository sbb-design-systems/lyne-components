import { h } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';
import readme from './readme.md';

const Template = (args) => <sbb-clock {...args} />;

const times = {
  control: {
    type: 'select',
  },
  options: [
    'now',
    '01:59:27',
    '05:39:12',
    '09:48:13',
    '11:59:13',
    '13:30:41',
    '16:50:00',
    '20:03:21',
    '23:59:39',
  ],
};

const defaultArgTypes = {
  'initial-time': times,
};

export const Default = Template.bind({});

Default.argTypes = defaultArgTypes;
Default.args = {
  'initial-time': times.options[0],
  paused: false,
};

Default.documentation = {
  title: 'Default',
};

export const Paused = Template.bind({});

Paused.argTypes = defaultArgTypes;
Paused.args = {
  'initial-time': times.options[1],
  paused: true,
};

Paused.documentation = {
  title: 'Paused',
};

export const InitialTime = Template.bind({});

InitialTime.argTypes = defaultArgTypes;
InitialTime.args = {
  'initial-time': times.options[1],
  paused: false,
};

InitialTime.documentation = {
  title: `Initial time set to ${times.options[1]}`,
};

/**
 * Stop the clock for Chromatic visual regression tests
 * and set time to given time
 */
if (isChromatic()) {
  Default.args = {
    'initial-time': times.options[1],
    paused: true,
  };

  InitialTime.args = {
    paused: true,
  };
}

export default {
  decorators: [
    (Story) => (
      <div style="max-width: 600px;">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'brand elements/SBB Clock',
};
