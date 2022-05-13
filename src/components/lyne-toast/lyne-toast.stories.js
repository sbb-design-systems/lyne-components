import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import lyneToastEvents from './lyne-toast.events';
import { h } from 'jsx-dom';
import readme from './readme.md';

const getCommonConfig = (args) => ({
  horizontalPosition: args.horizontalPosition,
  message: args.message,
  timeout: args.timeout,
  verticalPosition: args.verticalPosition
});

const getIconConfig = (iconslot) => ({
  icon: getMarkupForSvg(iconslot).outerHTML
});

const getLinkConfig = (args) => ({
  action: {
    href: args.href,
    label: args.label,
    type: 'link'
  }
});

const getActionConfig = (args) => ({
  action: {
    handler: () => console.log('Action clicked!'),
    label: args.label,
    type: 'action'
  }
});

const getCloseIconConfig = () => ({
  action: {
    type: 'icon'
  }
});

/*
 * to be fixed when event impl by Lukas will be available
 */
const toastEvents = [
  'lyne-toast_did-dismiss',
  'lyne-toast_did-present',
  'lyne-toast_will-dismiss',
  'lyne-toast_will-present'
];

const propagateToastEventsToStorybookContext = (button, toast, eventName) => {
  const handler = (event) => {
    button.dispatchEvent(new CustomEvent(eventName, event));
    toast.removeEventListener(eventName, handler);
  };

  toast.addEventListener(eventName, handler);
};

const openCommon = (args, config) => {
  const toast = document.createElement('lyne-toast');

  toast.config = config;
  document.body.appendChild(toast);
  toastEvents.forEach((eventName) => propagateToastEventsToStorybookContext(document.getElementById('button-id'), toast, eventName));

  toast.present();
};

const openNoIconAndNoAction = (args) => {
  openCommon(args, getCommonConfig(args));
};
const TemplateNoIconAndNoAction = (args) => (
  <button id='button-id' onClick={openNoIconAndNoAction.bind(this, args)}>Open toast</button>
);

const openNoIconAndCloseIconAction = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getCloseIconConfig()
  };

  openCommon(args, config);
};
const TemplateNoIconAndCloseIconAction = (args) => (
  <button id='button-id' onClick={openNoIconAndCloseIconAction.bind(this, args)}>Open toast</button>
);

const openNoIconAndLinkAction = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getLinkConfig(args)
  };

  openCommon(args, config);
};
const TemplateNoIconAndLinkAction = (args) => (
  <button id='button-id' onClick={openNoIconAndLinkAction.bind(this, args)}>Open toast</button>
);

const openNoIconAndButtonAction = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getActionConfig(args)
  };

  openCommon(args, config);
};
const TemplateNoIconAndButtonAction = (args) => (
  <button id='button-id' onClick={openNoIconAndButtonAction.bind(this, args)}>Open toast</button>
);

const openIconAndActionCloseIcon = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getIconConfig(args.iconSlot),
    ...getCloseIconConfig()
  };

  openCommon(args, config);
};
const TemplateIconAndCloseIconAction = (args) => (
  <button id='button-id' onClick={openIconAndActionCloseIcon.bind(this, args)}>Open toast</button>
);

const openIconAndLinkAction = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getIconConfig(args.iconSlot),
    ...getLinkConfig(args)
  };

  openCommon(args, config);
};
const TemplateIconAndLinkAction = (args) => (
  <button id='button-id' onClick={openIconAndLinkAction.bind(this, args)}>Open toast</button>
);

const openIconAndButtonAction = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getIconConfig(args.iconSlot),
    ...getActionConfig(args)
  };

  openCommon(args, config);
};
const TemplateIconAndButtonAction = (args) => (
  <button id='button-id' onClick={openIconAndButtonAction.bind(this, args)}>Open toast</button>
);

export const templateNoIconAndNoAction = TemplateNoIconAndNoAction.bind({});

export const templateNoIconAndCloseIconAction = TemplateNoIconAndCloseIconAction.bind({});
export const templateNoIconAndLinkAction = TemplateNoIconAndLinkAction.bind({});
export const templateNoIconAndButtonAction = TemplateNoIconAndButtonAction.bind({});

