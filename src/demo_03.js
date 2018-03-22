import Stream from './stream';

// Custom async iterator with stream control
async function main() {
  const stream = new Stream();
  const limit = 5;
  for await (const payload of stream) {
    console.log(payload);
    if (stream.current >= limit) {
      console.log('limited reached, pre-empting the stream');
      // instead of breaking, calling end() causes the stream to 
      // self-terminate
      stream.end();
    }
  }
  console.log('done');
}

export default main;