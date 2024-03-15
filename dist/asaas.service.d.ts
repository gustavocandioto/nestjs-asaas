import { AsaasModuleOptions } from "./interfaces/asaas-module.interface";
export declare class AsaasService {
    private readonly options;
    private client;
    constructor(options: AsaasModuleOptions);
    get customers(): import("asaas/dist/client/Customers").CustomersAPI;
    get subscriptions(): import("asaas/dist/client/Subscriptions").SubscriptionsAPI;
    get payments(): import("asaas/dist/client/Payments").PaymentsAPI;
    get installments(): import("asaas/dist/client/Installments").InstallmentsAPI;
}
