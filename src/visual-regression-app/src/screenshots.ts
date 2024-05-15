// eslint-disable-next-line import-x/no-unresolved
import { screenshotsRaw } from 'virtual:screenshots';

import type { FailedFiles, ScreenshotMap } from './interfaces.js';

const viewportOrder = ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'];

export class ScreenshotStatistics {
  public static fromFailedFiles(failedFiles: FailedFiles[]): ScreenshotStatistics {
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
    public readonly browsers: FailedFiles[],
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

  public filter(viewport?: string, browser?: string): FailedFiles[] {
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

  public constructor(screenshotsRaw: ScreenshotMap) {
    const flatTestCases: ScreenshotTestCase[] = [];

    // Convert hierarchical screenshot map to classes
    this.components = Object.entries(screenshotsRaw).map(
      ([componentName, testCases]) =>
        new ScreenshotComponent(
          componentName,
          Object.entries(testCases).map(([testCase, viewports]) => {
            const screenshotTestCase = new ScreenshotTestCase(
              componentName,
              testCase,
              Object.entries(viewports)
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
