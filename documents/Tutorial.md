# Tutorial
ここでは、Narve.jsを使った開発の方法を説明します。
このチュートリアルに沿うことでNarve.jsを使った開発をスムーズに進めることができます。

## 1. Compenent
narve.jsではHTML要素を機能ごとに部品(コンポーネント)に分けることができます。

```js
class ExButton extends Narve.Component {
    available
    constructor(){
        super("button")
        this.available = true
        this.elem.onclick = () => {
            if(available){
                this.onclick()
            }
        }
    }
    setAvailable(available){
        this.available = available
    }
    onclick(e){
        alert("clicked!")
    }
}
```
この例では、
