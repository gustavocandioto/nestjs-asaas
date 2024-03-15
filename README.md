[![npm version](http://img.shields.io/npm/v/@candioto/nestjs-asaas.svg?style=flat)](https://npmjs.org/package/@candioto/nestjs-asaas "View this project on npm")
[![ISC license](http://img.shields.io/badge/license-ISC-brightgreen.svg)](http://opensource.org/licenses/ISC)

# Unofficial Asaas Payment Gateway NestJS module
### ❗Module and documentation under development.

A simple NestJS module that uses [Eduardo Bernardo's sdk](https://github.com/eduardobernardo/asaas) behind the scenes.
It makes easier to setup and integrate Asaas to a NestJS application.

## Instalation

```bash
npm install --save @candioto/nestjs-asaas
```

## Getting Started

To setup the module with your credentials, import the module into `app.module.ts`:

```typescript
import { Module } from '@nestjs-common';
import { AsaasModule } from '@candioto/nestjs-asaas';

@Module({
  imports: [
    AsaasModule.forRoot({
      apiKey: 'my_api_key',
      sandbox: false,
    }),
  ],
})
export class AppModule {}
```

Or your can use the async way:

```typescript
import { Module } from '@nestjs-common';
import { AsaasModule } from '@candioto/nestjs-asaas';
import { ConfigModule, ConfigService } from '@nestjs/nestjs-config';

@Module({
  imports: [
    AsaasModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        apiKey: config.get('ASAAS_API_KEY'),
        sandbox: config.get('ASAAS_SANDBOX'),
      }),
      inject: [ConfigService],
    })
  ]
})
export class AppModule {}
```

To use into your code, just inject the Asaas Client using the custom decorator:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectAsaas, AsaasService } from '@candioto/nestjs-asaas';

@Injectable()
export class AppService {
  public constructor(@InjectAsaas() private readonly asaas: AsaasService) {}
}
```

Now, you can use all the Asaas client just like in [Eduardo Bernardo's sdk](https://github.com/eduardobernardo/asaas).
For example:
```typescript
import { Injectable } from '@nestjs/common';
import { InjectAsaas, AsaasService } from '@candioto/nestjs-asaas';

@Injectable()
export class AppService {
  public constructor(@InjectAsaas() private readonly asaas: AsaasService) {}

  async createCustomer(customerData: any) {
    // Your logic here
    await this.asaas.customers.new(customerData);
    // Your logic continues here
  }

  async pay(paymentData: any) {
    // Your logic here
    await this.asaas.payments.create(paymentData);
    // Your logic continues here
  }
}
```

See the [sdk docs](https://github.com/eduardobernardo/asaas/tree/main?tab=readme-ov-file#sdk-documentation) and [Asaas official documentation](https://docs.asaas.com) to learn more about the integration

## Author
- [Gustavo Candioto](https://github.com/gustavocandioto)

## Contributing

I would greatly appreciate any contributions to make this project better. Please
make sure to follow the below guidelines before getting your hands dirty.

1. Fork the repository
2. Create your branch (`git checkout -b my-branch`)
3. Commit any changes to your branch
4. Push your changes to your remote branch
5. Open a pull request
<!-- 
## License

Distributed under the MIT License. See `LICENSE` for more information. -->

## Acknowledgements

- [nestjs](https://nestjs.com)
- [Eduardo Bernardo](https://github.com/eduardobernardo)