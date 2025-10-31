// eslint-disable-next-line @typescript-eslint/naming-convention
import MagicString from 'magic-string';
import type { PluginOption } from 'vite';

export function stateTransform(): PluginOption {
  return {
    name: 'state-transform',
    enforce: 'post',
    transform(code: string, id: string) {
      if (/.(js|ts)$/.test(id)) {
        const ms = new MagicString(code);
        ms.replaceAll(/:state\(([^)]+)\)/g, (_match, p1) => {
          return `:is(:state(${p1}),[state--${p1}])`;
        });
        return {
          code: ms.toString(),
          map: ms.generateMap({ hires: true }),
        };
      }
      return null;
    },
  };
}
