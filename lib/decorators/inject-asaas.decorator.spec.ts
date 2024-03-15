import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from '@nestjs/testing';
import { AsaasService } from "../asaas.service";
import { AsaasModule } from "../asaas.module";
import { InjectAsaas } from "../decorators/inject-asaas.decorator";

import { CustomersAPI } from "asaas/dist/client/Customers";
import { SubscriptionsAPI } from "asaas/dist/client/Subscriptions";
import { PaymentsAPI } from "asaas/dist/client/Payments";
import { InstallmentsAPI } from "asaas/dist/client/Installments";

describe('InjectAsaas', () => {
  const apiKey = '123';
  const sandbox = true;
  let module: TestingModule;

  @Injectable()
  class TestService {
    public constructor(@InjectAsaas() public readonly asaas: AsaasService) {}
  }

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AsaasModule.forRoot({ apiKey, sandbox })],
      providers: [TestService],
    }).compile();
  });

  describe('when decorating a class constructor parameter', () => {
    it('should inject the asaas client', () => {
      const testService = module.get(TestService);
      expect(testService.asaas).toBeInstanceOf(AsaasService);
      expect(testService.asaas).toHaveProperty('customers');
      expect(testService.asaas).toHaveProperty('subscriptions');
      expect(testService.asaas).toHaveProperty('payments');
      expect(testService.asaas).toHaveProperty('installments');

      expect(testService.asaas.customers).toBeInstanceOf(CustomersAPI);
      expect(testService.asaas.subscriptions).toBeInstanceOf(SubscriptionsAPI);
      expect(testService.asaas.payments).toBeInstanceOf(PaymentsAPI);
      expect(testService.asaas.installments).toBeInstanceOf(InstallmentsAPI);
    });
  });
});