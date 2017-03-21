import jQuery from 'jquery';
(function ($) {
    $.fn.swipe = function (type, fn, option) {
        var setting = {
            disX: 50,
            disY: 50,
            responseTime: 500,
            isPreventDefult: true,
            className:""

        };
        if (this.size()<=0) {
            return false;
        }
        this[0].listener = this[0].listener || {};
        this[0].listener[type] = this[0].listener[type] || [];
        this[0].listener[type].push(fn);
        var _this = this[0];
        var self = this;
        var isMobile = "ontouchstart" in window;
        var CLICK = isMobile ? "touchstart" : "mousedown";
        var MOVE = isMobile ? "touchmove" : "mousemove";
        var UP = isMobile ? "touchend" : "mouseup";
        var config = $.extend(setting, option);
        this.on(CLICK, function (e) {
            var e = isMobile ? e.originalEvent.changedTouches[0] : e;
            var startX = e.pageX, startY = e.pageY, startTime = Date.now();
            self.on(MOVE, function (e) {
                var e = isMobile ? e.originalEvent.changedTouches[0] : e;
                var endX = e.pageX, endY = e.pageY, endTime = Date.now();
                if (type.toLowerCase() === "left" && Math.abs((endY - startY) / (endX - startX)) <= 1 && (startX - endX) > config.disX) {
                    self.off(MOVE);
                    for (var i = 0; i < _this.listener[type].length; i++) {
                        _this.listener[type][i] && _this.listener[type][i](e, _this);
                    }
                }
                else if (type.toLowerCase() === "right" && Math.abs((endY - startY) / (endX - startX)) <= 1 && (endX - startX) > config.disX) {
                    self.off(MOVE);
                    for (var i = 0; i < _this.listener[type].length; i++) {
                        _this.listener[type][i] && _this.listener[type][i](e, _this);
                    }
                }
                else {
                    e.preventDefault && e.preventDefault();
                    return false;
                }

            }).on(UP, function (e) {
                var e = isMobile ? e.originalEvent.changedTouches[0] : e;
                var endX = e.pageX, endY = e.pageY, endTime = Date.now();
                if (endTime - startTime >= config.responseTime) {
                    return;
                }
                switch (type.toLowerCase()) {
                    case "down":
                        if ((endY - startY) > config.disY && Math.abs((endY - startY) / (endX - startX)) > 1) {
                            for (var i = 0; i < _this.listener[type].length; i++) {
                                _this.listener[type][i] && _this.listener[type][i](e, _this);
                            }
                        }
                        break;
                    case "up":
                        if ((startY - endY) > config.disY && Math.abs((endY - startY) / (endX - startX)) > 1) {
                            for (var i = 0; i < _this.listener[type].length; i++) {
                                _this.listener[type][i] && _this.listener[type][i](e, _this);
                            }
                        }
                        break;
                }
               
            });
             
            //if (!isMobile) {
            //    $(_this).off("mousemove mouseup");
            //    return false;
            //}
        });

        return this;
    }

})(jQuery);