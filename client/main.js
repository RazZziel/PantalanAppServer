"use strict";

var highlight = function() {
    var item = $(this.firstNode);
    item.addClass('loading');
    setTimeout(function() {
        item.removeClass('loading');
    }, 200);
}
