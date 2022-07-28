"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdSigner = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const base_types_1 = require("hardhat/internal/core/jsonrpc/types/base-types");
const errors_1 = require("hardhat/internal/core/errors");
const errors_list_1 = require("hardhat/internal/core/errors-list");
const chainId_1 = require("hardhat/internal/core/providers/chainId");
const frame_1 = require("./frame");
class HdSigner extends chainId_1.ProviderWrapperWithChainId {
    constructor(provider, hdSigner, address) {
        super(provider);
        this.hdSigner = hdSigner;
        this.userAddress = address;
    }
    async request(args) {
        const method = args.method;
        const params = this._getParams(args);
        if (method === "eth_sendTransaction") {
            return await this._sendTransaction(params);
        }
        else if (args.method === "eth_accounts" ||
            args.method === "eth_requestAccounts") {
            return await this._getSender();
        }
        return this._wrappedProvider.request(args);
    }
    async _getSender() {
        if (!this.ethAddress) {
            this.ethAddress = await frame_1.getEthAddressFromFrame();
        }
        return this.ethAddress;
    }
    async _getNonce(address) {
        const response = (await this._wrappedProvider.request({
            method: "eth_getTransactionCount",
            params: [ethereumjs_util_1.bufferToHex(address), "pending"],
        }));
        return base_types_1.rpcQuantityToBN(response);
    }
    async _sendTransaction(params) {
        var _a, _b;
        const tx = params[0];
        const ethProvider = require('eth-provider');
        const frame = ethProvider('frame'); // Connect to Frame
        const configChainId = await this._getChainId();
        const connectionChainId = await frame_1.getEthChainIdFromFrame();
        if (configChainId !== connectionChainId) {
            throw new errors_1.HardhatError(errors_list_1.ERRORS.NETWORK.INVALID_GLOBAL_CHAIN_ID, {
                configChainId: configChainId,
                connectionChainId: connectionChainId,
            });
        }
        if (((_a = tx.from) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== ((_b = this.userAddress) === null || _b === void 0 ? void 0 : _b.toLowerCase())) {
            throw new errors_1.HardhatError(errors_list_1.ERRORS.NETWORK.MISSING_TX_PARAM_TO_SIGN_LOCALLY, { param: "from" });
        }
        return frame.request({ method: 'eth_sendTransaction', params: [tx] });
    }
}
exports.HdSigner = HdSigner;
//# sourceMappingURL=provider.js.map