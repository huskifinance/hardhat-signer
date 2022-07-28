import { ProviderWrapperWithChainId } from "hardhat/internal/core/providers/chainId";
import { EIP1193Provider, RequestArguments } from "hardhat/types";
export declare class HdSigner extends ProviderWrapperWithChainId {
    hdSigner: string;
    userAddress: string | undefined;
    ethAddress?: string;
    constructor(provider: EIP1193Provider, hdSigner: string, address: string | undefined);
    request(args: RequestArguments): Promise<unknown>;
    private _getSender;
    private _getNonce;
    private _sendTransaction;
}
//# sourceMappingURL=provider.d.ts.map