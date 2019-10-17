const cStyle = `
  background-color: dodgerblue; 
  color: white;
  padding: 0 .5rem;
  border-radius: 3px;
`

// eslint-disable-next-line
const isDevelopment = () => process.env.NODE_ENV === 'development';

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
    console.info(`%c${info}%c${x}`, style);   
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
