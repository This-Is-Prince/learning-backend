// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

import sayHi from "./5-utils";
import { john, peter } from "./4-names";
import { items, person } from "./6-alternative-flavor";
require("./7-mind-grenade");

console.log(items, person);

sayHi("susan");
sayHi(john);
sayHi(peter);
