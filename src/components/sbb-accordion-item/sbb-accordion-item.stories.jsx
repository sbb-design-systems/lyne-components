import events from './sbb-accordion-item.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

const Template = (args) => (
  <sbb-accordion-item {...args}>
    <p slot="content">
      1 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae
      dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.
    </p>
    <p slot="content">
      2 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae
      dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.
    </p>
    <p slot="content">
      3 Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed
      immemorabili. Non equidem invideo, lit aliquet. Nihilne te nocturnum praesidium Palati, nihil
      urbis vigiliae.
    </p>

    {args.icon && (
      <svg slot="icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m17.8436,12.1382-3.99-3.99196-.7072.70693,3.1366,3.13823H5v1h11.287l-3.1413,3.1555.7086.7056,3.99-4.008.3519-.3535-.3526-.3528z"
        ></path>
      </svg>
    )}
  </sbb-accordion-item>
);

export const Default = Template.bind({});

Default.documentation = {
  container: {
    styles: {
      'background-color': 'var(--sbb-color-white-default);',
      border: '2px solid var(--sbb-color-milk-default);',
    },
  },
  title: 'Default Accordion Item',
};

Default.args = {
  disabled: false,
  'event-id': 'id1',
  heading: 'Accordion Item',
  'heading-level': '2',
  icon: true,
  open: false,
};

export default {
  decorators: [withActions],
  parameters: {
    actions: {
      handles: [events.didOpen, events.didClose, events.willOpen, events.willClose],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-accordion-item (Unfinished)',
};
