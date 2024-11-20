"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = randomNumber;
function randomNumber(min = 1000, max = 9999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
