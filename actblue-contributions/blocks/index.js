import { registerBlockType } from "@wordpress/blocks";
import ActblueEmbed from "./actblue-embed";

registerBlockType(ActblueEmbed.name, ActblueEmbed.settings);
