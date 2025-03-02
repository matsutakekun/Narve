type attributes = object;
declare function createComponent(tag?: string, attributes?: attributes, ...children: Narve.Component[] | string[]): Narve.Component;
declare function querySelector(querySelector: string): Narve.Component;
export declare const nr: typeof createComponent;
export declare namespace Narve {
    const q: typeof querySelector;
    class Component {
        elem: HTMLElement;
        children: NarveComponentArray;
        constructor(tag?: string, attr?: attributes, ...children: Component[] | string[]);
        querySelector(querySelector: string): this;
        replaceWith(component: Component | HTMLElement): void;
        removeChild(component: Component): void;
        removeElem(): void;
        setInnerText(text: string): void;
        switchFocus(component: Component, display?: string): void;
        display(display?: string): void;
        hide(): void;
    }
}
export declare function htmlToComponent(htmlElem: HTMLElement): Narve.Component;
interface NarveComponentArrayInterface {
    parent: Narve.Component;
    constructor: Function;
    copyWithin(target: number, start: number, end?: number): this;
    fill(value: Narve.Component, start?: number, end?: number): this;
    pop(): Narve.Component | undefined;
    push(...children: Narve.Component[]): number;
    reverse(): this;
    shift(): Narve.Component | undefined;
    sort(compreFun: (a: Narve.Component, b: Narve.Component) => number): this;
    /**
     * @param start can't be bigger than this.length
     */
    splice(start: number, deleteCount?: number, ...rest: Narve.Component[]): Narve.Component[];
    unshift(...rest: Narve.Component[]): number;
    replace(i: number, val: Narve.Component): void;
    delete(start: number, deleteCount?: number): Narve.Component[];
    insert(start: number, ...children: Narve.Component[]): this | undefined;
    set(...children: Narve.Component[]): void;
    __REG_START__(x: number | undefined): number;
    __REG_END__(x: number | undefined): number;
}
declare class NarveComponentArray extends Array<Narve.Component> implements NarveComponentArrayInterface {
    parent: Narve.Component;
    constructor(parent: Narve.Component, ...children: Array<Narve.Component>);
    copyWithin(target: number, start: number, end?: number): this;
    fill(value: Narve.Component, start?: number, end?: number): this;
    pop(): Narve.Component;
    push(...children: Narve.Component[]): number;
    reverse(): this;
    shift(): Narve.Component;
    sort(compreFun?: (a: Narve.Component, b: Narve.Component) => number): this;
    /**
     * @param start can't be bigger than this.length
     */
    splice(start: number, deleteCount?: number, ...rest: Narve.Component[]): Narve.Component[];
    unshift(...rest: Narve.Component[]): number;
    replace(i: number, val: Narve.Component): void;
    delete(start: number, deleteCount?: number): Narve.Component[];
    insert(start: number, ...children: Narve.Component[]): this;
    set(...children: Narve.Component[]): void;
    map<U>(callback: (value: Narve.Component, index: number, array: Narve.Component[]) => U): U[];
    __REG_START__(x: number | undefined): number;
    __REG_END__(x: number | undefined): number;
}
export {};
