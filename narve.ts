type attributes = object

function createElem(tag?:string,attributes?:attributes){
    if(tag===undefined)tag="div"
    let elem = document.createElement(tag)
    if(attributes){
        Object.entries(attributes).forEach(([key, value]) => {
            elem.setAttribute(key,value)
        })
    }
    return elem
}
function createComponent(tag?:string,attributes?:attributes,...children:Narve.Component[]|string[]){
    let component = new Narve.Component(tag,attributes,...children)
    return component
}
function deepClone(val:Narve.Component){
    let ret: Narve.Component
    try{
        ret = htmlToComponent(<HTMLElement>val.elem.cloneNode(true))
    }catch{
        console.warn("couldn't deepClone")
        return nr()
    }
    return ret
}
function querySelector(querySelector: string){
    let component = new Narve.Component()
    component.querySelector(querySelector)
    return component
}

export const nr = createComponent

export namespace Narve{
    export const q = querySelector

    export class Component {
        elem: HTMLElement
        children: NarveComponentArray
        constructor(tag?: string,attr?: attributes,...children: Component[]|string[]){
            this.children = new NarveComponentArray(this)
            this.elem = createElem(tag,attr||{})
            
            if(children.every(v=>v instanceof Narve.Component)){
                    this.children.set(...children)
            }else{
                this.setInnerText(children.join(''))
            }
        }
        querySelector(querySelector: string){
            const el: HTMLElement|null = document.querySelector(querySelector)
            if(el===null)return null
            this.elem = el || createElem("div")
            this.children = htmlToComponent(this.elem).children
            return this
        }
        replaceWith(component:Component|HTMLElement){
            if(component instanceof Component){
                this.elem.replaceWith(component.elem)
                this.elem = component.elem
                this.children = component.children
            }else{
                this.elem.replaceWith(component)
                this.elem = component
                this.children = htmlToComponent(component).children    
            }
        }
        removeChild(component: Component){
            const index = this.children.findIndex(v=>{
                return v.elem===component.elem
            })
            if(index !== -1){
                this.children.delete(index, 1)
            }
        }
        removeElem(){
            this.elem.remove()
        }
        setInnerText(text: string){
            this.children = new NarveComponentArray(this)
            this.elem.innerText = text
        }
        switchFocus(component: Component,display: string = "block"){
            this.children.forEach(c=>c.hide())
            component.display()
        }
        display(display: string = "block"){
            this.elem.style.display = display
        }
        hide(){
            this.elem.style.display = "none"
        }
    }
}
export function htmlToComponent(htmlElem: HTMLElement){
    let component = new Narve.Component()
    component.elem = htmlElem
    if(htmlElem.children.length === 0){
        return component
    }
    let childrenArray = new Array<Narve.Component>()
    for(let i = 0; i < htmlElem.children.length; i++){
        childrenArray.push(htmlToComponent(<HTMLElement>htmlElem.children[i]))
    }
    component.children = new NarveComponentArray(component,...childrenArray)
    return component
}
interface NarveComponentArrayInterface {
    parent: Narve.Component;
    constructor: Function;
    copyWithin(target: number, start: number, end?: number): this;
    fill(value: Narve.Component, start?: number, end?: number): this;
    pop(): Narve.Component|undefined;
    push(...children: Narve.Component[]): number;
    reverse(): this;
    shift(): Narve.Component|undefined;
    sort(compreFun: (a: Narve.Component, b: Narve.Component) => number): this;
    /**
     * @param start can't be bigger than this.length
     */
    splice(start: number, deleteCount?: number, ...rest: Narve.Component[]): Narve.Component[];
    unshift(...rest: Narve.Component[]): number;
    replace(i: number, val: Narve.Component): void;
    delete(start: number, deleteCount?: number): Narve.Component[];
    insert(start: number, ...children: Narve.Component[]): this|undefined;
    set(...children: Narve.Component[]): void;
    __REG_START__(x: number | undefined): number;
    __REG_END__(x: number | undefined): number;
}
class NarveComponentArray extends Array<Narve.Component> implements NarveComponentArrayInterface{
    parent: Narve.Component
    constructor(parent: Narve.Component,...children: Array<Narve.Component>){
        super()
        Object.setPrototypeOf(this, NarveComponentArray.prototype)
        this.parent = parent
        children.forEach((child,i) => {
            this[i] = child
        })
    }
    copyWithin(target: number, start: number, end?: number){
        target = this.__REG_START__(target)
        start = this.__REG_START__(start)
        end = this.__REG_END__(end)
        if(start>=this.length) return this
        if(end<=start) return this
        if(target === start) return this

        if(target < start){
            for(let i=0;i<end-start;i++){
                if(i+start>=this.length) break
                if(i+target>=this.length) break
                this.replace(i+target,this[i+start])
            }
        }else{
            for(let i=end-start-1;i>=0;i--){
                if(i+start>=this.length) continue
                if(i+target>=this.length) continue
                this.replace(i+target,this[i+start])
            }
        }
        return this
    }
    fill(value:Narve.Component,start?:number,end?:number){
        start = this.__REG_START__(start)
        end = this.__REG_END__(end)
        if(start>=this.length||end<=start) return this

        for(let i=start;i<end;i++) this.replace(i,value)
        return this
    }
    pop(){
        const ret = super.pop()
        if(ret===undefined)return undefined
        ret.removeElem()
        return ret
    }
    push(...children: Narve.Component[]){
        super.push(...children)
        children.forEach(c=>{
            this.parent.elem.insertAdjacentElement("beforeend",c.elem)
        })
        return this.length
    }
    reverse(){
        let l=0,r=this.length-1
        while(r-l>0){
            const t = deepClone(this[l])
            this.replace(l,deepClone(this[r]))
            this.replace(r,t)
            l++;r--
        }
        return this
    }
    shift(){
        const ret = super.shift()
        if(ret===undefined)return undefined
        ret.removeElem()
        return ret
    }
    sort(compreFun?:(a:Narve.Component,b:Narve.Component)=>number){
        const s = [...this.map(v=>deepClone(v))]
        qsort(s,compreFun)
        s.forEach((v,i)=>this.replace(i,v))
        return this
    }
    /**
     * @param start can't be bigger than this.length
     */
    splice(start: number, deleteCount?: number, ...rest: Narve.Component[]): Narve.Component[] {
        this.delete(start,deleteCount)
        this.insert(start,...rest)
        return this
    }
    unshift(...rest: Narve.Component[]): number {
        rest.forEach(c=>
            this.parent.elem.insertAdjacentElement("afterbegin",c.elem)
        )
        super.unshift(...rest)
        return this.length
    }

