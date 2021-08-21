import {async_timeout} from "./utils.js";

const execute_forever = async function (cb) {
    let will_break = false;
    let breaker = () => {
        will_break = true;
    }

    while (true) {
        let result = await cb(breaker);
        if (result !== undefined) {
            return result;
        }
        if(will_break) {
            break;
        }
        await async_timeout();
    }
}

export {
    execute_forever,
}