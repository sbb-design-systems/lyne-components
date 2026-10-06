import { nothing, type TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

import { sbbSpread } from '../../../docs/helpers/spread.ts';
import '../../button.ts';

/* eslint-disable lit/binding-positions */
export const buttonTestTemplate = (tag: string, isStatic = false): TemplateResult => {
  const attributes: Record<string, string> = isStatic
    ? {}
    : { type: 'button', name: 'name', value: 'value', form: 'formid' };
  return html`
    <${unsafeStatic(tag)} ${sbbSpread(attributes)} negative disabled size='m'>
      Label Text
    </${unsafeStatic(tag)}>
  `;
};

export const buttonSlottedIconTestTemplate = (tag: string): TemplateResult => {
  return html`
    <${unsafeStatic(tag)}>
      <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>
      Label Text
    </${unsafeStatic(tag)}>
  `;
};

export const buttonLoading = (tag: string): TemplateResult => {
  return html`
    <${unsafeStatic(tag)} icon-name="arrow-right-small" loading>
      Loading Button
    </${unsafeStatic(tag)}>
  `;
};

export const buttonIconTestTemplate = (tag: string): TemplateResult => {
  return html`
    <${unsafeStatic(tag)}><sbb-icon slot="icon" name="app-icon-medium"></sbb-icon></${unsafeStatic(tag)}>
  `;
};

export const buttonSpaceIconTestTemplate = (tag: string): TemplateResult => {
  return html`
    <${unsafeStatic(tag)}> <sbb-icon slot="icon" name="app-icon-medium"> </sbb-icon> </${unsafeStatic(tag)}>
  `;
};

export const buttonLinkTestTemplate = (tag: string): TemplateResult => {
  return html`
    <${unsafeStatic(tag)} size="m" href="https://www.sbb.ch" target="_blank" rel="noopener" download>
      Label Text
    </${unsafeStatic(tag)}>
  `;
};

export const buttonLinkIconTestTemplate = (tag: string): TemplateResult => {
  return html`
    <${unsafeStatic(tag)} href="https://www.sbb.ch" disabled>
      <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>
      Label Text
    </${unsafeStatic(tag)}>
  `;
};
/* eslint-enable lit/binding-positions */

export interface ButtonCssClassOptions {
  tag?: 'button' | 'a';
  size?: 's' | 'm' | 'l';
  negative?: boolean;
  disabled?: boolean;
  disabledInteractive?: boolean;
  loading?: boolean;
  icon?: boolean;
  label?: string | null;

  /** Wraps the label in `sbb-button-label`, which enables ellipsis. */
  wrapLabel?: boolean;
  style?: string;
}

/**
 * Renders a native `button`/`a` styled with the button CSS classes
 */
export const buttonCssClassTemplate = (
  variant: string,
  options: ButtonCssClassOptions = {},
): TemplateResult => {
  const {
    tag = 'button',
    size = '',
    negative = false,
    disabled = false,
    disabledInteractive = false,
    loading = false,
    icon = false,
    label = 'Button',
    wrapLabel = false,
    style,
  } = options;
  const t = unsafeStatic(tag);
  const classes = [
    `${variant}${size ? `-${size}` : ''}`,
    label === null ? 'sbb-icon-button' : '',
    negative ? 'sbb-negative' : '',
    disabledInteractive ? 'sbb-disabled-interactive' : '',
    loading ? 'sbb-loading' : '',
  ]
    .filter(Boolean)
    .join(' ');

  /* eslint-disable lit/binding-positions */
  return html`
    <${t}
      class=${classes}
      href=${tag === 'a' ? '#' : nothing}
      ?disabled=${tag === 'button' && disabled}
      style=${style ?? nothing}
    >
      ${icon ? html`<sbb-icon name="arrow-right-small"></sbb-icon>` : nothing}
      ${label === null ? nothing : wrapLabel ? html`<span class="sbb-button-label">${label}</span>` : label}
    </${t}>
  `;
  /* eslint-enable lit/binding-positions */
};
