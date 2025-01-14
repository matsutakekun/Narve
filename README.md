# Narve.js
Narve.jsはユーザーインターフェースの構築を助けるJavaScriptライブラリです。

**注意** このライブラリは開発中です。バグが発生したり、ドキュメントの内容に間違いがある場合があります。
使える状態になるのは2.0.0以降の予定です。しばらくお待ちください。

- **既知の書き方**: Narve.jsはVanillaの書き方、考え方に沿ったフレームワークです。これにより学習のハードルを低くすることができる上、プロジェクトへの導入もスムーズです。JavaScriptを知っていれば誰でも簡単に導入することができます。

- **コンポーネント指向**: ボタンや入力画面などの機能単位でコンポーネントを作成することで、可読性・再利用性を高めることができます。また、コンポーネントはclassで宣言されるので、関数メソッドを持つことができ、コンポーネント操作を簡潔に書くことができます。
- **子要素の配列操作**: HTML要素の子要素を配列のように扱うことができます。つまり、pushやsplice関数などを使用して要素の追加や削除ができます。また、子要素の一部をまとめた配列をプロパティに持つことができ、直感的な操作を可能にします。
- **無駄のないレンダリング**: Narve.jsはリアクティブプログラミングの考え方を採用していないので、レンダリングはHTML要素を変更するとき以外起こりません。必要なときのみレンダリングがされることで無駄がなくなり、パフォーマンスの向上が期待できます。Narve.jsは簡潔なHTML要素の操作方法を提供しているので、リアクティブでないことによってHTML操作が煩雑になることはなく、むしろ処理の影響範囲を把握しやすくなります。


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

他にも様々なサンプルがあります。

詳しくは[ドキュメント](documents/Tutorial.md)を参照してください。

# Installation
```cmd
npx @matsutakekun/create-narve-app
```
# License

narve is under [MIT license](./LICENSE).