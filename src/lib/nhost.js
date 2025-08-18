import { NhostClient } from '@nhost/react';

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
  backendUrl: import.meta.env.VITE_NHOST_BACKEND_URL,
  functionsUrl: import.meta.env.VITE_NHOST_FUNCTIONS_URL
});

export { nhost };

