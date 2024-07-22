import { AsaasModule } from "./asaas.module";
import { AsaasService } from "./asaas.service";
import { Test, TestingModule } from '@nestjs/testing';
import { AsaasConfigOptionsFactory, AsaasModuleAsyncOptions, AsaasModuleOptions } from "./interfaces/asaas-module.interface";
import { ASAAS_TOKEN } from "./asaas.constants";

class MockAsaasConfigOptionsFactory implements AsaasConfigOptionsFactory {
  async createAsaasOptions(): Promise<AsaasModuleOptions> {
    return {
      apiKey: 'mock-api-key',
      sandbox: true,
    };
  }
}

describe('AsaasModule', () => {
  let module: TestingModule;
  let config: AsaasModuleOptions = {
    apiKey: '123',
    sandbox: true
  };

  afterEach(async () => {
    await module.close();
  });

  describe('forRoot', () => {
    it('should return a module', async () => {
      module = await Test.createTestingModule({
        imports: [
          AsaasModule.forRoot(config)
        ]
      }).compile();

      const asaasService = module.get<AsaasService>(ASAAS_TOKEN);
      expect(asaasService).toBeDefined();
      expect(asaasService).toBeInstanceOf(AsaasService);
      
      expect(asaasService.customers).toBeDefined();
      expect(asaasService.subscriptions).toBeDefined();
      expect(asaasService.payments).toBeDefined();
      expect(asaasService.installments).toBeDefined();
    })
  })

  describe('forRootAsync', () => {
    it('should provide AsaasService with useFactory', async () => {
      module = await Test.createTestingModule({
        imports: [
          AsaasModule.forRootAsync({
            useFactory: () => (config),
          })
        ],
      }).compile();

      const asaasService = module.get<AsaasService>(ASAAS_TOKEN);
      expect(asaasService).toBeDefined();
      expect(asaasService).toBeInstanceOf(AsaasService);

      expect(asaasService.customers).toBeDefined();
      expect(asaasService.subscriptions).toBeDefined();
      expect(asaasService.payments).toBeDefined();
      expect(asaasService.installments).toBeDefined();
    });

    it('should provide AsaasService with useClass', async () => {
      const asyncOptions: AsaasModuleAsyncOptions = {
        useClass: MockAsaasConfigOptionsFactory,
      };

      module = await Test.createTestingModule({
        imports: [AsaasModule.forRootAsync(asyncOptions)],
      }).compile();

      const asaasService = module.get<AsaasService>(ASAAS_TOKEN);
      expect(asaasService).toBeDefined();
      expect(asaasService).toBeInstanceOf(AsaasService);
    });
  });
});