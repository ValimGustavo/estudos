"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    qty: {
        type: Number,
        required: true
    }
});
//# sourceMappingURL=item.schema.js.map