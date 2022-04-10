import { extendConfig, extendEnvironment, task } from "hardhat/config";
import * as types from "hardhat/internal/core/params/argumentTypes";
import { lazyObject } from "hardhat/plugins";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import path from "path";

import { ExampleHardhatRuntimeEnvironmentField } from "./ExampleHardhatRuntimeEnvironmentField";
import { submitSourcesToSourcify } from "./sourcify";
// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";
// extendConfig(
//   (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
//     // We apply our default config here. Any other kind of config resolution
//     // or normalization should be placed here.
//     //
//     // `config` is the resolved config, which will be used during runtime and
//     // you should modify.
//     // `userConfig` is the config as provided by the user. You should not modify
//     // it.
//     //
//     // If you extended the `HardhatConfig` type, you need to make sure that
//     // executing this function ensures that the `config` object is in a valid
//     // state for its type, including its extensions. For example, you may
//     // need to apply a default value, like in this example.
//     const userPath = userConfig.paths?.newPath;

//     let newPath: string;
//     if (userPath === undefined) {
//       newPath = path.join(config.paths.root, "newPath");
//     } else {
//       if (path.isAbsolute(userPath)) {
//         newPath = userPath;
//       } else {
//         // We resolve relative paths starting from the project's root.
//         // Please keep this convention to avoid confusion.
//         newPath = path.normalize(path.join(config.paths.root, userPath));
//       }
//     }

//     config.paths.newPath = newPath;
//   }
// );

// extendEnvironment((hre) => {
//   // We add a field to the Hardhat Runtime Environment here.
//   // We use lazyObject to avoid initializing things until they are actually
//   // needed.
//   hre.example = lazyObject(() => new ExampleHardhatRuntimeEnvironmentField());
// });

task("sourcify", "verify contract using sourcify")
  .addOptionalParam(
    "endpoint",
    "endpoint url for sourcify",
    undefined,
    types.string
  )
  .addParam("sourceName", "e.g contract/Greeter.sol", undefined, types.string)
  .addParam(
    "contractName",
    "Name of the contract you want to verify",
    undefined,
    types.string
  )
  .addParam("address", "address of the contract", undefined, types.string)
  .addParam(
    "chainId",
    "the chainId of the network that your contract deployed on",
    undefined,
    types.string
  )
  .setAction(async (args, hre) => {
    // compile contract first
    const { endpoint, sourceName, contractName, address, chainId } = args;
    await hre.run("compile");
    await submitSourcesToSourcify(hre, {
      endpoint,
      sourceName,
      contractName,
      address,
      chainId,
    }).catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
  });
