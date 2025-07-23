import type { DateAdapter } from '../datetime.js';

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
  dateAdapter?: DateAdapter;
}

export interface SbbPopoverConfig {
  /* Delay in milliseconds until the popover is opened. */
  openDelay?: number;
  /* Delay in milliseconds until the popover is closed. */
  closeDelay?: number;
}
export interface SbbTooltipConfig extends SbbPopoverConfig {
  longPressCloseDelay?: number;
}

export interface SbbConfig {
  language?: string;
  icon?: SbbIconConfig;
  datetime?: SbbDatetimeConfig;
  popover?: SbbPopoverConfig;
  tooltip?: SbbTooltipConfig;
}

export function readConfig(): SbbConfig {
  if (!('sbbConfig' in globalThis)) {
    globalThis.sbbConfig = {};
  }
  return globalThis.sbbConfig as SbbConfig;
}

export function mergeConfig(config: Partial<SbbConfig>): void {
  const oldConfig = readConfig();
  Object.assign(oldConfig, config);
}

declare global {
  // Only `var` is working
  var sbbConfig: SbbConfig;
}
