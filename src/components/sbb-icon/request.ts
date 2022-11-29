import { validateContent } from './validate';

const iconCdn = 'https://d1s1onrtynjaa8.cloudfront.net/';
export const iconNamespaces = new Map<string, string>()
  .set('default', `${iconCdn}icons/`)
  .set('picto', `${iconCdn}pictograms/`);
export const registeredIcons = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

/** Fetches icon svg content from providers and asserts only one request per icon is made. */
export const getSvgContent = (url: string, sanitize: boolean): Promise<string> => {
  // see if we already have a request for this url
  let req = requests.get(url);

  if (!req) {
    if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
      // we don't already have a request
      req = fetch(url)
        .then((rsp) => {
          if (rsp.ok) {
            return rsp.text().then((svgContent) => {
              if (svgContent) {
                svgContent = validateContent(svgContent, sanitize);
              }
              return svgContent;
            });
          }
        })
        .catch((error) => {
          throw Error(error);
        });
      // cache for the same requests
      requests.set(url, req);
    } else {
      // resolve promise for ssr scenarios
      return Promise.resolve('');
    }
  }

  return req;
};
