import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import '../../button.ts';
import '../navigation-list.ts';
import '../navigation-button.ts';
import '../navigation-link.ts';
import '../navigation-marker.ts';
import '../navigation.ts';
import './navigation-section.component.ts';

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const basicArgTypes: ArgTypes = {
  'accessibility-label': accessibilityLabel,
};

const basicArgs: Args = {
  'accessibility-label': undefined,
};

const triggerButton = (id: string): TemplateResult => html`
  <sbb-secondary-button id=${id} size="l" icon-name="hamburger-menu-small"></sbb-secondary-button>
`;

const navigationActionsL = (): TemplateResult => html`
  <sbb-navigation-button id="nav-1">Label</sbb-navigation-button>
  <sbb-navigation-button id="nav-2">Label</sbb-navigation-button>
  <sbb-navigation-button id="nav-3">Label</sbb-navigation-button>
`;

const navigationList = (label: string): TemplateResult => html`
  <sbb-navigation-list label=${label}>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-link size="m" href="https://www.sbb.ch/en/"> Label </sbb-navigation-link>
  </sbb-navigation-list>
`;

const DefaultTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('navigation-trigger-1')}
  <sbb-navigation id="navigation" trigger="navigation-trigger-1">
    <sbb-navigation-marker id="nav-marker">${navigationActionsL()}</sbb-navigation-marker>

    <sbb-navigation-section
      title-content="Title one"
      id="navigation-section"
      trigger="nav-1"
      ${sbbSpread(args)}
    >
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}

      <sbb-button size="m" style="width: fit-content;"> Button </sbb-button>
    </sbb-navigation-section>

    <sbb-navigation-section
      title-content="Title two"
      id="navigation-section"
      trigger="nav-2"
      ${sbbSpread(args)}
    >
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      ${navigationList('Label')} ${navigationList('Label')}

      <sbb-secondary-button size="m" style="width: fit-content;" sbb-navigation-close>
        Close navigation
      </sbb-secondary-button>
    </sbb-navigation-section>
  </sbb-navigation>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const LongContent: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

const meta: Meta = {
  parameters: {
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-navigation/sbb-navigation-section',
};

export default meta;


import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './navigation-marker.component.ts';
import '../navigation-button.ts';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 's'],
};

const defaultArgTypes: ArgTypes = {
  size,
};

const defaultArgs: Args = {
  size: size.options![0],
};

const navigationActionsL = (active: boolean): TemplateResult => html`
  <sbb-navigation-button id="nav-1">Tickets & Offers</sbb-navigation-button>
  <sbb-navigation-button id="nav-2" class=${active ? 'sbb-active' : nothing}>
    Vacations & Recreation
  </sbb-navigation-button>
  <sbb-navigation-button id="nav-3">Travel information</sbb-navigation-button>
  <sbb-navigation-button id="nav-4">Help & Contact</sbb-navigation-button>
`;

const navigationActionsS = (active: boolean): TemplateResult => html`
  <sbb-navigation-button id="nav-5">Deutsch</sbb-navigation-button>
  <sbb-navigation-button id="nav-6">Français</sbb-navigation-button>
  <sbb-navigation-button id="nav-7" class=${active ? 'sbb-active' : nothing}>
    Italiano
  </sbb-navigation-button>
  <sbb-navigation-button id="nav-8">English</sbb-navigation-button>
`;

const SizeLTemplate = (args: Args): TemplateResult => html`
  <sbb-navigation-marker ${sbbSpread(args)}>${navigationActionsL(false)}</sbb-navigation-marker>
`;

const SizeSTemplate = (args: Args): TemplateResult => html`
  <sbb-navigation-marker ${sbbSpread(args)}>${navigationActionsS(false)}</sbb-navigation-marker>
`;

const SizeLActiveTemplate = (args: Args): TemplateResult => html`
  <sbb-navigation-marker ${sbbSpread(args)}>${navigationActionsL(true)}</sbb-navigation-marker>
`;

const SizeSActiveTemplate = (args: Args): TemplateResult => html`
  <sbb-navigation-marker ${sbbSpread(args)}>${navigationActionsS(true)}</sbb-navigation-marker>
`;

