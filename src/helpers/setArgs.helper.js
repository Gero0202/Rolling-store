import { Command } from "commander";

const args = new Command()

args.option("--mode <mode>", "mode prod/dev/test", "prod")

args.parse()

export default args.opts()