    replace(i:number,val:Narve.Component){
        i = this.__REG_START__(i)
        if(i>=this.length) i=this.length-1
        this[i].replaceWith(val.elem.isConnected?deepClone(val):val)
    }
    delete(start: number,deleteCount?:number){
        start = this.__REG_START__(start)
        if(start>=this.length)return []
        if(deleteCount === undefined)
            deleteCount = this.length-start
        
        const ret = super.splice(start,deleteCount)
        ret.forEach(v=>v.removeElem())
        return ret
    }
    insert(start: number,...children: Narve.Component[]){
        start = this.__REG_START__(start)
        if(start >= this.length){
            console.warn('The value of index is too large. "insert" is regarded as "append"')
            this.push(...children)
            return
        }
        const insertPosHTML = this[start].elem
        children.forEach(child => {
            insertPosHTML.before(child.elem)
        })
        super.splice(start,0,...children)
        return this
    }
    set(...children: Narve.Component[]){
        this.delete(0)
        this.push(...children)
    }
    map<U>(callback: (value: Narve.Component, index: number, array: Narve.Component[]) => U): U[] {
        let mapped:U[] = Array<U>()
        this.forEach((component,index,array) => {
            mapped.push(callback(component,index,array))
        })
        return mapped
    }
    __REG_START__(x:number|undefined){
        if(x===undefined) x=0
        if(x<0) x+=this.length
        if(x<0) x=0
        return x
    }
    __REG_END__(x:number|undefined){
        if(x===undefined||x>=this.length) x=this.length
        if(x<0) x+=this.length
        if(x<0) x=0
        return x
    }
}
function qsort<T>(
    arr:T[],
    compareFun:(a: T,b: T) => number = (a,b) => {
        const _a = JSON.stringify(a)
        const _b = JSON.stringify(b)
        return (_a > _b)?1:(_a < _b)?-1:0
    },
        
    l=0,
    r=arr.length-1){
    if(r < 0) return
    if(r >= arr.length) return
    if(l < 0) return
    if(l >= arr.length) return
    if(l > r) return

    const mid_i = Math.floor((l+r)/2)
    const mid_v = arr[mid_i]
    let i = l
    let k = r
    while(1){
        while(compareFun(arr[i],mid_v) < 0) i++
        while(compareFun(arr[k],mid_v) > 0) k--
        if(i <= k){
            [arr[i],arr[k]] = [arr[k],arr[i]]
            i++
            k--
        }
        if(i > k){
            break
        }
    }
    if(l < k) qsort(arr,compareFun,l,k)
    if(i < r) qsort(arr,compareFun,i,r)
    
    return arr
}