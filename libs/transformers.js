import { isBrowser } from './helpers'

/**
 * Transform an Object to FormData
 * @param  {Object} formObj The Object
 * @return {FormData}
 */
export const makeFormData = (formObj) => {
	if (!isBrowser()) throw Error("`makeFormData` works only in browser enviroment.");

  const form = new FormData();
  for (const [key, value] of Object.entries(formObj)) {
    form.append(key, value);
  }
  return form;
}