import { isServer } from 'lit';

import type { SbbIconConfig } from '../core/config.ts';
import { readConfig } from '../core/config.ts';

import { validateContent } from './icon-validate.ts';

const iconCdn = 'https://icons.app.sbb.ch/';

const iconNamespaces = new Map<string, string>()
  .set('default', `${iconCdn}icons/`)
  .set('picto', `${iconCdn}picto/`);
const requests = new Map<string, Promise<any>>();

/** Fetches icon svg content from providers and asserts only one request per icon is made. */
export const getSvgContent = (
  namespace: string,
  name: string,
  sanitize: boolean,
): Promise<string> => {
  const config: SbbIconConfig = readConfig().icon ?? {};

  const resolvedNamespace = config.namespaces?.get(namespace) ?? iconNamespaces.get(namespace);
  if (resolvedNamespace == null) {
    throw Error(
      `Unable to find the namespace "${namespace}". Please register your custom namespace.`,
    );
  }
  const url = `${resolvedNamespace}${name}.svg`;

  // Check if we already have a request for this url
  let req = requests.get(url);

  if (!req) {
    // We cannot support server side rendered icons (yet), as the validation
    // is done via DOM, which is not available during SSR.
    if (typeof fetch !== 'undefined' && !isServer) {
      const interceptor = config.interceptor ?? ((i) => i.request());

      req = interceptor({
        namespace,
        name,
        url,
        request: () =>
          fetch(url)
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(`Failed to load icon ${namespace}:${name}`);
              }
              return validateContent(await response.text(), sanitize);
            })
            .catch((error) => {
              throw Error(error);
            }),
      });
      // Cache for the same requests
      requests.set(url, req);
    } else {
      // Resolve promise for ssr scenarios
      return Promise.resolve('');
    }
  }

  return req;
};
