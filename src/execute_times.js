import {async_timeout} from "./utils.js";

const execute_times = async function (times, cb, async = true) {
    let result = [];
    for (let i = 0; i < times; i++) {
        result.push(await cb(i));
        if (async) {
            await async_timeout();
        }
    }

    return result;
}

export {
    execute_times,
}