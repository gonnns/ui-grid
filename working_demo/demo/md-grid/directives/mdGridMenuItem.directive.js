angular.module('md-grid')
    .directive('uiGridMenuItem', uiGridMenuItem);
uiGridMenuItem.$inject = ['gridUtil', '$compile', '$templateRequest', 'i18nService'];

function uiGridMenuItem(gridUtil, $compile, $templateRequest, i18nService) {
    
    return {
        priority: 0,
        scope: {
            name: '=',
            active: '=',
            action: '=',
            icon: '=',
            shown: '=',
            context: '=',
            templateUrl: '=',
            leaveOpen: '=',
            screenReaderOnly: '='
        },
        require: ['?^uiGrid'],
        replace: false,
        compile: compileFunc,
        link: linkFunc
    };
    
    function linkFunc ($templateRequest, $compile) {
        var template;
        $templateRequest('ui-grid/uiGridMenuItem').then((html) => {
           var template;
            template = angular.element(html);
            element.append(template);
            $compile(template)(scope);
        });
    }
    
    function compileFunc () {
        return {
                pre: function ($scope, $elm) {
                    if ($scope.templateUrl) {
                        gridUtil.getTemplate($scope.templateUrl)
                            .then(function (contents) {
                                var template = angular.element(contents);

                                var newElm = $compile(template)($scope);
                                $elm.replaceWith(newElm);
                            });
                    }
                },
                post: function ($scope, $elm, $attrs, controllers) {
                    var uiGridCtrl = controllers[0];

                    // TODO(c0bra): validate that shown and active are functions if they're defined. An exception is already thrown above this though
                    // if (typeof($scope.shown) !== 'undefined' && $scope.shown && typeof($scope.shown) !== 'function') {
                    //   throw new TypeError("$scope.shown is defined but not a function");
                    // }
                    if (typeof ($scope.shown) === 'undefined' || $scope.shown === null) {
                        $scope.shown = function () {
                            return true;
                        };
                    }

                    $scope.itemShown = function () {
                        var context = {};
                        if ($scope.context) {
                            context.context = $scope.context;
                        }

                        if (typeof (uiGridCtrl) !== 'undefined' && uiGridCtrl) {
                            context.grid = uiGridCtrl.grid;
                        }

                        return $scope.shown.call(context);
                    };

                    $scope.itemAction = function ($event, title) {
                        gridUtil.logDebug('itemAction');
                        $event.stopPropagation();

                        if (typeof ($scope.action) === 'function') {
                            var context = {};

                            if ($scope.context) {
                                context.context = $scope.context;
                            }

                            // Add the grid to the function call context if the uiGrid controller is present
                            if (typeof (uiGridCtrl) !== 'undefined' && uiGridCtrl) {
                                context.grid = uiGridCtrl.grid;
                            }

                            $scope.action.call(context, $event, title);

                            if (!$scope.leaveOpen) {
                                $scope.$emit('hide-menu');
                            } else {
                                /*
                                 * XXX: Fix after column refactor
                                 * Ideally the focus would remain on the item.
                                 * However, since there are two menu items that have their 'show' property toggled instead. This is a quick fix.
                                 */
                                gridUtil.focus.bySelector(angular.element(gridUtil.closestElm($elm, ".ui-grid-menu-items")), 'button[type=button]', true);
                            }
                        }
                    };

                    $scope.i18n = i18nService.get();
                }
            };
    }
//    var uiGridMenuItem = {
//        priority: 0,
//        scope: {
//            name: '=',
//            active: '=',
//            action: '=',
//            icon: '=',
//            shown: '=',
//            context: '=',
//            templateUrl: '=',
//            leaveOpen: '=',
//            screenReaderOnly: '='
//        },
//        require: ['?^uiGrid'],
//        templateUrl: 'ui-grid/uiGridMenuItem',
//        replace: false,
//        compile: function () {
//            return {
//                pre: function ($scope, $elm) {
//                    if ($scope.templateUrl) {
//                        gridUtil.getTemplate($scope.templateUrl)
//                            .then(function (contents) {
//                                var template = angular.element(contents);
//
//                                var newElm = $compile(template)($scope);
//                                $elm.replaceWith(newElm);
//                            });
//                    }
//                },
//                post: function ($scope, $elm, $attrs, controllers) {
//                    var uiGridCtrl = controllers[0];
//
//                    // TODO(c0bra): validate that shown and active are functions if they're defined. An exception is already thrown above this though
//                    // if (typeof($scope.shown) !== 'undefined' && $scope.shown && typeof($scope.shown) !== 'function') {
//                    //   throw new TypeError("$scope.shown is defined but not a function");
//                    // }
//                    if (typeof ($scope.shown) === 'undefined' || $scope.shown === null) {
//                        $scope.shown = function () {
//                            return true;
//                        };
//                    }
//
//                    $scope.itemShown = function () {
//                        var context = {};
//                        if ($scope.context) {
//                            context.context = $scope.context;
//                        }
//
//                        if (typeof (uiGridCtrl) !== 'undefined' && uiGridCtrl) {
//                            context.grid = uiGridCtrl.grid;
//                        }
//
//                        return $scope.shown.call(context);
//                    };
//
//                    $scope.itemAction = function ($event, title) {
//                        gridUtil.logDebug('itemAction');
//                        $event.stopPropagation();
//
//                        if (typeof ($scope.action) === 'function') {
//                            var context = {};
//
//                            if ($scope.context) {
//                                context.context = $scope.context;
//                            }
//
//                            // Add the grid to the function call context if the uiGrid controller is present
//                            if (typeof (uiGridCtrl) !== 'undefined' && uiGridCtrl) {
//                                context.grid = uiGridCtrl.grid;
//                            }
//
//                            $scope.action.call(context, $event, title);
//
//                            if (!$scope.leaveOpen) {
//                                $scope.$emit('hide-menu');
//                            } else {
//                                /*
//                                 * XXX: Fix after column refactor
//                                 * Ideally the focus would remain on the item.
//                                 * However, since there are two menu items that have their 'show' property toggled instead. This is a quick fix.
//                                 */
//                                gridUtil.focus.bySelector(angular.element(gridUtil.closestElm($elm, ".ui-grid-menu-items")), 'button[type=button]', true);
//                            }
//                        }
//                    };
//
//                    $scope.i18n = i18nService.get();
//                }
//            };
//        }
//    };
//
//    return uiGridMenuItem;
}