/**
 * @deprecated use lit observers, will be removed with next major version
 */
export class NodeResizeObserver implements ResizeObserver {
  public disconnect(): any {
    // noop
  }

  public observe(): any {
    // noop
  }

  public unobserve(): any {
    // noop
  }
}

/**
 * @deprecated use lit observers, will be removed with next major version
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgnosticResizeObserver =
  typeof ResizeObserver === 'undefined' ? NodeResizeObserver : ResizeObserver;
