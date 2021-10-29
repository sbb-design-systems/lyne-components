import { h } from 'jsx-dom';
import lyneIcons from 'lyne-icons/dist/icons.json';
import readme from './readme.md';

// --- Helper methods
const getMarkupForSvg = (svgName) => {
  if (!svgName) {
    return '';
  }

  const icon = lyneIcons.icons[svgName];
  const frag = document.createRange()
    .createContextualFragment(icon);

  return frag.firstChild;
};

const Template = (args) => (
  <lyne-link {...args}>
    <span slot='icon'>{getMarkupForSvg(args.icon)}</span>
  </lyne-link>
);

const hrefValue = {
  control: {
    type: 'text'
  }
};

const icon = {
  control: {
    type: 'text'
  }
};

const text = {
  control: {
    type: 'text'
  }
};

const textSize = {
  control: {
    type: 'select'
  },
  options: [
    'xs',
    's',
    'm'
  ],
  table: {
    category: 'Text Variant'
  }
};

const defaultArgTypes = {
  'href-value': hrefValue,
  icon,
  text,
  'text-size': textSize
};

const defaultArgs = {
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  'icon': '',
  'text': 'Meine Billete & Abos',
  'text-size': textSize.options[2]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const TextLink = Template.bind({});

TextLink.argTypes = defaultArgTypes;
TextLink.args = {
  ...defaultArgs,
  'text-size': textSize.options[0]
};

TextLink.documentation = {
  title: 'Text Link Size XS'
};

export const TextLinkIconLeft = Template.bind({});

TextLinkIconLeft.argTypes = defaultArgTypes;
TextLinkIconLeft.args = {
  ...defaultArgs,
  'icon': 'chevron-small-left-small',
  'text-size': textSize.options[0]
};

TextLinkIconLeft.documentation = {
  title: 'Text Link Icon Left'
};

export default {
  decorators: [
    (Story) => (
      <div lang="de" style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-link'
};
