import sleep from 'sleep-promise';

// Fluent stream manipulation
function Stream() {
  return {
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
    return() {
      return {};
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    first: first
  }
}

function first(limit) {
  const iter = this;
  let count = 0;
  return {
    async next() {
      if (count > limit) {
        return {done: true};
      } 
      let result = await iter.next();
      count++;
      return result;
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

async function main() {
  const stream = new Stream();
  for await (const payload of stream.first(5)) {
    console.log(payload);
  }
  console.log('done');
}

export default main;