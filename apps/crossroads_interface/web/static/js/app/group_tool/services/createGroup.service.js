
import CONSTANTS from 'crds-constants';
import SmallGroup from '../model/smallGroup';
import Participant from '../model/participant';
import AgeRange from '../model/ageRange';
import Address from '../model/address';
import Category from '../model/category';
import GroupType from '../model/groupType';
import Profile from '../model/profile';

export default class CreateGroupService {
    /*@ngInject*/
    constructor($log, Profile, GroupService, Session, $rootScope, ImageService) {
        this.log = $log;
        this.profile = Profile;
        this.groupService = GroupService;
        this.session = Session;
        this.rootScope = $rootScope;
        this.model = {};
        this.resolved = false;
        this.imageService = ImageService;
        this.primaryContact = null;
        this.editGroupCongregationId = null;
        this.meetingFrequencyLookup = [{
            meetingFrequencyId: 1,
            meetingFrequencyDesc: 'Every week'
        }, {
            meetingFrequencyId: 2,
            meetingFrequencyDesc: 'Every other week'
        }, {
            meetingFrequencyId: 8,
            meetingFrequencyDesc: 'Every month'
        }];

        //this.statesLookup is added by the route resolve of the createGroupController.
        //this.profileData is added by the route resolve of the createGroupController.
        //this.countryLookup is added by the route resolve of the createGroupController.
        //this.originalAttributeTypes is added by setEditModel and used in mapToSmallGroup
        //this.originalSingleAttributes is added by setEditModel and used in mapToSmallGroup

    }

    reset() {
        this.resolved = false;
        this.model = {};
        this.profileData = {};
        this.originalAttributeTypes = null;
        this.originalSingleAttributes = null;
        this.primaryContact = null;
        this.editGroupCongregationId = null;
        this.primaryContactId = null;
    }

    setEditModel(groupData, profileData) {
        //this.log.debug("GroupDataFromServer:");
        this.log.debug(groupData);
        if (!this.resolved) {
            this.originalAttributeTypes = groupData.attributeTypes;
            this.originalSingleAttributes = groupData.singleAttributes;
            this.primaryContact = groupData.contactId;
            this.preloadModel(profileData);
            this.mapFromSmallGroup(groupData);
            this.resolved = true;
        }
    }

    setCreateModel(profileData) {
        if (!this.resolved) {
            this.preloadModel(profileData);
            delete this.model.profile.householdMembers;
            delete this.model.profile.congregationId;
            this.resolved = true;
        }
    }

    preloadModel(profile) {
        this.model.profile = profile;
        this.model.profile.oldEmail = profile.emailAddress;
        if (this.model.group !== undefined || this.model.group !== null) {
            this.model.group = {
                startDate: moment().format("MM/DD/YYYY"),
                meeting: {
                    time: "1983-07-16T21:00:00.000Z"
                },
            };
        }
        else {
            this.model.group.meeting = {
                time: "1983-07-16T21:00:00.000Z"
            }
            this.model.startDate = moment().format("MM/DD/YYYY");
        }
        this.model.group.availableOnline = null;
        this.model.specificDay = true;
    }

