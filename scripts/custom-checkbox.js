'use strict';

document.addEventListener("DOMContentLoaded", function () {
    var checkedAttributeName = "aria-checked";

    var toggleCheckBox = function (elem) {
        if (elem.getAttribute(checkedAttributeName) === "true") {
            elem.setAttribute(checkedAttributeName, "false");
        } else {
            elem.setAttribute(checkedAttributeName, "true");
        }
    };

    var checkBoxLabels = document.querySelectorAll(".b-checkbox-container__label");

    var toggleCheckBoxFunction = function (e) {
        toggleCheckBox(e.srcElement);
    };

    var clickCheckBoxFunction = function (e) {
        e.preventDefault();
        if (e.which === 32 || e.which === 13) {
            e.srcElement.click();
        }
    };

    checkBoxLabels.forEach(function (item) {
        item.addEventListener("click", toggleCheckBoxFunction);
        item.addEventListener("keypress", clickCheckBoxFunction);
    });
});