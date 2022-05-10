import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import lyneToastEvents from './lyne-toast.events';
import { h } from 'jsx-dom';
import readme from './readme.md';

const open = (args) => {
  const toast = document.createElement('lyne-toast');

  toast.config = {
    action: {
      label: 'Action',
      link: 'https://www.sbb.ch/it/'
    },
    horizontalPosition: args.horizontalPosition,
    icon: getMarkupForSvg(args.iconSlot).outerHTML,
    message: args.message,
    timeout: args.timeout,
    verticalPosition: args.verticalPosition
  };

  document.body.appendChild(toast);

  toast.present();
};

const openWithSlot = (args) => {
  const toast = document.createElement('lyne-toast');

  const slot = document.createElement('div');

  slot.setAttribute('slot', 'icon');
  slot.appendChild(getMarkupForSvg(args.iconSlot));
  toast.appendChild(slot);

  toast.config = {
    action: {
      action: () => console.log('Hallo'),
      label: 'Action'
    },
    horizontalPosition: args.horizontalPosition,
    message: args.message,
    timeout: args.timeout,
    verticalPosition: args.verticalPosition
  };

  document.body.appendChild(toast);

  toast.present();
};

const Template = (args) => (
  <div>
    <button onClick={open.bind(this, args)}>Open with SVG and link</button>
    <button onClick={openWithSlot.bind(this, args)}>Open with slot and action</button>
  </div>
);

export const template = Template.bind({});

const message = {
  control: {
    type: 'text'
  },
  table: {
    category: 'General Properties'
  }
};

const timeout = {
  control: {
    type: 'number'
  },
  table: {
    category: 'General Properties'
  }
};

const iconSlot = {
  control: {
    type: 'select'
  },
  options: [
    'cross-small',
    'arrow-down-small',
    'arrow-compass-small',
    'pie-small'
  ],
  table: {
    category: 'Icon',
    disable: false
  }
};

const horizontalPosition = {
  control: {
    type: 'select'
  },
  options: [
    'left',
    'center',
    'right'
  ]
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
  horizontalPosition,
  iconSlot,
  message,
  timeout,
  verticalPosition
};

const basicArgs = {
  horizontalPosition: 'center',
  iconSlot: iconSlot.options[0],
  message: 'Ciao',
  timeout: 2000,
  verticalPosition: 'bottom'
};

template.argTypes = basicArgTypes;
template.args = JSON.parse(JSON.stringify(basicArgs));

template.documentation = {
  title: 'Lyne toast'
};

// lyne-toast_ events are not working
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
      handles: [
        lyneToastEvents.click,
        'lyne-toast_did_dismiss',
        'lyne-toast_did_present',
        'lyne-toast_will_dismiss',
        'lyne-toast_will_present'
      ]
    },
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/overlay/lyne-toast'
};
