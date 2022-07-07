import { validateContent } from './validate';

export const iconNamespaces = new Map<string, string>([
  ['sbb', 'https://lyne-icons.netlify.app/icons/'],
]);
export const cachedIcons = new Map<string, string>();
export const registeredIcons = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

export const getSvgContent = (url: string, sanitize: boolean): Promise<any> => {
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
              cachedIcons.set(url, svgContent || '');
            });
          }
          cachedIcons.set(url, '');
        })
        .catch((error) => {
          throw Error(error);
        });

      // cache for the same requests
      requests.set(url, req);
    } else {
      // set to empty for ssr scenarios and resolve promise
      cachedIcons.set(url, '');
      return Promise.resolve();
    }
  }

  return req;
};
