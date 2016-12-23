(function(){
  'use strict';

  module.exports = GroupFinderRoutes;

  GroupFinderRoutes.$inject = ['$stateProvider', 'SERIES'];

  function GroupFinderRoutes($stateProvider, SERIES) {

    $stateProvider
      .state('group_finder', {
        url: '/' + SERIES.permalink,
        parent: 'noHeaderOrFooter',
        controller: 'GroupFinderCtrl as base',
        templateUrl: 'common/layout.html',
        resolve: {

        },
        data: {
          meta: {
            title: SERIES.title,
            description: ''
          }
        }
      })

      .state('group_finder.summary', {
        controller: 'SummaryCtrl as summary',
        url: '/summary',
        templateUrl: 'summary/summary.html',
        resolve: {
          StartProfileLoad: ['Person', function(Person) {
            Person.loadProfile();
          }],

          StartQuestionLoad: ['GroupQuestionService', 'ParticipantQuestionService',
            function(GroupQuestionService, ParticipantQuestionService) {
              GroupQuestionService.loadQuestions();
              ParticipantQuestionService.loadQuestions();
            }
          ],
          LoadGroupInfo: ['GroupInfo', function(GroupInfo) {
            return GroupInfo.loadGroupInfo();
          }]
        },
        data: {
          isProtected: true,
          meta: {
            title: SERIES.title,
            description: ''
          }
        }
      })

      .state('group_finder.invitation', {
        controller: 'GroupInvitationCtrl as invitation',
        url: '/group/join/:groupId',
        templateUrl: 'invitation/invitation.html',
        resolve: {
          LoadGroupInfo: ['GroupInfo', function(GroupInfo) {
            return GroupInfo.loadGroupInfo();
          }],

          AuthenticatedPerson: ['Person', function(Person) {
            return Person.getProfile();
          }],

          LookupDefinitions: ['ParticipantQuestionService', function(ParticipantQuestionService) {
            return ParticipantQuestionService;
          }]
        },
        data: {
          isProtected: true,
          meta: {
            title: SERIES.title,
            description: ''
          }
        }
      })

    ;

  }

})();
