import { parse } from 'svelte-ux';

import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    appleTicker: await fetch('/data/examples/date/apple-ticker.json').then(async (r) =>
      parse(await r.text())
    ),
    meta: {
      pageSource,
      related: [
        'components/Bars',
        'components/Points',
        'examples/Bars',
        'examples/Histogram',
        'examples/Sparkbar',
      ],
    },
  };
}
