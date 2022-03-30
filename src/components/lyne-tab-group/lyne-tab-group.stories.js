import events from './lyne-tab-group.events.ts';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-tab-group selected-index='1'>

    <lyne-tab disabled={args.disabled}>
      <lyne-tab-label>{args.label} {getMarkupForSvg(args.iconSlot)} </lyne-tab-label>
      <lyne-tab-amount>{args.amountSlot}</lyne-tab-amount>
      <iframe width='420' height='235'
        src='https://www.youtube.com/embed/tgbNymZ7vqY'>
      </iframe>
    </lyne-tab>

    <lyne-tab label='Tab two' amount='123'>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
      making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
      default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
      evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
    </lyne-tab>

    <lyne-tab label='Tab three'>
      <lyne-tab-label>Lyne tab three {getMarkupForSvg('arrow-right-small')}</lyne-tab-label>
      <lyne-tab-amount>45</lyne-tab-amount>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.
    </lyne-tab>

    <lyne-tab label='Tab four' amount='44'>
      Random content.
    </lyne-tab>

    <lyne-tab label='Tab five' disabled>
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

/* eslint-disable sort-keys */
const basicArgTypes = {
  label,
  iconSlot,
  amountSlot,
  disabled: disabledArg
};

const basicArgs = {
  label: 'Lyne tab one',
  iconSlot: iconSlot.options[0],
  amountSlot,
  disabled: false
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
