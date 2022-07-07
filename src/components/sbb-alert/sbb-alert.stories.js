import events from './sbb-alert.events.ts';
import readme from './readme.md';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';

const TemplateDefaultIcon = (args) => (
  <div>
    <sbb-alert {...args}>
      <sbb-title text="Streckenunterbruch zwischen Stadelhofen und Zürich HB" />
      Zwischen Bern und Olten finden vom 03.11.2021 – 05.12.2022 jeweils zwischen 22:30 – 06:00 Uhr
      Bauarbeiten statt. Sie müssen mit geänderten Fahrzeiten und geänderten Anschlüssen rechnen.{' '}
      <sbb-link text="Mehr erfahren" href-value="#" variant="inline-negative"></sbb-link>
    </sbb-alert>
    <p>Other Content on a page</p>
    <div
      style={{
        display: 'flex',
        gap: '8px',
      }}
    >
      <sbb-button
        variant="secondary"
        label="Present"
        onClick={() => {
          // eslint-disable-next-line no-undef
          document.querySelector('sbb-alert').present();
        }}
      ></sbb-button>
      <sbb-button
        variant="secondary"
        label="Dismiss"
        onClick={() => {
          // eslint-disable-next-line no-undef
          document.querySelector('sbb-alert').dismiss();
        }}
      ></sbb-button>
    </div>
  </div>
);

const customIconSvg = getMarkupForSvg('disruption');

customIconSvg.setAttribute('slot', 'icon');

const TemplateCustomIcon = (args) => (
  <sbb-alert {...args}>
    {customIconSvg}
    <sbb-title text="Streckenunterbruch zwischen Stadelhofen und Zürich HB" />
    {getMarkupForSvg('disruption')}
    Zwischen Bern und Olten finden vom 03.11.2021 – 05.12.2022 jeweils zwischen 22:30 – 06:00 Uhr
    Bauarbeiten statt. Sie müssen mit geänderten Fahrzeiten und geänderten Anschlüssen rechnen.
  </sbb-alert>
);

export const defaultIcon = TemplateDefaultIcon.bind({});

export const customIcon = TemplateCustomIcon.bind({});

const ariaLivePoliteness = {
  control: {
    type: 'select',
  },
  options: ['off', 'polite', 'assertive'],
};

const size = {
  control: {
    type: 'select',
  },
  options: ['m', 'l'],
};

const defaultArgTypes = {
  'aria-live-politeness': ariaLivePoliteness,
  disableAnimation: false,
  readonly: true,
  size,
};

const defaultArgs = {
  'aria-live-politeness': ariaLivePoliteness.options[1],
  disableAnimation: false,
  readonly: false,
  size: size.options[0],
};

defaultIcon.argTypes = defaultArgTypes;
defaultIcon.args = JSON.parse(JSON.stringify(defaultArgs));
defaultIcon.documentation = {
  title: 'Alert with default icon',
};

customIcon.argTypes = defaultArgTypes;
customIcon.args = JSON.parse(JSON.stringify(defaultArgs));
customIcon.documentation = {
  title: 'Alert with a custom icon',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.willPresent, events.didPresent, events.didDismiss],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-alert',
};
