# Document
Narve.jsの利点を最大限まで生かすため、このチュートリアルを読んでから開発を進めることをお勧めします。
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
ここでは例として次の機能を持った「AlertInput」コンポーネントを作成してみます。
- 一つの `input` 要素がある
- 一つの `button` 要素がある
- `button` 要素をクリックすると、 `input` 要素の内容をアラートする

順番に開発していきます。

### 新しいクラスを作成
```js
import { Narve } from "narve"


```
