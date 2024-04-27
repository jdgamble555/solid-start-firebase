import {
    Component,
    JSX,
    createContext,
    useContext,
    type Context
} from "solid-js";

const _Map = <T,>() => new Map<string, T>();
const Context = createContext(_Map());

export const Provider: Component<{ children: JSX.Element }> = ({ children }) =>
    <Context.Provider value={_Map()}>{children}</Context.Provider>;

const useContextProvider = <T,>(key: string) => {
    const context = useContext(Context);
    return {
        set value(v: T) { context.set(key, v); },
        get value() {
            if (!context.has(key)) {
                throw Error(`Context key '${key}' Not Found!`);
            }
            return context.get(key) as T;
        }
    }
};

export const useShared = <T, A>(
    key: string,
    fn: (value?: A) => T,
    initialValue?: A
) => {
    const provider = useContextProvider<Context<T>>(key);
    if (initialValue !== undefined) {
        const state = fn(initialValue);
        const Context = createContext<T>(state);
        provider.value = Context;
    }
    return useContext(provider.value);
};