    getFields() {
        //this.log.debug(this.model);
        var profileAboutFields = {
            wrapper: 'createGroup',
            templateOptions: {
                sectionLabel: '$root.MESSAGES.groupToolCreateGroupProfile.content | html',
                sectionHelp: '$root.MESSAGES.groupToolCreateGroupProfileHelp.content | html'
            },
            fieldGroup: [{
                key: 'profile.congregationId',
                type: 'crdsSelect',
                templateOptions: {
                    label: 'What site do you regularly attend service?',
                    required: true,
                    valueProp: 'dp_RecordID',
                    labelProp: 'dp_RecordName',
                    options: []
                },
                controller: /* @ngInject */ function ($scope, GroupService, CreateGroupService) {
                    $scope.to.loading = GroupService.getSites().then(function (response) {
                        $scope.to.options = response;
                        CreateGroupService.sitesLookup = response;
                        return response;
                    });
                }
            }, {
                key: 'profile.dateOfBirth',
                type: 'crdsDatepicker',
                templateOptions: {
                    label: 'Birth Date',
                    required: true,
                    type: 'text',
                    datepickerPopup: 'MM/dd/yyyy'
                }
            }, {
                key: 'profile.genderId',
                type: 'crdsRadio',
                templateOptions: {
                    label: 'Gender',
                    required: true,
                    inline: false,
                    valueProp: 'dp_RecordID',
                    labelProp: 'dp_RecordName',
                    options: []
                },
                controller: /* @ngInject */ function ($scope, GroupService) {
                    $scope.to.loading = GroupService.getGenders().then(function (response) {
                        $scope.to.options = response;
                        CreateGroupService.genderLookup = response;
                        return response;
                    });
                }
            }, {
                type: 'crdsProfilePicture',
                wrapper: 'createGroupProfilePicture',
                templateOptions: {
                    contactId: this.model.profile.contactId,
                    title: 'Update/Add Profile Picture',
                    desc: 'This will display on your group page. (Optional)'
                }
            }]
        };
        var profileAddressFields = {
            wrapper: 'createGroup',
            templateOptions: {
                sectionLabel: '$root.MESSAGES.groupToolCreateGroupAddress.content | html',
                sectionHelp: '$root.MESSAGES.groupToolCreateGroupAddressHelp.content | html'
            },
            fieldGroup: [{
                key: 'profile.addressLine1',
                type: 'crdsInput',
                templateOptions: {
                    label: 'Street',
                    required: true,
                }
            }, {
                key: 'profile.city',
                type: 'crdsInput',
                templateOptions: {
                    label: 'City',
                    required: true,
                }
            }, {
                key: 'profile.state',
                type: 'crdsSelect',
                templateOptions: {
                    label: 'State',
                    required: true,
                    valueProp: 'dp_RecordName',
                    labelProp: 'dp_RecordName',
                    options: this.statesLookup
                }
            }, {
                key: 'profile.postalCode',
                type: 'crdsInput',
                templateOptions: {
                    label: 'Zip',
                    required: true,
                }
            }, {
                key: 'profile.foreignCountry',
                type: 'crdsSelect',
                templateOptions: {
                    label: 'Country',
                    required: true,
                    valueProp: 'dp_RecordName',
                    labelProp: 'dp_RecordName',
                    options: this.countryLookup
                }
            }]
        };
        var groupMeetingDateTimeFields = {
            wrapper: 'createGroup',
            templateOptions: {
                sectionLabel: '$root.MESSAGES.groupToolCreateGroupMeetingTime.content | html',
                sectionHelp: '$root.MESSAGES.groupToolCreateGroupMeetingTimeHelp.content | html'
            },
            fieldGroup: [{
                key: 'specificDay',
                type: 'crdsRadio',
                templateOptions: {
                    labelProp: 'label',
                    required: true,
                    inline: false,
                    options: [{
                        label: 'Specific Day and Time',
                        value: true
                    }, {
                        label: 'Flexible Meeting Time/Not Sure Yet',
                        value: false
                    }]
                }
            }, {
                key: 'group.meeting.day',
                type: 'crdsSelect',
                hideExpression: '!model.specificDay',
                templateOptions: {
                    label: 'Day',
                    required: true,
                    valueProp: 'dp_RecordID',
                    labelProp: 'dp_RecordName',
                    options: []
                },
                expressionProperties: {
                    'templateOptions.required': 'model.specificDay'
                },
                controller: /* @ngInject */ function ($scope, GroupService, CreateGroupService) {
                    $scope.to.loading = GroupService.getDaysOfTheWeek().then(function (response) {
                        let sortedResponse = _.sortBy(response, function (day) { return day.dp_RecordID; });
                        $scope.to.options = sortedResponse;
                        CreateGroupService.meetingDaysLookup = response;
                        return response;
                    });
                }
            }, {
                key: 'group.meeting.time',
                type: 'crdsTimepicker',
                hideExpression: '!model.specificDay',
                expressionProperties: {
                    'templateOptions.required': 'model.specificDay'
                },
                templateOptions: {
                    label: 'Time',
                    required: true,
                    minuteStep: 15
                }
            }, {
                key: 'group.meeting.frequency',
                type: 'crdsSelect',
                hideExpression: '!model.specificDay',
                expressionProperties: {
                    'templateOptions.required': 'model.specificDay'
                },
                templateOptions: {
                    label: 'Frequency',
                    required: true,
                    valueProp: 'meetingFrequencyId',
                    labelProp: 'meetingFrequencyDesc',
                    options: this.meetingFrequencyLookup
                }
            }]
        };
        var groupMeetingLocationFields = {
            wrapper: 'createGroup',
            templateOptions: {
                sectionLabel: '$root.MESSAGES.groupToolCreateGroupMeetingLocation.content | html',
                sectionHelp: '$root.MESSAGES.groupToolCreateGroupMeetingLocationHelp.content | html'
            },
            fieldGroup: [{
                key: 'group.meeting.online',
                type: 'crdsRadio',
                templateOptions: {
                    label: 'Where will your group meet?',
                    required: true,
                    labelProp: 'label',
                    valueProp: 'online',
                    inline: false,
                    options: [{
                        label: 'In person',
                        online: false
                    }, {
                        label: 'Online',
                        online: true
                    }]
                }
            }, {
                key: 'group.meeting.address.street',
                type: 'crdsInput',
                hideExpression: 'model.group.meeting.online',
                templateOptions: {
                    label: 'Street',
                    required: true,
                },
                expressionProperties: {
                    'templateOptions.required': '!model.group.meeting.online'
                }
            }, {
                key: 'group.meeting.address.city',
                type: 'crdsInput',
                hideExpression: 'model.group.meeting.online',
                templateOptions: {
                    label: 'City',
                    required: true,
                },
                expressionProperties: {
                    'templateOptions.required': '!model.group.meeting.online'
                }
            }, {
                key: 'group.meeting.address.state',
                type: 'crdsSelect',
                hideExpression: 'model.group.meeting.online',
                templateOptions: {
                    label: 'State',
                    required: true,
                    valueProp: 'dp_RecordName',
                    labelProp: 'dp_RecordName',
                    options: this.statesLookup
                },
                expressionProperties: {
                    'templateOptions.required': '!model.group.meeting.online'
                }
            }, {
                key: 'group.meeting.address.zip',
                type: 'crdsInput',
                optionsTypes: ['zipcode'],
                hideExpression: 'model.group.meeting.online',
                templateOptions: {
                    label: 'Zip',
                    required: true
                },
                expressionProperties: {
                    'templateOptions.required': '!model.group.meeting.online'
                }
            }, {
                key: 'group.kidFriendly',
                type: 'crdsRadio',
                hideExpression: 'model.group.meeting.online',
                templateOptions: {
                    required: true,
                    label: 'Are kids welcome at the group?',
                    labelProp: 'label',
                    valueProp: 'kidFriendly',
                    inline: false,
                    options: [{
                        label: 'Yep. Kids are welcome.  As a group, we’ll decide what to do with them.',
                        kidFriendly: true
                    }, {
                        label: 'No. Adults only please.',
                        kidFriendly: false
                    }]
                },
                expressionProperties: {
                    'templateOptions.required': '!model.group.meeting.online'
                }
            }]
        };
        var groupTypeFields = {
            wrapper: 'createGroup',
            templateOptions: {
                sectionLabel: '$root.MESSAGES.groupToolCreateGroupType.content | html',
                sectionHelp: '$root.MESSAGES.groupToolCreateGroupTypeHelp.content | html'
            },
            fieldGroup: [{
                key: 'group.typeId',
                type: 'crdsRadioDesc',
                templateOptions: {
                    labelProp: 'name',
                    required: true,
                    valueProp: 'attributeId',
                    descProp: 'description',
                    descInline: true,
                    bold: false,
                    options: []
                },
                controller: /* @ngInject */ function ($scope, $log, GroupService, CreateGroupService) {
                    $scope.to.loading = GroupService.getGroupGenderMixType().then(function (response) {
                        $scope.to.options = response.attributes;
                        CreateGroupService.typeIdLookup = response.attributes;
                        //$log.debug(CreateGroupService.model)
                        return response;
                    });
                }
            }]
        };
        var groupAgeFields = {
            wrapper: 'createGroup',
            templateOptions: {
                sectionLabel: '$root.MESSAGES.groupToolCreateGroupAge.content | html',
                sectionHelp: '$root.MESSAGES.groupToolCreateGroupAgeHelp.content | html'
            },
            fieldGroup: [{
                key: 'groupAgeRangeIds',
                type: 'crdsMultiCheckbox',
                wrapper: 'formlyBuilderShowAlert',
                templateOptions: {
                    valueProp: 'attributeId',
                    required: true,
                    labelProp: 'name',
                    sectionAlert: '$root.MESSAGES.groupToolStudentMinistryAlert.content',
                    showAlert: false,
                    options: []
                },
                expressionProperties: {
                    //Constants doesn't seem to work in expressionProperties
                    "templateOptions.showAlert": "(model.groupAgeRangeIds.includes(7089) || model.groupAgeRangeIds.includes(7090)) || false"
                },
                controller: /* @ngInject */ function ($scope, GroupService, CreateGroupService) {
                    $scope.to.loading = GroupService.getAgeRanges().then(function (response) {
                        $scope.to.options = response.attributes;
                        // note, the line above is shorthand for:
                        // $scope.options.templateOptions.options = data;
                        CreateGroupService.ageRangeLookup = response.attributes;
                        return response;
                    });
                }
            }]
        };
        var groupAboutFields = {
            wrapper: 'createGroup',
            templateOptions: {
                sectionLabel: '$root.MESSAGES.groupToolCreateGroupAbout.content | html',
                sectionHelp: '$root.MESSAGES.groupToolCreateGroupAboutHelp.content | html',
                groupExample: '$root.MESSAGES.groupToolCreateGroupAboutExample.content | html'
            },
            fieldGroup: [{
                key: 'group.groupName',
                type: 'crdsInput',
                templateOptions: {
                    label: 'Group Name',
                    placeholder: 'Ex. Brewing Brothers',
                    required: true,
                    maxlength: 75
                }
            }, {
                key: 'group.groupDescription',
                type: 'crdsTextArea',
                templateOptions: {
                    label: 'Group Description',
                    required: true,
                    placeholder: 'Ex:This group is for men in their 30s who like to brew their own beer. We’ll meet regularly to come up with a new beer and brew it together, and share some beers while we build friendships. We’ll meet in Pleasant Ridge weekly in my home.',
                    rows: 6,
                    maxlength: 2000
                }
            }]
        };
        var groupVisibilityFields = {
            wrapper: 'createGroup',
            templateOptions: {
                sectionLabel: '$root.MESSAGES.groupToolCreateGroupVisibility.content | html',
                sectionHelp: '$root.MESSAGES.groupToolCreateGroupVisibilityHelp.content | html'
            },
            fieldGroup: [{
                key: 'group.availableOnline',
                type: 'crdsRadio',
                wrapper: 'formlyBuilderShowAlert',
                templateOptions: {
                    valueProp: 'accessId',
                    labelProp: 'accessLabel',
                    required: true,
                    showAlert: false,
                    sectionAlert: '$root.MESSAGES.groupToolPrivateGroupAlert.content',
                    options: [{
                        accessId: true,
                        accessLabel: 'Public (Your group will be viewable in search results for everyone to see.)'
                    }, {
                        accessId: false,
                        accessLabel: 'Private (Your group will NOT be publically viewable in search results.)'
                    }]
                },
                expressionProperties: {
                    "templateOptions.showAlert": "(model.group.availableOnline !== null) ? !model.group.availableOnline : false"
                }
            }]
        };

        var groupCategoryFields = {
            wrapper: 'createGroup',
            templateOptions: {
                sectionLabel: '$root.MESSAGES.groupToolCreateGroupCategory.content | html',
                sectionHelp: '$root.MESSAGES.groupToolCreateGroupCategoryHelp.content | html'
            },
            fieldGroup: [{
                key: 'categories',
                type: 'crdsMultiCheckBoxCombo',
                templateOptions: {
                    required: true,
                    valueProp: 'categoryId',
                    labelProp: 'label',
                    descProp: 'labelDesc',
                    maxFieldLength: '25',
                    placeholder: 'placeholder',
                    options: this.parsedCategories,
                }
            }]
        }

        return [groupCategoryFields, groupMeetingDateTimeFields,
            groupMeetingLocationFields, groupTypeFields, groupAgeFields,
            groupAboutFields, groupVisibilityFields, profileAboutFields, profileAddressFields];
    }

