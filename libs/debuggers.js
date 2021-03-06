const cStyle = `
  background-color: dodgerblue; 
  color: white;
  padding: 0 .5rem;
  border-radius: 3px;
`

// eslint-disable-next-line
export const isDevelopment = () => process.env.NODE_ENV === 'development';

export const logError = err => {
  // eslint-disable-next-line
  if (process.browser) console.error(err);
};

export const debug = a => {
  // eslint-disable-next-line
  debugger;

  return a;
};

export const trace = (info = '', style = cStyle) => x => {
  if (isDevelopment()) {
  // eslint-disable-next-line
    if (process.browser) {
      console.info(`%c${info}`, style, x);   
    } else {
      console.info(info, x);
    }
  }
  return x;
};

export const log = (x, msg) => trace(msg)(x);

export default {
  log,
  trace,
  debug,
  logError
}

export const startStop = (name = 'HPION') => {
  console.time(name);
  let count = 0;
  const reset = () => (count = 0)

  return [
    () => {
      count += 1;
    },
    () => {
      console.timeEnd(name);
      let countBeforeReset = count;
      reset();
      
      return countBeforeReset
    }
  ];
};

