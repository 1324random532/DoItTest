import { DependencyList, useEffect } from 'react'

const emptyDeps: DependencyList = []

export interface DidMountState {
    cleanupFunction: boolean
}

export default function useComponent(config: { didMount?: (state: DidMountState) => any, didUnmount?: () => any }) {
    useEffect(() => {
        const state = { cleanupFunction: false }

        if (config.didMount) config.didMount(state)

        return () => {
            state.cleanupFunction = true

            if (config.didUnmount)
                config.didUnmount()
        }

    }, emptyDeps)
}
