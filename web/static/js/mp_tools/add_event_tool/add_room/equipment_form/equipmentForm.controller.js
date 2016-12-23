import CONSTANTS from 'crds-constants';

export default class EquipmentController {
    /* @ngInject */
  constructor(AddEvent, Validation) {
    this.addEvent = AddEvent;
    this.validation = Validation;
  }

  $onInit() {
    if (this.addEvent.editMode === true && _.has(this.currentRoom, 'cancelled')) {
      const hasEquipment = _.filter(this.currentEquipment, (e) => {
        return e.equipment.name.id > 0;
      });

      if (hasEquipment.length > 0) {
        this.equipmentRequired = true;
      }
      else {
        this.equipmentRequired = false;
      }
    }
  }

  addEquipment() {
    this.currentEquipment.push({ equipment: { name: { id: 0 }, quantity: 0 } });
  }

  existing(equipment) {
    return _.has(equipment, 'cancelled');
  }

  fieldName(name, idx) {
    return `${name}-${idx}`;
  }

  isCancelled(equipment) {
    return this.existing(equipment) && equipment.cancelled;
  }

  remove(idx) {
    if (this.currentEquipment[idx] !== undefined) {
      if (this.existing(this.currentEquipment[idx].equipment)) {
        this.currentEquipment[idx].equipment.cancelled = true;
      } else {
        this.currentEquipment.splice(idx, 1);
      }
    }
  }

  showError(form) {
    return this.validation.showErrors(form, 'equipmentChooser') ||
        this.validation.showErrors(form, 'equip.quantity');
  }

  showFieldError(form, name) {
    return this.validation.showErrors(form, name);
  }

  undo(idx) {
    if (this.currentEquipment[idx] !== undefined) {
      if (this.existing(this.currentEquipment[idx].equipment)) {
        this.currentEquipment[idx].equipment.cancelled = false;
      }
    }
  }

  toggleEquipmentRequired() {
    if (!this.equipmentRequired) {
      this.currentEquipment = [{ equipment: { name: { id: 0 }, quantity: 0 } }];
    }
  }
}