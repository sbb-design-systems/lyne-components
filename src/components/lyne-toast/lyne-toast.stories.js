import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import events from './lyne-toast.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-toast {...args}>
    <div slot='icon'>
      {getMarkupForSvg(args.iconSlot)}
    </div>
  </lyne-toast>
);

export const single = Template.bind({});

const message = {
  control: {
    type: 'text'
  },
  table: {
    category: 'General Properties'
  }
};

const iconDescription = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Icon'
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
    category: 'Icon'
  }
};

const verticalPosition = {
  control: {
    type: 'select'
  },
  options: [
    'top',
    'bottom'
  ] 
};

const basicArgTypes = {
  'icon-description': iconDescription,
  iconSlot,
  message,
  verticalPosition
};

const basicArgs = {
  iconSlot: iconSlot.options[0],
  message: 'Ciao',
  verticalPosition: 'bottom'
};



single.argTypes = basicArgTypes;
single.args = JSON.parse(JSON.stringify(basicArgs));

single.documentation = {
  title: 'Title which will be rendered on documentation platform'
};

export default {
  decorators: [
    (Story) => (
      <div>
        <Story/>
      </div>
    )
  ],
  documentation: {},
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
  title: 'lyne-toast'
};
