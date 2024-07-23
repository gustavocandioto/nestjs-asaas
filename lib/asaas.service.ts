import { Inject, Injectable } from "@nestjs/common";
import { ASAAS_MODULE_OPTIONS } from "./asaas.constants";
import { AsaasModuleOptions } from "./interfaces/asaas-module.interface";
import { AsaasClient, AsaasOptions } from "asaas";

@Injectable()
export class AsaasService {
  private client: AsaasClient;

  constructor(@Inject(ASAAS_MODULE_OPTIONS) private readonly options: AsaasModuleOptions) {
    this.client = new AsaasClient(this.options.apiKey, {
      sandbox: this.options.sandbox,
      baseUrl: this.options.baseUrl,
      sandboxUrl: this.options.sandboxUrl,
      userAgent: this.options.userAgent,
    });
  }

  get customers() {
    return this.client.customers;
  }

  get subscriptions() {
    return this.client.subscriptions;
  }

  get payments() {
    return this.client.payments;
  }

  get installments() {
    return this.client.installments;
  }

  get webhooks() {
    return this.client.webhooks;
  }

  get pixTransactions() {
    return this.client.pixTransactions;
  }

  get pixQrCodes() {
    return this.client.pixQrCodes;
  }

  get invoices() {
    return this.client.invoices;
  }

  getUrl(options?: AsaasOptions): string {
    return this.client.getUrl(options);
  }
}