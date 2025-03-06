/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHERAPI_KEY: string; // Updated to WeatherAPI.com
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
