"use strict";
// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _5_utils_1 = __importDefault(require("./5-utils"));
const _4_names_1 = require("./4-names");
const _6_alternative_flavor_1 = require("./6-alternative-flavor");
require("./7-mind-grenade");
console.log(_6_alternative_flavor_1.items, _6_alternative_flavor_1.person);
(0, _5_utils_1.default)("susan");
(0, _5_utils_1.default)(_4_names_1.john);
(0, _5_utils_1.default)(_4_names_1.peter);
