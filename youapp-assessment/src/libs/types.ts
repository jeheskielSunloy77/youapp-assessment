export type Gender = keyof typeof Genders;

export type Zodiac = keyof typeof Zodiacs;
export type Horoscope = keyof typeof Horoscopes;

export const Zodiacs = {
  Aries: 'Aries',
  Taurus: 'Taurus',
  Gemini: 'Gemini',
  Cancer: 'Cancer',
  Leo: 'Leo',
  Virgo: 'Virgo',
  Libra: 'Libra',
  Scorpio: 'Scorpio',
  Sagittarius: 'Sagittarius',
  Capricorn: 'Capricorn',
  Aquarius: 'Aquarius',
  Pisces: 'Pisces',
};

export const Genders = {
  Male: 'Male',
  Female: 'Female',
};

export const Horoscopes = {
  Tiger: 'Tiger',
  Ox: 'Ox',
  Rat: 'Rat',
  Pig: 'Pig',
  Dog: 'Dog',
  Rooster: 'Rooster',
  Monkey: 'Monkey',
  Sheep: 'Sheep',
  Horse: 'Horse',
  Snake: 'Snake',
  Dragon: 'Dragon',
  Rabbit: 'Rabbit',
};
