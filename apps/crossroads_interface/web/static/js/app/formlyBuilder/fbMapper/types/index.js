import compositions from './compositions'
import elements from './elements'

export default ngModule => {
  compositions(ngModule);
  elements(ngModule);
} 
