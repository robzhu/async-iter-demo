import sleep from 'sleep-promise';
import helpers from './streamHelpers';

export default function Stream() {
  const result = {
    current: 0,
    end() {
      this.ended = true
    },
    async next() {
      await sleep(1000);
      return {
        value: this.current++,
        done: this.ended
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
  return Object.assign(result, helpers);
}