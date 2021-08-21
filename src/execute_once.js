import {async_timeout} from "./utils.js";

const executor_map = new Map();
const executor_result_map = new Map();
const executor_counter = new Map();


const execute_once = async function (key, cb) {
    increase(key);
    if (!executor_map.has(key)) {
        executor_result_map.delete(key);
        executor_map.set(key, cb);
        await async_timeout();
        let result = await cb();
        executor_result_map.set(key, result);
    }

    while (true) {
        if (executor_result_map.has(key)) {
            let result = executor_result_map.get(key);
            decrease(key);
            return result;
        }
        await async_timeout();
    }
}

const increase = function (key) {
    let counter = executor_counter.get(key) || 0;
    counter++;
    executor_counter.set(key, Math.max(0, counter));
}
const decrease = function (key) {
    let counter = executor_counter.get(key) || 0;
    counter--;
    executor_counter.set(key, Math.max(0, counter));
    if (counter === 0) {
        executor_result_map.delete(key);
        executor_map.delete(key)
    }
}

export {
    execute_once,
}