import showError from './formlyBuilder-show-error'
import label from './formlyBuilder-label'
import hasError from './formlyBuilder-has-error'
import showAlert from './formlyBuilder-show-alert'

export default ngModule => {
  showError(ngModule);
  label(ngModule);
  hasError(ngModule);
  showAlert(ngModule);
}
