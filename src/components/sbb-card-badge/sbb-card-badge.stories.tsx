/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/html';
import type { InputType } from '@storybook/types';

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color':
    context.args.appearance !== 'primary-negative'
      ? 'var(--sbb-color-white-default)'
      : 'var(--sbb-color-charcoal-default)',
});

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const appearance: InputType = {
  control: {
    type: 'select',
  },
  options: ['primary', 'primary-negative'],
  table: {
    category: 'Appearance',
  },
};

const isDiscount: InputType = {
  control: {
    type: 'boolean',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const price: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'aria-label': ariaLabel,
  appearance,
  'is-discount': isDiscount,
  price,
  text,
};

const defaultArgs: Args = {
  'aria-label': 'Super saver sales ticket price starts at CHF 37.50',
  appearance: appearance.options[0],
};

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- generic slot -------------------------------- */

const SlotGenericTemplate = (): JSX.Element => (
  <span>
    <time dateTime="2021-11-25">Black Friday</time> Special
  </span>
);

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const Template = (args): JSX.Element => <sbb-card-badge {...args}></sbb-card-badge>;

const TemplateWithSlot = (args): JSX.Element => (
  <sbb-card-badge {...args}>
    <div slot="generic">
      <SlotGenericTemplate />
    </div>
  </sbb-card-badge>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- CardBadge full fledged ---------------------- */
export const CardBadgeFullFledged: StoryObj = {
  render: TemplateWithSlot,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'aria-label': 'Super saver sales ticket price starts at CHF 92.50 Black Friday Special',
    'is-discount': true,
    price: '92.50',
    text: 'from CHF',
  },
};

/* --- CardBadge discount ------------------ */
export const CardBadgeDiscount: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'aria-label': 'Super saver sales ticket.',
    'is-discount': true,
  },
};

/* --- CardBadge discount negative -------- */
export const CardBadgeDiscountNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'aria-label': 'Super saver sales ticket.',
    appearance: appearance.options[1],
    'is-discount': true,
  },
};

/* --- CardBadge with text and price ------------ */
export const CardBadgeWithTextAndPrice: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'aria-label': 'Super saver sales ticket price starts at CHF 37.50',
    price: '37.50',
    text: 'from CHF',
  },
};

/* --- CardBadge with text and price negative ---------- */
export const CardBadgeWithTextAndPriceNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'aria-label': 'Super saver sales ticket price starts at CHF 18.70',
    appearance: appearance.options[1],
    price: '18.70',
    text: 'from CHF',
  },
};

/* --- CardBadge discount with slot ------------------------- */
export const CardBadgeDiscountWithSlot: StoryObj = {
  render: TemplateWithSlot,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'aria-label': 'Super saver sales ticket Black Friday Special',
    'is-discount': true,
  },
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div
        style={{
          ...wrapperStyle(context),
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-card/sbb-card-badge (Unfinished)',
};

export default meta;
