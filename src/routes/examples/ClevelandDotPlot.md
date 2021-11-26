---
title: ['Chart', 'Cleveland Dot Plot']
---

<script lang="ts">
	import { scaleBand, scaleTime } from 'd3-scale';
	import { addHours, addMinutes, format, startOfDay } from 'date-fns';
	import { formatNumberAsStyle } from 'svelte-ux/utils/number';
	import { sort } from 'd3-array';

	import Chart, { Svg } from '$lib/components/Chart.svelte';
	import Area from '$lib/components/Area.svelte';
	import AxisX from '$lib/components/AxisX.svelte';
	import AxisY from '$lib/components/AxisY.svelte';
	import Baseline from '$lib/components/Baseline.svelte';
	import ClevelandDotPlot from '$lib/components/ClevelandDotPlot.svelte';
	import HighlightLine from '$lib/components/HighlightLine.svelte';
	import Label from '$lib/components/Label.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	import Preview from '$lib/docs/Preview.svelte';
	import { createDateSeries, getRandomInteger } from '$lib/utils/genData';

	// const data = createDateSeries({ min: 50, max: 100, value: 'integer' });

	const count = 10;
	const now = startOfDay(new Date());
	let lastStartDate = now;

	const data = Array.from({ length: count }).map((_, i) => {
		const startDate = addMinutes(lastStartDate, getRandomInteger(0, 60));
		const endDate = addMinutes(startDate, getRandomInteger(0, 60));
		lastStartDate = startDate;
		return {
			name: `Item ${i + 1}`,
			startDate,
			endDate
		};
	});

	/*
	data.push({
		name: 'Item 2',
		startDate: addMinutes(now, 30),
		endDate: addMinutes(now, 160),
	})
	*/

	$: yDomain = data.map((x) => x.name).reverse()
	$: console.log({ data, yDomain })
</script>

## Basic

<Preview>
	<div class="h-[300px] p-4 border rounded">
		<Chart
			{data}
			x={['startDate', 'endDate']}
			xScale={scaleTime()}
			y="name"
			yScale={scaleBand()}
			yDomain={data.map((x) => x.name).reverse()}
			padding={{ left: 0, bottom: 24 }}
		>
			<Svg>
				<AxisY gridlines />
				<AxisX formatTick={(d) => format(d, 'h:mm aa')} />
				<Baseline y />
				<ClevelandDotPlot />
			</Svg>
		</Chart>
	</div>
</Preview>