    createGroupCategoryOptionList(categories) {
        var parsedCategories = [];

        _.forEach(categories, (category) => {
            var parsed = {
                categoryId: category.categoryId,
                label: category.name,
                labelDesc: category.desc,
                placeholder: category.exampleText
            };

            if (category.requiresActiveAttribute == true) {
                parsed.static = category.attribute.name;
                parsed.disabled = true;
                parsed.endDate = category.attribute.endDate;
            } else {
                parsed.disabled = false;
                parsed.static = '';
            }
            parsedCategories.push(parsed);
        });

        this.parsedCategories = parsedCategories;
        return parsedCategories;
    }

    getCategoryFromID(id){
        return _.find(this.parsedCategories, (cat) => {return cat.categoryId == id;});
    }

    getCategoryFromName(name){
        return _.find(this.parsedCategories, (cat) => {return cat.label == name});
    }

    mapFromSmallGroupAbout(smallGroup) {
        this.model.group.availableOnline = smallGroup.availableOnline;
        this.model.groupId = smallGroup.groupId;
        this.model.group.groupName = smallGroup.groupName;
        this.model.group.groupDescription = smallGroup.groupDescription;
        this.model.group.startDate = moment(smallGroup.startDate).format('MM/DD/YYYY');
        this.model.group.participants = _.map(smallGroup.Participants, (data) => { return new Participant(data) });
        this.editGroupCongregationId = smallGroup.congregationId;
        this.primaryContactId = smallGroup.contactId;
    }


