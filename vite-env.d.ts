// Fix: Remove missing vite/client reference and add process.env type definition
declare var process: {
  env: {
    API_KEY: string;
    [key: string]: any;
  }
};