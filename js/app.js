(function() {
'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .component('foundItems', {
    templateUrl: "templates/foundItems.template.html",
    bindings: {
      foundItems: "<",
      loading: "<",
      noresults: "<",
      onRemove: "&",
    }
  });

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  // UI State
  ctrl.noresults = false;
  ctrl.loading = false;
  // Data
  ctrl.searchTerm = "";
  ctrl.found = [];

  ctrl.getMatchedMenuItems = function getMatchedMenuItems() {
    ctrl.loading = true;
    ctrl.noresults = false;
    if (ctrl.searchTerm === "") {
      ctrl.loading = false;
      ctrl.noresults = true;
      return;
    }

    MenuSearchService.queryMenu(ctrl.searchTerm).then(function(results) {
      ctrl.found = results;
    }).finally(function() {
      ctrl.noresults = ctrl.found.length === 0 ? true : false;
      ctrl.loading = false;
    })
  };

  ctrl.removeItem = function removeItem(index) {
    ctrl.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ["$http"];
function MenuSearchService($http) {
  var service = this;

  service.queryMenu = function queryMenu(searchTerm) {
    return $http({
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    }).then(function(response) {
      return response.data.menu_items.filter(function(item) {
        return matchTerm(item.description, searchTerm);
      });
    });
  };
}

function matchTerm(text, searchTerm) {
  return text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
}

})();