import { sbbInputModalityDetector } from '../a11y';
import { mergeConfig, SbbIconConfig } from '../config';

function setupIconConfig(): void {
  const icon: SbbIconConfig = {
    interceptor: ({ namespace, name, request }) => {
      if (namespace === 'default') {
        const dimension = name.endsWith('-large') ? 48 : name.endsWith('-medium') ? 36 : 24;
        return Promise.resolve(
          `<svg-fake data-name='${name}' width='${dimension}' height='${dimension}' style="width:${dimension};height:${dimension}"></svg-fake>`,
        );
      }
      return request();
    },
  };

  mergeConfig({
    icon,
  });
}

beforeEach(() => {
  setupIconConfig();

  sbbInputModalityDetector.reset();
});
