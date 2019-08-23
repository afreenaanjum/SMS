const initialState = {
    url: null,
    playing: true,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0
}

const videoPlayerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "URL":
            return { ...state, ...{ url: action.payload } }
        case "PLAYING":
            return { ...state, playing: action.payload }
        case "PLAYED":
            return { ...state, played: action.payload }
        case "LOADED":
            return { ...state, loaded: action.payload }
        case "DURATION":
            return { ...state, duration: action.payload }
        case "PLAYBACKARATE":
            return { ...state, playBackRate: action.payload }
        case "SEEKING":
            return { ...state, seeking: action.payload }
        case "ONPROGRESS":
            return { ...state, ...action.payload }
        case "HOST":
            return { ...state, isHost: action.payload }
        default:
            return state

    }
}

export default videoPlayerReducer