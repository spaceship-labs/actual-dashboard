(function ()
{
    'use strict';

    angular
        .module('app.directives')
        .directive('formHelper', formHelper);

    /** @ngInject */
    function formHelper()
    {
        return {
            restrict: 'EA',
            scope   : {
            },
            templateUrl: 'app/main/directives/form-helper/form-helper.html',
            compile : function (tElement)
            {
                // Add class
                tElement.addClass('form-helper');

                return function postLink(scope, iElement)
                {
                    // Methods
                    scope.cardTemplateLoaded = cardTemplateLoaded;
                    console.log('form-helper')

                    //////////

                    /**
                     * Emit cardTemplateLoaded event
                     */
                    function cardTemplateLoaded()
                    {
                        scope.$emit('msCard::cardTemplateLoaded', iElement);
                    }
                };
            }
        };
    }
})();
