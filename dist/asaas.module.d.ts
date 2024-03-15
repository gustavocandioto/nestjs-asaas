import { DynamicModule } from "@nestjs/common";
import { AsaasModuleOptions, AsaasModuleAsyncOptions } from "./interfaces/asaas-module.interface";
export declare class AsaasModule {
    static forRoot(options: AsaasModuleOptions): DynamicModule;
    static forRootAsync(options: AsaasModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
