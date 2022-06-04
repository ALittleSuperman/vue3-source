// 设置枚举，给代理对象增加标识
export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}

export const mutableHandlers = {
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
}