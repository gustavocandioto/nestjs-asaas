# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@candioto/nestjs-asaas` is an unofficial NestJS module that wraps the [`asaas`](https://www.npmjs.com/package/asaas) SDK (by Eduardo Bernardo) to make the Asaas payment gateway easy to integrate via NestJS dependency injection. All source lives in `lib/`; the published artifact is the compiled `dist/`.

## Commands

```bash
npm run build        # Compile TypeScript → dist/ (runs rimraf dist first)
npm test             # Run all Jest tests
npm run test:watch   # Jest in watch mode
npm run test:cov     # Jest with coverage report
```

To run a single test file:
```bash
npx jest lib/asaas.service.spec.ts
```

There are no lint scripts in package.json; ESLint and Prettier are applied by editor/CI. The pre-commit hook runs `npm test` via Husky before every commit.

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, etc.), enforced by commitlint.

## Architecture

### Dynamic Module Pattern

`AsaasModule` is a **global** NestJS dynamic module. Consumers call either:

- `AsaasModule.forRoot(options)` — synchronous configuration
- `AsaasModule.forRootAsync(options)` — async configuration (supports `useFactory` or `useClass`)

Both methods register two providers: one for the raw options (`ASAAS_MODULE_OPTIONS`) and one for the `AsaasService` instance (`ASAAS_TOKEN`).

### Service & DI Tokens

`AsaasService` wraps an `AsaasClient` instance from the underlying SDK. It exposes proxy properties: `customers`, `subscriptions`, `payments`, `installments`, `webhooks`, `pixTransactions`, `pixQrCodes`, `invoices`.

The `@InjectAsaas()` decorator (in `lib/decorators/`) is syntactic sugar for `@Inject(ASAAS_TOKEN)`. Consumers inject the service using this decorator rather than the raw token.

DI tokens are defined in `lib/asaas.constants.ts`:
- `ASAAS_TOKEN` — the service instance
- `ASAAS_MODULE_OPTIONS` — raw config options
- `ASAAS_MODULE` — the module identifier

### Public API surface (`lib/index.ts`)

Exports: `AsaasModule`, `AsaasService`, `InjectAsaas`, `AsaasModuleOptions`, `AsaasModuleAsyncOptions`, `ASAAS_TOKEN`, `ASAAS_MODULE_OPTIONS`, plus a wildcard re-export of all SDK types from `asaas/dist/types/AsaasTypes`.

### TypeScript / Build

- Source root: `lib/`, output: `dist/`
- `declaration: true` — `.d.ts` files are emitted for consumers
- `emitDecoratorMetadata` and `experimentalDecorators` are enabled (required for NestJS)
- Source maps are **disabled**
- Test files (`*.spec.ts`) are excluded from compilation

### Peer Dependencies

The package declares peer deps for `@nestjs/common` and `@nestjs/core` versions `^8 || ^9 || ^10`. The actual NestJS packages are devDependencies; the consumer installs them.

## Configuration Shape

```typescript
interface AsaasModuleOptions {
  apiKey: string;
  sandbox: boolean;
  baseUrl?: string;
  sandboxUrl?: string;
  userAgent?: string;
}
```

Async variant using `ConfigService`:
```typescript
AsaasModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    apiKey: config.get('ASAAS_API_KEY'),
    sandbox: config.get('ASAAS_SANDBOX') === 'true',
  }),
  inject: [ConfigService],
})
```

## Publishing

```bash
npm run build
npm run publish:npm   # publishes dist/ as a public package
```

Only the `dist/` directory is included in the published package (see `files` in package.json).
