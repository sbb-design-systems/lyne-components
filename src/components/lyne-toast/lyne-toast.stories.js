import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import lyneToastEvents from './lyne-toast.events';
import { h } from 'jsx-dom';
import readme from './readme.md';
import { propagateOverlayEventToStorybook } from '../../global/core/components/overlay/overlay-event-dispatcher';

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

const createAndSetupToast = (args, config) => {
  const toast = document.createElement('lyne-toast');

  toast.config = config;
  document.body.appendChild(toast);
  toastEvents.forEach((eventName) => propagateOverlayEventToStorybook(document.getElementById('button-id'), toast, eventName));

  return toast;
};

const openNoIconAndNoAction = (args) => {
  createAndSetupToast(args, getCommonConfig(args))
    .present();
};
const TemplateNoIconAndNoAction = (args) => (
  <button id='button-id' onClick={openNoIconAndNoAction.bind(this, args)}>Open toast</button>
);

const openNoIconAndCloseIconAction = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getCloseIconConfig()
  };
  const toast = createAndSetupToast(args, config);

  toast.present();
};
const TemplateNoIconAndCloseIconAction = (args) => (
  <button id='button-id' onClick={openNoIconAndCloseIconAction.bind(this, args)}>Open toast</button>
);

const openNoIconAndLinkAction = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getLinkConfig(args)
  };
  const toast = createAndSetupToast(args, config);

  toast.present();
};
const TemplateNoIconAndLinkAction = (args) => (
  <button id='button-id' onClick={openNoIconAndLinkAction.bind(this, args)}>Open toast</button>
);

const openNoIconAndButtonAction = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getActionConfig(args)
  };
  const toast = createAndSetupToast(args, config);

  toast.present();
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
  const toast = createAndSetupToast(args, config);

  toast.present();
};
const TemplateIconAndCloseIconAction = (args) => (
  <button id='button-id' onClick={openIconAndActionCloseIcon.bind(this, args)}>Open toast</button>
);

const openIconAndNoCloseIconActionWithEventListeners = async (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getIconConfig(args.iconSlot),
    ...getCloseIconConfig()
  };
  const toast = createAndSetupToast(args, config);
  const placeholder = document.getElementById('placeholder');
  const div = document.createElement('div');
  const divWillDismiss = document.createElement('div');
  const divDidDismiss = document.createElement('div');

  await toast.present();
  const willDismiss = await toast.onWillDismiss();
  const didDismiss = await toast.onDidDismiss();

  divWillDismiss.append(`onWillDismiss: role ${willDismiss.role}, data: ${willDismiss.data}`);
  divDidDismiss.append(`onDidDismiss: role ${didDismiss.role}, data: ${didDismiss.data}`);
  div.appendChild(divWillDismiss);
  div.appendChild(divDidDismiss);
  placeholder.appendChild(div);
};
const TemplateIconAndNoCloseIconActionWithEventListeners = (args) => (
  <div>
    <button id='button-id' onClick={openIconAndNoCloseIconActionWithEventListeners.bind(this, args)}>Open toast</button>
    <div style='padding-top: 2rem'>
      <div>onDidDismiss and onWillDismiss will print here the returned info:</div>
      <div id='placeholder' style='padding-top: 1rem'/>
    </div>
  </div>
);

const openIconAndLinkAction = (args) => {
  const config = {
    ...getCommonConfig(args),
    ...getIconConfig(args.iconSlot),
    ...getLinkConfig(args)
  };
  const toast = createAndSetupToast(args, config);

  toast.present();
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
  const toast = createAndSetupToast(args, config);

  toast.present();
};
const TemplateIconAndButtonAction = (args) => (
  <button id='button-id' onClick={openIconAndButtonAction.bind(this, args)}>Open toast</button>
);

export const NoIconAndNoAction = TemplateNoIconAndNoAction.bind({});

export const NoIconAndCloseIconAction = TemplateNoIconAndCloseIconAction.bind({});
export const NoIconAndLinkAction = TemplateNoIconAndLinkAction.bind({});
export const NoIconAndButtonAction = TemplateNoIconAndButtonAction.bind({});

