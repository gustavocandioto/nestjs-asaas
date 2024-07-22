"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asaas_module_1 = require("./asaas.module");
const asaas_service_1 = require("./asaas.service");
const testing_1 = require("@nestjs/testing");
const asaas_constants_1 = require("./asaas.constants");
class MockAsaasConfigOptionsFactory {
    async createAsaasOptions() {
        return {
            apiKey: 'mock-api-key',
            sandbox: true,
        };
    }
}
describe('AsaasModule', () => {
    let module;
    let config = {
        apiKey: '123',
        sandbox: true
    };
    afterEach(async () => {
        await module.close();
    });
    describe('forRoot', () => {
        it('should return a module', async () => {
            module = await testing_1.Test.createTestingModule({
                imports: [
                    asaas_module_1.AsaasModule.forRoot(config)
                ]
            }).compile();
            const asaasService = module.get(asaas_constants_1.ASAAS_TOKEN);
            expect(asaasService).toBeDefined();
            expect(asaasService).toBeInstanceOf(asaas_service_1.AsaasService);
            expect(asaasService.customers).toBeDefined();
            expect(asaasService.subscriptions).toBeDefined();
            expect(asaasService.payments).toBeDefined();
            expect(asaasService.installments).toBeDefined();
        });
    });
    describe('forRootAsync', () => {
        it('should provide AsaasService with useFactory', async () => {
            module = await testing_1.Test.createTestingModule({
                imports: [
                    asaas_module_1.AsaasModule.forRootAsync({
                        useFactory: () => (config),
                    })
                ],
            }).compile();
            const asaasService = module.get(asaas_constants_1.ASAAS_TOKEN);
            expect(asaasService).toBeDefined();
            expect(asaasService).toBeInstanceOf(asaas_service_1.AsaasService);
            expect(asaasService.customers).toBeDefined();
            expect(asaasService.subscriptions).toBeDefined();
            expect(asaasService.payments).toBeDefined();
            expect(asaasService.installments).toBeDefined();
        });
        it('should provide AsaasService with useClass', async () => {
            const asyncOptions = {
                useClass: MockAsaasConfigOptionsFactory,
            };
            module = await testing_1.Test.createTestingModule({
                imports: [asaas_module_1.AsaasModule.forRootAsync(asyncOptions)],
            }).compile();
            const asaasService = module.get(asaas_constants_1.ASAAS_TOKEN);
            expect(asaasService).toBeDefined();
            expect(asaasService).toBeInstanceOf(asaas_service_1.AsaasService);
        });
    });
});
