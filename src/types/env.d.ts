interface ImportMetaEnv {
  // As defined in the .env file at  @/
  readonly VITE_LOCAL_IP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
