import { customAlphabet } from "nanoid";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const genId = customAlphabet(alphabet, 8);
export function newRequestId() {
    return `REQ-${genId()}`;
}
//# sourceMappingURL=requestId.js.map