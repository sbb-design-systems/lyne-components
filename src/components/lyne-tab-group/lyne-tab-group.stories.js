import events from './lyne-tab-group.events.ts';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-tab-group {...args}>
    {getMarkupForSvg(args.iconSlot)}
  </lyne-tab-group>
);


const icon1 = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Tab1'
  }
};
const icon2 = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Tab2'
  }
};
const icon3 = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Tab3'
  }
};

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

const labelone = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab1'
  }
};
const labeltwo = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab2'
  }
};
const labelthree = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab3'
  }
};

const basicArgTypes = {
  labelone,
  labeltwo,
  labelthree,
  icon1,
  icon2,
  icon3,
  iconSlot1,
  iconSlot2,
  iconSlot3,
  'icon-description-one': iconDescription1,
  'icon-description-two': iconDescription2,
  'icon-description-three': iconDescription3
};

const basicArgs = {
  labelone: 'Tab 1',
  labeltwo: 'Tab 2',
  labelthree: 'Tab 3',
  icon1: false,
  icon2: false,
  icon3: false,
  iconSlot1: iconSlot1.options[0],
  iconSlot2: iconSlot2.options[0],
  iconSlot3: iconSlot3.options[0]
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
  title: 'lyne-tab-group'
};
