export const addUrl = (url) => {
    return {
        type: "URL",
        payload: url
    }
}
export const playing = (playState) => {
    return {
        type: "PLAYING",
        payload: playState
    }
}
export const played = (played) => {
    return {
        type: "PLAYED",
        payload: played
    }
}
export const loaded = (loaded) => {
    return {
        type: "LOADED",
        payload: loaded
    }
}
export const duration = (duration) => {
    return {
        type: "DURATION",
        payload: duration
    }
}
export const playBackRate = (playBackRate) => {
    return {
        type: "PLAYBACKRATE",
        payload: playBackRate
    }
}

export const seeking = (seeking) => {
    return {
        type: "SEEKING",
        payload: seeking
    }
}

export const onprogress = (state) => {
    return {
        type: 'ONPROGRESS',
        payload: state
    }
}

export const host = (isHost) => {
    return {
        type: 'HOST',
        payload: isHost
    }
}


