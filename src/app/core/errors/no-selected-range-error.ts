export class NoSelectedRangeError extends Error {
  constructor() {
    super('No selection found.Try to Select text first');
  }
}
