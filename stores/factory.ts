import create from 'zustand'
import produce, { Draft } from 'immer'
// import pipe from 'ramda/es/pipe'
import { State, StateCreator } from 'zustand'
import { pipe } from 'ramda'
// import { devtools } from 'zustand/middleware'

// const log: typeof devtools = (config) => (set, get, api) =>
//   config(
//     (args) => {
//       console.log('  applying', args)
//       set(args)
//       console.log('  new state', get())
//     },
//     get,
//     api,
//   )

const immer =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const nextState =
          typeof partial === 'function'
            ? produce(partial as (state: Draft<T>) => T)
            : (partial as T)
        return set(nextState, replace)
      },
      get,
      api,
    )

const isDevelopment: boolean = process.env.NODE_ENV === 'development'
const createStore = isDevelopment ? pipe(immer, create) : pipe(immer, create)

export { createStore }
