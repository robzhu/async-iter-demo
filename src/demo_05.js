import Stream from './stream';

// Advanced stream processing
async function main() {
  const stream = new Stream();
  for await (const payload of stream
    .filter(value => value > 2)
    .first(2)
    .map(value => value * 2)) {
    console.log(payload);
  }
  console.log('done');
}

export default main;