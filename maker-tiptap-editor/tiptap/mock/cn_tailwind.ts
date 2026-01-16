export const html = `
<h1>接下来会发生什么</h1>
<div data-type="callout" data-icon="😁"><div></div><div>asdfasdfasdfasd</div></div>
<p class="lead">
  直到现在，尝试使用 Tailwind
  来为文章、文档或<mark>博客</mark>文章添加<mark data-color='red' data-dq="dq" style="size:12px">样式</mark>一直是一项繁琐的<mark data-color='var(--hg-red-3)'>任务</mark>，需要对排版有敏锐的眼光，并且要编写大量复杂的自定义
  CSS。
</p>



<div data-type="columns">
  <div data-type="column" style="width:50%">
    <p>111</p>
  </div>
  <div data-type="column" style="width:50%">
    <p>222</p>
  </div>
</div>
<p>
  默认情况下，Tailwind
  会移除所有段落、<span style="background-color">标题</span>、列表等<span style="background-color:red">元素</span>的浏览器默认样式。这在构建应用程序 UI
  时非常有用，因为你可以减少处理用户代理样式的时间，但当你<em>确实</em>只是在尝试为来自
  CMS 或 Markdown 文件的富文本内容设置样式时，这可能会让人感到意外且不直观。
</p>

<div data-type="columns">
  <div data-type="column" style="width:50%">
    <p>111</p>
  </div>
  <div data-type="column" style="width:50%">
    <p>222</p>
  </div>
</div>


<h2>接下来会发生什么</h2>
<p class="lead">
  直到现在，尝试使用 Tailwind
  来为文章、文档或博客文章添加样式一直是一项繁琐的任务，需要对排版有敏锐的眼光，并且要编写大量复杂的自定义
  CSS。
</p>
<table>
    <tr>
      <td>Cyndi Lauper</td>
      <td>Singer</td>
      <td>Songwriter</td>
      <td>Actress</td>
    </tr>
    <tr>
      <td>Cyndi Lauper</td>
      <td>Singer</td>
      <td>Songwriter</td>
      <td>Actress</td>
    </tr>

</table>
<p>
  默认情况下，Tailwind
  会移除所有段落、标题、列表等元素的浏览器默认样式。这在构建应用程序 UI
  时非常有用，因为你可以减少处理用户代理样式的时间，但当你<em>确实</em>只是在尝试为来自
  CMS 或 Markdown 文件的富文本内容设置样式时，这可能会让人感到意外且不直观。
</p>
<h3>接下来会发生什么</h3>
<p class="lead">
  直到现在，尝试使用 Tailwind
  来为文章、文档或博客文章添加样式一直是一项繁琐的任务，需要对排版有敏锐的眼光，并且要编写大量复杂的自定义
  CSS。
</p>
<p>
  默认情况下，Tailwind
  会移除所有段落、标题、列表等元素的浏览器默认样式。这在构建应用程序 UI
  时非常有用，因为你可以减少处理用户代理样式的时间，但当你<em>确实</em>只是在尝试为来自
  CMS 或 Markdown 文件的富文本内容设置样式时，这可能会让人感到意外且不直观。
</p>

<p>我们实际上经常收到关于这方面的投诉，人们经常问我们：</p>

<blockquote>
  <p>
    为什么 Tailwind 会移除我的
    <code>h1</code>
    元素的默认样式？我该如何禁用它？你说的我也会失去所有其他基础样式是什么意思？
  </p>
</blockquote>
<p>
  我们听到了你的问题，但我们并不认为简单地禁用我们的基础样式是你真正想要的。你不希望每次在仪表盘
  UI 中使用
  <code>p</code>
  元素时都要移除烦人的边距。而且我也怀疑你希望博客文章使用用户代理样式——你想让它们看起来<em>很棒</em>，而不是很糟糕。
</p>
<p>
  <code>@tailwindcss/typography</code>
  插件是我们试图给你<em>真正</em>想要的东西，而不会因为做一些愚蠢的事情（比如禁用我们的基础样式）带来任何负面影响。
</p>
<p>
  它增加了一个新的 <code>prose</code> 类，你可以将其应用到任何一块普通的 HTML
  内容上，将其变成一个美观、格式良好的文档：
</p>
<pre><code class="language-html">&lt;article class="prose"&gt;
  &lt;h1&gt;蒜蓉面包加奶酪：科学告诉我们什么&lt;/h1&gt;
  &lt;p&gt;
    多年来，父母们一直向他们的孩子们宣扬吃蒜蓉面包加奶酪的健康益处，这种食物在我们的文化中获得了如此标志性的地位，以至于孩子们经常会在万圣节打扮成温暖的、带奶酪的面包。
  &lt;/p&gt;
  &lt;p&gt;
    但最近的一项研究表明，这种备受推崇的开胃菜可能与全国范围内的一系列狂犬病病例有关。
  &lt;/p&gt;
  &lt;!-- ... --&gt;
&lt;/article&gt;
</code></pre>
<p>
  想了解更多关于如何使用该插件及其功能的信息，请<a
    href="https://github.com/tailwindcss/typography/blob/master/README.md"
    >阅读文档</a
  >。
</p>
<hr />
<h2>接下来会发生什么</h2>
<p>
  接下来是我编写的一些完全无意义的内容，目的是测试该插件。它包括我能想到的每一个合理的排版元素，比如<strong>加粗文字</strong>，无序列表，有序列表，代码块，引用，<em>甚至斜体字</em>。
</p>
<p>涵盖所有这些使用场景是很重要的，原因如下：</p>
<ol>
  <li>我们希望一切都能开箱即用并且看起来不错。</li>
  <li>其实主要就是第一个原因，这就是插件的整个意义所在。</li>
  <li>
    不过这里有一个虚假的第三个理由，因为有三个项目的列表看起来比两个项目更真实。
  </li>
</ol>
<p>现在我们将尝试另一种标题样式。</p>
<h3>排版应该很简单</h3>
<p>所以这是一个标题——如果我们做对了，这看起来应该会很合理。</p>
<p>一个聪明人曾告诉我关于排版的一个道理：</p>
<blockquote>
  <p>如果你不想让你的东西看起来很糟糕，排版非常重要。做好它，它就不会糟糕。</p>
</blockquote>
<p>这里可能还需要确保图片看起来默认也不错：</p>
<figure>
  <img
    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
    alt=""
  />
  <figcaption>
    与流行的看法相反，Lorem Ipsum 并不只是随意的文本。它起源于公元前 45
    年的一篇经典的拉丁文学作品，使其已有 2000 多年的历史。
  </figcaption>
</figure>
<p>现在我要展示一个无序列表的示例，确保它也看起来不错：</p>
<ul>
  <li>所以这是该列表中的第一个项目。</li>
  <li>在这个示例中，我们保持项目简短。</li>
  <li>稍后我们会使用更长、更复杂的列表项目。</li>
</ul>
<p>本节的结尾就到这里。</p>
<h2>如果我们堆叠标题会怎样？</h2>
<h3>我们应该确保它看起来也不错。</h3>
<p>
  有时你会在标题下面直接放置另一个标题。在这种情况下，通常需要取消第二个标题的上边距，因为通常两个标题比段落后跟一个标题放在一起更接近看起来更好。
</p>
<h3>当段落后面跟着标题时……</h3>
<p>
  当段落后面跟着标题时，我们需要稍微多留一点空间，就像我之前提到的那样。现在让我们看看一个更复杂的列表会是什么样子。
</p>
<ul>
  <li>
    <p><strong>我经常做这样的事情，即列表项目有标题。</strong></p>
    <p>
      某种原因，我觉得这看起来很酷，这很不幸，因为要让样式看起来合适相当麻烦。
    </p>
    <p>
      我经常在这些列表项目中有两到三段文本，所以难点在于调整段落、列表项标题和单个列表项之间的间距。说实话，这很难，你可以强烈主张不要这样写。
    </p>
  </li>
  <li>
    <p><strong>由于这是一个列表，我至少需要两个项目。</strong></p>
    <p>
      我已经在前一个列表项目中解释了我在做什么，但如果只有一个项目就不算是列表，而我们真的希望这看起来真实。这就是我添加这个第二个列表项目的原因，这样当我在写样式时，至少有东西可以看。
    </p>
  </li>
  <li>
    <p><strong>添加第三个项目也是个不错的主意。</strong></p>
    <p>
      我觉得只用两个项目也没什么问题，但三个肯定不会更糟，而且我似乎不难编造出随意的文字来打字，所以不妨把它包括在内。
    </p>
  </li>
</ul>
<p>
  在这种列表之后，我通常会有一个结束语或段落，因为直接跳到一个标题有点奇怪。
</p>
<h2>代码默认看起来应该不错。</h2>
<p>
  我想大多数人都会使用 <a href="https://highlightjs.org/">highlight.js</a> 或
  <a href="https://prismjs.com/">Prism</a>
  或类似工具来设置代码块的样式，但即使没有语法高亮，也应该让它们看起来<em>还不错</em>。
</p>
<p>下面是撰写本文时默认的 <code>tailwind.config.js</code> 文件：</p>
<pre><code class="language-js">module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
</code></pre>
<p>希望这对你来说看起来足够好了。</p>
<h3>嵌套列表怎么办？</h3>
<p>
  嵌套列表基本上总是看起来很糟糕，这就是为什么像 Medium
  这样的编辑器甚至不让你这么做的原因，但既然你们这些人还是会做，我们必须承担至少让它们看起来可以工作的负担。
</p>
<ol>
  <li>
    <strong>嵌套列表很少是个好主意。</strong>
    <ul>
      <li>
        你可能觉得这样会让你看起来非常“有条理”，但实际上你只是在屏幕上创建了一个难以阅读的糟糕形状。
      </li>
      <li>UI 中的嵌套导航也是个坏主意，尽量保持扁平化。</li>
      <li>在源代码中嵌套很多文件夹也没有帮助。</li>
    </ul>
  </li>
  <li>
    <strong>既然我们需要更多的项目，这里再来一个。</strong>
    <ul>
      <li>我不确定我们是否会为超过两层的嵌套样式操心。</li>
      <li>两层已经太多了，三层保证是个坏主意。</li>
      <li>如果你嵌套四层，你应该被关进监狱。</li>
    </ul>
  </li>
  <li>
    <strong>两项内容不算真正的列表，三项才算不错。</strong>
    <ul>
      <li>再次强调，如果你想让别人真正阅读你的内容，请不要嵌套列表。</li>
      <li>没人愿意看这些内容。</li>
      <li>我们甚至需要为此去设置样式，真让人烦恼。</li>
    </ul>
  </li>
</ol>
<p>
  Markdown 中最烦人的一点是，<code>&lt;li&gt;</code>
  元素只有在列表项中包含多个段落时才会自动生成子
  <code>&lt;p&gt;</code> 标签。这意味着我还要为这种烦人的情况设置样式。
</p>
<ul>
  <li>
    <p><strong>例如，这里是另一个嵌套列表。</strong></p>
    <p>不过这次有了第二段。</p>
    <ul>
      <li>这些列表项没有 <code>&lt;p&gt;</code> 标签</li>
      <li>因为它们只有一行</li>
    </ul>
  </li>
  <li>
    <p><strong>但是在这个第二个顶级列表项中，它们会有。</strong></p>
    <p>这尤其令人烦恼，因为这段的间距。</p>
    <ul>
      <li>
        <p>
          如你所见，因为我添加了第二行，这个列表项现在有了
          <code>&lt;p&gt;</code> 标签。
        </p>
        <p>顺便说一下，这就是我所指的第二行。</p>
      </li>
      <li><p>最后再来一个列表项，使它更像一个列表。</p></li>
    </ul>
  </li>
  <li><p>一个结束的列表项，没有嵌套列表，为什么不呢？</p></li>
</ul>
<p>最后一行句子，结束本节。</p>
<h2>我们还需要给其他元素设置样式</h2>
<p>
  我差点忘了提到链接，比如<a href="https://tailwindcss.com"
    >这个指向 Tailwind CSS 网站的链接</a
  >。我们差点把它们做成蓝色，但那太过时了，所以我们选择了深灰色，感觉更有边缘感。
</p>
<p>我们甚至还包含了表格样式，看看：</p>
<table>
  <thead>
    <tr>
      <th>摔跤手</th>
      <th>籍贯</th>
      <th>必杀技</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>布雷特 "神枪手" 哈特</td>
      <td>加拿大卡尔加里</td>
      <td>致命射手</td>
    </tr>
    <tr>
      <td>石冷史蒂夫·奥斯汀</td>
      <td>美国德克萨斯州奥斯汀</td>
      <td>石冷震撼</td>
    </tr>
    <tr>
      <td>兰迪·萨维奇</td>
      <td>美国佛罗里达州萨拉索塔</td>
      <td>肘击</td>
    </tr>
    <tr>
      <td>维德</td>
      <td>美国科罗拉多州博尔德</td>
      <td>维德炸弹</td>
    </tr>
    <tr>
      <td>剃刀雷蒙</td>
      <td>美国佛罗里达州丘洛塔</td>
      <td>剃刀边缘</td>
    </tr>
  </tbody>
</table>
<p>
  我们还需要确保内联代码看起来不错，比如我想提到
  <code>&lt;span&gt;</code> 元素或告诉你
  <code>@tailwindcss/typography</code> 的好消息。
</p>
<h3>有时候我甚至在标题中使用 <code>code</code></h3>
<p>
  尽管这可能是个坏主意，而且我一直很难让它看起来好看。但这个<em>“用反引号包住代码块”</em>的小技巧确实效果不错。
</p>
<p>
  我过去还做过另一件事，就是把
  <code>code</code> 标签放在链接里面，比如我想告诉你关于<a
    href="https://github.com/tailwindcss/docs"
    ><code>tailwindcss/docs</code></a
  >仓库。我不喜欢下划线出现在反引号下方，但为了避免这种情况所需的疯狂操作绝对不值得。
</p>
<h4>我们还没有使用 <code>h4</code></h4>
<p>
  不过现在我们用了。请不要在你的内容中使用 <code>h5</code> 或
  <code>h6</code>，Medium
  只支持两级标题是有原因的，你们这些野蛮人。我甚至考虑过用
  <code>before</code> 伪元素在你使用 <code>h5</code> 或
  <code>h6</code> 时对你大喊大叫。
</p>
<p>
  我们根本没有为它们预设样式，因为
  <code>h4</code> 元素已经太小，与正文的大小差不多了。我们该如何处理
  <code>h5</code>，让它比正文还小吗？不，谢谢。
</p>
<h3>我们仍然需要考虑堆叠的标题。</h3>
<h4>让我们确保在 <code>h4</code> 元素上也不搞砸。</h4>
<p>哇，幸运的话，我们已经为这些文本上方的标题设置了样式，看起来还不错。</p>
<p>
  让我们在这里添加一个结束段落，这样最后能有一个大小合适的文本块。我无法解释为什么我希望这样结束，但我猜是因为我觉得如果标题离文档的结尾太近，整体看起来会奇怪或不平衡。
</p>
<p>我觉得写到这里应该够长了，不过再加上这句最后的话也无妨。</p>
`;
