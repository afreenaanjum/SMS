const generateMessage = (text,socketId) => {
    let date = new Date(Date.now())
    return {
        socketId,
        text,
        createdAt: `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
    }
}

module.exports = {
    generateMessage
}