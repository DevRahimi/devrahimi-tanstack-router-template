/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Define the types of console methods we want to support
type LogLevel = "log" | "warn" | "error" | "info";

// Define the type for our logger object for full type safety
type ConsoleLogger = Record<LogLevel, (...data: any[]) => void>;

// An empty function to use in production
const noOp = () => {};

/**
 * A development-only consoleLogger object that mirrors the console API.
 * In production, all methods are replaced with a no-op function,
 * effectively stripping all logs.
 */
export const consoleLogger: ConsoleLogger = {
  log: noOp,
  warn: noOp,
  error: noOp,
  info: noOp,
};

// In development, we replace the no-op functions with the real console methods.
if (import.meta.env.NODE_ENV === "development") {
  consoleLogger.log = console.log;
  consoleLogger.warn = console.warn;
  consoleLogger.error = console.error;
  consoleLogger.info = console.info;
}
