import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 's'],
};

const defaultArgTypes = {
  size,
};

const defaultArgs = {
  size: size.options[0],
};

const DefaultTemplate = (args) => (
  <sbb-navigation-marker {...args}>
    <sbb-navigation-action id="nav1">Billette & Angebote</sbb-navigation-action>
    <sbb-navigation-action id="nav2">Ferien & Freizeit</sbb-navigation-action>
    <sbb-navigation-action id="nav3">Reiseinformationen</sbb-navigation-action>
    <sbb-navigation-action id="nav4">Hilfe & Kontakt</sbb-navigation-action>
  </sbb-navigation-marker>
);

export const Default = DefaultTemplate.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };
Default.documentation = { title: 'Default Marker' };

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem; ${isChromatic() ? 'min-height: 100vh' : ''}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      inlineStories: false,
      iframeHeight: '400px',
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/navigation/sbb-navigation-marker',
};
