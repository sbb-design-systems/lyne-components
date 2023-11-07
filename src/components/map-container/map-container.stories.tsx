/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import './map-container';
import '../form-field';
import '../icon';
import '../title';
import '../header';

const hideScrollUpButton: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'hide-scroll-up-button': hideScrollUpButton,
};

const defaultArgs: Args = {
  'hide-scroll-up-button': false,
};

const Template = (args): JSX.Element => (
  <sbb-map-container {...args}>
    <div style={{ padding: 'var(--sbb-spacing-fixed-4x)' }}>
      <sbb-form-field style={{ width: '100%' }}>
        <sbb-icon slot="prefix" name="magnifying-glass-small"></sbb-icon>
        <input minLength={2} name="keyword" autocomplete="off" placeholder="Search" />
        <sbb-icon slot="suffix" name="cross-medium"></sbb-icon>
      </sbb-form-field>
      <sbb-title level="4">Operations & Disruptions</sbb-title>
      {[...Array(10).keys()].map((value) => (
        <div
          style={{
            'background-color': 'var(--sbb-color-milk-default)',
            height: '116px',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'border-radius': 'var(--sbb-border-radius-4x)',
            'margin-block-end': 'var(--sbb-spacing-fixed-4x)',
          }}
        >
          <p>Situation {value}</p>
        </div>
      ))}
    </div>

    <div slot="map" style={{ height: '100%' }}>
      <div
        style={{
          'background-color': 'grey',
          height: '100%',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        }}
      >
        map
      </div>
    </div>
  </sbb-map-container>
);

export const MapContainer: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div>
        <sbb-header expanded hide-on-scroll>
          <sbb-header-action icon-name="hamburger-menu-small" expand-from="small">
            Menu
          </sbb-header-action>
        </sbb-header>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-map-container',
};

export default meta;
