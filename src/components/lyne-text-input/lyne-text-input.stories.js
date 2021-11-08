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

const inputName = {
  control: {
    type: 'text'
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
  }
};

const inputType = {
  control: {
    type: 'select'
  },
  options: [
    'email',
    'hidden',
    'number',
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

const defaultArgTypes = {
  icon,
  'input-autocomplete-section-name': inputAutoCompleteSectionName,
  'input-autocomplete-value': inputAutoCompleteValue,
  'input-disabled': inputDisabled,
  'input-error': inputError,
  'input-id': inputId,
  'input-name': inputName,
  'input-placeholder': inputPlaceholder,
  'input-required': inputRequired,
  'input-type': inputType,
  label,
  'label-visible': labelVisible
};

const defaultArgs = {
  'icon': '',
  'input-autocomplete-section-name': inputAutoCompleteSectionName.options[1],
  'input-autocomplete-value': inputAutoCompleteValue.options[35],
  'input-disabled': false,
  'input-error': false,
  'input-id': '',
  'input-name': '',
  'input-placeholder': 'Placeholder Text',
  'input-required': false,
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

export const TextInputRequired = Template.bind({});

TextInputRequired.argTypes = defaultArgTypes;
TextInputRequired.args = {
  ...defaultArgs,
  'input-required': true
};

TextInputRequired.documentation = {
  title: 'Text Input Required'
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
  title: 'Form Elements/lyne-text-input'
};
