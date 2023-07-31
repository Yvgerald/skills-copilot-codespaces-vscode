function skillsMembers() {
  return {
    restrict: 'E',
    templateUrl: 'templates/skills-members.html',
    controller: 'SkillsMembersCtrl',
    controllerAs: 'skillsMembers',
    scope: {
      members: '=',
      skills: '='
    }
  };
}