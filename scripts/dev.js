const args = require('minimist')(process.argv.slice(2)) // node scripts/dev.js reactivity -f global
const { build } = require('esbuild')
const { resolve } = require('path')

// minist 解析命令行参数
const target = args._[0] || 'reactivity' // 打包模块
const format = args.f || 'global' // 打包格式

/**
 * 开发环境打包单个模块
 */
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))

/**
 * 打包格式
 * iife立即执行函数
 * cjs node模块
 * esm 浏览器esModule模块
 */
const outputFormat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'

/**
 * 打包输出目录
 */
const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)

/**
 * esbuild打包 📦
 */
build({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile,
    bundle: true, // 把所有的包全部打包到一起
    sourcemap: true,
    format: outputFormat, // 输出的格式
    globalName: pkg.buildOptions?.name, // 打包的全局名字
    platform: format === 'cjs' ? 'node' : 'browser', // 平台
    watch: { // 监听文件变化
        onRebuild(error) {
            if(!error) console.log('重新打包完成✅~~~')
        }
    }
}).then(() => {
    console.log('监听变化中🀄️~~~')
})