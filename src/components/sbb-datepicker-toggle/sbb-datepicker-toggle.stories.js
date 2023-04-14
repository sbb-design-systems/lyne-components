import { h } from 'jsx-dom';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';
import isChromatic from 'chromatic';

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  'disable-animation': disableAnimation,
};

const defaultArgs = {
  'disable-animation': isChromatic(),
};

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const queryTrigger = () =>
    canvas.getByTestId('toggle').shadowRoot.querySelector('sbb-tooltip-trigger');

  await waitForComponentsReady(queryTrigger);

  await waitForStablePosition(queryTrigger);

  const toggle = await queryTrigger();
  userEvent.click(toggle);
};

const StandaloneTemplate = (picker, args) => (
  <sbb-datepicker-toggle
    {...args}
    date-picker={picker}
    data-testid="toggle"
  ></sbb-datepicker-toggle>
);

const PickerAndButtonTemplate = (args) => (
  <div style="display: flex; gap: 1em;">
    {StandaloneTemplate('datepicker', args)}
    <sbb-datepicker
      id="datepicker"
      input="datepicker-input"
      data-now={isChromatic() ? new Date(2023, 0, 12, 0, 0, 0).valueOf() : undefined}
    ></sbb-datepicker>
    <input id="datepicker-input" />
  </div>
);

const FormFieldTemplate = (args) => (
  <sbb-form-field>
    <input />
    <sbb-datepicker
      data-now={isChromatic() ? new Date(2023, 0, 12, 0, 0, 0).valueOf() : undefined}
    ></sbb-datepicker>
    {StandaloneTemplate(null, args)}
  </sbb-form-field>
);

export const WithPicker = PickerAndButtonTemplate.bind({});
WithPicker.argTypes = defaultArgTypes;
WithPicker.args = { ...defaultArgs };
WithPicker.play = isChromatic() && playStory;

export const InFormField = FormFieldTemplate.bind({});
InFormField.argTypes = defaultArgTypes;
InFormField.args = { ...defaultArgs };
InFormField.play = isChromatic() && playStory;

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem; ${isChromatic() ? 'min-height: 100vh; min-width: 100vw;' : ''}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      inlineStories: false,
      iframeHeight: '600px',
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-datepicker-toggle',
};
