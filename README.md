# Narve.js
Narve.jsはユーザーインターフェースの構築を助けるJavaScriptライブラリです。

このライブラリはベータ版です。バグがあったり、使いにくい箇所があればGithubリポジトリの[Issue](https://github.com/matsutakekun/Narve/issues)を通じて報告していただけると機能改善の参考になります。

- **既知の書き方**: Narve.jsはVanillaの書き方、考え方に沿ったフレームワークです。これにより学習のハードルを低くすることができる上、プロジェクトへの導入もスムーズです。JavaScriptを知っていれば誰でも簡単に導入することができます。

- **コンポーネント指向**: ボタンや入力画面などの機能単位でコンポーネントを作成することで、可読性・再利用性を高めることができます。また、コンポーネントはclassで宣言されるので、関数メソッドを持つことができ、コンポーネント操作を簡潔に書くことができます。
- **子要素の配列操作**: HTML要素の子要素を配列のように扱うことができます。つまり、pushやsplice関数などを使用して要素の追加や削除ができます。また、子要素の一部をまとめた配列をプロパティに持つことができ、直感的な操作を可能にします。
- **無駄のないレンダリング**: Narve.jsはリアクティブプログラミングの考え方を採用していないので、レンダリングはHTML要素を変更するとき以外起こりません。コンポーネントは関数によってのみ変更されるので、処理の影響範囲を把握しやすくなります。Narve.jsは簡潔なHTML要素の操作方法を提供しているので、リアクティブでないことによってHTML操作が煩雑になることはありません。


# Samples
```js
class HelloWorld extends Narve.Component {
    constructor(name){
        super("div")
        this.children.push(
            nr("p", {class: "helloworld"}, "Hello ",name,"!")
        )
    }
}
 const root = Narve.q("body")
 root.children.set(new HelloWorld("Alice"))
```
これは、body要素内に "Hello Alice!" と表示する例です。

実際には、
```html
<body>
    <div>
        <p class="helloworld">Hello Alice!</p>
    </div>
</body>
```
のように解釈されます。

より詳しくNarve.jsについて知りたい場合は[Learn Narve](documents/Learn%20Narve.md)を参照してください。

# Installation
```cmd
npx create-narve-app
```
# License
narve is under [MIT license](LICENSE).
