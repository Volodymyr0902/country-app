"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFinally = void 0;
const handleFinally = (err, req, res, next) => {
    console.error(err.stack);
    res.status(404).json({ error: "Not found" });
};
exports.handleFinally = handleFinally;