export const SizeL: StoryObj = {
  render: SizeLTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeS: StoryObj = {
  render: SizeSTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const SizeLActive: StoryObj = {
  render: SizeLActiveTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeSActive: StoryObj = {
  render: SizeSActiveTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

const meta: Meta = {
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-navigation/sbb-navigation-marker',
};

export default meta;


import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './navigation-list.component.ts';
import '../navigation-button.ts';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  label,
};

const defaultArgs: Args = {
  label: 'Label',
};

const navigationActions = (): TemplateResult => html`
  <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
  <sbb-navigation-button>Vacations & Recreation</sbb-navigation-button>
  <sbb-navigation-button>Travel information</sbb-navigation-button>
  <sbb-navigation-button>Help & Contact</sbb-navigation-button>
`;

const DefaultTemplate = (args: Args): TemplateResult => html`
  <sbb-navigation-list ${sbbSpread(args)}>${navigationActions()}</sbb-navigation-list>
`;

const SlottedLabelTemplate = (args: Args): TemplateResult => html`
  <sbb-navigation-list ${sbbSpread(args)}>
    <span slot="label">Slotted label</span>
    ${navigationActions()}
  </sbb-navigation-list>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SlottedLabel: StoryObj = {
  render: SlottedLabelTemplate,
  argTypes: defaultArgTypes,
  args: {},
};

const meta: Meta = {
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-navigation/sbb-navigation-list',
};

export default meta;


import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './navigation-link.component.ts';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const hrefs = ['https://www.sbb.ch', 'https://github.com/sbb-design-systems/lyne-components'];
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

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  href,
  target,
  rel,
  download,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  size: size.options![0],
  href: href.options![0],
  target: '_blank',
  rel: undefined,
  download: false,
  'accessibility-label': undefined,
};

const Template = (args: Args): TemplateResult => html`
  <sbb-navigation-link ${sbbSpread(args)}>Label</sbb-navigation-link>
`;

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![2] },
};

const meta: Meta = {
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-navigation/sbb-navigation-link',
};

export default meta;


import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './navigation-button.component.ts';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  type,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  size: size.options![0],
  type: type.options![0],
  name: 'detail',
  value: 'Value',
  form: 'form-name',
  'aria-label': undefined,
};

const Template = (args: Args): TemplateResult => html`
  <sbb-navigation-button ${sbbSpread(args)}>Label</sbb-navigation-button>
`;

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![2] },
};

const meta: Meta = {
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-navigation/sbb-navigation-button',
};

export default meta;


import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import { SbbNavigationElement } from './navigation.component.ts';
import readme from './readme.md?raw';
import '../navigation-section.ts';
import '../navigation-marker.ts';
import '../navigation-list.ts';
import '../navigation-button.ts';
import '../navigation-link.ts';
import '../../button/button.ts';
import '../../button/secondary-button.ts';

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityCloseLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const basicArgTypes: ArgTypes = {
  'aria-label': ariaLabel,
  'accessibility-close-label': accessibilityCloseLabel,
};

const basicArgs: Args = {
  'aria-label': undefined,
  'accessibility-close-label': undefined,
};

const triggerButton = (id: string): TemplateResult => html`
  <sbb-secondary-button
    id=${id}
    size="l"
    icon-name="hamburger-menu-small"
    aria-label="trigger navigation"
    aria-haspopup="true"
  ></sbb-secondary-button>
`;

const navigationActionsL = (): TemplateResult => html`
  <sbb-navigation-button id="nav-1">Tickets & Offers</sbb-navigation-button>
  <sbb-navigation-button id="nav-2" class="sbb-active" aria-current="page"
    >Vacations & Recreation</sbb-navigation-button
  >
  <sbb-navigation-button id="nav-3">Travel information</sbb-navigation-button>
  <sbb-navigation-link id="nav-4" href="https://www.sbb.ch/en/">
    Help & Contact
  </sbb-navigation-link>
`;

const navigationActionsS = (): TemplateResult => html`
  <sbb-navigation-button id="nav-5" aria-pressed="false">Deutsch</sbb-navigation-button>
  <sbb-navigation-button id="nav-6" aria-pressed="false">Français</sbb-navigation-button>
  <sbb-navigation-button id="nav-7" aria-pressed="true" class="sbb-active"
    >Italiano</sbb-navigation-button
  >
  <sbb-navigation-button id="nav-8" aria-pressed="false">English</sbb-navigation-button>
`;

const navigationList = (label: string, active?: boolean): TemplateResult => html`
  <sbb-navigation-list label=${label}>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-link
      size="m"
      href="https://www.sbb.ch/en/"
      class=${active ? 'sbb-active' : nothing}
      aria-current=${active ? 'page' : nothing}
    >
      Label
    </sbb-navigation-link>
  </sbb-navigation-list>
`;

const actionLabels = (num: number): TemplateResult[] => {
  const labels: TemplateResult[] = [html`<sbb-navigation-button>Label</sbb-navigation-button>`];
  for (let i = 1; i <= num; i++) {
    labels.push(html`<sbb-navigation-button>Label</sbb-navigation-button>`);
  }
  return labels;
};

const DefaultTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('navigation-trigger-1')}
  <sbb-navigation id="navigation" trigger="navigation-trigger-1" ${sbbSpread(args)}>
    <sbb-navigation-marker id="nav-marker">${navigationActionsL()}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">${navigationActionsS()}</sbb-navigation-marker>
  </sbb-navigation>
`;

const LongContentTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('navigation-trigger-1')}
  <sbb-navigation id="navigation" trigger="navigation-trigger-1" ${sbbSpread(args)}>
    <sbb-navigation-marker>${navigationActionsL()}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">${actionLabels(20)}</sbb-navigation-marker>
  </sbb-navigation>
`;

const WithNavigationSectionTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('navigation-trigger-1')}
  <sbb-navigation id="navigation" trigger="navigation-trigger-1" ${sbbSpread(args)}>
    <sbb-navigation-marker id="nav-marker">${navigationActionsL()}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">${navigationActionsS()}</sbb-navigation-marker>

    <sbb-navigation-section trigger="nav-1" title-content="Title one">
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      <sbb-button size="m" style="width: fit-content"> All Tickets & Offers </sbb-button>
    </sbb-navigation-section>

    <sbb-navigation-section trigger="nav-2" title-content="Title two">
      ${navigationList('Label', true)} ${navigationList('Label')} ${navigationList('Label')}
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
    </sbb-navigation-section>

    <sbb-navigation-section trigger="nav-3" title-content="Title three">
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      <sbb-secondary-button
        size="m"
        icon-name="circle-information-small"
        style="width: fit-content;"
      >
        Travel Information
      </sbb-secondary-button>
    </sbb-navigation-section>
  </sbb-navigation>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const WithNavigationSection: StoryObj = {
  render: WithNavigationSectionTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbNavigationElement.events.beforeopen,
        SbbNavigationElement.events.open,
        SbbNavigationElement.events.close,
        SbbNavigationElement.events.beforeclose,
      ],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-navigation/sbb-navigation',
};

export default meta;
