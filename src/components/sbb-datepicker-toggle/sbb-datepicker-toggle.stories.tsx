/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/testing';
import isChromatic from 'chromatic';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'disable-animation': disableAnimation,
};

const defaultArgs: Args = {
  'disable-animation': isChromatic(),
};

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);
  const queryTrigger = (): HTMLSbbTooltipTriggerElement =>
    canvas.getByTestId('toggle').shadowRoot.querySelector('sbb-tooltip-trigger');

  await waitForComponentsReady(queryTrigger);

  await waitForStablePosition(queryTrigger);

  const toggle = queryTrigger();
  userEvent.click(toggle);
};

const StandaloneTemplate = (picker, args): JSX.Element => (
  <sbb-datepicker-toggle
    {...args}
    date-picker={picker}
    data-testid="toggle"
  ></sbb-datepicker-toggle>
);

const PickerAndButtonTemplate = (args): JSX.Element => (
  <div style={{ display: 'flex', gap: '1em' }}>
    {StandaloneTemplate('datepicker', args)}
    <sbb-datepicker
      id="datepicker"
      input="datepicker-input"
      data-now={isChromatic() ? new Date(2023, 0, 12, 0, 0, 0).valueOf() : undefined}
    ></sbb-datepicker>
    <input id="datepicker-input" />
  </div>
);

const FormFieldTemplate = (args): JSX.Element => (
  <sbb-form-field>
    <input />
    <sbb-datepicker
      data-now={isChromatic() ? new Date(2023, 0, 12, 0, 0, 0).valueOf() : undefined}
    ></sbb-datepicker>
    {StandaloneTemplate(null, args)}
  </sbb-form-field>
);

export const WithPicker: StoryObj = {
  render: PickerAndButtonTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() && playStory,
};

export const InFormField: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() && playStory,
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          ...(isChromatic() ? { 'min-height': '100vh', 'min-width': '100vw' } : undefined),
        }}
      >
        <Story />
      </div>
    ),
    withActions as Decorator,
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
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-datepicker/sbb-datepicker-toggle',
};

export default meta;
