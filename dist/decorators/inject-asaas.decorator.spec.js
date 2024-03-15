"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const asaas_service_1 = require("../asaas.service");
const asaas_module_1 = require("../asaas.module");
const inject_asaas_decorator_1 = require("../decorators/inject-asaas.decorator");
const Customers_1 = require("asaas/dist/client/Customers");
const Subscriptions_1 = require("asaas/dist/client/Subscriptions");
const Payments_1 = require("asaas/dist/client/Payments");
const Installments_1 = require("asaas/dist/client/Installments");
describe('InjectAsaas', () => {
    const apiKey = '123';
    const sandbox = true;
    let module;
    let TestService = class TestService {
        constructor(asaas) {
            this.asaas = asaas;
        }
    };
    TestService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, inject_asaas_decorator_1.InjectAsaas)()),
        __metadata("design:paramtypes", [asaas_service_1.AsaasService])
    ], TestService);
    beforeEach(async () => {
        module = await testing_1.Test.createTestingModule({
            imports: [asaas_module_1.AsaasModule.forRoot({ apiKey, sandbox })],
            providers: [TestService],
        }).compile();
    });
    describe('when decorating a class constructor parameter', () => {
        it('should inject the asaas client', () => {
            const testService = module.get(TestService);
            expect(testService.asaas).toBeInstanceOf(asaas_service_1.AsaasService);
            expect(testService.asaas).toHaveProperty('customers');
            expect(testService.asaas).toHaveProperty('subscriptions');
            expect(testService.asaas).toHaveProperty('payments');
            expect(testService.asaas).toHaveProperty('installments');
            expect(testService.asaas.customers).toBeInstanceOf(Customers_1.CustomersAPI);
            expect(testService.asaas.subscriptions).toBeInstanceOf(Subscriptions_1.SubscriptionsAPI);
            expect(testService.asaas.payments).toBeInstanceOf(Payments_1.PaymentsAPI);
            expect(testService.asaas.installments).toBeInstanceOf(Installments_1.InstallmentsAPI);
        });
    });
});
