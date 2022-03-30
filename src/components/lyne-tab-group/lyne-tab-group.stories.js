import events from './lyne-tab-group.events.ts';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-tab-group selected-index='2' dir={args.dir}>

    <lyne-tab>
      <lyne-tab-label>{args.label} {getMarkupForSvg(args.iconSlot)} </lyne-tab-label>
      <lyne-tab-amount>{args.amountSlot}</lyne-tab-amount>
      Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo,
      lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.  Donec sed odio operae, eu vulputate felis rhoncus.
      Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.
    </lyne-tab>

    <lyne-tab label='Tab two' amount='123'>
      Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem
      excogitasse ad hoc. Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo,
      lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Donec sed odio operae, eu vulputate felis rhoncus.
      Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc. Quis aute iure reprehenderit in voluptate
      velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo, lit aliquet. Nihilne te nocturnum praesidium Palati,
      nihil urbis vigiliae.
    </lyne-tab>

    <lyne-tab label='Tab three'>
      <lyne-tab-label>Lyne tab three {getMarkupForSvg('arrow-right-small')}</lyne-tab-label>
      <lyne-tab-amount>45</lyne-tab-amount>
      Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem
      excogitasse ad hoc. Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo,
      lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Donec sed odio operae, eu vulputate felis rhoncus.
      Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.
    </lyne-tab>

    <lyne-tab label='Tab four' amount='44'>
      Ab illo tempore, ab est sed immemorabili. Non equidem invideo,
      lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.
    </lyne-tab>

    <lyne-tab label='Tab five' disabled={args.disabled}>
      I was disabled.
    </lyne-tab>

  </lyne-tab-group>
);

const label = {
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
    'pie-small',
    'qrcode-small'
  ],
  table: {
    category: 'Tab1'
  }
};

const amountSlot = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Tab1'
  }
};

const disabledArg = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Tab1'
  }
};

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
    category: 'Tab1'
  }
};

/* eslint-disable sort-keys */
const basicArgTypes = {
  dir,
  label,
  iconSlot,
  amountSlot,
  disabled: disabledArg
};

const basicArgs = {
  dir,
  label: 'Lyne tab one',
  iconSlot: iconSlot.options[0],
  amountSlot,
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
