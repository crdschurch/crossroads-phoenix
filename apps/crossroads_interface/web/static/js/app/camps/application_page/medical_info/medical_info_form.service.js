class MedicalInfoForm {
  constructor(CampsService, $resource) {
    this.campsService = CampsService;
    this.allergies = [];
    this.medicineAllergyId = undefined;
    this.medicineMedAllergyId = undefined;
    this.medicineAllergyTypeId = undefined;
    this.medicines = undefined;
    this.deletedMedicines = [];
    this.foodAllergyId = undefined;
    this.foodMedAllergyId = undefined;
    this.foodAllergyTypeId = undefined;
    this.environmentalAllergyId = undefined;
    this.environmentalMedAllergyId = undefined;
    this.environmentAllergyTypeId = undefined;
    this.otherAllergyId = undefined;
    this.otherMedAllergyId = undefined;
    this.otherAllergyTypeId = undefined;
    this.formModel = {
      contactId: this.campsService.campMedical.contactId || undefined,
      insuranceCompany: this.campsService.campMedical.insuranceCompany || undefined,
      policyHolder: this.campsService.campMedical.policyHolder || undefined,
      physicianName: this.campsService.campMedical.physicianName || undefined,
      physicianPhone: this.campsService.campMedical.physicianPhone || undefined,
      showAllergies: this.campsService.campMedical.showAllergies || false,
      medicineAllergies: this.medicineAllergies(),
      foodAllergies: this.foodAllergies(),
      environmentalAllergies: this.environmentalAllergies(),
      otherAllergies: this.otherAllergies(),
      medicationsAdministered: this.campsService.campMedical.medicationsAdministered || [],
      showMedications: this.campsService.campMedical.showMedications || false,
      medicines: this.campsService.campMedical.medications || [{}]
    };

    this.medicalInfoResource = $resource(`${__API_ENDPOINT__}api/v1.0.0/camps/medical/:contactId`);
  }

  save(contactId) {
    return this.campsService.medicalInfoResource.save({ contactId }, this.saveDto()).$promise;
  }

  saveDto() {
    let allMedications;
    if (this.formModel.showMedications) {
      allMedications = [...this.formModel.medicines || [], ...this.deletedMedicines];
    } else {
      allMedications = this.formModel.medicines ?
        this.formModel.medicines.filter(m => m.medicationName !== undefined).map(((m) => {
        // eslint-disable-next-line no-param-reassign
          m.remove = true;
          return m;
        })) : [];
    }
    const dto = {
      contactId: this.formModel.contactId,
      medicalInformationId: this.campsService.campMedical.medicalInformationId,
      insuranceCompany: this.formModel.insuranceCompany || undefined,
      policyHolder: this.formModel.policyHolder || undefined,
      physicianName: this.formModel.physicianName || undefined,
      physicianPhone: this.formModel.physicianPhone || undefined,
      medicationsAdministered: this.formModel.medicationsAdministered || [],
      medications: allMedications,
      allergies: [
        { allergyType: 'Medicine',
          allergyId: this.medicineAllergyId || undefined,
          allergyDescription: this.formModel.medicineAllergies || undefined,
          medicalInformationAllergyId: this.medicineMedAllergyId || undefined,
          allergyTypeId: this.medicineAllergyTypeId || undefined
        },
        { allergyType: 'Food',
          allergyId: this.foodAllergyId || undefined,
          allergyDescription: this.formModel.foodAllergies || undefined,
          medicalInformationAllergyId: this.foodMedAllergyId || undefined,
          allergyTypeId: this.foodAllergyTypeId || undefined
        },
        { allergyType: 'Environmental',
          allergyId: this.environmentalAllergyId || undefined,
          allergyDescription: this.formModel.environmentalAllergies || undefined,
          medicalInformationAllergyId: this.environmentalMedAllergyId || undefined,
          allergyTypeId: this.environmentAllergyTypeId || undefined
        },
        { allergyType: 'Other',
          allergyId: this.otherAllergyId || undefined,
          allergyDescription: this.formModel.otherAllergies || undefined,
          medicalInformationAllergyId: this.otherMedAllergyId || undefined,
          allergyTypeId: this.otherAllergyTypeId || undefined
        }]
    };
    return dto;
  }

  medicineAllergies() {
    this.medicineAllergies = _.find(this.campsService.campMedical.allergies, allergy => (allergy.allergyType === 'Medicine'));

    if (this.medicineAllergies !== undefined) {
      this.medicineAllergyId = this.medicineAllergies.allergyId;
      this.medicineMedAllergyId = this.medicineAllergies.medicalInformationAllergyId;
      this.medicineAllergyTypeId = this.medicineAllergies.allergyTypeId;
      return this.medicineAllergies.allergyDescription;
    }

    return undefined;
  }

  foodAllergies() {
    this.foodAllergies = _.find(this.campsService.campMedical.allergies, allergy => (allergy.allergyType === 'Food'));

    if (this.foodAllergies !== undefined) {
      this.foodAllergyId = this.foodAllergies.allergyId;
      this.foodMedAllergyId = this.foodAllergies.medicalInformationAllergyId;
      this.foodAllergyTypeId = this.foodAllergies.allergyTypeId;
      return this.foodAllergies.allergyDescription;
    }

    return undefined;
  }

  environmentalAllergies() {
    this.environmentalAllergies = _.find(this.campsService.campMedical.allergies, allergy => (allergy.allergyType === 'Environmental'));

    if (this.environmentalAllergies !== undefined) {
      this.environmentalAllergyId = this.environmentalAllergies.allergyId;
      this.environmentalMedAllergyId = this.environmentalAllergies.medicalInformationAllergyId;
      this.environmentAllergyTypeId = this.environmentalAllergies.allergyTypeId;
      return this.environmentalAllergies.allergyDescription;
    }

    return undefined;
  }

  otherAllergies() {
    this.otherAllergies = _.find(this.campsService.campMedical.allergies, allergy => (allergy.allergyType === 'Other'));

    if (this.otherAllergies !== undefined) {
      this.otherAllergyId = this.otherAllergies.allergyId;
      this.otherMedAllergyId = this.otherAllergies.medicalInformationAllergyId;
      this.otherAllergyTypeId = this.otherAllergies.allergyTypeId;
      return this.otherAllergies.allergyDescription;
    }

    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  getFields() {
    return [
      {
        className: '',
        wrapper: 'campBootstrapRow',
        fieldGroup: [{
          className: 'form-group col-xs-6',
          key: 'insuranceCompany',
          type: 'crdsInput',
          templateOptions: {
            label: 'Insurance Company Name',
            required: false
          }
        }, {
          className: 'form-group col-xs-6',
          key: 'policyHolder',
          type: 'crdsInput',
          templateOptions: {
            label: 'Policy Holder Name',
            required: false
          }
        }]
      },
      {
        className: '',
        wrapper: 'campBootstrapRow',
        fieldGroup: [{
          className: 'form-group col-xs-6',
          key: 'physicianName',
          type: 'crdsInput',
          templateOptions: {
            label: 'Physician Name',
            required: false
          }
        }, {
          className: 'form-group col-xs-6',
          key: 'physicianPhone',
          type: 'crdsInput',
          optionsTypes: ['phoneNumber'],
          templateOptions: {
            label: 'Physician Phone Number',
            required: false
          }
        }]
      },
      {
        className: '',
        wrapper: 'campBootstrapRow',
        fieldGroup: [{
          className: 'form-group col-xs-6',
          key: 'showAllergies',
          type: 'crdsRadio',
          templateOptions: {
            label: 'Are there any Allergy/Dietary Needs?',
            required: false,
            inline: true,
            labelProp: 'label',
            valueProp: 'id',
            options: [{
              label: 'Yes',
              id: true
            }, {
              label: 'No',
              id: false
            }]
          }
        }]
      },
      {
        className: '',
        wrapper: 'campBootstrapRow',
        hideExpression: () => !this.formModel.showAllergies,
        fieldGroup: [{
          className: 'col-xs-12',
          template: '<p>List all allergies, reactions and treatments to allergies.</p>'
        }, {
          className: 'form-group col-xs-12',
          key: 'medicineAllergies',
          type: 'crdsTextArea',
          templateOptions: {
            label: 'Medicine Allergies',
            required: false
          }
        }, {
          className: 'form-group col-xs-12',
          key: 'foodAllergies',
          type: 'crdsTextArea',
          templateOptions: {
            label: 'Food Allergies',
            required: false
          }
        }, {
          className: 'form-group col-xs-12',
          key: 'environmentalAllergies',
          type: 'crdsTextArea',
          templateOptions: {
            label: 'Environmental Allergies',
            required: false
          }
        }, {
          className: 'form-group col-xs-12',
          key: 'otherAllergies',
          type: 'crdsTextArea',
          templateOptions: {
            label: 'Other Allergies',
            required: false
          }
        }]
      },
      {
        className: '',
        wrapper: 'campBootstrapRow',
        fieldGroup: [{
          className: 'col-xs-12',
          template: '<br /> <p> These over the counter medications will be available by the camp nurse as needed.</p> <h4> <strong> Select any medications that can be administered to your child.</strong></h4>'
        }, {
          className: 'form-group-col-xs-12 camps-medication-checkbox',
          key: 'medicationsAdministered',
          type: 'multiCheckbox',
          templateOptions: {
            className: 'camps-medication-checkbox',
            options: [{
              name: 'Do not administer any of these medications',
              value: 'none'
            }, {
              name: 'Benadryl',
              value: 'benadryl'
            }, {
              name: 'Claritin',
              value: 'claritin'
            }, {
              name: 'Ibuprofen',
              value: 'ibuprofen'
            }, {
              name: 'Pepto Bismol',
              value: 'pepto'
            }, {
              name: 'Tylenol',
              value: 'tylenol'
            }],
            onClick: ($modelValue, fieldOptions, scope) => {
              let newValue;
              const options = fieldOptions.templateOptions.options;
              const isNoneChecked = $modelValue.indexOf('none') > -1;

              if (scope.$index === 0) {
                if (isNoneChecked) {
                  // the 'Do Not Administer button was checked
                  newValue = ['none'];
                }
              } else if (isNoneChecked) {
                // something else was checked...
                newValue = options.map((option) => {
                  if (option.value === 'none') {
                    return undefined;
                  }

                  if (_.includes($modelValue, option.value)) {
                    return option.value;
                  }

                  return undefined;
                });
              }

              if (newValue) {
                fieldOptions.value(newValue);
              }
            }
          }
        }]
      },
      {
        className: '',
        wrapper: 'campBootstrapRow',
        fieldGroup: [{
          className: 'form-group col-xs-6',
          key: 'showMedications',
          type: 'crdsRadio',
          templateOptions: {
            label: 'Will any medications be taken at Camp?',
            required: false,
            labelProp: 'label',
            valueProp: 'anyMedications',
            inline: true,
            options: [{
              label: 'Yes',
              anyMedications: true
            }, {
              label: 'No',
              anyMedications: false
            }]
          }
        }]
      },
      {
        className: 'form-group col-xs-12',
        wrapper: 'campBootstrapRow',
        key: 'medicines',
        type: 'campMedicines',
        hideExpression: () => !this.formModel.showMedications,
        templateOptions: {
          fields: [
            {
              className: '',
              fieldGroup: [{
                type: 'input',
                key: 'medicalInformationMedicationId',
                defaultValue: 0,
                templateOptions: {
                  type: 'hidden'
                }
              },
              {
                className: 'form-group col-lg-4 col-md-6 col-xs-12',
                key: 'medicationName',
                type: 'crdsInput',
                templateOptions: {
                  label: 'Medication Name',
                  required: true
                }
              }, {
                className: 'form-group col-lg-2 col-md-3 col-xs-6',
                key: 'timeOfDay',
                type: 'crdsInput',
                templateOptions: {
                  label: 'Time(s) of Day',
                  required: true
                }
              }, {
                className: 'form-group col-lg-2 col-md-3 col-xs-6',
                key: 'dosage',
                type: 'crdsInput',
                templateOptions: {
                  label: 'Dosage',
                  required: true
                }
              }, {
                className: 'form-group col-lg-4 col-md-12 col-xs-12',
                key: 'medicationType',
                type: 'crdsRadio',
                templateOptions: {
                  label: 'Medication Type',
                  required: true,
                  labelProp: 'label',
                  valueProp: 'medicationType',
                  inline: true,
                  options: [{
                    label: 'Prescription',
                    medicationType: 1
                  }, {
                    label: 'Over the Counter',
                    medicationType: 2
                  }]
                }
              }]
            }
          ]
        }
      },
    ];
  }

  getModel() {
    return this.formModel;
  }
}

class MedicalInfoFormFactory {
  /* ngInject */
  constructor(CampsService, $resource) {
    this.campsService = CampsService;
    this.$resource = $resource;
  }

  createForm() {
    this.form = new MedicalInfoForm(this.campsService, this.$resource);
    return this.form;
  }

  getForm() {
    return this.form;
  }
}

export default MedicalInfoFormFactory;
