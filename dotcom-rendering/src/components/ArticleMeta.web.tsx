import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	articleBold17,
	between,
	from,
	space,
	until,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { getSoleContributor } from '../lib/byline';
import { palette as themePalette } from '../palette';
import type { Branding as BrandingType } from '../types/branding';
import type { Podcast, TagType } from '../types/tag';
import { Avatar } from './Avatar';
import { Branding } from './Branding.importable';
import { CommentCount } from './CommentCount.importable';
import { useConfig } from './ConfigContext';
import { Contributor } from './Contributor';
import { Dateline } from './Dateline';
import { Island } from './Island';
import { ShareButton } from './ShareButton.importable';

type Props = {
	format: ArticleFormat;
	pageId: string;
	webTitle: string;
	byline?: string;
	source?: string;
	tags: TagType[];
	primaryDateline: string;
	secondaryDateline: string;
	branding?: BrandingType;
	discussionApiUrl: string;
	shortUrlId: string;
	isCommentable: boolean;
};

const meta = (format: ArticleFormat) => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return css`
			${between.tablet.and.leftCol} {
				order: 3;
			}

			padding-top: 2px;
		`;
	}

	return css`
		${between.tablet.and.leftCol} {
			order: 3;
		}

		${until.mobileLandscape} {
			padding-left: 10px;
			padding-right: 10px;
		}

		${from.mobileLandscape} {
			padding-left: 20px;
			padding-right: 20px;
		}

		${from.phablet} {
			padding-left: 0px;
			padding-right: 0px;
		}

		padding-top: 2px;
	`;
};

const podcastStyles = css`
	color: ${themePalette('--textblock-text')};
	${articleBold17}
`;
const metaFlex = css`
	margin-bottom: 6px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const stretchLines = css`
	display: block;

	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const borderColourWhenBackgroundDark = css`
	${until.desktop} {
		border-top: 1px solid rgba(255, 255, 255, 0.4);
	}
`;

const metaExtras = (isPictureContent: boolean) => css`
	border-top: 1px solid ${themePalette('--article-border')};
	flex-grow: 1;
	padding-top: 6px;

	${!isPictureContent && until.phablet} {
		margin-left: -10px;
		margin-right: -10px;
		padding-left: 10px;
		padding-right: 10px;
	}

	${between.leftCol.and.wide} {
		padding-bottom: 6px;
	}
`;

const metaNumbers = (isPictureContent: boolean) => css`
	border-top: 1px solid ${themePalette('--article-border')};
	display: flex;
	flex-grow: 1;

	justify-content: flex-end;
	${between.leftCol.and.wide} {
		justify-content: flex-start;
	}

	${!isPictureContent && until.phablet} {
		margin-left: -10px;
		margin-right: -10px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

export const metaContainer = (format: ArticleFormat) => {
	const defaultMargins = css`
		${until.phablet} {
			margin-left: -20px;
			margin-right: -20px;
		}
		${until.mobileLandscape} {
			margin-left: -10px;
			margin-right: -10px;
		}
	`;
	switch (format.display) {
		case ArticleDisplay.Immersive:
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.PhotoEssay:
					return format.theme === ArticleSpecial.Labs
						? defaultMargins
						: css`
								${until.phablet} {
									margin-left: -20px;
									margin-right: -20px;
								}
								${until.mobileLandscape} {
									margin-left: -10px;
									margin-right: -10px;
								}
								${from.leftCol} {
									margin-left: 20px;
								}
								${from.wide} {
									margin-left: 40px;
								}
						  `;
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog: {
					return '';
				}
				default:
					return defaultMargins;
			}
		}
	}
};

// used by ArticleMeta.apps.tsx
export const shouldShowAvatar = (format: ArticleFormat) => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return false;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.Feature:
				case ArticleDesign.Review:
				case ArticleDesign.Recipe:
				case ArticleDesign.Interview:
					return true;
				default:
					return false;
			}
		}
		default:
			return false;
	}
};

// used by ArticleMeta.apps.tsx
export const shouldShowContributor = (format: ArticleFormat) => {
	switch (format.display) {
		case ArticleDisplay.NumberedList:
			return true;
		case ArticleDisplay.Immersive:
			return false;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Analysis:
					return false;
				default:
					return true;
			}
		}
		default:
			return false;
	}
};

const MetaAvatarContainer = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 140px;
			height: 140px;
			margin-top: 6px;
			margin-right: 10px;
			margin-bottom: 12px;
			margin-left: 0px;

			${until.leftCol} {
				width: 60px;
				height: 60px;
				margin-top: 3px;
				margin-right: 10px;
				margin-bottom: 12px;
				margin-left: 0px;
			}
		`}
	>
		{children}
	</div>
);

