# Learn Narve
Narve.jsはVanillaの書き方を尊重します。
Narve.jsはJavaScriptでの開発を強力に手助けしますが、今までのやり方を変える必要はありません。

それではNarve.jsを最大限有効に使うために効果的な使い方を学びましょう！

# コンポーネント
Webサイトは全て「部品」からできています。
「部品」にはボタンやテキストなどの小さなものもそれらを組み合わせて作られたページ全体も含みます。
この「部品」がコンポーネントです。

Narve.jsのコンポーネントとは`Narve.Component`を継承したクラスです。
```js
import { Narve } from "narve"

class MyComponent extends Narve.Component {
  constructor(){
    super("div",{class: "myDiv"},"Hello World")
  }
}
```
このコンポーネントは、htmlで書くとこのようになります。
```html
<div class="myDiv">Hello World</div>
```
コンポーネントは他のコンポーネントにネストすることができます。
```js
import { Narve } from "narve"

class ParentComponent extends Narve.Component {
  constructor(){
    super("section",{class: "parentSection"},
      // この書き方は非推奨
      new MyComponent()
    )
  }
}
class MyComponent extends Narve.Component {
  constructor(){
    super("div",{class: "myDiv"},"Hello World")
  }
}
```
htmlではこのようになります。
```html
<section class="parentSection">
 <div class="myDiv">Hello World</div> 
</section>
```
> [!Warning]
> 以下の書き方は推奨されていません。
> ```
> super("...",{...},
>   new MyComponent()
> )
> ```
> 推奨された書き方については、[子要素の追加](#子要素の追加)を参照してください。

# 簡易的なコンポーネント
普通のボタンやテキストのためにいちいちクラスを定義するのは面倒です。そのようなときは`nr`関数を使いましょう。この関数はネストできます。
```js
import { nr } from "narve"

nr("main",{class: "mainContents"},
  nr("div",{class: "inputs"},
    nr("input",{placeholder: "type text"}),
    nr("button",{},"click here!")
  )
)
```
上の例は次のhtml要素を意味します。
```html
<main class="mainContents">
  <div class="inputs">
    <input placeholder="type text">
    <button>click here!</button>
  </div>
</main>
```

# ファイル分割
先程のように1つのファイルにコンポーネントを書くこともできますが、ファイルサイズが大きくなり過ぎます。

そこで`export`を使用することで他のファイルからアクセスできるようになり、ファイルを複数に分割できます。

`src/myComponent.js`に次のように入力します。
```js:myComponent.js
import { Narve } from "narve"

export default class MyComponent extends Narve.Component {
  constructor(){
    super("div",{class: "myDiv"},"Hello World")
  }
}
```
`src/app.js`に次のように記述します。
```js:app.js
import { Narve } from "narve"
import "./styles.css"
import MyComponent from "./myComponent"

export default class App extends Narve.Component {
  myComponent = new MyComponent()
  constructor(){
    super()
    this.children.set(this.myComponent)
  }
}
```
`app.js`に子要素を追加したので、
開発用サーバーを立ち上げてブラウザに移動すると、コンポーネントが追加されていることが確認できます。

# コンポーネントの属性値
ほとんど同じコンポーネントで、ほんの少し違うコンポーネントを作りたいことがありませんか？

例えば、アカウントのプロフィールページで部品は同じで名前等の情報だけ変えたい場合などです。

Narve.jsではコンポーネントがクラスなのでコンストラクタの引数に属性値を与えることができます。
```js
import { Narve, nr } from "narve";

export default class Profile extends Narve.Component {
  constructor(name){
    super("div",{class: "profile"},
      nr("h1",{},"Profile Page"),
        nr("h2",{},name)
      )
    }
  }
}
```

# html要素にアクセス
コンポーネントでも`elem`プロパティによって`htmlElement`のプロパティにアクセスできます。

試しに`htmlElement.classList.add("newClass")`を呼び出してみます。
```js
const myComponent = new MyComponent()
myComponent.elem.classList.add("newClass")
```
クリック時の処理の追加もしてみましょう。
```js
const myComponent = new MyComponent()
myComponent.elem.onclick = () => {
  alert("clicked!")
}
```

# 子要素の追加
コンポーネントに子要素を追加するときは次のようにします。
```js
import { Narve } from "narve"
import MyComponent from "./myComponent"

class ParentComponent extends Narve.Component {
  myComponent = new MyComponent()
  constructor(){
    super("section",{class: "parentSection"})
    // TODO
  }
}
```
こうすることで、メンバ変数として子要素にアクセスできるので、例えば次のような使い方が可能です。
```js
import { Narve, nr } from "narve";

export default class Profile extends Narve.Component {
  nameText
  constructor(name){
    super("div",{class: "profile"})
    this.nameText = nr("h2",{},name)

    this.children.set(
      nr("h1",{},"Profile Page"),
      this.nameText
    )
    this.nameText.elem.onclick = () => {
      alert("name clicked!")
    }
  }
}
```
# innerTextの編集
コンポーネントの内容をクリアし、テキストを設定するには`setInnerText`を使用します。
この関数は、`innerText`へ代入し、子要素をクリアします。
```js
// TODO
```
# 子要素の配列処理
`Narve.Compoment`は子要素をまとめたプロパティである`children`を持ちます。
このプロパティは配列のように扱えます。
非破壊的メソッドは基本的に配列と同じ処理を行います。
- `slice`
- `map`
- 
