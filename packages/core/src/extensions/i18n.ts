import tinyI18n from 'tiny-i18n';

export const translateObject = (payload: any, language: 'es' | 'en'): any => {
  if (Array.isArray(payload)) {
    return payload.map((item) => translateObject(item, language));
  }

  if (typeof payload === 'object' && payload) {
    const translatedObject: any = {};

    for (const [key, value] of Object.entries(payload)) {
      const translateKey = tinyI18n.getWord(key, language);
      if (translateKey) {
        translatedObject[translateKey] = translateObject(value, language);
      } else {
        translatedObject[key] = translateObject(value, language);
      }
    }

    return translatedObject;
  }

  return payload;
};
