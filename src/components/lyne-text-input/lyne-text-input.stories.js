import events from './lyne-text-input.events.ts';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-text-input {...args}>
    {args.icon &&
      <span slot='icon'>{getMarkupForSvg(args.icon)}</span>
    }
  </lyne-text-input>
);

const debounceInputEvent = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Events'
  }
};

const border = {
  control: {
    type: 'boolean'
  }
};

const icon = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Icon'
  }
};

const inputAutoCompleteSectionName = {
  control: {
    type: 'select'
  },
  options: [
    'billing',
    'none',
    'shipping'
  ],
  table: {
    category: 'Autocomplete Options'
  }
};

const inputAutoCompleteValue = {
  control: {
    type: 'select'
  },
  options: [
    'additional-name',
    'address-level1',
    'address-level2',
    'address-level3',
    'address-level4',
    'address-line1',
    'address-line2',
    'address-line3',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'cc-additional-name',
    'cc-csc',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-family-name',
    'cc-given-name',
    'cc-name',
    'cc-number',
    'cc-type',
    'country',
    'country-name',
    'current-password',
    'email',
    'family-name',
    'given-name',
    'honorific-prefix',
    'honorific-suffix',
    'impp',
    'language',
    'name',
    'new-password',
    'nickname',
    'off',
    'on',
    'one-time-code',
    'organization',
    'organization-title',
    'photo',
    'postal-code',
    'sex',
    'street-address',
    'tel',
    'tel-area-code',
    'tel-country-code',
    'tel-extension',
    'tel-local',
    'tel-national',
    'transaction-amount',
    'transaction-currency',
    'url',
    'username'
  ],
  table: {
    category: 'Autocomplete Options'
  }
};

const inputDisabled = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'State'
  }
};

const inputError = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'State'
  }
};

const inputId = {
  control: {
    type: 'text'
  }
};

const inputMaxLength = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Validation'
  }
};

const inputMinLength = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Validation'
  }
};

const inputName = {
  control: {
    type: 'text'
  }
};

const inputPattern = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Validation'
  }
};

const inputPlaceholder = {
  control: {
    type: 'text'
  }
};

const inputRequired = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Validation'
  }
};

const inputType = {
  control: {
    type: 'select'
  },
  options: [
    'email',
    'password',
    'search',
    'tel',
    'text',
    'url'
  ]
};

const label = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Label'
  }
};

const labelVisible = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Label'
  }
};

const eventId = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Events'
  }
};

const inputRole = {
  control: {
    type: 'select'
  },
  options: [
    'presentation',
    'searchbox',
    'combobox',
    'listbox'
  ],
  table: {
    category: 'a11y'
  }
};

const inputAriaExpanded = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'a11y'
  }
};

const inputAriaAutoComplete = {
  control: {
    type: 'select'
  },
  options: [
    'inline',
    'list',
    'both',
    'none'
  ],
  table: {
    category: 'a11y'
  }
};

const inputAriaControls = {
  control: {
    type: 'text'
  },
  table: {
    category: 'a11y'
  }
};

const defaultArgTypes = {
  'borderless': border,
  'debounce-input-event': debounceInputEvent,
  'event-id': eventId,
  icon,
  'input-aria-autocomplete': inputAriaAutoComplete,
  'input-aria-controls': inputAriaControls,
  'input-aria-expanded': inputAriaExpanded,
  'input-autocomplete-section-name': inputAutoCompleteSectionName,
  'input-autocomplete-value': inputAutoCompleteValue,
  'input-disabled': inputDisabled,
  'input-error': inputError,
  'input-id': inputId,
  'input-max-length': inputMaxLength,
  'input-min-length': inputMinLength,
  'input-name': inputName,
  'input-pattern': inputPattern,
  'input-placeholder': inputPlaceholder,
  'input-required': inputRequired,
  'input-role': inputRole,
  'input-type': inputType,
  label,
  'label-visible': labelVisible
};

