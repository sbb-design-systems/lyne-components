import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';
import placeholderImage from './stories/placeholder.png';
import './teaser';

const loremIpsum: string = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

const title: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'General',
  },
};

const description: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'General',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'General',
  },
};

const isStacked: InputType = {
  control: {
    type: 'boolean',
  },
};

const hrefs: string[] = [
  'https://www.sbb.ch',
  'https://github.com/lyne-design-system/lyne-components',
];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
  table: {
    category: 'Link',
  },
};

const defaultArgTypes: ArgTypes = {
  title,
  description,
  'aria-label': ariaLabel,
  'is-stacked': isStacked,
  href,
};

const defaultArgs: Args = {
  title: 'This is a title',
  description: 'This is a paragraph',
  'aria-label': `The text which gets exposed to screen reader users. The text should reflect all the information which gets passed
    into the components slots and which is visible in the Teaser, either through text or iconography`,
  'is-stacked': true,
  href: href.options[1],
};

const TemplateDefaultTeaser = ({ title, description, ...remainingArgs }: Args): TemplateResult => {
  return html`
    <sbb-teaser ${sbbSpread(remainingArgs)}>
      <img slot="image" src=${placeholderImage} alt="400x300" />
      <span slot="title">${title}</span>
      <p slot="description">${description}</p>
    </sbb-teaser>
  `;
};

const TemplateTeaserList = (args: Args): TemplateResult => html`
  <ul
    style="display: grid; list-style: none; grid-template-columns: repeat(auto-fit, 20rem); gap: 2rem;"
  >
    ${repeat(new Array(6), () => html`<li>${TemplateDefaultTeaser(args)}</li>`)}
  </ul>
`;

const TemplateTeaserListIsStacked = (args: Args): TemplateResult => html`
  <ul
    style="display: grid; list-style: none; grid-template-columns: repeat(auto-fit, 20rem); gap: 2rem;"
  >
    ${repeat(new Array(4), () => html`<li>${TemplateDefaultTeaser(args)}</li>`)}
  </ul>
`;

export const defaultTeaser: StoryObj = {
  render: TemplateDefaultTeaser,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};
export const TeaserWithLongText: StoryObj = {
  render: TemplateDefaultTeaser,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    title: loremIpsum,
    description: loremIpsum,
  },
};
export const teaserList: StoryObj = {
  render: TemplateTeaserList,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'is-stacked': false },
};
export const teaserListIsStacked: StoryObj = {
  render: TemplateTeaserListIsStacked,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 2rem; max-width: 760px;">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-teaser/sbb-teaser',
};

export default meta;