    mapFromSmallGroupSingleAttributes(smallGroup) {
        if (smallGroup.singleAttributes[CONSTANTS.GROUP.GROUP_TYPE_ATTRIBUTE_TYPE_ID].attribute !== null &&
            smallGroup.singleAttributes[CONSTANTS.GROUP.GROUP_TYPE_ATTRIBUTE_TYPE_ID].attribute !== undefined) {

            this.model.group.typeId = smallGroup.singleAttributes[CONSTANTS.GROUP.GROUP_TYPE_ATTRIBUTE_TYPE_ID].attribute.attributeId
        }
    }

    mapFromSmallGroupMultipleAttributes(smallGroup) {
        var ageRangeIds = [];
        _.forEach(smallGroup.attributeTypes[CONSTANTS.GROUP.AGE_RANGE_ATTRIBUTE_TYPE_ID].attributes, (value, key) => {
            if (value.selected)
                ageRangeIds.push(value.attributeId)
        });
        if (_.includes(ageRangeIds, (CONSTANTS.ATTRIBUTE_IDS.MIDDLESCHOOLAGE || CONSTANTS.ATTRIBUTE_IDS.HIGHSCHOOLAGE))) {
            this.alreadyHasMinors = true;
        }
        else {
            this.alreadyHasMinors = false;
        }

        this.model.groupAgeRangeIds = ageRangeIds;
        this.log.debug(this.model.groupAgeRangeIds);
    }

