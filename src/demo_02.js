// Example of error-handling via try/catch
import sleep from 'sleep-promise';

async function* everySecondFor(seconds) {
  for (let i = 0; i < seconds; i++) {
    await sleep(1000);
    if (i === 5) {
      // throwing will break for-await control flow
      throw 'rut roh';
    }
    yield i;
  }
}

async function main() {
  const stream = everySecondFor(10);
  try {
    for await (const tick of stream) {
      console.log(tick);
    }
  } catch (e) {
    console.error(e);
  }
}

export default main;