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
