declare module 'react' {
  export type ReactNode = any;
  export type ButtonHTMLAttributes<T = any> = any;
  export const useMemo: any;
  export const useContext: any;
  export const createContext: any;
  const React: any;
  export default React;
}

declare module 'react-dom' {
  const ReactDOM: any;
  export default ReactDOM;
}

declare module 'next/navigation' {
  export const useRouter: any;
  export const usePathname: any;
  export const redirect: any;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next/server' {
  export const NextResponse: any;
  export type NextRequest = any;
}

declare module 'dompurify' {
  const createDOMPurify: any;
  export default createDOMPurify;
}

declare module 'jsdom' {
  export class JSDOM {
    constructor(html?: string, options?: any);
    window: any;
  }
}

declare module 'tailwind-merge' {
  export function twMerge(...inputs: any[]): string;
}

declare module 'clsx' {
  export type ClassValue = any;
  export function clsx(...inputs: any[]): string;
}

declare module '@supabase/supabase-js' {
  export function createClient(url: string, key: string): any;
}

declare const process: any;

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
