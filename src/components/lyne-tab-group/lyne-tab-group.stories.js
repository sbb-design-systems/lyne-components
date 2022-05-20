import { h } from 'jsx-dom';
import events from './lyne-tab-group.events.ts';
import readme from './readme.md';

const Template = (args) => (
  <lyne-tab-group initial-selected-index='0' dir={args.dir}>

    <h1>{args.labelTab1}<lyne-tab-amount>{args.amountSlotTab1}</lyne-tab-amount></h1>
    <div>
      Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam
      adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec
      ultrices dui sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
      <h3>Content heading</h3>
      Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam
      adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec.
    </div>

    <h2>{args.labelTab2}<lyne-tab-amount>{args.amountSlotTab2}</lyne-tab-amount></h2>
    <div>Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam
      adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec.</div>

    <h3 disabled={args.disabled}>{args.labelTab3}<lyne-tab-amount>{args.amountSlotTab3}</lyne-tab-amount></h3>
    <div>I was disabled.</div>

    <h4>{args.labelTab4}<lyne-tab-amount>{args.amountSlotTab4}</lyne-tab-amount></h4>
    <div>Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam
      adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec
      ultrices dui sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
    </div>

  </lyne-tab-group>
);

const TemplateNested = (args) => (
  <lyne-tab-group initial-selected-index='0' dir={args.dir}>

    <h1>{args.labelTab1}<lyne-tab-amount>{args.amountSlotTab1}</lyne-tab-amount></h1>
    <div>
      Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam
      adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec
      ultrices dui sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
      <h3>Content heading</h3>
      Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam
      adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec.
    </div>

    <h2>{args.labelTab2}<lyne-tab-amount>{args.amountSlotTab2}</lyne-tab-amount></h2>
    <div>Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam
      adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec.</div>

    <h3 disabled={args.disabled}>{args.labelTab3}<lyne-tab-amount>{args.amountSlotTab3}</lyne-tab-amount></h3>
    <div>I was disabled.</div>

    <h4>{args.labelTab4}<lyne-tab-amount>{args.amountSlotTab4}</lyne-tab-amount></h4>
    <div>
      <lyne-tab-group initial-selected-index='1' dir={args.dir}>

        <h1>Nested tab</h1>
        <div>
          Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam
          adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec
          ultrices dui sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
        </div>

        <h2>Nested tab</h2>
        <div>
          Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam
          adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna.
        </div>

      </lyne-tab-group>
    </div>

  </lyne-tab-group>
);

const dir = {
  control: {
    type: 'select'
  },
  options: [
    'unset',
    'ltr',
    'rtl'
  ],
  table: {
    category: 'Tab group'
  }
};

const labelTab1 = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab1'
  }
};
const iconSlotTab1 = {
  control: {
    type: 'select'
  },
  options: [
    'arrow-right-small',
    'arrow-down-small',
    'arrow-compass-small',
    'pie-small',
    'qrcode-small'
  ],
  table: {
    category: 'Tab1'
  }
};
const amountSlotTab1 = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Tab1'
  }
};

const labelTab2 = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab2'
  }
};
const iconSlotTab2 = {
  control: {
    type: 'select'
  },
  options: [
    'arrow-right-small',
    'arrow-down-small',
    'arrow-compass-small',
    'pie-small',
    'qrcode-small'
  ],
  table: {
    category: 'Tab2'
  }
};
const amountSlotTab2 = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Tab2'
  }
};

const labelTab3 = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab3'
  }
};
const iconSlotTab3 = {
  control: {
    type: 'select'
  },
  options: [
    'arrow-right-small',
    'arrow-down-small',
    'arrow-compass-small',
    'pie-small',
    'qrcode-small'
  ],
  table: {
    category: 'Tab3'
  }
};
const amountSlotTab3 = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Tab3'
  }
};

const labelTab4 = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Tab4'
  }
};
const iconSlotTab4 = {
  control: {
    type: 'select'
  },
  options: [
    'arrow-right-small',
    'arrow-down-small',
    'arrow-compass-small',
    'pie-small',
    'qrcode-small'
  ],
  table: {
    category: 'Tab4'
  }
};
const amountSlotTab4 = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Tab4'
  }
};

const disabledArg = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Disabled Tab'
  }
};

/* eslint-disable sort-keys */
const basicArgTypes = {
  dir,
  labelTab1,
  iconSlotTab1,
  amountSlotTab1,
  labelTab2,
  iconSlotTab2,
  amountSlotTab2,
  labelTab3,
  iconSlotTab3,
  amountSlotTab3,
  labelTab4,
  iconSlotTab4,
  amountSlotTab4,
  disabled: disabledArg
};

const basicArgs = {
  dir,
  labelTab1: 'Tab label one',
  iconSlotTab1: '',
  amountSlotTab1,
  labelTab2: 'Tab label two',
  iconSlotTab2: '',
  amountSlotTab2,
  labelTab3: 'Tab label three',
  iconSlotTab3: '',
  amountSlotTab3,
  labelTab4: 'Tab label four',
  iconSlotTab4: '',
  amountSlotTab4,
  disabled: true
};

export const defaultTabs = Template.bind({});
export const numbers = Template.bind({});
export const icons = Template.bind({});
export const numbersAndIcons = Template.bind({});
export const nestedTabGroups = TemplateNested.bind({});

defaultTabs.argTypes = basicArgTypes;
numbers.argTypes = basicArgTypes;
icons.argTypes = basicArgTypes;
numbersAndIcons.argTypes = basicArgTypes;
nestedTabGroups.argTypes = basicArgTypes;

defaultTabs.args = JSON.parse(JSON.stringify(basicArgs));
numbers.args = JSON.parse(JSON.stringify(basicArgs));
icons.args = JSON.parse(JSON.stringify(basicArgs));
numbersAndIcons.args = JSON.parse(JSON.stringify(basicArgs));
nestedTabGroups.args = JSON.parse(JSON.stringify(basicArgs));

/* VARIANTS */
numbers.args.amountSlotTab1 = '23';
numbers.args.amountSlotTab2 = '14';
numbers.args.amountSlotTab3 = '5';
numbers.args.amountSlotTab4 = '29';

/* eslint-disable prefer-destructuring */
icons.args.iconSlotTab1 = iconSlotTab1.options[0];
icons.args.iconSlotTab2 = iconSlotTab1.options[1];
icons.args.iconSlotTab3 = iconSlotTab1.options[2];
icons.args.iconSlotTab4 = iconSlotTab1.options[3];

numbersAndIcons.args.amountSlotTab1 = '23';
numbersAndIcons.args.amountSlotTab2 = '14';
numbersAndIcons.args.amountSlotTab3 = '5';
numbersAndIcons.args.amountSlotTab4 = '29';
numbersAndIcons.args.iconSlotTab1 = iconSlotTab1.options[0];
numbersAndIcons.args.iconSlotTab2 = iconSlotTab1.options[1];
numbersAndIcons.args.iconSlotTab3 = iconSlotTab1.options[2];
numbersAndIcons.args.iconSlotTab4 = iconSlotTab1.options[3];

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
  parameters: {
    actions: {
      handles: [events.selectedTabChanged]
    },
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/tabs/lyne-tab-group'
};
