import { withActions } from '@storybook/addon-actions/decorator';
import type {
  Args,
  Decorator,
  StoryContext,
  WebComponentsRenderer,
} from '@storybook/web-components';
import { type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { sbbSpread } from '../../core/dom';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

/* eslint-disable lit/binding-positions, @typescript-eslint/naming-convention */
export const MiniButtonCommonTemplate = ({ tag, slot, ...args }: Args): TemplateResult => html`
  <sbb-form-field label='Demo ${tag}' size=${args.size} ?negative=${args.negative}>
    <input placeholder='Placeholder' ?disabled=${args.disabled}>
    <${unsafeStatic(tag)} slot=${slot} ${sbbSpread(args)}></${unsafeStatic(tag)}>
  </sbb-form-field>
`;

export const MiniButtonSlottedIconCommonTemplate = ({
  tag,
  slot,
  ...args
}: Args): TemplateResult => html`
  <sbb-form-field label='Demo ${tag}' size=${args.size} ?negative=${args.negative}>
    <input placeholder='Placeholder' ?disabled=${args.disabled}>
    <${unsafeStatic(tag)} slot=${slot} ${sbbSpread(args)}>
      <sbb-icon name="user-small" slot="icon"></sbb-icon>
    </${unsafeStatic(tag)}>
  </sbb-form-field>
`;
/* eslint-enable lit/binding-positions, @typescript-eslint/naming-convention */

export const miniButtonDecorators = [
  (story: () => WebComponentsRenderer['storyResult'], context: StoryContext) => html`
    <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
  `,
  withActions as Decorator,
];
