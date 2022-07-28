/// <reference types="node" />
import Common from "@ethereumjs/common";
import { KMS } from "aws-sdk";
import * as EthUtil from "ethereumjs-util";
export declare const kms: KMS;
export interface SignParams {
    keyId: KMS.SignRequest["KeyId"];
    message: Buffer;
}
export declare type CreateSignatureParams = SignParams & {
    address: string;
    eip1559: boolean;
    txOpts?: Common;
};
export declare const recoverPubKeyFromSig: (msg: Buffer, r: EthUtil.BN, s: EthUtil.BN, v: number, chainId?: number | undefined) => string;
export declare const getEthAddressFromPublicKey: (publicKey: KMS.PublicKeyType) => string;
export declare const getPublicKey: (kms: KMS, KeyId: KMS.GetPublicKeyRequest["KeyId"]) => Promise<import("aws-sdk/lib/request").PromiseResult<KMS.GetPublicKeyResponse, import("aws-sdk").AWSError>>;
export declare const getEthAddressFromKMS: (kms: KMS, keyId: KMS.GetPublicKeyRequest["KeyId"]) => Promise<string>;
export declare const sign: (kms: KMS, signParams: SignParams) => Promise<import("aws-sdk/lib/request").PromiseResult<KMS.SignResponse, import("aws-sdk").AWSError>>;
export declare const createKmsSignature: (kms: KMS, sigParams: CreateSignatureParams) => Promise<{
    r: Buffer;
    s: Buffer;
    v: EthUtil.BN;
}>;
//# sourceMappingURL=kms.d.ts.map