    mapFromSmallGroupMeetingDay(smallGroup) {
        this.model.group.meeting.day = smallGroup.meetingDayId;
        smallGroup.meetingDayId == null || smallGroup.meetingDayId == undefined ? this.model.specificDay = false : this.model.specificDay = true;
    }

    mapFromSmallGroupMeetingTime(smallGroup) {
        this.model.group.meeting.frequency = smallGroup.meetingFrequencyID;
        if (smallGroup.meetingTime == null || smallGroup.meetingTime == undefined) {
            this.model.group.meeting.time = "1983-07-16T21:00:00.000Z";
        }
        else {
            let splitTime = smallGroup.meetingTime.split(":");
            this.model.group.meeting.time = moment(new Date(1983, 7, 16, splitTime[0], splitTime[1], splitTime[2]));
        }

    }

    mapFromSmallGroupMeetingPlace(smallGroup) {
        if (smallGroup.address != null && smallGroup.address != undefined) {
            this.model.group.meeting.address = {
                street: smallGroup.address.addressLine1,
                city: smallGroup.address.city,
                state: smallGroup.address.state,
                zip: smallGroup.address.zip,
                addressId: smallGroup.address.addressId
            }
            this.model.group.meeting.online = false;
        } else {
            this.model.group.meeting.online = true;
        }
        this.model.group.kidFriendly = smallGroup.kidsWelcome;
    }

