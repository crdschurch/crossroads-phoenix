import services from './services'
import types from './types'

export default ngModule => {
  services(ngModule);
  types(ngModule);
} 
