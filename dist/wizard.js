"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizardGenerate = void 0;
const wizard_1 = require("@openzeppelin/wizard");
const utils_1 = require("./utils");
async function wizardGenerate(type, opts) {
    var wizard;
    switch (type) {
        case 'erc20':
            wizard = wizard_1.erc20;
            break;
        case 'erc721':
            wizard = wizard_1.erc721;
            break;
        case 'erc1155':
            wizard = wizard_1.erc1155;
            break;
        case 'governor':
            wizard = wizard_1.governor;
            break;
        case 'custom':
        default:
            wizard = wizard_1.custom;
            break;
    }
    const contract = wizard.print(opts);
    utils_1.fileService.write('./contracts/8/', opts.name + '.sol', contract);
}
exports.wizardGenerate = wizardGenerate;
//# sourceMappingURL=wizard.js.map