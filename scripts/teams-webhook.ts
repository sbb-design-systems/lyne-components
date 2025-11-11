const version = process.env.RELEASE_TAG!.replace(/^v/, '');
const response = await fetch(
  `https://api.github.com/repos/sbb-design-systems/lyne-components/releases/tags/v${version}`,
);
if (!response.ok) {
  throw new Error(`Failed to fetch release info: ${response.status} ${response.statusText}`);
}
const release = (await response.json()) as GitHubResponse;

const teamsResponse = await fetch(process.env.TEAMS_WEBHOOK!, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          type: 'AdaptiveCard',
          version: '1.5',
          msteams: { width: 'full' },
          body: [
            {
              type: 'TextBlock',
              text: `🎉 Lyne Components Release ${release.name}`,
              weight: 'Bolder',
              size: 'Large',
            },
            ...release.body.split(/\n\n+/g).map(
              (s) =>
                ({
                  type: 'TextBlock',
                  text: s.replace(/^[#]+/, '').trim(),
                  wrap: s.includes('\n'),
                  ...(s.startsWith('#') ? { weight: 'Bolder', size: 'Medium' } : {}),
                }) satisfies Body,
            ),
          ],
          actions: [
            {
              type: 'Action.OpenUrl',
              title: 'View Release',
              url: release.html_url,
            },
          ],
        },
      },
    ],
  } satisfies TeamsWebhook),
});
if (!teamsResponse.ok) {
  console.error(
    `Failed to send Teams webhook: ${teamsResponse.status} ${teamsResponse.statusText}`,
  );
}

export {};

interface TeamsWebhook {
  type: string;
  attachments: Attachment[];
}

interface Attachment {
  contentType: string;
  content: Content;
}

interface Content {
  type: string;
  version: string;
  msteams: { width: string };
  body: Body[];
  actions: Action[];
}

interface Body {
  type: string;
  text: string;
  weight?: string;
  size?: string;
  wrap?: boolean;
}

interface Action {
  type: string;
  title: string;
  url: string;
}

interface GitHubResponse {
  body: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  html_url: string;
  name: string;
}
