import * as wasm from "./pi_wasm_bg.wasm";
import { __wbg_set_wasm } from "./pi_wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./pi_wasm_bg.js";
