$(document).ready(
    function(){
        function containerCssClass(){
            return ".input-container";
        };

        function containerFocusedCssClass(){
            return "input-container-focused"
        };

        function containerHoveredCssClass(){
            return "input-container-hovered"
        };

        function formComponentsSelector(){
            return "input, select, textarea";
        };

        var addClassFunction = function(cssClass){
            return function(){
                $(this).closest(containerCssClass()).addClass(cssClass);
            }
        };

        var removeClassFunction = function(cssClass){
            return function(){
                $(this).closest(containerCssClass()).removeClass(cssClass);
            }
        };

        $(formComponentsSelector()).focusin(addClassFunction(containerFocusedCssClass()));
        $(formComponentsSelector()).mouseover(addClassFunction(containerHoveredCssClass()));
        $(formComponentsSelector()).focusout(removeClassFunction(containerFocusedCssClass()));
        $(formComponentsSelector()).mouseout(removeClassFunction(containerHoveredCssClass()));
    }
);