    mapFromSmallGroupCategory(smallGroup) {
        var categories = [];
        _.forEach(smallGroup.attributeTypes[CONSTANTS.GROUP.ATTRIBUTE_TYPE_ID].attributes, (value, key) => {
            if (value.selected)
                categories.push({
                    value: this.getCategoryFromName(value.category).categoryId,
                    detail: value.name
                })
        });
        this.model.categories = categories;
    }

    mapFromSmallGroup(smallGroup) {
        this.mapFromSmallGroupAbout(smallGroup);
        this.mapFromSmallGroupSingleAttributes(smallGroup);
        this.mapFromSmallGroupMultipleAttributes(smallGroup);
        this.mapFromSmallGroupMeetingDay(smallGroup);
        this.mapFromSmallGroupMeetingTime(smallGroup);
        this.mapFromSmallGroupMeetingPlace(smallGroup);
        this.mapFromSmallGroupCategory(smallGroup);
    }

    mapToSmallGroupAbout(smallGroup) {
        smallGroup.availableOnline = this.model.group.availableOnline;

        smallGroup.congregationId = this.getCongregationId();

        smallGroup.groupDescription = this.model.group.groupDescription;
        smallGroup.groupId = this.model.groupId;
        smallGroup.groupName = this.model.group.groupName;
        smallGroup.groupTypeId = CONSTANTS.GROUP.GROUP_TYPE_ID.SMALL_GROUPS;
        smallGroup.ministryId = CONSTANTS.MINISTRY.SPIRITUAL_GROWTH;
        if (this.model.group.participants == null) {
            smallGroup.participants = [new Participant({
                groupRoleId: CONSTANTS.GROUP.ROLES.LEADER
                , nickName: this.model.profile.nickName
                , lastName: this.model.profile.lastName
                , email: this.model.profile.emailAddress
                , contactId: parseInt(this.session.exists('userId'))
            })];
        }
        else {
            smallGroup.participants = this.model.group.participants;
        }
        smallGroup.profile = new Profile(this.model.profile);
        smallGroup.startDate = moment(this.model.group.startDate).format('MM/DD/YYYY');
    }

    getCongregationId() {

        if (this.editGroupCongregationId == null) {
            return this.model.profile.congregationId;
        }
        else {
            return (this.primaryContactId === parseInt(this.session.exists('userId')))
                ? this.model.profile.congregationId : this.editGroupCongregationId;
        }
    }

    mapToSmallGroupType(smallGroup) {
        let groupType = _.find(this.typeIdLookup, (groupType) => {
            return groupType.attributeId === this.model.group.typeId
        });
        smallGroup.groupType = new GroupType({ attributeId: groupType.attributeId, name: groupType.name + ' ' + groupType.description });
    }

