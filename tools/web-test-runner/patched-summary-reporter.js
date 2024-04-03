import { summaryReporter } from '@web/test-runner';

// See https://github.com/modernweb-dev/web/issues/2325
/** @type {import('@web/test-runner-core').Reporter} */
export function patchedSummaryReporter() {
  // https://github.com/modernweb-dev/web/blob/master/packages/test-runner/src/logger/TestRunnerLogger.ts
  class TestRunnerLogger {
    loggedSyntaxErrors = new Map();
    debugLogging = false;

    log = (...messages) => console.log(...messages);
    debug = (...messages) => this.debugLogging && console.debug(...messages);
    error = (...messages) => console.error(...messages);
    warn = (...messages) => console.warn(...messages);
    group = () => console.group();
    groupEnd = () => console.groupEnd();
    logSyntaxError(error) {
      const { message, code, filePath, column, line } = error;
      let errors = this.loggedSyntaxErrors.get(filePath);
      if (!errors) {
        errors = [];
        this.loggedSyntaxErrors.set(filePath, errors);
      } else if (
        errors.find(
          (e) => e.code === code && e.message === message && e.column === column && e.line === line,
        )
      ) {
        // dedupe syntax errors we already logged
        return;
      }
      errors.push(error);
    }
    clearLoggedSyntaxErrors = () => (this.loggedSyntaxErrors = new Map());
  }
  const base = summaryReporter();
  const logger = new TestRunnerLogger();
  return {
    ...base,
    reportTestFileResults(args) {
      base.reportTestFileResults({ ...args, logger });
    },
  };
}
