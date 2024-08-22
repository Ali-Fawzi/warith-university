import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from 'vite-plugin-svgr';
import type {UserConfig} from 'vite';

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  optimizeDeps: {
    /**
     * Include dependencies here if they throw CJS<>ESM errors.
     * For example, for the following error:
     *
     * > ReferenceError: module is not defined
     * >   at /Users/.../node_modules/example-dep/index.js:1:1
     *
     * Include 'example-dep' in the array below.
     * @see https://vitejs.dev/config/dep-optimization-options
     */
    include: [
      'clsx',
      '@headlessui/react',
      'typographic-base',
      'react-intersection-observer',
      'react-use/esm/useScroll',
      'react-use/esm/useDebounce',
      'react-use/esm/useWindowScroll',
      'nprogress/nprogress.css',
    ],
  },
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
}) satisfies UserConfig;
