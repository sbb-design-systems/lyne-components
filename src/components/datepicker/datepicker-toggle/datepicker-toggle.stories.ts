import { withActions } from '@storybook/addon-actions/decorator';
import { userEvent, within } from '@storybook/testing-library';
import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  ArgTypes,
  Args,
  Decorator,
  StoryContext,
} from '@storybook/web-components';
import isChromatic from 'chromatic';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { waitForComponentsReady } from '../../../storybook/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../../storybook/testing/wait-for-stable-position';
import { sbbSpread } from '../../core/dom';
import type { SbbTooltipTriggerElement } from '../../tooltip';

import '../../form-field';
import '../datepicker';

import './datepicker-toggle';
import readme from './readme.md?raw';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'disable-animation': disableAnimation,
  negative,
};

const defaultArgs: Args = {
  'disable-animation': isChromatic(),
  negative: false,
};

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);
  const queryTrigger = (): SbbTooltipTriggerElement =>
    canvas.getByTestId('toggle').shadowRoot!.querySelector('sbb-tooltip-trigger')!;

  await waitForComponentsReady(queryTrigger);

  await waitForStablePosition(queryTrigger);

  const toggle = queryTrigger();
  userEvent.click(toggle);
};

const StandaloneTemplate = (picker, args): TemplateResult => html`
  <sbb-datepicker-toggle
    ${sbbSpread(args)}
    date-picker=${picker}
    data-testid="toggle"
  ></sbb-datepicker-toggle>
`;

const PickerAndButtonTemplate = (args): TemplateResult => html`
  <div style=${styleMap({ display: 'flex', gap: '1em' })}>
    ${StandaloneTemplate('datepicker', args)}
    <sbb-datepicker
      id="datepicker"
      input="datepicker-input"
      data-now=${isChromatic() ? new Date(2023, 0, 12, 0, 0, 0).valueOf() : nothing}
    ></sbb-datepicker>
    <input id="datepicker-input" />
  </div>
`;

const FormFieldTemplate = ({ negative, ...args }: Args): TemplateResult => html`
  <sbb-form-field ?negative=${negative}>
    <input />
    <sbb-datepicker
      data-now=${isChromatic() ? new Date(2023, 0, 12, 0, 0, 0).valueOf() : nothing}
    ></sbb-datepicker>
    ${StandaloneTemplate(null, args)}
  </sbb-form-field>
`;

export const WithPicker: StoryObj = {
  render: PickerAndButtonTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const InFormField: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const InFormFieldNegative: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
  play: isChromatic() ? playStory : undefined,
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div
        style=${styleMap({
          ...wrapperStyle(context),
          padding: '2rem',
          ...(isChromatic() ? { 'min-height': '100vh', 'min-width': '100vw' } : undefined),
        })}
      >
        ${story()}
      </div>
    `,
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
