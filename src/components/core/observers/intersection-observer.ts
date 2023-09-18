export class NodeIntersectionObserver implements IntersectionObserver {
  public root;
  public rootMargin;
  public thresholds;

  public disconnect(): void {
    // noop
  }

  public observe(): void {
    // noop
  }

  public takeRecords(): any {
    // noop
  }

  public unobserve(): void {
    // noop
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgnosticIntersectionObserver =
  typeof IntersectionObserver === 'undefined' ? NodeIntersectionObserver : IntersectionObserver;
