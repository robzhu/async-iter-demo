import Stream from './stream';

// Basic example of fluent stream manipulation
async function main() {
  const stream = new Stream();
  for await (const payload of stream.first(5)) {
    console.log(payload);
  }
  console.log('done');
}

export default main;