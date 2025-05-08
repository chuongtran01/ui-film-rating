declare module "color-thief-browser" {
  export default class ColorThief {
    static getColor(img: HTMLImageElement | HTMLCanvasElement, quality?: number): Promise<[number, number, number]>;
    static getPalette(img: HTMLImageElement | HTMLCanvasElement, colorCount?: number, quality?: number): Promise<[number, number, number][]>;
  }
}
