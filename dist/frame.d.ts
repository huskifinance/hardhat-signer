/// <reference types="node" />
export declare type CreateSignatureParams = {
    message: Buffer;
    address: string;
    eip1559: boolean;
};
export declare const recoverPubKeyFromSig: (msg: Buffer, r: Buffer, s: Buffer, v: number, chainId?: number | undefined) => string;
export declare const createFrameSignature: (signParams: CreateSignatureParams) => Promise<{
    r: Buffer;
    s: Buffer;
    v: number;
}>;
export declare const getEthAddressFromFrame: () => Promise<any>;
export declare const getEthChainIdFromFrame: () => Promise<number>;
//# sourceMappingURL=frame.d.ts.map