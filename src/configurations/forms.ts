/**
 * Web3Forms contact form configuration.
 * The access_key is designed to be public (client-side form submissions);
 * centralised here as single source of truth for swapping keys per environment.
 */
export const WEB3FORMS_ACCESS_KEY = 'b1f25317-6496-43d7-9e5a-dc6b81967a17' as const satisfies string;

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit' as const satisfies string;
