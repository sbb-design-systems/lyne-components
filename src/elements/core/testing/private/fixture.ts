import { emulateMedia } from '@web/test-runner-commands';
import type { TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { waitForLitRender } from '../wait-for-render.ts';

// Copied from @lit-labs/testing/lib/fixtures/fixture-options.d.ts
interface FixtureOptions {
  /**
   * Array of relative module paths to be imported before rendering. Normally
   * would contain custom element definitions.
   */
  modules: string[];
  /**
   * Base url for resolving module paths. If not provided, will guess the
   * location based on call stack to have the same effect as passing in
   * `import.meta.url`.
   */
  base?: string;
}

// PlayWright with WebKit does not include wtr-session-id in stack trace.
// As an alternative, we look for the first file in the stack trace that is not part of
// node_modules and not in /core/testing/.
// See https://github.com/lit/lit/issues/4067
const tryFindBase = (stack: string): string | undefined =>
  [...stack.matchAll(/http:\/\/(localhost|host.containers.internal):?[^:)]+/gm)]
    .map((m) => m[0])
    .find((u) => !u.includes('/node_modules/') && !u.includes('/core/testing/private/fixture'));

const internalFixture = async <T extends HTMLElement>(
  type: 'csrFixture' | 'ssrHydratedFixture' | 'ssrNonHydratedFixture',
  template: TemplateResult,
  options: FixtureOptions = { modules: [] },
): Promise<T> => {
  options.base ??= tryFindBase(new Error().stack!);
  const fixtures = await import('@lit-labs/testing/fixtures.js');
  return await waitForLitRender(fixtures[type]<T>(template, options));
};

/**
 * We want to dynamically use the correct fixture from Lit testing for the current context.
 * However, currently @lit-labs/testing/fixtures.js also loads the Lit hydration logic
 * which mutates LitElement, which breaks the use case for non hydration.
 * Due to this, we first need to load the components and only once that is done, import
 * the fixture.
 * We also patch the name property of this function, to reflect the correct function name
 * of the original fixture.
 */
export const fixture = async <T extends HTMLElement>(
  template: TemplateResult,
  options?: FixtureOptions,
): Promise<T> => internalFixture('csrFixture', template, options);

/**
 * Renders the provided Lit template server-side by executing a custom command
 * for Web Test Runner provided by the Lit SSR Plugin, loads it to the document
 * and hydrates it, returning the element.
 */
export const ssrHydratedFixture = async <T extends HTMLElement>(
  template: TemplateResult,
  options?: FixtureOptions,
): Promise<T> => internalFixture('ssrHydratedFixture', template, options);

/**
 * Renders the provided Lit template server-side by executing a custom command
 * for Web Test Runner provided by the Lit SSR Plugin, loads it to the document
 * **without** hydrating it, returning the element.
 */
export const ssrNonHydratedFixture = async <T extends HTMLElement>(
  template: TemplateResult,
  options?: FixtureOptions,
): Promise<T> => internalFixture('ssrNonHydratedFixture', template, options);

/**
 * Fixture which provides a div container for visual test cases.
 *
 * @param wrapperStyles.padding Defaults to 2rem to include shadows and similar styles.
 * @param wrapperStyles.backgroundColor Defaults to white.
 */
export async function visualRegressionFixture<T extends HTMLElement>(
  template: TemplateResult,
  wrapperStyles?: {
    backgroundColor?: string;
    color?: string;
    focusOutlineDark?: boolean;
    padding?: string;
    minHeight?: string;
    maxWidth?: string;
    forcedColors?: boolean;
    darkMode?: boolean;
  },
): Promise<T> {
  const base = tryFindBase(new Error().stack!);
  const { html } = await import('lit-html');

  await emulateMedia({
    forcedColors: wrapperStyles?.forcedColors ? 'active' : 'none',
    colorScheme: wrapperStyles?.darkMode ? 'dark' : wrapperStyles?.forcedColors ? 'dark' : 'light',
  });

  return await fixture<T>(
    html`<div
      id="visual-regression-fixture-wrapper"
      style=${styleMap({
        padding: wrapperStyles?.padding ?? '2rem',
        'background-color': wrapperStyles?.backgroundColor ?? 'var(--sbb-background-color-1)',
        color: wrapperStyles?.color,
        '--sbb-focus-outline-color': wrapperStyles?.focusOutlineDark
          ? 'var(--sbb-focus-outline-color-dark)'
          : undefined,
        'min-height': wrapperStyles?.minHeight,
        'max-width': wrapperStyles?.maxWidth,
      })}
      tabindex="0"
    >
      ${template}
    </div>`,
    { base, modules: [] },
  );
}
