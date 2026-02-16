import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import { SbbAlertElement } from '../alert.ts';

import { SbbAlertGroupElement } from './alert-group.component.ts';
import readme from './readme.md?raw';

import '../../link/link.ts';
import '../../title.ts';

const Template = (args: Args): TemplateResult => html`
  <sbb-alert-group ${sbbSpread(args)}>
    <sbb-alert size="l">
      <sbb-title level="3">Interruption between Genève and Lausanne</sbb-title>
      The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
      <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
    </sbb-alert>
    <sbb-alert>
      <sbb-title level="3">Interruption between Berne and Olten</sbb-title>
      Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
      construction work will take place. You have to expect changed travel times and changed
      connections. <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
    </sbb-alert>
  </sbb-alert-group>
`;

const accessibilityTitle: InputType = {
  control: {
    type: 'text',
  },
};

const accessibilityTitleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const role: InputType = {
  control: {
    type: 'text',
  },
};

const ariaLive: InputType = {
  control: {
    type: 'select',
  },
  options: ['off', 'polite', 'assertive'],
};

const defaultArgTypes: ArgTypes = {
  'accessibility-title': accessibilityTitle,
  'accessibility-title-level': accessibilityTitleLevel,
  role,
  'aria-live': ariaLive,
};

const defaultArgs: Args = {
  'accessibility-title': 'Disruptions',
  'accessibility-title-level': accessibilityTitleLevel.options![1],
  role: 'status',
  'aria-live': undefined,
};

export const multipleAlerts: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbAlertGroupElement.events.empty,
        SbbAlertElement.events.beforeopen,
        SbbAlertElement.events.open,
        SbbAlertElement.events.beforeclose,
        SbbAlertElement.events.close,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-alert/sbb-alert-group',
};

export default meta;
