const path = require('path');
const markdownRender = require('markdown-it')();

// const resolve = (dir) => {
//     return path.join(__dirname, dir);
// };

module.exports = {
    // 修改 pages 入口
    pages: {
        index: {
            entry: 'examples/main.js', // 入口
            template: 'public/index.html', // 模板
            filename: 'index.html' // 输出文件
        }
    },
    // 扩展 webpack 配置
    chainWebpack: config => {
        // @ 默认指向 src 目录，这里要改成 examples
        // 另外也可以新增一个 ~ 指向 packages
        config.resolve.alias
            .set('@', path.resolve('examples'))
            .set('~', path.resolve('packages'))
            .set('@c', path.resolve('examples/components'));

        // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
        config.module
            .rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true,
                use: [
                    // https://github.com/markdown-it/markdown-it-container
                    [require('markdown-it-container'), 'demo', {
                        validate: function (params) {
                            return params.trim().match(/^demo(.*)$/);
                        },
                        render: function (tokens, idx) {
                            if (tokens[idx].nesting === 1) {
                                // 1.获取第一行的内容使用markdown渲染html作为组件的描述
                                let demoInfo = tokens[idx].info.trim().match(/^demo(.*)$/);
                                let description = demoInfo && demoInfo.length > 1 ? demoInfo[1] : '';
                                let descriptionHTML = description ? markdownRender.render(description) : '';
                                // 2.获取代码块内的html和js代码
                                let content = tokens[idx + 1].content;
                                // 3.使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
                                return `<code-block>
                                        <div class="source" slot="source">${content}</div>
                                        ${descriptionHTML}
                                        <div class="highlight" slot="highlight">`;
                            } else {
                                return '</div></code-block>\n';
                            }
                        }
                    }]
                ]
            });
    }
};