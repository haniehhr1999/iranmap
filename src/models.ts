export interface DataModel {
  city: string; // اسم مرکز استان
  affectR: number; // عدد رندوم بین 500 تا 10000
  latlng: [number, number]; // موقعیت جغرافیایی
}

export type DataCollection = Array<DataModel>;

const getRandomAffectR = (): number => {
  return Math.floor(Math.random() * (10000 - 500 + 1)) + 500;
};

export const dataCollection: DataCollection = [
  // آذربایجان شرقی
  {
    city: "تبریز",
    affectR: getRandomAffectR(),
    latlng: [38.0800, 46.2919],
  },

  // آذربایجان غربی
  {
    city: "ارومیه",
    affectR: getRandomAffectR(),
    latlng: [37.5527, 45.0761],
  },

  // اردبیل
  {
    city: "اردبیل",
    affectR: getRandomAffectR(),
    latlng: [38.2498, 48.2933],
  },

  // اصفهان
  {
    city: "اصفهان",
    affectR: getRandomAffectR(),
    latlng: [32.6546, 51.6680],
  },

  // البرز
  {
    city: "کرج",
    affectR: getRandomAffectR(),
    latlng: [35.8400, 50.9391],
  },

  // ایلام
  {
    city: "ایلام",
    affectR: getRandomAffectR(),
    latlng: [33.6374, 46.4227],
  },

  // بوشهر
  {
    city: "بوشهر",
    affectR: getRandomAffectR(),
    latlng: [28.9234, 50.8203],
  },

  // تهران
  {
    city: "تهران",
    affectR: getRandomAffectR(),
    latlng: [35.6892, 51.3890],
  },

  // چهارمحال و بختیاری
  {
    city: "شهرکرد",
    affectR: getRandomAffectR(),
    latlng: [32.3256, 50.8644],
  },

  // خراسان جنوبی
  {
    city: "بیرجند",
    affectR: getRandomAffectR(),
    latlng: [32.8649, 59.2262],
  },

  // خراسان رضوی
  {
    city: "مشهد",
    affectR: getRandomAffectR(),
    latlng: [36.2605, 59.6168],
  },

  // خراسان شمالی
  {
    city: "بجنورد",
    affectR: getRandomAffectR(),
    latlng: [37.4747, 57.3290],
  },

  // خوزستان
  {
    city: "اهواز",
    affectR: getRandomAffectR(),
    latlng: [31.3183, 48.6706],
  },

  // زنجان
  {
    city: "زنجان",
    affectR: getRandomAffectR(),
    latlng: [36.6736, 48.4787],
  },

  // سمنان
  {
    city: "سمنان",
    affectR: getRandomAffectR(),
    latlng: [35.5769, 53.3921],
  },

  // سیستان و بلوچستان
  {
    city: "زاهدان",
    affectR: getRandomAffectR(),
    latlng: [29.4963, 60.8629],
  },

  // فارس
  {
    city: "شیراز",
    affectR: getRandomAffectR(),
    latlng: [29.5918, 52.5837],
  },

  // قزوین
  {
    city: "قزوین",
    affectR: getRandomAffectR(),
    latlng: [36.2688, 50.0041],
  },

  // قم
  {
    city: "قم",
    affectR: getRandomAffectR(),
    latlng: [34.6416, 50.8746],
  },

  // کردستان
  {
    city: "سنندج",
    affectR: getRandomAffectR(),
    latlng: [35.3219, 46.9862],
  },

  // کرمان
  {
    city: "کرمان",
    affectR: getRandomAffectR(),
    latlng: [30.2839, 57.0834],
  },

  // کرمانشاه
  {
    city: "کرمانشاه",
    affectR: getRandomAffectR(),
    latlng: [34.3142, 47.0650],
  },

  // کهگیلویه و بویراحمد
  {
    city: "یاسوج",
    affectR: getRandomAffectR(),
    latlng: [30.6682, 51.5880],
  },

  // گلستان
  {
    city: "گرگان",
    affectR: getRandomAffectR(),
    latlng: [36.8427, 54.4439],
  },

  // گیلان
  {
    city: "رشت",
    affectR: getRandomAffectR(),
    latlng: [37.2808, 49.5832],
  },

  // لرستان
  {
    city: "خرم‌آباد",
    affectR: getRandomAffectR(),
    latlng: [33.4878, 48.3558],
  },

  // مازندران
  {
    city: "ساری",
    affectR: getRandomAffectR(),
    latlng: [36.5633, 53.0601],
  },

  // مرکزی
  {
    city: "اراک",
    affectR: getRandomAffectR(),
    latlng: [34.0917, 49.6892],
  },

  // هرمزگان
  {
    city: "بندرعباس",
    affectR: getRandomAffectR(),
    latlng: [27.1832, 56.2666],
  },

  // همدان
  {
    city: "همدان",
    affectR: getRandomAffectR(),
    latlng: [34.7989, 48.5150],
  },

  // یزد
  {
    city: "یزد",
    affectR: getRandomAffectR(),
    latlng: [31.8974, 54.3569],
  },
];