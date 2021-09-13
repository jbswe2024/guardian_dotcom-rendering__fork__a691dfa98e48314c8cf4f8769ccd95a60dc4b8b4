// ----- Imports ----- //

import { KeyEvent } from "./keyEvents";
import KeyEvents from "./keyEvents";
import { Pillar, Theme } from "@guardian/types";
import { css } from "@emotion/react";

// ----- Stories ----- //

// const themeOptions = {
// 	News: Pillar.News,
// 	Opinion: Pillar.Opinion,
// 	Sport: Pillar.Sport,
// 	Culture: Pillar.Culture,
// 	Lifestyle: Pillar.Lifestyle,
// 	Labs: Special.Labs,
// 	SpecialReport: Special.SpecialReport,
// };

const events: KeyEvent[] = [
	{
		time: "1m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "2m ago",
		text:
			"Ben Maher goes into the gold medal sport in the equestrian jumps",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "3m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "5m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "9m ago",
		text: "Jodie Williams qualifies for the 400m final",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "15m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "20m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "35m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
];

const keyEventWithTheme = (dark: boolean) => () => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			-ms-flex-positive: 1;
		`}
	>
		<div
			css={css`
				order: 1;
				flex-grow: 1;
			`}
		>
			<KeyEvents
				keyEvents={events}
				theme={Pillar.News}
				supportsDarkMode={dark}
			/>
		</div>

		<div
			css={css`
				order: 2;
				flex-grow: 1;
			`}
		>
			<KeyEvents
				keyEvents={events}
				theme={Pillar.Opinion}
				supportsDarkMode={dark}
			/>
		</div>

		<div
			css={css`
				order: 3;
				flex-grow: 1;
			`}
		>
			<KeyEvents
				keyEvents={events}
				theme={Pillar.Culture}
				supportsDarkMode={dark}
			/>
		</div>

		<div
			css={css`
				order: 4;
				flex-grow: 1;
			`}
		>
			<KeyEvents
				keyEvents={events}
				theme={Pillar.Sport}
				supportsDarkMode={dark}
			/>
		</div>

		<div
			css={css`
				order: 5;
				flex-grow: 1;
			`}
		>
			<KeyEvents
				keyEvents={events}
				theme={Pillar.Lifestyle}
				supportsDarkMode={dark}
			/>
		</div>
	</div>
);

const Default = keyEventWithTheme(false);
const Dark = keyEventWithTheme(true);

// ----- Exports ----- //

export default {
	component: KeyEvents,
	title: "Common/Components/KeyEvents/themes",
};

export { Default, Dark };
