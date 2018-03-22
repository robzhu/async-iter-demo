import sleep from 'sleep-promise';

// Custom async iterator with stream control
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
    [Symbol.asyncIterator]() {
      return this;
    }
  }
}

async function main() {
  const stream = new Stream();
  const limit = 5;
  for await (const payload of stream) {
    console.log(payload);
    if (stream.current >= limit) {
      console.log('limited reached, pre-empting the stream');
      stream.end();
    }
  }
  console.log('done');
}

export default main;