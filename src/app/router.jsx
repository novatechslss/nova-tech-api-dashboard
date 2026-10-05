import { apiLibrary } from '../data/apiLibrary';

export const apiMap = Object.fromEntries(apiLibrary.map((api) => [api.slug, api]));
export default apiMap;
