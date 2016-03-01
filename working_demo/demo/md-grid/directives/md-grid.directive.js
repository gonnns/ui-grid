/*global angular */
(function () {
    'use strict';
    angular.module('md-grid')
        .directive('mdGrid', mdGrid);

    mdGrid.$inject = ['$templateRequest', '$compile'];

    function mdGrid($templateRequest, $compile) {

        return {
            restrict: 'AE',
            scope: {},
            controller: mdGridController,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        function linkFunc(scope, element) {
            $templateRequest('demo/md-grid/partials/md-grid.main.tpl.html').then((html) => {
                var template;
                template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    }

    mdGridController.$inject = ['$scope'];

    function mdGridController($scope) {
        var self, data, i;

        self = this;

        self.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            enableGridMenu: true,
            columnDefs: [
                {
                    field: 'name'
                },
                {
                    field: 'gender'
                },
                {
                    field: 'company',
                    enableSorting: false
                }
            ],
            onRegisterApi: function (gridApi) {
                self.grid1Api = gridApi;
            }
        };
        
        data = [];
        
        for (i = 0; i < 25; i += 1) {
            data.push(
                {
                    name: 'Name ' + i,
                    gender: 'Gener ' + i,
                    company: 'Company ' + i
                }
            );
        }
        
        self.data = data;
        //$scope.$apply();
    }
}());