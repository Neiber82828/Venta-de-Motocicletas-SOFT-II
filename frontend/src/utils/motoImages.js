const BASE = 'https://www.yamahamotorsports.com/media/images/icons/products';

const MOTO_IMAGES = {
  'Yamaha MT-15':      `${BASE}/26_mt03_1.png`,
  'Yamaha MT-07':      `${BASE}/26_mt07_1.png`,
  'Yamaha YZF-R15':    `${BASE}/26_r7_1.png`,
  'Yamaha YZF-R3':     `${BASE}/26_r3_1.png`,
  'Yamaha NMAX 155':   `${BASE}/26_xmax.png`,
  'Yamaha FZ-S FI':    'https://www.yamaha-motor-india.com/theme/v4/images/webp_images/fz_series_all/fzs-fi-new/color/grey.webp',
  'Yamaha Ténéré 700': `${BASE}/26_tenere700_1.png`,
  'Yamaha WR450F':     `${BASE}/2026_WR450FT1.png`,
};

export function getMotoImage(nombre) {
  return MOTO_IMAGES[nombre] ?? null;
}
