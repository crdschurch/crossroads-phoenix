import types from './formlyConfig/wrappers'
import wrappers from './formlyConfig/wrappers'
import composer from './fbComposer'
import mapper from './fbMapper'

var MODULE = require('crds-constants').MODULES.FORMLY_BUILDER;
var ngModule = angular.module(MODULE, ['crossroads.core', 'crossroads.common']);

ngModule.run(require('./formlyBuilder.validationConfig'));

types(ngModule);
wrappers(ngModule);
composer(ngModule);
mapper(ngModule);
