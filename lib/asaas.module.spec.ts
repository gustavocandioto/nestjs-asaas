import { AsaasModule } from "./asaas.module";
import { AsaasService } from "./asaas.service";
import { Test, TestingModule } from '@nestjs/testing';
import { AsaasModuleOptions } from "./interfaces/asaas-module.interface";
import { ASAAS_TOKEN } from "./asaas.constants";

describe('AsaasModule', () => {
  let config: AsaasModuleOptions = {
    apiKey: '123',
    sandbox: true
  };

  describe('forRoot', () => {
    it('should return a module', async () => {
      const module = await Test.createTestingModule({
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
    it('should return a module', async () => {
      const module = await Test.createTestingModule({
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
  });
});