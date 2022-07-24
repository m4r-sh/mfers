import { expand } from "./shared"
export { MFERS_CONTRACT, traits, colors } from './shared'
export let mfers = expand(b64 => Uint8Array.from(window.atob(b64), (v) => v.charCodeAt(0)))
