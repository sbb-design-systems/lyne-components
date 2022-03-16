import events from './lyne-toast.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-toast {...args}></lyne-toast>
);

export const single = Template.bind({});

// --- Arg types
const variant = {
  control: {
    type: 'select'
  },
  options: [
    'single-row',
    'multiple-rows'
  ],
  table: {
    category: 'General Properties'
  }
}

const text =  {
  control: {
    type: 'text'
  },
  table: {
    category: 'General Properties'
  }
}

const basicArgTypes = {
  variant,
  text
}

const basicArgs = {
  variant: variant.options[0],
  text: 'Ciao'
}

single.argTypes = basicArgTypes;
single.args = JSON.parse(JSON.stringify(basicArgs));

single.documentation = {
  title: 'Title which will be rendered on documentation platform'
};

export default {
  decorators: [
    (Story, context) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  documentation: {
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
  title: 'lyne-toast'
};
