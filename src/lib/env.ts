
/**
 * Throws an error if any of the provided environment variable keys are not set.
 * @param keys - The environment variable keys to check.
 */
export function requireEnv(...keys: string[]): void {
  const missing = keys.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
