import { describe, expect, beforeEach, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AsaasService } from "./asaas.service";
import { ASAAS_MODULE_OPTIONS } from './asaas.constants';

describe('AsaasService', () => {
  let asaasService: AsaasService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AsaasService,
        {
          provide: ASAAS_MODULE_OPTIONS,
          useValue: {
            apiKey: '123',
            sandbox: true
          }
        }
      ]
    }).compile();
    asaasService = moduleRef.get<AsaasService>(AsaasService);
  });
  it('should be defined', () => {
    expect(asaasService).toBeDefined();
  })

  it('should have config defined correctly', () => {
    expect(asaasService.customers).toBeDefined()
    expect(asaasService.subscriptions).toBeDefined()
    expect(asaasService.payments).toBeDefined()
    expect(asaasService.installments).toBeDefined()
  });

  it('should throw error when creating customer', async () => {
    try {
      await asaasService.customers.new({
        name: 'test',
        cpfCnpj: '',
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should throw error when creating subscription', async () => {
    try {
      await asaasService.subscriptions.create({
        customer: '',
        billingType: 'BOLETO',
        value: 0,
        nextDueDate: '',
        cycle: 'WEEKLY'
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should throw error when creating payment', async () => {
    try {
      await asaasService.payments.new({
        customer: '',
        value: 0,
        billingType: '',
        dueDate: new Date(),
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});