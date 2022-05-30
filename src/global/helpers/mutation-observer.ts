export class NodeMutationObserver implements MutationObserver {
  public disconnect(): any {
    // noop
  }

  public observe(): any {
    // noop
  }

  public takeRecords(): any {
    // noop
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgnosticMutationObserver = (typeof MutationObserver === 'undefined')
  ? NodeMutationObserver
  : MutationObserver;
