import KeyEvents, {
	KeyEvent,
} from '@guardian/common-rendering/src/components/keyEvents';

type Props = {
	keyEvents: Block[];
	format: ArticleFormat;
	// this is optional until Frontend is updated here:
	// https://github.com/guardian/frontend/pull/24607
	filterKeyEvents?: boolean;
};

export const KeyEventsContainer = ({
	keyEvents,
	format,
	filterKeyEvents,
}: Props) => {
	const transformedKeyEvents: KeyEvent[] = keyEvents
		.filter((keyEvent) => {
			return keyEvent.title && keyEvent.blockFirstPublished;
		})
		.map((keyEvent) => {
			return {
				text: keyEvent.title || '', // We fallback to '' here purely to keep ts happy
				url: `?filterKeyEvents=${
					filterKeyEvents ? 'true' : 'false'
				}&page=with:block-${keyEvent.id}#block-${keyEvent.id}`,
				date: new Date(keyEvent.blockFirstPublished || ''), // We fallback to '' here purely to keep ts happy
			};
		});

	return (
		<KeyEvents
			format={format}
			keyEvents={transformedKeyEvents}
			supportsDarkMode={false}
		/>
	);
};
