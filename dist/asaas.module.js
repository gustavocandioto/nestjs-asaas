"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AsaasModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsaasModule = void 0;
const common_1 = require("@nestjs/common");
const asaas_service_1 = require("./asaas.service");
const asaas_constants_1 = require("./asaas.constants");
let AsaasModule = AsaasModule_1 = class AsaasModule {
    static forRoot(options) {
        const provider = {
            provide: asaas_constants_1.ASAAS_TOKEN,
            useValue: new asaas_service_1.AsaasService(options),
        };
        return {
            module: AsaasModule_1,
            providers: [
                {
                    provide: asaas_constants_1.ASAAS_MODULE_OPTIONS,
                    useValue: options,
                },
                provider,
            ],
            exports: [provider],
        };
    }
    static forRootAsync(options) {
        const provider = {
            provide: asaas_constants_1.ASAAS_TOKEN,
            useFactory: async (config) => {
                return new asaas_service_1.AsaasService(config);
            },
            inject: [asaas_constants_1.ASAAS_MODULE_OPTIONS],
        };
        return {
            module: AsaasModule_1,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options),
                provider,
            ],
            exports: [provider],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: asaas_constants_1.ASAAS_MODULE_OPTIONS,
                useFactory: options.useFactory,
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: asaas_constants_1.ASAAS_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createLuluOptions(),
            inject,
        };
    }
};
exports.AsaasModule = AsaasModule;
exports.AsaasModule = AsaasModule = AsaasModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [asaas_service_1.AsaasService],
        exports: [asaas_service_1.AsaasService],
    })
], AsaasModule);
