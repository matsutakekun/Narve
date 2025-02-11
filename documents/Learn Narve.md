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
  myChild = new MyComponent()
  constructor(){
    super("section",{class: "parentSection"})
    this.children.set(this.myChild)
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

# ファイル分割
先程のように1つのファイルにコンポーネントを書くこともできますが、ファイルサイズが大きくなり過ぎます。

そこで`export`を使用することで他のファイルからアクセスできるようになり、ファイルを複数に分割できます。
```js:myComponent.js
import { Narve } from "narve"
export default class MyComponent extends Narve.Component {
  constructor(){
    super("div",{class: "myDiv"},"Hello World")
  }
}
```
```js:app.js
// TODO
```
`app.js`に子要素を追加したので、
開発用サーバーを立ち上げてブラウザに移動すると、コンポーネントが追加されていることが確認できます。

# nr
//FROM

# コンポーネントの属性値
ほとんど同じコンポーネントで、ほんの少し違うコンポーネントを作りたいことがありませんか？

例えば、アカウントのプロフィールページで部品は同じで名前等の情報だけ変えたい場合などです。

Narve.jsではコンポーネントがクラスなのでコンストラクタの引数に属性値を与えることができます。
```js
import { Narve } from "narve"
class Profile extends Narve.Component {
  constructor(name){
    super("p",{class: "profileName"},name)
  }
}
```
