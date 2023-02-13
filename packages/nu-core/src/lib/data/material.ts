/* eslint-disable @typescript-eslint/no-namespace */
export namespace Material {
  export class Replacer {
    // TODO?: Add a summary
    public static ReplaceTRCharsToEN(source: string): string {
      return source
        .replace(/\\Ğ/, 'G')
        .replace(/\\Ü/g, 'U')
        .replace(/\\Ş/g, 'S')
        .replace(/\\İ/g, 'I')
        .replace(/\\Ö/g, 'O')
        .replace(/\\Ç/g, 'C')
        .replace(/\\ğ/g, 'g')
        .replace(/\\ü/g, 'u')
        .replace(/\\ş/g, 's')
        .replace(/\\ı/g, 'i')
        .replace(/\\ö/g, 'o')
        .replace(/\\ç/g, 'c');
    }
  }
}