    mapToSmallGroupSingleAttributes(smallGroup) {
        smallGroup.singleAttributes = {};
        if (this.originalSingleAttributes != null || this.originalSingleAttributes != undefined) {
            smallGroup.singleAttributes = this.originalSingleAttributes;
            smallGroup.singleAttributes[CONSTANTS.GROUP.GROUP_TYPE_ATTRIBUTE_TYPE_ID].attribute = smallGroup.groupType;

        } else {
            smallGroup.singleAttributes[CONSTANTS.GROUP.GROUP_TYPE_ATTRIBUTE_TYPE_ID] = {
                "attribute": {
                    "attributeId": smallGroup.groupType.attributeId
                }
            }
        }
    }

    mapToSmallGroupMultipleAttributes(smallGroup) {
        let ageRangeNames = [];
        _.forEach(this.model.groupAgeRangeIds, (selectedRange) => {
            ageRangeNames.push(new AgeRange({
                name: _.find(this.ageRangeLookup, (range) => {
                    return range.attributeId == selectedRange
                }).name
            })
            )
        });
        if (this.model.groupAgeRangeIds != undefined && this.model.groupAgeRangeIds != null) {
            smallGroup.ageRange = ageRangeNames;
        }

        smallGroup.attributeTypes = {};
        if (this.originalAttributeTypes != null || this.originalAttributeTypes != undefined) {
            // set the original attribute types on to the small group
            smallGroup.attributeTypes = this.originalAttributeTypes;
            // set selected age ranges to true, all others to false
            _.forEach(smallGroup.attributeTypes[CONSTANTS.GROUP.AGE_RANGE_ATTRIBUTE_TYPE_ID].attributes, (ageRange) => {
                if (_.includes(this.model.groupAgeRangeIds, ageRange.attributeId, 0)) {
                    ageRange.selected = true;
                    if ((ageRange.attributeId == CONSTANTS.ATTRIBUTE_IDS.MIDDLESCHOOLAGE || ageRange.attributeId == CONSTANTS.ATTRIBUTE_IDS.HIGHSCHOOLAGE) && !this.alreadyHasMinors) {
                        smallGroup.minorAgeGroupsAdded = true;
                    }
                } else {
                    ageRange.selected = false;
                }
            });
        } else {
            var ids = [];
            _.forEach(this.model.groupAgeRangeIds, (id) => {
                ids.push(
                    {
                        "attributeId": id,
                        "name": "",
                        "description": null,
                        "selected": true,
                        "startDate": "0001-01-01T00:00:00",
                        "endDate": null,
                        "notes": null,
                        "sortOrder": 0,
                        "category": null,
                        "categoryDescription": null
                    })
                if (id == CONSTANTS.ATTRIBUTE_IDS.MIDDLESCHOOLAGE || id == CONSTANTS.ATTRIBUTE_IDS.HIGHSCHOOLAGE) {
                    smallGroup.minorAgeGroupsAdded = true;
                }
            });

            var ageRangeJson = {};
            ageRangeJson[CONSTANTS.GROUP.AGE_RANGE_ATTRIBUTE_TYPE_ID] = {
                "attributeTypeId": CONSTANTS.GROUP.AGE_RANGE_ATTRIBUTE_TYPE_ID,
                "name": "Age Range",
                "attributes": ids
            }
            smallGroup.attributeTypes = ageRangeJson;
        }
    }

    mapToSmallGroupMeetingDay(smallGroup) {
        smallGroup.meetingDayId = this.model.group.meeting.day;
        if (smallGroup.meetingDayId === null || smallGroup.meetingDayId === undefined) {
            delete smallGroup.meetingTime;
        } else {
            var dayObj = this.meetingDaysLookup.filter(day => day.dp_RecordID === smallGroup.meetingDayId)[0];
            smallGroup.meetingDay = dayObj.dp_RecordName;
        }
    }

    mapToSmallGroupMeetingTime(smallGroup) {
        smallGroup.meetingFrequencyId = this.model.group.meeting.frequency;
        if (this.model.specificDay) {
            smallGroup.meetingDayId = this.model.group.meeting.day;
            smallGroup.meetingTime = moment(this.model.group.meeting.time).format('LT');
            var freqObj = _.find(this.meetingFrequencyLookup, (data) => { return data.meetingFrequencyId == smallGroup.meetingFrequencyId; });
            if (freqObj !== undefined && freqObj !== null) {
                smallGroup.meetingFrequencyText = freqObj.meetingFrequencyDesc;
            }
        }
        else {
            smallGroup.meetingDayId = null;
            smallGroup.meetingTime = null;
            smallGroup.meetingDay = null;
        }

    }

