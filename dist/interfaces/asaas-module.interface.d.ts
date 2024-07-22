import { ModuleMetadata, Type } from "@nestjs/common";
export type AsaasModuleOptions = {
    apiKey: string;
    sandbox: boolean;
};
export interface AsaasConfigOptionsFactory {
    createAsaasOptions(): Promise<AsaasModuleOptions> | AsaasModuleOptions;
}
export interface AsaasModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<AsaasConfigOptionsFactory>;
    provide?: any;
    useFactory?: (...args: any[]) => Promise<AsaasModuleOptions> | AsaasModuleOptions;
}
