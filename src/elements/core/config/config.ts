import type { DateAdapter } from '../datetime.ts';

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
  /** Delay in milliseconds before the popover opens. */
  openDelay?: number;
  /** Delay in milliseconds before the popover closes. */
  closeDelay?: number;
}

export interface SbbTooltipConfig {
  /** Delay in milliseconds before the tooltip opens. */
  openDelay?: number;
  /** Delay in milliseconds before the tooltip closes. */
  closeDelay?: number;
  /** Delay in milliseconds before the tooltip is automatically closed when is opened by a long press (touch devices). */
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
