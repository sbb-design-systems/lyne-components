import { mergeConfig, SbbIconConfig } from '../config';

beforeEach(() => {
  const icon: SbbIconConfig = {
    interceptor: ({ namespace, name, request }) => {
      if (namespace === 'default') {
        const dimension = name.endsWith('-large') ? 48 : name.endsWith('-medium') ? 36 : 24;
        return Promise.resolve(`<svg width='${dimension}' height='${dimension}'></svg>`);
      }
      return request();
    },
  };

  mergeConfig({
    icon,
  });
});
