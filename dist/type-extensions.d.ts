import "hardhat/types/config";
declare module "hardhat/types/config" {
    interface HttpNetworkUserConfig {
        hdSigner?: string;
        address?: string;
    }
    interface HardhatNetworkUserConfig {
        hdSigner?: string;
        address?: string;
    }
    interface HttpNetworkConfig {
        hdSigner?: string;
        address?: string;
    }
    interface HardhatNetworkConfig {
        hdSigner?: string;
        address?: string;
    }
}
//# sourceMappingURL=type-extensions.d.ts.map