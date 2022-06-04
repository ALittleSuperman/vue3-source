import { isObject } from "@vue/shared";


// 设置缓存，防止重复设置同一份数据
const reactiveMap = new WeakMap()

// 设置枚举，给代理对象增加标识
const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}

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
    const proxy = new Proxy(target, {
        get(target, key, receiver) {
            // TODO: 用户取值

            // 拦截取值，如果取值是 ReactiveFlags.IS_REACTIVE 那么是相应式对象
            if(key === ReactiveFlags.IS_REACTIVE) return true
            /**
             * 改变返回值类型，返回响应式数据
             */
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            //TODO: 用户设置值
            /**
             * 改变返回值类型，设置响应式数据
             */
            return Reflect.set(target, key, value, receiver)
        }
    })

    // 设置代理缓存
    reactiveMap.set(target, proxy)
    return proxy
}