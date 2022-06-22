import { css } from '@emotion/react';
import { TopicFilterBank } from './TopicFilterBank';

interface Topic {
	type: TopicType;
	value: string;
	count: number;
}

type TopicType = 'ORG' | 'PRODUCT' | 'PERSON' | 'GPE' | 'WORK_OF_ART' | 'LOC';

const topics: Topic[] = [
	{ type: 'GPE', value: 'London', count: 16 },
	{ type: 'ORG', value: 'RMT', count: 10 },
	{ type: 'PERSON', value: 'Boris Johnson', count: 10 },
	{ type: 'PERSON', value: 'Grant Shapps', count: 7 },
	{ type: 'PERSON', value: 'Keir Starmer', count: 7 },
	{ type: 'ORG', value: 'Network Rail', count: 6 },
	{ type: 'ORG', value: 'Guardian', count: 5 },
	{ type: 'GPE', value: 'Manchester', count: 4 },
	{ type: 'GPE', value: 'United Kingdom', count: 4 },
	{ type: 'PERSON', value: 'Anas Sarwar', count: 4 },
];
export default {
	component: TopicFilterBank,
	title: 'Components/TopicFilterBank',
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			max-width: 620px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export const topicBank = () => {
	return (
		<Container>
			<TopicFilterBank topics={topics} />
		</Container>
	);
};
topicBank.story = {
	name: 'topicBank',
	chromatic: { disable: true },
};
