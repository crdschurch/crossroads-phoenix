import CONSTANTS from 'crds-constants';

export default class EquipmentController {
    /* @ngInject */
  constructor(AddEvent, Validation) {
    this.addEvent = AddEvent;
    this.validation = Validation;
    this.ready = false; 
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
    else if (this.currentEquipment.length > 0 && this.currentEquipment[0].equipment.name.id > 0) {
      this.equipmentRequired = true;
    }
    this.ready = true;
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

  getQuantity(id) {
    if (id !== 0) {
      const selectedEquipment = _.where(this.equipmentLookup, { id });
      return selectedEquipment[0].quantity;
    }
  }

  toggleEquipmentRequired() {
    if (!this.equipmentRequired) {
      this.currentEquipment = [{ equipment: { name: { id: 0 }, quantity: 0 } }];
    }
  }
}