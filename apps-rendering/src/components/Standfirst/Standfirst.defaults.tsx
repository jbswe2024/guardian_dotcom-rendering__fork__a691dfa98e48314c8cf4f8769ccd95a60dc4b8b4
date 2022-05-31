import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	border,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { map, withDefault } from '@guardian/types';
import { standfirstBackgroundColour } from 'editorialStyles';
import type { Item } from 'item';
import { getFormat } from 'item';
import { pipe } from 'lib';
import type { FC, ReactElement, ReactNode } from 'react';
import { renderStandfirstText } from 'renderer';
import { darkModeCss } from 'styles';

const isNotBlog = (format: ArticleFormat): boolean =>
	format.design !== ArticleDesign.LiveBlog &&
	format.design !== ArticleDesign.DeadBlog;

const darkStyles = (format: ArticleFormat): SerializedStyles => darkModeCss`
    background: ${background.standfirstDark(format)};
    color: ${text.standfirstDark(format)};

    a {
        color: ${text.standfirstLinkDark(format)};
		border-bottom: 0.0625rem solid ${border.standfirstLinkDark(format)};
    }
`;

export const defaultStyles = (format: ArticleFormat): SerializedStyles => css`
	margin-bottom: ${remSpace[3]};
	color: ${text.standfirst(format)};

	${standfirstBackgroundColour(format)}

	p,
	ul {
		padding: ${remSpace[3]} 0 0;
		margin: 0;
	}

	address {
		font-style: normal;
	}

	a {
		text-decoration: none;
		border-bottom: 0.0625rem solid ${border.standfirstLink(format)};
	}

	${isNotBlog(format) && darkStyles(format)}
`;

export const content = (
	standfirst: DocumentFragment,
	item: Item,
): ReactNode => {
	const format = getFormat(item);
	const rendered = renderStandfirstText(standfirst, format);

	// Immersives append the byline to the standfirst.
	// Sometimes CAPI includes this within the standfirst HTML,
	// sometimes we have to add it ourselves
	const bylineInStandfirst =
		item.byline !== '' && standfirst.textContent?.includes(item.byline);

	if (format.display === ArticleDisplay.Immersive && !bylineInStandfirst) {
		return pipe(
			item.bylineHtml,
			map((byline) => (
				<>
					{rendered}
					<address>
						<p>By {renderStandfirstText(byline, format)}</p>
					</address>
				</>
			)),
			withDefault<ReactNode>(rendered),
		);
	}

	return rendered;
};

interface Props {
	item: Item;
	css: SerializedStyles;
	className?: string;
}

const DefaultStandfirst: FC<Props> = ({ item, className }) =>
	pipe(
		item.standfirst,
		map((standfirst) => (
			<div className={className}>{content(standfirst, item)}</div>
		)),
		withDefault<ReactElement | null>(null),
	);

export default DefaultStandfirst;
