// Hello-world demo of an async iterator
import sleep from 'sleep-promise';

// "async function*" is the return signature
async function* everySecondFor(seconds) {
  for (let i = 0; i < seconds; i++) {
    await sleep(1000);
    yield i;
  }
}

async function main() {
  for await (const tick of everySecondFor(10)) {
    console.log(tick);
  }
}

export default main;