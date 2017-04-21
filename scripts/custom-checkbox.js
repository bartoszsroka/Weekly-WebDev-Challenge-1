'use strict';

(function () {
    var checkedAttributeName = "aria-checked";

    var toggleCheckBox = function (elem) {
        if (elem.getAttribute(checkedAttributeName) === "true") {
            elem.setAttribute(checkedAttributeName, "false");
        } else {
            elem.setAttribute(checkedAttributeName, "true");
        }
    };

    var checkBoxes = document.querySelectorAll(".b-form-input--check");

    var toggleCheckBoxFunction = function (e) {
        toggleCheckBox(e.srcElement);
    };

    var clickCheckBoxFunction = function (e) {
        e.preventDefault();
        if (e.which === 32 || e.which === 13) {
            e.srcElement.click();
        }
    };

    Object.keys(checkBoxes).forEach(function (index) {
        var checkBox = checkBoxes[index];
        checkBox.style.outline = "none";
        checkBox.addEventListener("click", toggleCheckBoxFunction);
        checkBox.addEventListener("keypress", clickCheckBoxFunction);
    });
}());