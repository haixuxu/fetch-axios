function serialize(obj: any) {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
}

function getFormData(object: any) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

function transformHeader(headers: Headers) {
  const keys = [...headers.keys()];
  return keys.reduce((prev: any, key: string) => {
    prev[key] = headers.get(key);
    return prev;
  }, {});
}
function promiseResolveReduce(initialArgument: any, functions: any[]) {
  return functions.reduce((promise, func) => promise.then(func), Promise.resolve(initialArgument));
}

function promiseTimeout(ms: number, promise: Promise<any>) {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject('Timeout');
    }, ms);
  });
  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
}
export {serialize, getFormData, transformHeader, promiseTimeout, promiseResolveReduce};
