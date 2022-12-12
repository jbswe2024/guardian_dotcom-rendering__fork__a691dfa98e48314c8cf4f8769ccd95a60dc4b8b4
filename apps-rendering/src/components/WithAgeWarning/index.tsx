import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import { AgeWarning } from '@guardian/source-react-components-development-kitchen';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import { grid } from 'grid/grid';
import { isComment, isNews } from 'item';
import { articleWidthStyles, wideContentWidth } from 'styles';

interface WithAgeWarningProps {
	tags: Tag[];
	publishDate: Option<Date>;
	format: ArticleFormat;
	children: React.ReactNode;
}

const getAgeWarning = (
	tags: Tag[],
	publicationDate: Date,
): string | undefined => {
	const isNewsArticle = isNews(tags);
	const isOpinion = isComment(tags);
	let message;

	// Only show an age warning for news or opinion pieces
	if (isNewsArticle || isOpinion) {
		const warnLimitDays = 30;
		const currentDate = new Date();
		const dateThreshold = new Date();

		dateThreshold.setDate(currentDate.getDate() - warnLimitDays);

		// if the publication date is before the date threshold generate message
		if (publicationDate < dateThreshold) {
			// Unary + coerces dates to numbers for TypeScript
			const diffMilliseconds = +currentDate - +publicationDate;
			const diffSeconds = Math.floor(diffMilliseconds / 1000);
			const diffMinutes = diffSeconds / 60;
			const diffHours = diffMinutes / 60;
			const diffDays = diffHours / 24;
			const diffMonths = diffDays / 31;
			const diffYears = diffDays / 365;

			if (diffYears >= 2) {
				message = `${Math.floor(diffYears)} years old`;
			} else if (diffYears > 1) {
				message = '1 year old';
			} else if (diffMonths >= 2) {
				message = `${Math.floor(diffMonths)} months old`;
			} else if (diffMonths > 1) {
				message = '1 month old';
			}
		}
	}

	return message;
};

export const defaultWidthStyles: SerializedStyles = css`
	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		width: ${wideContentWidth}px;
	}
`;

export const warningStyles = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return css`
				${galleryStyle}
			`;

		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return css`
				${defaultWidthStyles}
			`;
		case ArticleDesign.Interview:
			return css`
				${defaultWidthStyles}
				padding: 0 0 ${remSpace[2]} 0;
			`;
		case ArticleDesign.Analysis:
		case ArticleDesign.Explainer:
			return css`
				${articleWidthStyles}
				padding-bottom: ${remSpace[2]};
			`;
		case ArticleDesign.NewsletterSignup:
			return css`
				${articleWidthStyles}
				padding: 0 0 ${remSpace[5]} 0;
				max-width: 100%;
			`;
		case ArticleDesign.Letter:
		case ArticleDesign.Obituary:
			return css`
				${articleWidthStyles}
				padding-bottom: ${remSpace[2]};
			`;
		default:
			if (format.display === ArticleDisplay.Immersive) {
				return css`
					${immersiveStyle}
				`;
			}
			return css`
				${articleWidthStyles}
			`;
	}
};

const immersiveStyle: SerializedStyles = css`
	grid-row: 2;
	${grid.between('viewport-start', 'centre-column-end')}
	${from.mobileLandscape} {
		${grid.between('viewport-start', 'viewport-end')}
	}

	${from.tablet} {
		${grid.between('centre-column-start', 'viewport-end')}
		margin-left: calc(${grid.columnGap} * -1/2);
	}
`;

const galleryStyle: SerializedStyles = css`
	${grid.between('viewport-start', 'centre-column-end')}
	grid-row: 2;

	${from.mobileLandscape} {
		${grid.column.all}
	}

	${from.tablet} {
		${grid.between('centre-column-start', 'viewport-end')}
		margin-left: calc(${grid.columnGap} * -1/2);
	}
`;

const WithAgeWarning: React.FC<WithAgeWarningProps> = ({
	tags,
	publishDate,
	format,
	children,
}: WithAgeWarningProps) => {
	if (publishDate.kind === OptionKind.Some) {
		const age = getAgeWarning(tags, publishDate.value);

		if (age) {
			return (
				<>
					<div css={[warningStyles(format)]}>
						<AgeWarning age={age} supportsDarkMode={true} />
					</div>
					{children}
					<AgeWarning
						age={age}
						isScreenReader={true}
						supportsDarkMode={true}
					/>
				</>
			);
		}

		return <>{children}</>;
	}

	return <>{children}</>;
};

export { WithAgeWarning, getAgeWarning };
