"use strict";

$(document).ready(
    function () {
        function containerCssClass() {
            return ".b-form-item";
        }

        function containerFocusedCssClass() {
            return "b-form-item--focused";
        }

        function containerHoveredCssClass() {
            return "b-form-item--hovered";
        }

        function formComponentsSelector() {
            return ".b-form-input, .b-form-input--multiline";
        }

        var addClassFunction = function (cssClass) {
            return function () {
                $(this).closest(containerCssClass()).addClass(cssClass);
            };
        };

        var removeClassFunction = function (cssClass) {
            return function () {
                $(this).closest(containerCssClass()).removeClass(cssClass);
            };
        };

        $(formComponentsSelector()).css("outline", "none");
        $(formComponentsSelector()).focusin(addClassFunction(containerFocusedCssClass()));
        $(formComponentsSelector()).mouseover(addClassFunction(containerHoveredCssClass()));
        $(formComponentsSelector()).focusout(removeClassFunction(containerFocusedCssClass()));
        $(formComponentsSelector()).mouseout(removeClassFunction(containerHoveredCssClass()));
    }
);