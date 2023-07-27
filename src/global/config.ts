import { documentLanguage } from './eventing';

export interface SbbIconConfig {
  interceptor?: (parameters: {
    namespace: string;
    name: string;
    url: string;
    request: () => Promise<string>;
  }) => Promise<string>;
  namespaces?: Map<string, string>;
}

export interface SbbDatetimeConfig {
  format: (value: Date) => string;
}

export interface SbbConfig {
  icon?: SbbIconConfig;
  datetime: SbbDatetimeConfig;
}

export function readConfig(): SbbConfig {
  if (!('sbbConfig' in globalThis)) {
    globalThis.sbbConfig = {
      datetime: {
        format: (value: Date) => {
          if (!value) {
            return '';
          }
          const locale = documentLanguage() ? `${documentLanguage()}-CH` : 'en-CH';
          const dateFormatter = new Intl.DateTimeFormat(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          const dayFormatter = new Intl.DateTimeFormat(locale, {
            weekday: 'short',
          });

          let weekday = dayFormatter.format(value);
          weekday = weekday.charAt(0).toUpperCase() + weekday.charAt(1);

          return `${weekday}, ${dateFormatter.format(value)}`;
        },
      },
    };
  }
  return globalThis.sbbConfig as SbbConfig;
}

export function mergeConfig(config: Partial<SbbConfig>): void {
  const oldConfig = readConfig();
  Object.assign(oldConfig, config);
}
