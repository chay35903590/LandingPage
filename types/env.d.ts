export interface Env {
  CONTENT_KV: KVNamespace;
  ADMIN_PASSWORD: string;
}

declare global {
  interface CloudflareEnv extends Env {}
}
