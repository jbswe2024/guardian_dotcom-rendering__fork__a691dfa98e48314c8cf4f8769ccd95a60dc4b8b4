import { css } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';
import type { KeyEvent } from './KeyEventsCards';
import KeyEventsCard from './KeyEventsCards';

const getDate = (milliSeconds = 1, seconds = 1, minutes = 1, hours = 1) =>
	new Date(Date.now() - milliSeconds * seconds * minutes * hours);

const events: KeyEvent[] = [
	{
		date: getDate(),
		text: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 30),
		text: `Pope 'embarrassed' by West's increased military spending`,
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 30),
		text: 'Kremlin: sending peacekeepers to Ukraine would be ‘reckless and extremely dangerous’',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 30, 3),
		text: 'Pentagon condemns Kremlin refusal to rule out use of nuclear weapons',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 60, 10),
		text: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 60, 24),
		text: `Mariupol under 'constant bombing', Russia seizes humanitarian convoy, Zelenskiy says`,
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 60, 48),
		text: 'Summary and welcome',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
];

const wrapperStyles = css`
	padding-left: 20px;
	display: flex;
	background-color: ${neutral[93]};

	ul {
		overflow-x: scroll;
		margin: 20px 0;

		&::-webkit-scrollbar {
			display: none;
		}
	}
`;

const MultipleCards = () => (
	<div css={wrapperStyles}>
		{events.map((event) => (
			<KeyEventsCard
				text={event.text}
				url={event.url}
				date={event.date}
			/>
		))}
	</div>
);

export default {
	component: KeyEventsCard,
	title: 'Components/KeyEventsCard',
};

export { MultipleCards };
