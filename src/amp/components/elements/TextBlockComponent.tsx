import React from 'react';
import { css, cx } from 'emotion';

import { Special } from '@guardian/types';
import { palette } from '@guardian/src-foundations';
import { body, textSans } from '@guardian/src-foundations/typography';

import { pillarPalette_DO_NOT_USE, neutralBorder } from '@root/src/lib/pillars';
import { sanitise } from '@frontend/lib/sanitise-html';

// Note, this should only apply basic text styling. It is a case where we want
// to re-use styling, but generally we should avoid this as it couples
// components.

export const ListStyle = (iconColour: string) => css`
	li {
		margin-bottom: 6px;
		padding-left: 20px;
		p {
			display: inline;
		}
	}

	li:before {
		display: inline-block;
		content: '';
		border-radius: 6px;
		height: 12px;
		width: 12px;
		margin-right: 8px;
		background-color: ${iconColour};
		margin-left: -20px;
	}
`;

export const LinkStyle = (pillar: Theme) => css`
	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
		text-decoration: none;
		border-bottom: 1px solid ${neutralBorder(pillar)};
		:hover {
			border-bottom: 1px solid ${pillarPalette_DO_NOT_USE[pillar].dark};
		}
	}
`;

export const TextStyle = (pillar: Theme) => css`
	strong {
		font-weight: 700;
	}
	p {
		padding: 0 0 12px;
		${body.medium()};
		font-weight: 300;
		word-wrap: break-word;
		color: ${palette.neutral[7]};
	}

	blockquote {
		margin-left: 20px;
		font-style: italic;
	}

	${body.medium()};

	${LinkStyle(pillar)};
	${ListStyle(neutralBorder(pillar))};
`;

// Labs paid content only
const textStyleLabs = css`
	p {
		${textSans.large()}
	}
`;

export const TextBlockComponent: React.FC<{
	html: string;
	pillar: Theme;
}> = ({ html, pillar }) => (
	<span
		className={
			pillar === Special.Labs
				? cx(TextStyle(pillar), textStyleLabs)
				: TextStyle(pillar)
		}
		dangerouslySetInnerHTML={{
			__html: sanitise(html),
		}}
	/>
);
