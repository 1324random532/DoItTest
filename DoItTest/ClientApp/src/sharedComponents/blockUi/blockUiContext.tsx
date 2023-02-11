
import { createContext, FC, PropsWithChildren, useContext, useReducer } from 'react'
import { Action } from 'sharedComponents/notification/store/notificationStore'

//#region Actions

const SET_BLOCK = 'SET_BLOCK'
const REMOVE_BLOCK = 'REMOVE_BLOCK'

interface SetBlock extends Action<typeof SET_BLOCK, null> { }
interface RemoveBlock extends Action<typeof REMOVE_BLOCK, null> { }
type BlockUiAction = SetBlock | RemoveBlock

//#endregion

//#region ActionCreators

export const setBlockUi = (): SetBlock =>
    ({ type: SET_BLOCK, payload: null })

export const removeBlockUi = (): RemoveBlock =>
    ({ type: REMOVE_BLOCK, payload: null })


//#endregion

//#region Store

type State = {
    blockCount: number
}

type Dispatch = (action: BlockUiAction) => void

function reducer(state: State, action: BlockUiAction): State {

    switch (action.type) {
        case SET_BLOCK: return { ...state, blockCount: state.blockCount + 1 }
        case REMOVE_BLOCK: return { ...state, blockCount: state.blockCount - 1 }
        default: throw new Error(`Unhandled action type`)
    }
}

const defaultState: State = {
    blockCount: 0
}

////#endregion

//#region Context

const BlockUiStateContext = createContext<State>(defaultState)
const BlockUiDispatchContext = createContext<Dispatch | null>(null)

const BlockUiProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, defaultState)

    return (
        <BlockUiStateContext.Provider value={state}>
            <BlockUiDispatchContext.Provider value={dispatch}>
                {children}
            </BlockUiDispatchContext.Provider>
        </BlockUiStateContext.Provider>
    )
}


const useBlockUiState = () => {
    return useContext(BlockUiStateContext)
}

const useBlockUiDispatch = () => {

    const context = useContext(BlockUiDispatchContext)

    if (context === null)
        throw new Error('useAppDispatch must be used within a AppProvider')

    return context
}

const useBlockUi = () => {
    const dispatch = useBlockUiDispatch()

    return async (action: () => Promise<void> | void) => {
        dispatch(setBlockUi())

        try {
            await action()
        } finally {
            dispatch(removeBlockUi())
        }
    }
}


//#endregion

export { BlockUiProvider, useBlockUiState, useBlockUi }
