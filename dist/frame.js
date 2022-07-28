"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEthChainIdFromFrame = exports.getEthAddressFromFrame = exports.createFrameSignature = exports.recoverPubKeyFromSig = void 0;
const EthUtil = __importStar(require("ethereumjs-util"));
const base_types_1 = require("hardhat/internal/core/jsonrpc/types/base-types");
const ethProvider = require('eth-provider');
const frame = ethProvider('frame'); // Connect to Frame
exports.recoverPubKeyFromSig = (msg, r, s, v, chainId) => {
    // const rBuffer = r.toBuffer();
    // const sBuffer = s.toBuffer();
    const pubKey = EthUtil.ecrecover(msg, v, r, s, chainId);
    const addrBuf = EthUtil.pubToAddress(pubKey);
    const RecoveredEthAddr = EthUtil.bufferToHex(addrBuf);
    return RecoveredEthAddr;
};
exports.createFrameSignature = async (signParams) => {
    const signed = await frame.request({
        method: 'eth_sign',
        params: [signParams.address, EthUtil.bufferToHex(signParams.message)]
    });
    await frame.request({
        method: 'personal_ecRecover',
        params: [EthUtil.bufferToHex(signParams.message), signed]
    }).then((result) => {
        console.log("ecRecover: ", result);
    });
    const signature = Buffer.from(signed.replace('0x', ''), 'hex');
    if (signature.length !== 65)
        throw new Error('Frame verifySignature: Signature has incorrect length');
    let v = signature[64];
    v = v === 0 || v === 1 ? v + 27 : v;
    const r = signature.slice(0, 32);
    const s = signature.slice(32, 64);
    return {
        r,
        s,
        v,
    };
    // return EthUtil.fromRpcSig(signed);
};
exports.getEthAddressFromFrame = async () => {
    return (await frame.request({ method: 'eth_requestAccounts' }));
    ;
};
exports.getEthChainIdFromFrame = async () => {
    const id = (await frame.request({ method: 'eth_chainId' }));
    return base_types_1.rpcQuantityToNumber(id);
};
//# sourceMappingURL=frame.js.map