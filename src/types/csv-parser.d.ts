declare module 'csv-parser' {
  interface CsvParserOptions {
    separator?: string;
    newline?: string;
    quote?: string;
    escape?: string;
    headers?: boolean | string[];
    strict?: boolean;
    skipLines?: number;
    maxRowBytes?: number;
    mapHeaders?: ({ header, index }: { header: string; index: number }) => string | null;
    mapValues?: ({ header, index, value }: { header: string; index: number; value: string }) => any;
  }

  import { Transform } from 'stream';
  export default function csvParser(options?: CsvParserOptions): Transform;
}
