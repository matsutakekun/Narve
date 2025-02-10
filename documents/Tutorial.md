# Tutorial
ここでは、Narve.jsを使った開発の方法を説明します。

このチュートリアルに沿うことでNarve.jsを使った開発をスムーズに進めることができます。

このドキュメントはNarve.jsがインストール済みであることが前提です
まだインストールが完了していない方は[インストール](Installation.md)を先に終わらせてからこのドキュメントを読むことをお勧めします。

## About Component
コンポーネントとはwebページを構成する部品のことです。

ボタンや入力欄等の小さな部品から、
それらを組み合わせたフォーム全体をコンポーネントとみなすこともできます。

## namespace Narve
namespace Narveは次の項目を持ちます
- q : HTMLDOMでいうquerySelectorです
- Component : コンポーネントを構成するためのクラスです

## Narve.q
`Narve.q()` は `document.querySelector()` と似た動作をします。

返値は `Narve.Component` クラスのインスタンスです。
```js
import { Narve } from "narve"
const component = Narve.q("#myComponent")
```
## Narve.Component
コンポーネントを作るためのクラスです。

すべてのコンポーネントは`Narve.Component`クラスを継承します。
```js
import { Narve } from "narve"

class myComponent extends Narve.Component {
    constructor(){
        super()
    }
}
```
## Example
ここでは例として次の機能を持った「AlertInput」コンポーネントを作成してみましょう。
- 一つの `input` 要素をもつ
- 一つの `button` 要素をもつ
- `button` 要素をクリックすると、 `input` 要素の内容をアラートする

順番に開発していきます。
### 開発用サーバーを起動
プロジェクトフォルダに移動して、
```shell
npm run dev
```
を実行し、開発用サーバーを起動します。
起動には時間がかかることがあります。

開発用サーバーが起動すると、自動で開発中のページが開きます。
### 新しいクラスを作成
`src`フォルダ内に`alertInput.js`を作成して次のように記述します。

```js:src/alertInput.js
import { Narve } from "narve"

export default class AlertInput extends Narve.Component {
  constructor(){
    super()
  }
}
```
この時点では`AlertInput`クラスには子要素や機能は追加されておらず、ただ`Narve.Component`クラスを継承しただけです。
### Appに追加する
```js:src/app.js

```
ブラウザに移動して、エラーが出ていないことを確認してください。

エラーが出ている場合はファイル構成や、ファイルの内容に問題がある可能性があります。

### 子要素を追加
それでは実際に子要素を追加していきましょう！

まず、`button`要素の`Narve.Component`を作る方法を説明します。
`button`要素は、
- クラス: "alertBtn"
- InnerHTML: "アラート"
を設定します。
書き方は以下のようになります。
```js
nr("button", {class: "alertBtn"}, "アラート")
```
これは、このようなhtml要素に変換されます。
```html
<button class="alertBtn">アラート</button>
```
同様にinput要素も作っていきます。
```
nr("input", {class: "inputElem", placeholder: "テキストを入力"})
```
これらを`AlertInput`クラスに追加します。
追加するときはクラスのプロパティとして定義するのがおすすめです。
```diff_js:src/alertInput.js

```
追加したら、ブラウザに移動して要素が追加されていることを確認しましょう。
開発用サーバーはホットリロード機能を備えているので、ファイルを保存した時点でリロードが完了しているはずです。

### 機能を追加する
`button`要素をクリックしたときに`input`要素の内容をアラートする機能を追加していきます。
次のように書きます。
```diff_js:src/alertInput.js

```
この記述は`children.set()`の前で書いても後で書いても正しく動作します。
また、関数内で一時的に定義するというような使い方も可能です。

## チュートリアル終了
これで、`AlertInput`コンポーネントの開発は終了です。
ブラウザに移動して意図した動作をするか確かめましょう。  
上手く動かないときはインポートを正しく記述したか、ファイルを保存したか、このチュートリアルのコードを正しく記述しているか等を確認してみてください。

それではここまでお疲れ様でした！  
Narve.jsを利用して自分の思い描くアプリケーションを開発していきましょう！