export const IconAndCloseIconAction = TemplateIconAndCloseIconAction.bind({});
export const IconAndCloseIconActionWithEventListeners = TemplateIconAndNoCloseIconActionWithEventListeners.bind({});
export const IconAndLinkAction = TemplateIconAndLinkAction.bind({});
export const IconAndButtonAction = TemplateIconAndButtonAction.bind({});

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
    'right',
    'start',
    'end'
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
  timeout: 6000,
  verticalPosition: 'bottom'
};

NoIconAndNoAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete NoIconAndNoAction.argTypes.iconSlot;
delete NoIconAndNoAction.argTypes.href;
delete NoIconAndNoAction.argTypes.label;

NoIconAndCloseIconAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete NoIconAndCloseIconAction.argTypes.iconSlot;
delete NoIconAndCloseIconAction.argTypes.href;
delete NoIconAndCloseIconAction.argTypes.label;
NoIconAndLinkAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete NoIconAndLinkAction.argTypes.iconSlot;
NoIconAndButtonAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete NoIconAndButtonAction.argTypes.iconSlot;
delete NoIconAndButtonAction.argTypes.href;

IconAndCloseIconAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete IconAndCloseIconAction.argTypes.href;
delete IconAndCloseIconAction.argTypes.label;
IconAndCloseIconActionWithEventListeners.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete IconAndCloseIconActionWithEventListeners.argTypes.href;
delete IconAndCloseIconActionWithEventListeners.argTypes.label;
IconAndLinkAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
IconAndButtonAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
delete IconAndButtonAction.argTypes.href;

NoIconAndNoAction.args = JSON.parse(JSON.stringify(basicArgs));
delete NoIconAndNoAction.args.iconSlot;
delete NoIconAndNoAction.args.href;
delete NoIconAndNoAction.args.label;

NoIconAndCloseIconAction.args = JSON.parse(JSON.stringify(basicArgs));
delete NoIconAndCloseIconAction.args.iconSlot;
delete NoIconAndCloseIconAction.args.href;
delete NoIconAndCloseIconAction.args.label;
NoIconAndLinkAction.args = JSON.parse(JSON.stringify(basicArgs));
delete NoIconAndLinkAction.args.iconSlot;
NoIconAndButtonAction.args = JSON.parse(JSON.stringify(basicArgs));
delete NoIconAndButtonAction.args.iconSlot;
delete NoIconAndButtonAction.args.href;

IconAndCloseIconAction.args = JSON.parse(JSON.stringify(basicArgs));
delete IconAndCloseIconAction.args.href;
delete IconAndCloseIconAction.args.label;
IconAndCloseIconActionWithEventListeners.args = JSON.parse(JSON.stringify(basicArgs));
delete IconAndCloseIconActionWithEventListeners.args.href;
delete IconAndCloseIconActionWithEventListeners.args.label;
IconAndLinkAction.args = JSON.parse(JSON.stringify(basicArgs));
IconAndButtonAction.args = JSON.parse(JSON.stringify(basicArgs));
delete IconAndButtonAction.args.href;

NoIconAndNoAction.documentation = {
  title: 'Lyne toast with no icon and no action'
};
NoIconAndCloseIconAction.documentation = {
  title: 'Lyne toast with no icon and icon close action'
};
NoIconAndLinkAction.documentation = {
  title: 'Lyne toast with no icon and link action'
};
NoIconAndButtonAction.documentation = {
  title: 'Lyne toast with no icon and action button with handler'
};
IconAndCloseIconAction.documentation = {
  title: 'Lyne toast with icon and icon close action'
};
IconAndCloseIconActionWithEventListeners.documentation = {
  title: 'Lyne toast with no icon and no action with listeners on public willDismiss() and didDismiss() events'
};
IconAndLinkAction.documentation = {
  title: 'Lyne toast with icon and link action'
};
IconAndButtonAction.documentation = {
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
