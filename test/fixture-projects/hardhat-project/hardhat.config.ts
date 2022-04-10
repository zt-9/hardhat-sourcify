// We load the plugin here.
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  defaultNetwork: "hardhat",
  paths: {
    newPath: "asd",
  },
};

export default config;
