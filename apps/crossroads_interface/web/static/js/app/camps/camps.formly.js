/* @ngInject */
export default function campFormlyConfig(formlyConfigProvider) {
  formlyConfigProvider.setWrapper({
    name: 'campBootstrapRow',
    templateUrl: 'formly_wrappers/bootstrap_row.html'
  });
}
