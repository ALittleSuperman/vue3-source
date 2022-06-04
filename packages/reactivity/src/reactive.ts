import { isObject } from "@vue/shared";
import { ReactiveFlags, mutableHandlers } from './baseHandlers'

// 设置缓存，防止重复设置同一份数据
const reactiveMap = new WeakMap()

/**
 * 响应式函数
 * @param {Object} target
 * @returns { Proxy } object
 * 将数据转换成相应式数据
 */
export function reactive(target) {
    if (!isObject(target)){
        console.warn('函数接收Object类型参数')
        return
    }

    // 取值 ReactiveFlags.IS_REACTIVE 如果存在那么是一个代理对象
    if(target[ReactiveFlags.IS_REACTIVE]) return target

    // 如果对象已经被代理过，那么直接返回代理缓存
    const existingProxy = reactiveMap.get(target)
    if(existingProxy) return existingProxy
    
    // 监听set和get事件
    const proxy = new Proxy(target, mutableHandlers)

    // 设置代理缓存
    reactiveMap.set(target, proxy)
    return proxy
}