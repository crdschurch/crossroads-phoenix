/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import constants from 'crds-constants';
/* eslint-enable */
import filter from 'lodash/collection/filter';
import moment from 'moment';

/* ngInject */
class CampsService {
  constructor($resource, $rootScope, $stateParams, $log, AttributeTypeService, $sessionStorage) {
    this.log = $log;
    this.scope = $rootScope;
    this.stateParams = $stateParams;
    this.resource = $resource;
    this.attributeTypeService = AttributeTypeService;
    this.sessionStorage = $sessionStorage;

    this.campResource = $resource(`${__API_ENDPOINT__}api/camps/:campId`);
    this.camperResource = $resource(`${__API_ENDPOINT__}api/camps/:campId/campers/:camperId`);
    this.campDashboard = $resource(`${__API_ENDPOINT__}api/v1.0.0/camps/my-camp`);
    this.campFamily = $resource(`${__API_ENDPOINT__}api/v1.0.0/camps/:campId/family`);
    this.campMedicalResource = $resource(`${__API_ENDPOINT__}api/v1.0.0/camps/:campId/medical/:contactId`, { campId: '@campId', contactId: '@contactId' });
    this.campWaiversResource = $resource(`${__API_ENDPOINT__}api/v1.0.0/camps/:campId/waivers/:contactId`, { campId: '@campId', contactId: '@contactId' });
    this.medicalInfoResource = $resource(`${__API_ENDPOINT__}api/camps/medical/:contactId`);
    this.emergencyContactResource = $resource(`${__API_ENDPOINT__}api/v1.0.0/camps/:campId/emergencycontact/:contactId`, { campId: '@campId', contactId: '@contactId' });
    this.productSummaryResource = $resource(`${__API_ENDPOINT__}api/camps/:campId/product/:camperId`, { campId: '@campId', camperId: '@camperId', timestamp: moment.now() });
    this.paymentResource = $resource(`${__API_ENDPOINT__}api/v1.0.0/invoice/:invoiceId/payment/:paymentId`, { invoiceId: 'invoiceId', paymentId: '@paymentId' });
    this.confirmationResource = $resource(`${__API_ENDPOINT__}api/camps/:campId/confirmation/:contactId`);
    this.paymentConfirmationResource = $resource(`${__API_ENDPOINT__}api/v1.0.0/payment/:paymentId/confirmation`);
    this.hasPaymentsResource = $resource(`${__API_ENDPOINT__}api/v1.0.0/invoice/:invoiceId/has-payment`, { method: 'GET', cache: false });
    this.interestedInResource = $resource(`${__API_ENDPOINT__}api/v1.0.0/contact/:contactId/interested-in/:eventId`);

    this.campInfo = null;
    this.campTitle = null;
    this.shirtSizes = null;
    this.family = null;
    this.camperInfo = null;
    this.waivers = null;
    this.productInfo = null;
    this.payment = null;
    this.campMedical = null;

    this.initializeCampData();
    this.initializeCamperData();
  }

  initializeCampData() {
    this.campInfo = {};
    this.campTitle = '';
    this.shirtSizes = [];
    this.family = [];
  }

  initializeCamperData() {
    this.camperInfo = {};
    this.waivers = [];
    this.productInfo = {};
    this.payment = {};
    this.campMedical = {};
  }

  getCampInfo(campId) {
    return this.campResource.get({ campId }, (campInfo) => {
      this.campInfo = campInfo;
    },

    (err) => {
      this.log.error(err);
    }).$promise;
  }

  getCamperInfo(campId, camperId) {
    return this.camperResource.get({ campId, camperId }, (camperInfo) => {
      this.camperInfo = camperInfo;
    },

    (err) => {
      this.log.error(err);
    }).$promise;
  }

  getCampDashboard() {
    return this.campDashboard.query((myCamps) => {
      this.dashboard = myCamps;
    },

    (err) => {
      this.log.error(err);
    }).$promise;
  }

  getCampFamily(campId) {
    return this.campFamily.query({ campId }, (family) => {
      this.family = family;
    }, (err) => {
      this.log.error(err);
    }).$promise;
  }

  getCampWaivers(campId, contactId) {
    return this.campWaiversResource.query({ campId, contactId }, (waivers) => {
      this.waivers = waivers;
    },

    (err) => {
      this.log.error(err);
    }).$promise;
  }

  getCampMedical(campId, contactId) {
    return this.campMedicalResource.get({ campId, contactId }, (medical) => {
      this.campMedical = medical;
    },

    (err) => {
      this.log.error(err);
    }).$promise;
  }

  getCampProductInfo(campId, camperId, checkForDeposit = false) {
    let prom = this.productSummaryResource.get({ campId, camperId }, (productInfo) => {
      this.productInfo = productInfo;
    },

    (err) => {
      this.log.error(err);
    }).$promise;

    // Initializes a session storage entry for camp deposits if it didn't already exist
    this.sessionStorage.campDeposits = this.sessionStorage.campDeposits || {};

    /**
     * Creates an entry in sessionStorage under campDeposits which states that the camp
     * denoted by campId has recorded a deposit for the camper denoted by camperId.
     */
    const hasDeposit = this.sessionStorage.campDeposits[`${campId}+${camperId}`];

    if (checkForDeposit) {
      prom = prom.then(res => hasDeposit || this.invoiceHasPayment(res.invoiceId).catch((err) => {
        if (err.status === 302) {
          this.sessionStorage.campDeposits[`${campId}+${camperId}`] = true;
        }
      }));
    }
    return prom;
  }

  submitWaivers(campId, contactId, waivers) {
    return this.campWaiversResource.save({ campId, contactId }, waivers).$promise;
  }

  getEmergencyContacts(campId, contactId) {
    return this.emergencyContactResource.query({ campId, contactId }).$promise;
  }

  saveEmergencyContacts(campId, contactId, contacts) {
    return this.emergencyContactResource.save({ campId, contactId }, contacts).$promise;
  }

  getCampPayment(invoiceId, paymentId) {
    return this.paymentResource.get({ paymentId, invoiceId }, (payment) => {
      this.payment = payment;
    },
    (err) => {
      this.log.error(err);
    }).$promise;
  }

  sendConfirmation(invoiceId, paymentId, campId, contactId) {
    return this.confirmationResource.save({ contactId, campId, invoiceId, paymentId }, {}).$promise
      .then(() => {
        this.initializeCampData();
        this.initializeCamperData();
      });
  }

  sendPaymentConfirmation(invoiceId, paymentId, eventId, contactId) {
    return this.paymentConfirmationResource.save({ contactId, eventId, invoiceId, paymentId }, {}).$promise
      .then(() => {
        this.initializeCampData();
        this.initializeCamperData();
      });
  }

  getShirtSizes() {
    // FIXME: ? should `crdsConstants` be `constants` ?
    return this.attributeTypeService.AttributeTypes().get({ id: constants.ATTRIBUTE_TYPE_IDS.TSHIRT_SIZES }).$promise // eslint-disable-line new-cap
      .then((shirtSizes) => {
        this.shirtSizes = filter(shirtSizes.attributes, attribute => attribute.category === 'Adult');
        return shirtSizes;
      });
  }

  invoiceHasPayment(invoiceId) {
    return this.hasPaymentsResource.get({ invoiceId }).$promise;
  }

  isEventParticipantInterested(contactId, eventId) {
    return this.interestedInResource.get({ eventId, contactId }).$promise;
  }
}

export default CampsService;
