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

    mdGridController.$inject = ['$scope', 'i18nService', 'uiGridExporterConstants'];

    function mdGridController($scope, i18nService, uiGridExporterConstants) {
        var self, data, i;

        self = this;

        self.gridOptions = {
            maxVisibleColumnCount: 10,
            showGridFooter: true,
            enableSorting: true,
            enableFiltering: true,
            enableGridMenu: true,
            data: '',
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
            gridMenuCustomItems: [
                        {
                            title: i18nService.getSafeText('gridMenu.exporterAllAsCsv'),
                            action: function ($event) {
                                this.grid.api.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                            },
                            shown: function () {
                                return this.grid.options.exporterMenuCsv && this.grid.options.exporterMenuAllData;
                            },
                            order: 200
            },
                        {
                            title: i18nService.getSafeText('gridMenu.exporterVisibleAsCsv'),
                            action: function ($event) {
                                this.grid.api.exporter.csvExport(uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE);
                            },
                            shown: function () {
                                return this.grid.options.exporterMenuCsv && this.grid.options.exporterMenuVisibleData;
                            },
                            order: 201
            },
                        {
                            title: i18nService.getSafeText('gridMenu.exporterSelectedAsCsv'),
                            action: function ($event) {
                                this.grid.api.exporter.csvExport(uiGridExporterConstants.SELECTED, uiGridExporterConstants.VISIBLE);
                            },
                            shown: function () {
                                return this.grid.options.exporterMenuCsv && this.grid.options.exporterMenuSelectedData &&
                                    (this.grid.api.selection && this.grid.api.selection.getSelectedRows().length > 0);
                            },
                            order: 202
            },
                        {
                            title: i18nService.getSafeText('gridMenu.exporterAllAsPdf'),
                            action: function ($event) {
                                this.grid.api.exporter.pdfExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                            },
                            shown: function () {
                                return this.grid.options.exporterMenuPdf && this.grid.options.exporterMenuAllData;
                            },
                            order: 203
            },
                        {
                            title: i18nService.getSafeText('gridMenu.exporterVisibleAsPdf'),
                            action: function ($event) {
                                this.grid.api.exporter.pdfExport(uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE);
                            },
                            shown: function () {
                                return this.grid.options.exporterMenuPdf && this.grid.options.exporterMenuVisibleData;
                            },
                            order: 204
            },
                        {
                            title: i18nService.getSafeText('gridMenu.exporterSelectedAsPdf'),
                            action: function ($event) {
                                this.grid.api.exporter.pdfExport(uiGridExporterConstants.SELECTED, uiGridExporterConstants.VISIBLE);
                            },
                            shown: function () {
                                return this.grid.options.exporterMenuPdf && this.grid.options.exporterMenuSelectedData &&
                                    (this.grid.api.selection && this.grid.api.selection.getSelectedRows().length > 0);
                            },
                            order: 205
            }
          ],
            onRegisterApi: function (gridApi) {
                self.grid1Api = gridApi;
                console.log(gridApi);
            }
        };

        data = [];

        for (i = 0; i < 25; i += 1) {
            data.push({
                name: 'Name ' + i,
                gender: 'Gender ' + i,
                company: 'Company ' + i
            });
        }

        self.gridOptions.data = data;
    }
}());
