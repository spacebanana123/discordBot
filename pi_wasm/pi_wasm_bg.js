let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}

/**
* @param {bigint} n
* @returns {number}
*/
export function pi_calc(n) {
    const ret = wasm.pi_calc(n);
    return ret;
}

