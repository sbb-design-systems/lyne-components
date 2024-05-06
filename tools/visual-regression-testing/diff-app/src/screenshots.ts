// eslint-disable-next-line import-x/no-unresolved
import { screenshotsRaw } from 'virtual:screenshots';

import type { FailedFiles } from '../vite.config.js';

const viewportOrder = ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'];

// TODO: discuss whether to include it in creation of screenshotsRaw
const extractHierarchicalMap = (
  screenshots: Record<string, FailedFiles[]>,
): Map<string, Map<string, Map<string, ScreenshotFailedFiles[]>>> => {
  const map = new Map<string, Map<string, Map<string, ScreenshotFailedFiles[]>>>();

  Object.entries(screenshots).forEach(([fileName, failedFiles]) => {
    const component = fileName.match(/^(.*?)_/)![1];
    const name = fileName.match(/_viewport=.*?_(.*?).png$/)![1];
    const viewport = fileName.match(/viewport=(.*?)_/)![1];

    if (!map.has(component)) {
      map.set(component, new Map());
    }

    const componentsMap = map.get(component)!;

    if (!componentsMap.has(name)) {
      componentsMap.set(name, new Map());
    }

    const testCaseMap = componentsMap.get(name)!;

    testCaseMap.set(
      viewport,
      failedFiles.map((failedFile) => ({ ...failedFile, viewport })),
    );
  });
  return map;
};

export interface ScreenshotFailedFiles extends FailedFiles {
  viewport: string;
}

export class ScreenshotStatistics {
  public static fromFailedFiles(failedFiles: ScreenshotFailedFiles[]): ScreenshotStatistics {
    return failedFiles.reduce(
      (current, next) =>
        current.sum(new ScreenshotStatistics(next.isNew ? 0 : 1, next.isNew ? 1 : 0)),
      new ScreenshotStatistics(0, 0),
    );
  }

  public static fromList(list: { stats: ScreenshotStatistics }[]): ScreenshotStatistics {
    return list.reduce((current, next) => current.sum(next.stats), new ScreenshotStatistics(0, 0));
  }

  public constructor(
    public readonly failedTests: number,
    public readonly newTests: number,
  ) {}

  public sum(other: ScreenshotStatistics): ScreenshotStatistics {
    return new ScreenshotStatistics(
      this.failedTests + other.failedTests,
      this.newTests + other.newTests,
    );
  }

  public toString(): string {
    return `${this.failedTests} failed, ${this.newTests} new`;
  }
}

export class ScreenshotViewport {
  public readonly stats: ScreenshotStatistics;
  public readonly browserNames: string[];

  public constructor(
    public readonly name: string,
    public readonly browsers: ScreenshotFailedFiles[],
  ) {
    this.stats = ScreenshotStatistics.fromFailedFiles(this.browsers);

    this.browserNames = this.browsers.map((browser) => browser.browserName);
  }

  /** Compare by respecting defined viewport order. */
  public compare(other: ScreenshotViewport): number {
    return viewportOrder.indexOf(this.name) - viewportOrder.indexOf(other.name);
  }
}

export class ScreenshotTestCase {
  public readonly stats: ScreenshotStatistics;
  public readonly availableBrowserNames: string[];
  public readonly path: string;

  public constructor(
    public readonly component: string,
    public readonly name: string,
    public readonly viewports: ScreenshotViewport[],
  ) {
    this.stats = ScreenshotStatistics.fromList(this.viewports);
    this.path = `${this.component}/${this.name}`;

    this.availableBrowserNames = Array.from(
      this.viewports.reduce((current, next) => {
        next.browserNames.forEach((browserName) => current.add(browserName));
        return current;
      }, new Set<string>()),
    );
  }

  public filter(viewport?: string, browser?: string): ScreenshotFailedFiles[] {
    return this.viewports
      .filter((entry) => !viewport || entry.name === viewport)
      .flatMap((entry) =>
        entry.browsers.filter((failedFiles) => !browser || failedFiles.browserName === browser),
      );
  }
}

export class ScreenshotComponent {
  public readonly stats: ScreenshotStatistics;

  public constructor(
    public readonly name: string,
    public readonly testCases: ScreenshotTestCase[],
  ) {
    this.stats = ScreenshotStatistics.fromList(this.testCases);
  }
}

export class Screenshots {
  public readonly components: ScreenshotComponent[];
  public readonly stats: ScreenshotStatistics;
  public readonly testCaseCount: number;
  public readonly flatTestCases: ScreenshotTestCase[];

  public constructor(screenshots: Record<string, FailedFiles[]>) {
    const flatTestCases: ScreenshotTestCase[] = [];

    // Convert hierarchical screenshot map to classes
    this.components = Array.from(extractHierarchicalMap(screenshots).entries()).map(
      ([componentName, testCases]) =>
        new ScreenshotComponent(
          componentName,
          Array.from(testCases.entries()).map(([testCase, viewports]) => {
            const screenshotTestCase = new ScreenshotTestCase(
              componentName,
              testCase,
              Array.from(viewports.entries())
                .map(([viewport, entries]) => new ScreenshotViewport(viewport, entries))
                .sort((a: ScreenshotViewport, b: ScreenshotViewport) => a.compare(b)),
            );
            flatTestCases.push(screenshotTestCase);
            return screenshotTestCase;
          }),
        ),
    );

    this.flatTestCases = flatTestCases;
    this.testCaseCount = this.flatTestCases.length;
    this.stats = ScreenshotStatistics.fromList(this.components);
  }

  public indexOfTestCase(componentName: string, testCaseName: string): number {
    return this.flatTestCases.findIndex(
      (component) => component.component === componentName && component.name === testCaseName,
    );
  }

  public getByTestCaseIndex(index: number): ScreenshotTestCase | undefined {
    return this.flatTestCases[index];
  }
}

export const screenshots = new Screenshots(screenshotsRaw);
