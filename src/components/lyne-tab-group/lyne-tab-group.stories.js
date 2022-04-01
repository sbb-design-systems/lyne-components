import events from './lyne-tab-group.events.ts';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-tab-group selected-index='3' dir={args.dir}>

    <lyne-tab>
      <lyne-tab-label>{args.labelTab1} {getMarkupForSvg(args.iconSlotTab1)} </lyne-tab-label>
      <lyne-tab-amount>{args.amountSlotTab1}</lyne-tab-amount>
      Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo,
      lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.  Donec sed odio operae, eu vulputate felis rhoncus.
      Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.
    </lyne-tab>

    <lyne-tab label={args.labelTab2} amount={args.amountSlotTab2}>
      Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem
      excogitasse ad hoc. Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo,
      lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Donec sed odio operae, eu vulputate felis rhoncus.
      Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc. Quis aute iure reprehenderit in voluptate
      velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo, lit aliquet. Nihilne te nocturnum praesidium Palati,
      nihil urbis vigiliae.
    </lyne-tab>

    <lyne-tab>
      <lyne-tab-label>{args.labelTab3} {getMarkupForSvg(args.iconSlotTab3)}</lyne-tab-label>
      <lyne-tab-amount>{args.amountSlotTab3}</lyne-tab-amount>
      Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem
      excogitasse ad hoc. Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo,
      lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Donec sed odio operae, eu vulputate felis rhoncus.
      Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.
    </lyne-tab>

    <lyne-tab label={args.labelTab4} amount={args.amountSlotTab4}>
      Ab illo tempore, ab est sed immemorabili. Non equidem invideo,
      lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.
    </lyne-tab>

    <lyne-tab label='Tab five' disabled={args.disabled}>
      I was disabled.
    </lyne-tab>

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
  labelTab1: 'Lyne tab one',
  iconSlotTab1,
  amountSlotTab1,
  labelTab2: 'Lyne tab two',
  iconSlotTab2,
  amountSlotTab2,
  labelTab3: 'Lyne tab three',
  iconSlotTab3,
  amountSlotTab3,
  labelTab4: 'Lyne tab four',
  iconSlotTab4,
  amountSlotTab4,
  disabled: true
};
/* eslint-enable sort-keys */

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

/* VARIANTS */
numbers.args.amountSlotTab1 = '23';
numbers.args.amountSlotTab2 = '14';
numbers.args.amountSlotTab3 = '5';
numbers.args.amountSlotTab4 = '29';

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
/* VARIANTS */

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
