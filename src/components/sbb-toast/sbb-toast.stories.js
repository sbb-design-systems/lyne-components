import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import sbbToastEvents from './sbb-toast.events';
import { h } from 'jsx-dom';
import readme from './readme.md';
import { propagateOverlayEventToStorybook } from '../../global/core/components/overlay/overlay-event-dispatcher';

const getCommonConfig = (args) => ({
  ariaLivePoliteness: args.ariaLivePoliteness,
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

const createToast = (args, config, disableAnimation) => {
  const toast = document.createElement('sbb-toast');

  toast.disableAnimation = disableAnimation;
  toast.config = config;

  return toast;
};

const createAndSetupToast = (args, config) => {
  const toast = createToast(args, config, false);

  document.body.appendChild(toast);
  Object.values(sbbToastEvents)
    .forEach((eventName) => propagateOverlayEventToStorybook(document.getElementById('button-id'), toast, eventName));

  return toast;
};

const createAndSetupToastNoAnimation = (args, config) => {
  const toast = createToast(args, config, true);

  document.body.appendChild(toast);
  Object.values(sbbToastEvents)
    .forEach((eventName) => propagateOverlayEventToStorybook(document.getElementById('button-id'), toast, eventName));

  return toast;
};
const templateConfig = (args) => ({
  config: {
    ...args,
    action: {
      type: 'icon'
    },
    icon: getMarkupForSvg(args.iconSlot).outerHTML
  }
});
const Template = (args) => (
  <sbb-toast {...templateConfig(args)}/>
);

const openBasicNoAnimation = (args) => {
  createAndSetupToastNoAnimation(args, getCommonConfig(args))
    .present();
};
const TemplateBasicNoAnimation = (args) => (
  <button id='button-id' onClick={openBasicNoAnimation.bind(this, args)}>Open toast</button>
);

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

export const TemplateToast = Template.bind({});

export const BasicNoAnimation = TemplateBasicNoAnimation.bind({});

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

const ariaLivePoliteness = {
  control: {
    type: 'select'
  },
  options: [
    'polite',
    'assertive',
    'off'
  ],
  table: {
    category: 'Politeness'
  }
};

const horizontalPosition = {
  control: {
    type: 'select'
  },
  options: [
    'center',
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
    'start',
    'end'
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
  ariaLivePoliteness,
  horizontalPosition,
  href,
  iconSlot,
  label,
  message,
  timeout,
  verticalPosition
};

const basicArgs = {
  ariaLivePoliteness: 'polite',
  horizontalPosition: 'center',
  href: 'https://sbb.ch',
  iconSlot: iconSlot.options[0],
  label: 'Undo',
  message: 'This is a toast message',
  timeout: 6000,
  verticalPosition: 'end'
};

TemplateToast.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
TemplateToast.args = JSON.parse(JSON.stringify(basicArgs));
delete TemplateToast.argTypes.href;
delete TemplateToast.argTypes.label;
delete TemplateToast.args.href;
delete TemplateToast.args.label;

BasicNoAnimation.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
BasicNoAnimation.args = JSON.parse(JSON.stringify(basicArgs));
delete BasicNoAnimation.argTypes.iconSlot;
delete BasicNoAnimation.argTypes.href;
delete BasicNoAnimation.argTypes.label;
delete BasicNoAnimation.args.iconSlot;
delete BasicNoAnimation.args.href;
delete BasicNoAnimation.args.label;

NoIconAndNoAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
NoIconAndNoAction.args = JSON.parse(JSON.stringify(basicArgs));
delete NoIconAndNoAction.argTypes.iconSlot;
delete NoIconAndNoAction.argTypes.href;
delete NoIconAndNoAction.argTypes.label;
delete NoIconAndNoAction.args.iconSlot;
delete NoIconAndNoAction.args.href;
delete NoIconAndNoAction.args.label;

NoIconAndCloseIconAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
NoIconAndCloseIconAction.args = JSON.parse(JSON.stringify(basicArgs));
delete NoIconAndCloseIconAction.argTypes.iconSlot;
delete NoIconAndCloseIconAction.argTypes.href;
delete NoIconAndCloseIconAction.argTypes.label;
delete NoIconAndCloseIconAction.args.iconSlot;
delete NoIconAndCloseIconAction.args.href;
delete NoIconAndCloseIconAction.args.label;

NoIconAndLinkAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
NoIconAndLinkAction.args = JSON.parse(JSON.stringify(basicArgs));
delete NoIconAndLinkAction.argTypes.iconSlot;
delete NoIconAndLinkAction.args.iconSlot;

NoIconAndButtonAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
NoIconAndButtonAction.args = JSON.parse(JSON.stringify(basicArgs));
delete NoIconAndButtonAction.argTypes.iconSlot;
delete NoIconAndButtonAction.argTypes.href;
delete NoIconAndButtonAction.args.iconSlot;
delete NoIconAndButtonAction.args.href;

IconAndCloseIconAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
IconAndCloseIconAction.args = JSON.parse(JSON.stringify(basicArgs));
delete IconAndCloseIconAction.argTypes.href;
delete IconAndCloseIconAction.argTypes.label;
delete IconAndCloseIconAction.args.href;
delete IconAndCloseIconAction.args.label;

IconAndCloseIconActionWithEventListeners.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
IconAndCloseIconActionWithEventListeners.args = JSON.parse(JSON.stringify(basicArgs));
delete IconAndCloseIconActionWithEventListeners.argTypes.href;
delete IconAndCloseIconActionWithEventListeners.argTypes.label;
delete IconAndCloseIconActionWithEventListeners.args.href;
delete IconAndCloseIconActionWithEventListeners.args.label;

IconAndLinkAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
IconAndLinkAction.args = JSON.parse(JSON.stringify(basicArgs));

IconAndButtonAction.argTypes = JSON.parse(JSON.stringify(basicArgTypes));
IconAndButtonAction.args = JSON.parse(JSON.stringify(basicArgs));
delete IconAndButtonAction.args.href;
delete IconAndButtonAction.argTypes.href;

TemplateToast.documentation = {
  title: 'Static toast template'
};
BasicNoAnimation.documentation = {
  title: 'Basic SBB toast with no animation'
};
NoIconAndNoAction.documentation = {
  title: 'SBB toast with no icon and no action'
};
NoIconAndCloseIconAction.documentation = {
  title: 'SBB toast with no icon and icon close action'
};
NoIconAndLinkAction.documentation = {
  title: 'SBB toast with no icon and link action'
};
NoIconAndButtonAction.documentation = {
  title: 'SBB toast with no icon and action button with handler'
};
IconAndCloseIconAction.documentation = {
  title: 'SBB toast with icon and icon close action'
};
IconAndCloseIconActionWithEventListeners.documentation = {
  title: 'SBB toast with no icon and no action with listeners on public willDismiss() and didDismiss() events'
};
IconAndLinkAction.documentation = {
  title: 'SBB toast with icon and link action'
};
IconAndButtonAction.documentation = {
  title: 'SBB toast with icon and action button with handler'
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
      handles: [
        sbbToastEvents.willPresent,
        sbbToastEvents.didPresent,
        sbbToastEvents.willDismiss,
        sbbToastEvents.didDismiss
      ]
    },
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/overlay/sbb-toast'
};
