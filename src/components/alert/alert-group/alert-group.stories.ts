import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import { SbbAlertGroupElement } from './alert-group.js';
import readme from './readme.md?raw';

import '../alert.js';

const Template = (args: Args): TemplateResult => html`
  <sbb-alert-group ${sbbSpread(args)}>
    <sbb-alert
      title-content="Interruption between Genève and Lausanne"
      href="https://www.sbb.ch"
      size="l"
    >
      The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
    </sbb-alert>
    <sbb-alert title-content="Interruption between Berne and Olten" href="https://www.sbb.ch">
      Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
      construction work will take place. You have to expect changed travel times and changed
      connections.
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
  'accessibility-title-level': accessibilityTitleLevel.options[1],
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
      handles: [SbbAlertGroupElement.events.didDismissAlert, SbbAlertGroupElement.events.empty],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-alert/sbb-alert-group',
};

export default meta;