const defaultArgs = {
  'borderless': false,
  'debounce-input-event': 0,
  'event-id': '',
  'icon': '',
  'input-aria-autocomplete': 'none',
  'input-aria-controls': '',
  'input-aria-expanded': false,
  'input-autocomplete-section-name': inputAutoCompleteSectionName.options[1],
  'input-autocomplete-value': inputAutoCompleteValue.options[35],
  'input-disabled': false,
  'input-error': false,
  'input-id': '',
  'input-max-length': '',
  'input-min-length': '',
  'input-name': 'textfield',
  'input-pattern': '',
  'input-placeholder': 'Placeholder Text',
  'input-required': false,
  'input-role': 'searchbox',
  'input-type': inputType.options[6],
  'label': 'Label',
  'label-visible': true
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const TextInputOptional = Template.bind({});

TextInputOptional.argTypes = defaultArgTypes;
TextInputOptional.args = {
  ...defaultArgs
};

TextInputOptional.documentation = {
  title: 'Text Input Optional'
};

export const TextInputOptionalDisabled = Template.bind({});

TextInputOptionalDisabled.argTypes = defaultArgTypes;
TextInputOptionalDisabled.args = {
  ...defaultArgs,
  'input-disabled': true
};

TextInputOptionalDisabled.documentation = {
  title: 'Text Input Optional Disabled'
};

export const TextInputRequired = Template.bind({});

TextInputRequired.argTypes = defaultArgTypes;
TextInputRequired.args = {
  ...defaultArgs,
  'input-required': true
};

TextInputRequired.documentation = {
  title: 'Text Input Required'
};

export const TextInputLabelHidden = Template.bind({});

TextInputLabelHidden.argTypes = defaultArgTypes;
TextInputLabelHidden.args = {
  ...defaultArgs,
  'label-visible': false
};

TextInputLabelHidden.documentation = {
  title: 'Text Input Label Hidden'
};

export const TextInputWithIcon = Template.bind({});

TextInputWithIcon.argTypes = defaultArgTypes;
TextInputWithIcon.args = {
  ...defaultArgs,
  icon: 'pie-small'
};

TextInputWithIcon.documentation = {
  title: 'Text Input With Icon'
};

export const TextInputWithIconErrorMessage = Template.bind({});

TextInputWithIconErrorMessage.argTypes = defaultArgTypes;
TextInputWithIconErrorMessage.args = {
  ...defaultArgs,
  'icon': 'pie-small',
  'input-error': true,
  'input-placeholder': 'meat/fish/vegetarian/vegan',
  'input-required': true,
  'label': 'Meal preference'
};

TextInputWithIconErrorMessage.documentation = {
  title: 'Text Input With Icon & Error Message'
};

export const TextInputEmail = Template.bind({});

TextInputEmail.argTypes = defaultArgTypes;
TextInputEmail.args = {
  ...defaultArgs,
  'input-autocomplete-value': inputAutoCompleteValue.options[25],
  'input-name': 'email-address',
  'input-placeholder': 'abc@def.com',
  'input-required': true,
  'input-type': 'email',
  'label': 'Email address'
};

TextInputEmail.documentation = {
  title: 'Text Input Email Address'
};

export const TextInputExistingPassword = Template.bind({});

TextInputExistingPassword.argTypes = defaultArgTypes;
TextInputExistingPassword.args = {
  ...defaultArgs,
  'input-autocomplete-value': inputAutoCompleteValue.options[24],
  'input-name': 'current-password',
  'input-placeholder': '',
  'input-required': true,
  'input-type': 'password',
  'label': 'Current Password'
};

TextInputEmail.documentation = {
  title: 'Text Input Existing Password'
};

export const TextInputNewPassword = Template.bind({});

TextInputNewPassword.argTypes = defaultArgTypes;
TextInputNewPassword.args = {
  ...defaultArgs,
  'input-autocomplete-value': inputAutoCompleteValue.options[52],
  'input-name': 'new-password',
  'input-placeholder': '',
  'input-required': true,
  'input-type': 'password',
  'label': 'New Password'
};

TextInputEmail.documentation = {
  title: 'Text Input New Password'
};

export const TextInputPhoneNumber = Template.bind({});

TextInputPhoneNumber.argTypes = defaultArgTypes;
TextInputPhoneNumber.args = {
  ...defaultArgs,
  'input-autocomplete-value': inputAutoCompleteValue.options[44],
  'input-name': 'phone',
  'input-placeholder': '',
  'input-required': true,
  'input-type': 'tel',
  'label': 'Phone Number'
};

TextInputPhoneNumber.documentation = {
  title: 'Text Input Phone Number'
};

export const TextInputOneTimeCode = Template.bind({});

TextInputOneTimeCode.argTypes = defaultArgTypes;
TextInputOneTimeCode.args = {
  ...defaultArgs,
  'input-autocomplete-value': inputAutoCompleteValue.options[37],
  'input-name': 'otp',
  'input-placeholder': '',
  'input-required': true,
  'input-type': 'text',
  'label': 'SMS-Code'
};

TextInputOneTimeCode.documentation = {
  title: 'Text Input One Time Code'
};

export const TextInputSearch = Template.bind({});

TextInputSearch.argTypes = defaultArgTypes;
TextInputSearch.args = {
  ...defaultArgs,
  'input-autocomplete-value': inputAutoCompleteValue.options[36],
  'input-name': 'search',
  'input-placeholder': '',
  'input-required': true,
  'input-type': 'search',
  'label': 'Search'
};

TextInputSearch.documentation = {
  title: 'Text Input Search'
};

export const TextInputUrl = Template.bind({});

TextInputUrl.argTypes = defaultArgTypes;
TextInputUrl.args = {
  ...defaultArgs,
  'input-autocomplete-value': inputAutoCompleteValue.options[53],
  'input-name': 'url',
  'input-placeholder': '',
  'input-required': true,
  'input-type': 'url',
  'label': 'Website'
};

TextInputUrl.documentation = {
  title: 'Text Input Url'
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
      handles: [events.input]
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/form elements/lyne-text-input'
};
