import events from './lyne-autocomplete.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-autocomplete.sample-data';

// ---- Template

const Template = (args) => (
  <lyne-autocomplete {...args}></lyne-autocomplete>
);

// ---- ArgTypes
const items = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Autocomplete'
  }
};

const value = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Autocomplete'
  }
};

const eventId = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Autocomplete'
  }
};

const autocompleteId = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Autocomplete'
  }
};

const inputBorderless = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Input'
  }
};

const inputDebounceTimeout = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Input'
  }
};

const inputName = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Input'
  }
};

const inputLabel = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Input'
  }
};

const inputPlaceholder = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Input'
  }
};

const inputLabelVisible = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Input'
  }
};

const minChars = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Autocomplete'
  }
};

const defaultArgTypes = {
  'autocomplete-id': autocompleteId,
  'event-id': eventId,
  'input-borderless': inputBorderless,
  'input-debounceTimeout': inputDebounceTimeout,
  'input-label': inputLabel,
  'input-label-visible': inputLabelVisible,
  'input-name': inputName,
  'input-placeholder': inputPlaceholder,
  items,
  'min-chars': minChars,
  value
};

// ---- DefaultArgs
const defaultArgs = {
  'autocomplete-id': 'sample-id',
  'event-id': 'sample-id',
  'input-borderless': true,
  'input-debounceTimeout': 200,
  'input-label': 'Von',
  'input-label-visible': true,
  'input-name': 'sample-name',
  'input-placeholder': 'sample placeholder',
  'items': sampleData,
  'min-chars': 0
};

// ---- Stories
export const DefaultAutocomplete = Template.bind({});

DefaultAutocomplete.argTypes = defaultArgTypes;
DefaultAutocomplete.args = {
  ...defaultArgs
};

DefaultAutocomplete.documentation = {
  container: {
    styles: {
      'z-index': '1'
    }
  },
  title: 'Default autocomplete'
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
      handles: [events.selected]
    },
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-autocomplete'
};
