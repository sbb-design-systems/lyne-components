import { dotReporter } from '@web/test-runner';

/** @type {import('@web/test-runner-core').Reporter} */
export function minimalReporter() {
  const base = dotReporter();
  const log = (result) =>
    process.stdout.write(result.passed ? '.' : result.skipped ? '~' : '\x1b[31mx\x1b[0m');
  function logResults(results) {
    results?.tests?.forEach(log);
    results?.suites?.forEach(logResults);
  }
  const collectorBase = { suites: 0, tests: 0, passed: 0, failed: 0, skipped: 0 };
  /** @param {import('@web/test-runner-core').TestSession[]} sessions */
  function aggregateSessions(sessions) {
    const browserResults = new Map();
    for (const session of sessions) {
      if (!browserResults.has(session.browser.name)) {
        browserResults.set(session.browser.name, { ...collectorBase });
      }
      aggregateSuites(session.testResults, browserResults.get(session.browser.name));
    }
    return Array.from(browserResults).sort((a, b) => a[0].localeCompare(b[0]));
  }
  /** @param {import('@web/test-runner-core').TestSuiteResult} results */
  function aggregateSuites(results, collector = { ...collectorBase }) {
    collector.suites += 1;
    results?.tests?.forEach((result) => {
      collector.tests += 1;
      if (result.passed) {
        collector.passed += 1;
      } else if (result.skipped) {
        collector.skipped += 1;
      } else {
        collector.failed += 1;
      }
    });
    results?.suites?.forEach((s) => aggregateSuites(s, collector));
    return collector;
  }
  const p = (v) => v.toString().padStart(6, ' ');

  return {
    ...base,
    reportTestFileResults({ sessionsForTestFile: sessions }) {
      for (const session of sessions) {
        logResults(session.testResults);
      }
    },
    /** @param {import('@web/test-runner-core').TestRunFinishedArgs} args */
    onTestRunFinished(args) {
      const browserResults = aggregateSessions(args.sessions);
      console.log('');
      console.group('Test Summary:');
      for (const [browser, collector] of browserResults) {
        console.group(browser);
        console.log(`Suites:  ${p(collector.suites)}`);
        console.log(`Tests:   ${p(collector.tests)}`);
        console.log(`Passed:  ${p(collector.passed)}`);
        console.log(`Failed:  ${p(collector.failed)}`);
        console.log(`Skipped: ${p(collector.skipped)}`);
        console.groupEnd();
      }
      console.groupEnd();
      base.onTestRunFinished(args);
    },
  };
}