export const templateIconAndCloseIconAction = TemplateIconAndCloseIconAction.bind({});
export const templateIconAndLinkAction = TemplateIconAndLinkAction.bind({});
export const templateIconAndButtonAction = TemplateIconAndButtonAction.bind({});

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
    'arrow-down-small',
    'arrow-compass-small',
    'cross-small',
    'pie-small'
  ],
  table: {
    category: 'Icon'
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
  ],
  table: {
    category: 'Position'
  }
};

const verticalPosition = {
  control: {
    type: 'select'
  },
  options: [
    'top',
    'bottom'
  ],
  table: {
    category: 'Position'
  }
};

const href = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Action button'
  }
};

const label = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Action button'
  }
};

const basicArgTypes = {
  horizontalPosition,
  href,
  iconSlot,
  label,
  message,
  timeout,
  verticalPosition
};

const basicArgs = {
  horizontalPosition: 'center',
  href: 'https://sbb.ch',
  iconSlot: iconSlot.options[0],
  label: 'Undo',
  message: 'Ciao',
  timeout: 1000,
  verticalPosition: 'bottom'
};

templateNoIconAndNoAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete templateNoIconAndNoAction.argTypes.iconSlot;
delete templateNoIconAndNoAction.argTypes.href;
delete templateNoIconAndNoAction.argTypes.label;
templateNoIconAndCloseIconAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete templateNoIconAndCloseIconAction.argTypes.iconSlot;
delete templateNoIconAndCloseIconAction.argTypes.href;
delete templateNoIconAndCloseIconAction.argTypes.label;
templateNoIconAndLinkAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete templateNoIconAndLinkAction.argTypes.iconSlot;
templateNoIconAndButtonAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete templateNoIconAndButtonAction.argTypes.iconSlot;
delete templateNoIconAndButtonAction.argTypes.href;

templateIconAndCloseIconAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete templateIconAndCloseIconAction.argTypes.href;
delete templateIconAndCloseIconAction.argTypes.label;
templateIconAndLinkAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
templateIconAndButtonAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete templateIconAndButtonAction.argTypes.href;

templateNoIconAndNoAction.args = JSON.parse(JSON.stringify(basicArgs));
delete templateNoIconAndNoAction.args.iconSlot;
delete templateNoIconAndNoAction.args.href;
delete templateNoIconAndNoAction.args.label;
templateNoIconAndCloseIconAction.args = JSON.parse(JSON.stringify(basicArgs));
delete templateNoIconAndCloseIconAction.args.iconSlot;
delete templateNoIconAndCloseIconAction.args.href;
delete templateNoIconAndCloseIconAction.args.label;
templateNoIconAndLinkAction.args = JSON.parse(JSON.stringify(basicArgs));
delete templateNoIconAndLinkAction.args.iconSlot;
templateNoIconAndButtonAction.args = JSON.parse(JSON.stringify(basicArgs));
delete templateNoIconAndButtonAction.args.iconSlot;
delete templateNoIconAndButtonAction.args.href;

templateIconAndCloseIconAction.args = JSON.parse(JSON.stringify(basicArgs));
delete templateIconAndCloseIconAction.args.href;
delete templateIconAndCloseIconAction.args.label;
templateIconAndLinkAction.args = JSON.parse(JSON.stringify(basicArgs));
templateIconAndButtonAction.args = JSON.parse(JSON.stringify(basicArgs));
delete templateIconAndButtonAction.args.href;

templateNoIconAndNoAction.documentation = {
  title: 'Lyne toast with no icon and no action'
};
templateNoIconAndCloseIconAction.documentation = {
  title: 'Lyne toast with no icon and icon close action'
};
templateNoIconAndLinkAction.documentation = {
  title: 'Lyne toast with no icon and link action'
};
templateNoIconAndButtonAction.documentation = {
  title: 'Lyne toast with no icon and action button with handler'
};
templateIconAndCloseIconAction.documentation = {
  title: 'Lyne toast with icon and icon close action'
};
templateIconAndLinkAction.documentation = {
  title: 'Lyne toast with icon and link action'
};
templateIconAndButtonAction.documentation = {
  title: 'Lyne toast with icon and action button with handler'
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
        'lyne-toast_did-dismiss',
        'lyne-toast_did-present',
        'lyne-toast_will-dismiss',
        'lyne-toast_will-present'
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
