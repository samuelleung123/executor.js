
function async_timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


export {
    async_timeout
}