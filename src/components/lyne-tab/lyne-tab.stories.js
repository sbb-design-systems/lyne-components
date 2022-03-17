import events from './lyne-tab.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-tab {...args}></lyne-tab>
);

const icon = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Tab1'
  }
};
const iconDescription = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab1'
  }
};
const iconSlot = {
  control: {
    type: 'select'
  },
  options: [
    'arrow-right-small',
    'arrow-down-small',
    'arrow-compass-small',
    'pie-small'
  ],
  table: {
    category: 'Tab1'
  }
};
const label = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab1'
  }
};

const basicArgTypes = {
  label,
  icon,
  iconSlot,
  'icon-description-one': iconDescription
};

const basicArgs = {
  label: 'Tab importato',
  icon: false,
  iconSlot: iconSlot.options[0]
};

export const story1 = Template.bind({});


story1.argTypes = basicArgTypes;

story1.args = JSON.parse(JSON.stringify(basicArgs));

story1.documentation = {
  title: 'Title which will be rendered on documentation platform'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform']
  },
  parameters: {
    actions: {
      handles: [events.click]
    },
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-tab'
};
