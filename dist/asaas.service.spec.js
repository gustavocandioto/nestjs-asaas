"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const testing_1 = require("@nestjs/testing");
const asaas_service_1 = require("./asaas.service");
const asaas_constants_1 = require("./asaas.constants");
(0, globals_1.describe)('AsaasService', () => {
    let asaasService;
    (0, globals_1.beforeEach)(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            providers: [
                asaas_service_1.AsaasService,
                {
                    provide: asaas_constants_1.ASAAS_MODULE_OPTIONS,
                    useValue: {
                        apiKey: '123',
                        sandbox: true
                    }
                }
            ]
        }).compile();
        asaasService = moduleRef.get(asaas_service_1.AsaasService);
    });
    (0, globals_1.it)('should be defined', () => {
        (0, globals_1.expect)(asaasService).toBeDefined();
    });
    (0, globals_1.it)('should have config defined correctly', () => {
        (0, globals_1.expect)(asaasService.customers).toBeDefined();
        (0, globals_1.expect)(asaasService.subscriptions).toBeDefined();
        (0, globals_1.expect)(asaasService.payments).toBeDefined();
        (0, globals_1.expect)(asaasService.installments).toBeDefined();
    });
    (0, globals_1.it)('should throw error when creating customer', async () => {
        try {
            await asaasService.customers.new({
                name: 'test',
                cpfCnpj: '',
            });
        }
        catch (error) {
            (0, globals_1.expect)(error).toBeDefined();
        }
    });
    (0, globals_1.it)('should throw error when creating subscription', async () => {
        try {
            await asaasService.subscriptions.create({
                customer: '',
                billingType: 'BOLETO',
                value: 0,
                nextDueDate: '',
                cycle: 'WEEKLY'
            });
        }
        catch (error) {
            (0, globals_1.expect)(error).toBeDefined();
        }
    });
    (0, globals_1.it)('should throw error when creating payment', async () => {
        try {
            await asaasService.payments.new({
                customer: '',
                value: 0,
                billingType: '',
                dueDate: new Date(),
            });
        }
        catch (error) {
            (0, globals_1.expect)(error).toBeDefined();
        }
    });
});
