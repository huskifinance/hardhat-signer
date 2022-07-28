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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const errors_1 = require("hardhat/internal/core/errors");
const backwards_compatibility_1 = require("hardhat/internal/core/providers/backwards-compatibility");
const gas_providers_1 = require("hardhat/internal/core/providers/gas-providers");
const http_1 = require("hardhat/internal/core/providers/http");
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const wizard_1 = require("./wizard");
const provider_1 = require("./provider");
require("./type-extensions");
config_1.extendConfig((config, userConfig) => {
    const userNetworks = userConfig.networks;
    if (userNetworks === undefined) {
        return;
    }
    for (const networkName in userNetworks) {
        if (networkName === "hardhat") {
            continue;
        }
        const network = userNetworks[networkName];
        if (network.hdSigner) {
            config.networks[networkName].hdSigner = network.hdSigner;
            config.networks[networkName].address = network.address;
        }
    }
});
config_1.extendEnvironment((hre) => {
    if (hre.network.config.hdSigner) {
        const httpNetConfig = hre.network.config;
        const eip1193Provider = new http_1.HttpProvider(httpNetConfig.url, hre.network.name, httpNetConfig.httpHeaders, httpNetConfig.timeout);
        let wrappedProvider;
        wrappedProvider = new provider_1.HdSigner(eip1193Provider, hre.network.config.hdSigner, hre.network.config.address);
        wrappedProvider = new gas_providers_1.AutomaticGasProvider(wrappedProvider, hre.network.config.gasMultiplier);
        wrappedProvider = new gas_providers_1.AutomaticGasPriceProvider(wrappedProvider);
        hre.network.provider = new backwards_compatibility_1.BackwardsCompatibilityProviderAdapter(wrappedProvider);
    }
});
const generate = async ({ generateopts, }) => {
    const generateoptsModulePath = path_1.default.resolve(process.cwd(), generateopts);
    try {
        const generateOpts = (await Promise.resolve().then(() => __importStar(require(generateoptsModulePath))))
            .default;
        if (!Array.isArray(generateOpts)) {
            throw new errors_1.NomicLabsHardhatPluginError(constants_1.pluginName, `The module ${generateoptsModulePath} doesn't export a list. The module should look like this:
        module.exports = [ arg1, arg2, ... ];`);
        }
        generateOpts.forEach(function (item) {
            wizard_1.wizardGenerate(item.type, item.opts);
        });
    }
    catch (error) {
        throw new errors_1.NomicLabsHardhatPluginError(constants_1.pluginName, `Importing the module for the constructor arguments list failed.
      Reason: ${error.message}`, error);
    }
};
config_1.task(constants_1.TASK_CODEGEN, "Generate erc20 erc721 erc1155 and governor contract")
    .addOptionalParam("generateopts", "File path to a javascript module that exports the list of arguments.", undefined, config_1.types.inputFile)
    .setAction(generate);
//# sourceMappingURL=index.js.map