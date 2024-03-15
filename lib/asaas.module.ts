import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";
import { AsaasService } from "./asaas.service";
import { AsaasModuleOptions, AsaasModuleAsyncOptions, AsaasConfigOptionsFactory } from "./interfaces/asaas-module.interface";
import { ASAAS_MODULE_OPTIONS, ASAAS_TOKEN } from "./asaas.constants";

@Global()
@Module({
  providers: [AsaasService],
  exports: [AsaasService],
})
export class AsaasModule {
  static forRoot(options: AsaasModuleOptions): DynamicModule {
    const provider: Provider = {
      provide: ASAAS_TOKEN,
      useValue: new AsaasService(options),
    }
    return {
      module: AsaasModule,
      providers: [
        {
          provide: ASAAS_MODULE_OPTIONS,
          useValue: options,
        },
        provider,
      ],
      exports: [provider],
    }
  }

  static forRootAsync(options: AsaasModuleAsyncOptions): DynamicModule {
    const provider: Provider = {
      provide: ASAAS_TOKEN,
      useFactory: async (config: AsaasModuleOptions) => {
        return new AsaasService(config)
      },
      inject: [ASAAS_MODULE_OPTIONS],
    }

    return {
      module: AsaasModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        provider,
      ],
      exports: [provider],
    }
  }

  private static createAsyncProviders(
    options: AsaasModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<AsaasConfigOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }
  
  private static createAsyncOptionsProvider(
    options: AsaasModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: ASAAS_MODULE_OPTIONS,
        useFactory: options.useFactory,
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<AsaasConfigOptionsFactory>,
    ];
    return {
      provide: ASAAS_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AsaasConfigOptionsFactory) =>
        await optionsFactory.createLuluOptions(),
      inject,
    };
  }
}