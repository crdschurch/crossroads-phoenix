export default ngModule => {
  require('./services')(ngModule);
  require('./types')(ngModule);
} 