import { DateAdapter, NativeDateAdapter } from './datetime';

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
  dateAdapter: DateAdapter;
}

export interface SbbConfig {
  icon?: SbbIconConfig;
  datetime: SbbDatetimeConfig;
}

export function readConfig(): SbbConfig {
  if (!('sbbConfig' in globalThis)) {
    globalThis.sbbConfig = {
      datetime: { dateAdapter: new NativeDateAdapter() },
    };
  }
  return globalThis.sbbConfig as SbbConfig;
}

export function mergeConfig(config: Partial<SbbConfig>): void {
  const oldConfig = readConfig();
  Object.assign(oldConfig, config);
}
