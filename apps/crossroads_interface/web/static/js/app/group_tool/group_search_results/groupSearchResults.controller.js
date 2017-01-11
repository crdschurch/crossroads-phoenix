import CONSTANTS from 'crds-constants';
import Address from '../model/address';

export default class GroupSearchResultsController {
  /*@ngInject*/
  constructor(NgTableParams, GroupService, $state, AuthModalService, $rootScope, AddressValidationService, $location, $log) {
    this.groupService = GroupService;
    this.authModalService = AuthModalService;
    this.rootScope = $rootScope;
    this.addressValidationService = AddressValidationService;
    this.locationService = $location;

    this.search = null;
    this.processing = false;
    this.state = $state;
    this.ready = false;
    this.results = [];

    this.initialFilters = {};

    this.showLocationInput = false;
    this.searchedWithLocation = false;

    this.tableParams = new NgTableParams({}, {});
  }

  $onInit() {
    this.initialFilters = {};

    _.forOwn(CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES, (v, k) => {
      this.initialFilters[v] = this.state.params[v];
    })

    this.search = {
      query: this.state.params.query,
      location: this.state.params.location,
      id: this.state.params.id
    };
    this.doSearch(this.state.params.query, this.state.params.location, this.state.params.id);
  }

  doSearch(query, location, id) {
    this.searchedWithLocation = location && location.length > 0;
    this.searchedWithId = id;

    let queryString = {};
    if (this.searchedWithLocation) {
      queryString.location = location;
    }

    if (this.searchedWithId) {
      queryString.id = id;
    }

    if (query && query.length > 0) {
      queryString.query = query;
    }

    _.forOwn(this.initialFilters, (value, key) => {
      if (value && value.length > 0) {
        queryString[key] = value;
      }
    });

    this.locationService.search(queryString);

    this.showLocationInput = false;
    this.ready = false;
    this.results = [];
    this.groupService.search(query, location, id).then(
      (data) => {
        this.results = data;
        if (this.results.length === 1) {
          this.results[0].expanded = true;
        }
      },
      (err) => {
        // TODO what happens on error? (could be 404/no results, or other error)
      }
    ).finally(
      () => {
        // TODO Need to figure out pagination, etc

        // This resets the ngTable count so we see all the results and sets sorting appropriately
        let parms = {
          count: this.results.length
        };
        parms.sorting = this.searchedWithLocation ? { proximity: 'asc' } : { meetingDay: 'asc' };

        // This resets the dataset so ngTable properly renders the new search results
        let settings = {
          dataset: this.results
        };
        this.tableParams.settings(settings);
        this.tableParams.parameters(parms);
        this.ready = true;
      }
      );
  }

  hasResults() {
    return this.tableParams.settings().dataset.length > 0;
  }

  showSearchResultMessage() {
    return this.results.length === 0;
  }

  showFilteredResultMessage() {
    return this.results.length > 0 && this.tableParams.settings().dataset.length === 0;
  }

  showLocationForm(form) {
    form.location.$rollbackViewValue();
    this.showLocationInput = true;
  }

  hideLocationForm(form) {
    if (form.location.$invalid) {
      this.search.location = '';
      form.location.$setValidity('pattern', true);
    }
    form.location.$rollbackViewValue();
    this.showLocationInput = false;
  }

  submit(form) {
    if (form && this.search.location && this.search.location.length > 0) {
      this.processing = true;
      let valid = false;
      this.addressValidationService.validateAddressString(this.search.location).then((data) => {
        let address = new Address(data);
        this.search.location = address.toSearchString();
        valid = true;
      }, (err) => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolSearchInvalidAddressGrowler);
      }).finally(() => {
        this.processing = false;
        form.location.$setValidity('pattern', valid);
        if (valid) {
          this.doSearch(this.search.query, this.search.location);
        }
      });
    } else {
      this.doSearch(this.search.query, this.search.location);
    }
  }

  requestToJoinOrEmailGroupLeader(group, email = false) {
    let modalOptions = {
      template: '<confirm-request email-leader="confirmRequestModal.emailLeader" group="confirmRequestModal.group" modal-instance="confirmRequestModal.modalInstance"></confirm-request>',
      controller: function (group, emailLeader, $modalInstance) {
        this.group = group;
        this.emailLeader = emailLeader;
        this.modalInstance = $modalInstance;
      },
      controllerAs: 'confirmRequestModal',
      size: 'lg',
      resolve: {
        emailLeader: function () {
          return email;
        },
        group: function () {
          return group;
        }
      }
    };

    var modalInstance = this.authModalService.open({
      loginTitle: 'Sign In',
      loginContentBlockId: 'groupToolAuthModalLoginText',
      registerTitle: 'Register',
      registerContentBlockId: 'groupToolAuthModalRegisterText',
      cancelButton: 'Back to Search Results',
      modal: modalOptions
    });
  }
}