    mapToSmallGroupMeetingPlace(smallGroup) {
        if (!this.model.group.meeting.online) {
            smallGroup.address = new Address();
            smallGroup.address.addressLine1 = this.model.group.meeting.address.street;
            smallGroup.address.addressLine2 = '';
            smallGroup.address.city = this.model.group.meeting.address.city;
            smallGroup.address.state = this.model.group.meeting.address.state;
            smallGroup.address.zip = this.model.group.meeting.address.zip;
            smallGroup.kidsWelcome = this.model.group.kidFriendly;
        } else {
            smallGroup.address = null;
            smallGroup.kidsWelcome = false;
        }
    }

    mapToSmallGroupCategory(smallGroup) {
        //set every category that the group came in with to selected = false if this is a load and
        //let the database worry about whether or not what we've added is new.
        if (this.originalAttributeTypes != null || this.originalAttributeTypes != undefined) {
            _.forEach(smallGroup.attributeTypes[CONSTANTS.GROUP.ATTRIBUTE_TYPE_ID].attributes, (attribute) => {
                attribute.selected = false;
            });
        }
        var ids = [];
        _.forEach(this.model.categories, (category) => {
            ids.push(
                {
                    attributeId: 0,
                    attributeTypeId: 90,
                    name: category.detail,
                    description: category.description,
                    selected: true,
                    startDate: category.startDate,
                    endDate: this.getCategoryFromID(category.value).endDate,
                    notes: null,
                    sortOrder: 0,
                    category: this.getCategoryFromID(category.value).label,
                    categoryId: category.value,
                    categoryDescription: null

                }
            )
        });

        var categoriesJson = {};
        categoriesJson[CONSTANTS.GROUP.ATTRIBUTE_TYPE_ID] = {
            "attributeTypeid": CONSTANTS.GROUP.ATTRIBUTE_TYPE_ID,
            "name": "Group Category",
            "attributes": ids
        };
        smallGroup.mapCategories(categoriesJson);
        this.log.debug('categoriesJson object');
        this.log.debug(categoriesJson);
        Object.assign(smallGroup.attributeTypes, smallGroup.attributeTypes, categoriesJson);
        this.log.debug('smallGroup.attributeTypes object');

        this.log.debug(smallGroup.attributeTypes);
    }

    mapToSmallGroup() {
        let smallGroup = new SmallGroup();
        this.mapToSmallGroupAbout(smallGroup);
        this.mapToSmallGroupType(smallGroup);
        this.mapToSmallGroupSingleAttributes(smallGroup);
        this.mapToSmallGroupMultipleAttributes(smallGroup);
        this.mapToSmallGroupMeetingDay(smallGroup);
        this.mapToSmallGroupMeetingTime(smallGroup);
        this.mapToSmallGroupMeetingPlace(smallGroup);
        this.mapToSmallGroupCategory(smallGroup);


        //TODO:  LOOK
        //primary contactId / Image (same as in groupDetail.about.controller.js - setGroupImageUrl() )
        //on an edit, we shouldn't change the contactId of a group because then if a co-leader edits the
        //group they will be the new primary contact, and we don't want that.
        if (this.primaryContact != null || this.primaryContact != undefined) {
            smallGroup.contactId = this.primaryContact;
        } else {
            smallGroup.contactId = this.model.profile.contactId;
        }
        smallGroup.primaryContact = {
            imageUrl: `${this.imageService.ProfileImageBaseURL}${this.model.profile.contactId}`,
            contactId: this.model.profile.contactId
        };

        return smallGroup;
    }

    convertAttributeTypes(list) {
        var results = {};
        _.each(list, function (item) {
            results[item.attributeTypeId] = item;
        });

        return results;
    }

    getMeetingFrequencies() {
        return this.meetingFrequencyLookup;
    }

}