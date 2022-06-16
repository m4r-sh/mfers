import { expand } from "./shared"
export { MFERS_CONTRACT, traits } from './shared'
export let mfers = expand(b64 => window.atob(b64), (v) => v.charCodeAt(0))
