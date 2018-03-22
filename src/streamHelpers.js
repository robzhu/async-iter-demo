
function first(limit) {
  const iter = this;
  let count = 0;
  let result = {
    async next() {
      if (count >= limit) {
        return {done: true};
      } 
      let payload = await iter.next();
      count++;
      return payload;
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };

  return Object.assign(result, helpers);
}

function map(mapper) {
  const iter = this;
  const result = {
    async next() {
      let payload = await iter.next();
      let value = await mapper(payload.value);
      return {value, done: payload.done};
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };

  return Object.assign(result, helpers);
}

function filter(predicate) {
  const iter = this;
  const result = {
    async next() {
      let allow = false;
      while (!allow) {
        let payload = await iter.next();
        allow = await predicate(payload.value);
        if (allow) {
          return payload;
        }
      }
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };

  return Object.assign(result, helpers);
}

const helpers = {
  first,
  map,
  filter
};

export default helpers;