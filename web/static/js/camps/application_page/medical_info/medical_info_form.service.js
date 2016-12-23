class MedicalInfoFormFactory {
  /* ngInject */
  constructor(CampsService, $resource) {
    this.campsService = CampsService;
    this.$resource = $resource;
  }

  createForm() {
    return new MedicalInfoForm(this.campsService, this.$resource);
  }
}

export default MedicalInfoFormFactory;

class MedicalInfoForm {
  constructor(CampsService, $resource) {
    this.campsService = CampsService;
    this.allergies = [];
    this.medicineAllergyId = undefined;
    this.medicineMedAllergyId = undefined;
    this.medicineAllergyTypeId = undefined;
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
    };

    this.medicalInfoResource = $resource(`${__API_ENDPOINT__}api/v1.0.0/camps/medical/:contactId`);
  }

  save(contactId) {
    return this.campsService.medicalInfoResource.save({ contactId }, this.saveDto()).$promise;
  }

  saveDto() {
    const dto = {
      contactId: this.formModel.contactId,
      medicalInformationId: this.campsService.campMedical.medicalInformationId,
      insuranceCompany: this.formModel.insuranceCompany || undefined,
      policyHolder: this.formModel.policyHolder || undefined,
      physicianName: this.formModel.physicianName || undefined,
      physicianPhone: this.formModel.physicianPhone || undefined,
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
            required: true,
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
      }
    ];
  }

  getModel() {
    return this.formModel;
  }
}
