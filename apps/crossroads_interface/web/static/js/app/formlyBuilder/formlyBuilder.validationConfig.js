module.exports = addValidationConfiguration;

addValidationConfiguration.$inject = ['formlyConfig', 'formlyValidationMessages']; 
function addValidationConfiguration(formlyConfig, formlyValidationMessages) {
  formlyValidationMessages.addStringMessage('required', 'This field is required');
  formlyValidationMessages.addStringMessage('email', 'Email address is not valid');
  formlyValidationMessages.addStringMessage('requiredCategories', 'All fields where the category is checked are required');
  formlyValidationMessages.addTemplateOptionValueMessage('maxlength', 'maxlength', '', 'is the maximum length', 'Too long');
  formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
}
