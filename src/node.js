import { expand } from "./shared.js"
export let mfers = expand(b64 => Uint8Array.from(Buffer.from(b64,"base64")))
export { MFERS_CONTRACT, traits, colors, describe_traits } from './shared.js'