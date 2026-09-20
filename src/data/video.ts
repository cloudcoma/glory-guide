export type GuideVideoSource = {
  type: "telegram" | "youtube" | "rutube" | "mp4";
  url: string;
};

export type GuideStepId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

// The optional full installation video shown on the home page.
// It is separate from the short videos assigned to individual steps below.
export const guideVideoSource: GuideVideoSource | undefined = undefined;

// Optional exceptions for clips hosted outside the automatic local MP4 paths.
// Keep this internal: the usual workflow is simply to add step-N.mp4 to
// public/videos/steps. Codex can add an override when a Telegram, YouTube or
// RuTube link is needed for a particular step.
export const guideStepVideoOverrides: Partial<
  Record<GuideStepId, GuideVideoSource>
> = {};

function isGuideStepId(stepId: number): stepId is GuideStepId {
  return Number.isInteger(stepId) && stepId >= 1 && stepId <= 12;
}

export function getGuideStepVideoSource(
  stepId: number,
): GuideVideoSource | undefined {
  if (!isGuideStepId(stepId)) return undefined;
  return guideStepVideoOverrides[stepId] ?? {
    type: "mp4",
    url: `/videos/steps/step-${stepId}.mp4`,
  };
}
