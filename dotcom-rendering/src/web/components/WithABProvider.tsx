import { CoreAPIConfig } from '@guardian/ab-core/dist/types';
import { ABProvider } from '@guardian/ab-react';
import { getOphanRecordFunction } from '../browser/ophan/ophan';
import { getCypressSwitches } from '../experiments/cypress-switches';
import { getForcedParticipationsFromUrl } from '../lib/getAbUrlHash';

type Props = {
	arrayOfTestObjects: CoreAPIConfig['arrayOfTestObjects'];
	abTestSwitches: CoreAPIConfig['abTestSwitches'];
	pageIsSensitive: CoreAPIConfig['pageIsSensitive'];
	mvtId: CoreAPIConfig['mvtId'];
	children: JSX.Element;
};
export const WithABProvider = ({
	arrayOfTestObjects,
	abTestSwitches,
	pageIsSensitive,
	mvtId,
	children,
}: Props) => {
	const ophanRecord = getOphanRecordFunction();
	const windowHash = window?.location.hash;
	// Get the forced switches to use for when running within cypress
	// Is empty object if not in cypress
	const cypressAbSwitches = getCypressSwitches();
	return (
		<ABProvider
			arrayOfTestObjects={arrayOfTestObjects}
			abTestSwitches={{
				...abTestSwitches,
				...cypressAbSwitches, // by adding cypress switches below CAPI, we can override any production switch in Cypress
			}}
			pageIsSensitive={pageIsSensitive}
			mvtMaxValue={1000000}
			mvtId={mvtId}
			ophanRecord={ophanRecord}
			forcedTestVariants={getForcedParticipationsFromUrl(windowHash)}
		>
			{children}
		</ABProvider>
	);
};