const RowBelowLeftCol = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;

			${until.leftCol} {
				flex-direction: row;
			}
		`}
	>
		{children}
	</div>
);

const metaExtrasLiveBlog = css`
	${until.phablet} {
		margin-right: 0;
	}
`;

const metaNumbersExtrasLiveBlog = css`
	${until.phablet} {
		margin-left: 0;
	}
`;

const PodcastButton = ({ label, url }: { label: string; url: string }) => {
	return (
		<div>
			<LinkButton href={url}>{label}</LinkButton>
		</div>
	);
};

const PodcastMeta = ({ subscriptionUrl, spotifyUrl }: Podcast) => {
	return (
		<div>
			<div css={podcastStyles}>More ways to listen</div>
			<PodcastButton label={'Apple'} url={subscriptionUrl} />
			<PodcastButton label={'Spotify'} url={spotifyUrl} />
			<PodcastButton label={'RSS Feed'} url={'#'} />
			<PodcastButton label={'Download'} url={'#'} />
		</div>
	);
};

export const ArticleMeta = ({
	branding,
	format,
	pageId,
	webTitle,
	byline,
	source,
	tags,
	primaryDateline,
	secondaryDateline,
	discussionApiUrl,
	shortUrlId,
	isCommentable,
}: Props) => {
	const soleContributor = getSoleContributor(tags, byline);
	const authorName = soleContributor?.title ?? 'Author Image';

	const avatarUrl = shouldShowAvatar(format)
		? soleContributor?.bylineLargeImageUrl
		: undefined;
	const isInteractive = format.design === ArticleDesign.Interactive;

	const isPictureContent = format.design === ArticleDesign.Picture;

	const { renderingTarget } = useConfig();

	const seriesTag = tags.find((tag) => tag.type === 'Series' && tag.podcast);

	return (
		<div
			className={
				isInteractive ? interactiveLegacyClasses.metaContainer : ''
			}
			css={metaContainer(format)}
		>
			<div css={meta(format)}>
				{branding && (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<Branding branding={branding} format={format} />
					</Island>
				)}
				{format.theme === ArticleSpecial.Labs ? (
					<div>
						<StraightLines
							cssOverrides={stretchLines}
							count={1}
							color={themePalette('--straight-lines')}
						/>
						<div
							css={css`
								height: ${space[1]}px;
							`}
						/>
					</div>
				) : (
					''
				)}
				<RowBelowLeftCol>
					<>
						{!!avatarUrl && (
							<MetaAvatarContainer>
								<Avatar src={avatarUrl} alt={authorName} />
							</MetaAvatarContainer>
						)}
						{format.design === ArticleDesign.Audio &&
							seriesTag?.podcast && (
								<PodcastMeta
									image={seriesTag.podcast.image}
									spotifyUrl={seriesTag.podcast.spotifyUrl}
									subscriptionUrl={
										seriesTag.podcast.subscriptionUrl
									}
								/>
							)}
						<div>
							{shouldShowContributor(format) && (
								<Contributor
									byline={byline}
									tags={tags}
									format={format}
									source={source}
								/>
							)}
							<Dateline
								primaryDateline={primaryDateline}
								secondaryDateline={secondaryDateline}
								format={format}
							/>
							<div style={{ color: 'white' }}>TEST</div>
						</div>
					</>
				</RowBelowLeftCol>

				<div data-print-layout="hide" css={metaFlex}>
					{renderingTarget === 'Web' && (
						<div
							className={
								isInteractive
									? interactiveLegacyClasses.shareIcons
									: ''
							}
							css={[
								metaExtras(isPictureContent),
								format.design === ArticleDesign.LiveBlog &&
									css(
										borderColourWhenBackgroundDark,
										metaExtrasLiveBlog,
									),
							]}
						>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<ShareButton
									pageId={pageId}
									webTitle={webTitle}
									format={format}
									context="ArticleMeta"
								/>
							</Island>
						</div>
					)}
					<div
						className={
							isInteractive
								? interactiveLegacyClasses.shareAndCommentCounts
								: ''
						}
						css={[
							metaNumbers(isPictureContent),
							format.design === ArticleDesign.LiveBlog &&
								css(
									borderColourWhenBackgroundDark,
									metaNumbersExtrasLiveBlog,
								),
						]}
					>
						<div
							css={css`
								display: flex;
								flex-direction: row;
								align-items: flex-start;
							`}
						>
							<div>
								{isCommentable && (
									<Island
										priority="feature"
										defer={{ until: 'idle' }}
									>
										<CommentCount
											discussionApiUrl={discussionApiUrl}
											shortUrlId={shortUrlId}
										/>
									</Island>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
