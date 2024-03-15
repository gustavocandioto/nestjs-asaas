import { Inject, Injectable } from "@nestjs/common";
import { ASAAS_MODULE_OPTIONS } from "./asaas.constants";
import { AsaasModuleOptions } from "./interfaces/asaas-module.interface";
import { AsaasClient } from "asaas";

@Injectable()
export class AsaasService {
  private client: AsaasClient;

  constructor(@Inject(ASAAS_MODULE_OPTIONS) private readonly options: AsaasModuleOptions) {
    this.client = new AsaasClient(this.options.apiKey, {
      sandbox: this.options.sandbox,
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
}