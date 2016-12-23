import validationConfig from './formlyBuilder.validationConfig';

export default ngModule => {
  require('./formlyConfig/types')(ngModule);
  require('./formlyConfig/wrappers')(ngModule);
  ngModule.run(validationConfig);
}