# Patches

`patch-package` allows modifying installed NPM packages directly in `node_modules`, then generating a patch to apply to future installations of that package. This enables modifying package behaviour or fixing bugs without having to wait for upstream changes. PayMe uses several packages that require patching in some form, whether for bugs or changing functionality.

### `eslint`

`eslint` unfortunately does not support fixing warnings with the `--quiet` flag. While normally acceptable, ESLint is used to automatically fix import order warnings. Since the `standardize:staged` script should not output all warnings (ie. in precommit hook), it is necessary to patch out this behaviour. This reverts to old behaviour as described in [GitHub - `eslint#8675`](https://github.com/eslint/eslint/issues/8675).

### `@nestjs/core`

The `BaseExceptionFilter` from `@nestjs/core` already logs uncaught exceptions, which causes duplicate logs when attempting to manually log with additional meta information. A patch was added to allow passing a flag to the `super.catch()` function to indicate that the error had already been logged. This enables benefiting from the default error handling while allowing custom logging (without duplicates).
