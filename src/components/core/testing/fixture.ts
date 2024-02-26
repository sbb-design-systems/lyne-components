import type { FixtureOptions } from '@lit-labs/testing/lib/fixtures/fixture-options';
import type { TemplateResult } from 'lit';

import { isHydratedSsr, isNonHydratedSsr } from './platform';

/**
 * We want to dynamically use the correct fixture from Lit testing for the current context.
 * However, currently @lit-labs/testing/fixtures.js also loads the Lit hydration logic
 * which mutates LitElement, which breaks the use case for non hydration.
 * Due to this, we first need to load the components and only once that is done, import
 * the fixture.
 * We also patch the name property of this function, to reflect the correct function name
 * of the original fixture.
 */
export const fixture = Object.defineProperty(
  async <T extends HTMLElement>(template: TemplateResult, options: FixtureOptions): Promise<T> => {
    const fixtures = await import('@lit-labs/testing/fixtures.js');
    if (isHydratedSsr()) {
      const result = await fixtures.ssrHydratedFixture<T>(template, options);
      result
        .querySelectorAll('[defer-hydration]')
        .forEach((e) => e.removeAttribute('defer-hydration'));
      return result;
    } else if (isNonHydratedSsr()) {
      return await fixtures.ssrNonHydratedFixture<T>(template, options);
    } else {
      return await fixtures.csrFixture<T>(template, options);
    }
  },
  'name',
  {
    get() {
      if (isHydratedSsr()) {
        return 'ssrHydratedFixture';
      } else if (isNonHydratedSsr()) {
        return 'ssrNonHydratedFixture';
      } else {
        return 'csrFixture';
      }
    },
  },
);
