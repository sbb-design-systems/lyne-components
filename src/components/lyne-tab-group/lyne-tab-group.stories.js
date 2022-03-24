import events from './lyne-tab-group.events.ts';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-tab-group {...args}>

    <lyne-tab>
      <lyne-tab-label>Lyne tab label <span slot='icon'>{getMarkupForSvg('arrow-right-small')}</span></lyne-tab-label>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.
    </lyne-tab>

    <lyne-tab label='Tab 2'>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
      making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
      default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
      evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
    </lyne-tab>

    <lyne-tab label='Tab 3'></lyne-tab>

  </lyne-tab-group>
);


const iconDescription1 = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab1'
  }
};
const iconDescription2 = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab2'
  }
};
const iconDescription3 = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab3'
  }
};

const iconSlot1 = {
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
const iconSlot2 = {
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
    category: 'Tab2'
  }
};
const iconSlot3 = {
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
    category: 'Tab3'
  }
};

const basicArgTypes = {
  iconSlot1,
  iconSlot2,
  iconSlot3,
  'icon-description-one': iconDescription1,
  'icon-description-two': iconDescription2,
  'icon-description-three': iconDescription3
};

const basicArgs = {
  iconSlot1: iconSlot1.options[0],
  iconSlot2: iconSlot2.options[0],
  iconSlot3: iconSlot3.options[0]
};

export const defaultTabs = Template.bind({});
export const numbers = Template.bind({});
export const icons = Template.bind({});
export const numbersAndIcons = Template.bind({});

defaultTabs.argTypes = basicArgTypes;
numbers.argTypes = basicArgTypes;
icons.argTypes = basicArgTypes;
numbersAndIcons.argTypes = basicArgTypes;

defaultTabs.args = JSON.parse(JSON.stringify(basicArgs));
numbers.args = JSON.parse(JSON.stringify(basicArgs));
icons.args = JSON.parse(JSON.stringify(basicArgs));
numbersAndIcons.args = JSON.parse(JSON.stringify(basicArgs));

defaultTabs.documentation = {
  title: 'Default Tabs'
};
numbers.documentation = {
  title: 'Tabs with numbers'
};
icons.documentation = {
  title: 'Tabs with icons'
};
numbersAndIcons.documentation = {
  title: 'Tabs with numbers and icons'
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
  title: 'lyne-tab-group'
};
