"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAsaas = void 0;
const common_1 = require("@nestjs/common");
const asaas_constants_1 = require("../asaas.constants");
const InjectAsaas = () => (0, common_1.Inject)(asaas_constants_1.ASAAS_TOKEN);
exports.InjectAsaas = InjectAsaas;
