/**
 * Created by User on 7/11/2016.
 */
define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    (function (TimeSlotType) {
        TimeSlotType[TimeSlotType["Available"] = 0] = "Available";
        TimeSlotType[TimeSlotType["Booking"] = 1] = "Booking";
    })(exports.TimeSlotType || (exports.TimeSlotType = {}));
    var TimeSlotType = exports.TimeSlotType;
    var TimeSlot = (function () {
        function TimeSlot() {
        }
        return TimeSlot;
    }());
    exports.TimeSlot = TimeSlot;
    var DayScheduleViewControlOptions = (function () {
        function DayScheduleViewControlOptions() {
        }
        return DayScheduleViewControlOptions;
    }());
    exports.DayScheduleViewControlOptions = DayScheduleViewControlOptions;
    var openTimeSlotDeletionBox = (function () {
        function openTimeSlotDeletionBox() {
        }
        return openTimeSlotDeletionBox;
    }());
    var DayScheduleViewControl = (function () {
        function DayScheduleViewControl(canvas, options) {
            var _this = this;
            this.draw = function () {
                var self = _this;
                var ctx = _this.canvas.getContext("2d");
                var canvasheight = _this.canvas.height;
                var canvaswidth = _this.canvas.width;
                var startdayminute = _this.options.startTimeHour * 60;
                var enddayminute = _this.options.endTimeHour * 60;
                var minutedayspan = enddayminute - startdayminute;
                var pixelsperminutey = canvasheight / minutedayspan;
                // draw background
                ctx.fillStyle = _this.options.backColor;
                ctx.fillRect(0, 0, canvaswidth, canvasheight);
                // draw open time slots
                _this.arrayOpenTimeSlotDeletionBoxes = [];
                for (var i = 0; i < _this.arrayTimeSlots.length; i++) {
                    if (_this.arrayTimeSlots[i].timeSlotType == TimeSlotType.Available) {
                        var startminute = (_this.arrayTimeSlots[i].starthour - _this.options.startTimeHour) * 60;
                        startminute = startminute + _this.arrayTimeSlots[i].startminute;
                        var endminute = (_this.arrayTimeSlots[i].endhour - _this.options.startTimeHour) * 60;
                        endminute = endminute + _this.arrayTimeSlots[i].endminute;
                        var offset = 50;
                        ctx.fillStyle = _this.options.openTimeSlotColor;
                        ctx.fillRect(offset, startminute * pixelsperminutey, canvaswidth - offset, (endminute - startminute) * pixelsperminutey);
                        if (true === _this.options.drawDeleteButtonOnOpenTimeSlots) {
                            ctx.fillStyle = "red";
                            ctx.fillRect(canvaswidth - 10, startminute * pixelsperminutey, 10, 10);
                            var aopenTimeSlotDeletionBox = new openTimeSlotDeletionBox();
                            aopenTimeSlotDeletionBox.index = i;
                            aopenTimeSlotDeletionBox.x = canvaswidth - 10;
                            aopenTimeSlotDeletionBox.y = startminute * pixelsperminutey;
                            aopenTimeSlotDeletionBox.width = 10;
                            aopenTimeSlotDeletionBox.height = 10;
                            aopenTimeSlotDeletionBox.id = _this.arrayTimeSlots[i].id;
                            _this.arrayOpenTimeSlotDeletionBoxes.push(aopenTimeSlotDeletionBox);
                        }
                    }
                }
                // draw booked time slots
                for (var i = 0; i < _this.arrayTimeSlots.length; i++) {
                    if (_this.arrayTimeSlots[i].timeSlotType == TimeSlotType.Booking) {
                        var startminute = (_this.arrayTimeSlots[i].starthour - _this.options.startTimeHour) * 60;
                        startminute = startminute + _this.arrayTimeSlots[i].startminute;
                        var endminute = (_this.arrayTimeSlots[i].endhour - _this.options.startTimeHour) * 60;
                        endminute = endminute + _this.arrayTimeSlots[i].endminute;
                        var offset = 70;
                        ctx.fillStyle = _this.options.bookedTimeSlotColor;
                        ctx.fillRect(offset, startminute * pixelsperminutey, canvaswidth - offset, (endminute - startminute) * pixelsperminutey);
                    }
                }
                // draw scale over everything previous
                for (var i = 0; i < _this.options.endTimeHour - _this.options.startTimeHour; i++) {
                    ctx.beginPath();
                    ctx.moveTo(0, (i * 60) * pixelsperminutey);
                    ctx.lineTo(canvaswidth, (i * 60) * pixelsperminutey);
                    ctx.stroke();
                    var currenthour = _this.options.startTimeHour + i;
                    var ampm = ' am';
                    if (currenthour > 12) {
                        currenthour = currenthour - 12;
                        ampm = ' pm';
                    }
                    ctx.font = "14px Arial";
                    ctx.fillStyle = "black";
                    ctx.fillText(currenthour + ampm, 2, (i * 60) * pixelsperminutey + 15 /* offset */);
                }
                $(_this.canvas).unbind('click').bind('click', function (event) {
                    for (var i = 0; i < self.arrayOpenTimeSlotDeletionBoxes.length; i++) {
                        var xyVal = self.getMousePos(self.canvas, event);
                        if ((xyVal.x >= self.arrayOpenTimeSlotDeletionBoxes[i].x) &&
                            (xyVal.x <= self.arrayOpenTimeSlotDeletionBoxes[i].x + 10) &&
                            (xyVal.y >= self.arrayOpenTimeSlotDeletionBoxes[i].y) &&
                            (xyVal.y <= self.arrayOpenTimeSlotDeletionBoxes[i].y + 10)) {
                            self.options.onDeleteOpenTimeSlotCallback(self.arrayOpenTimeSlotDeletionBoxes[i].index, self.arrayOpenTimeSlotDeletionBoxes[i].id);
                            break;
                        }
                    }
                });
            };
            this.arrayTimeSlots = new Array();
            this.canvas = canvas;
            this.options = options;
            this.draw();
        }
        DayScheduleViewControl.prototype.getMousePos = function (canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        };
        DayScheduleViewControl.prototype.setHeight = function (height) {
            $(this.canvas).height(height);
            this.draw();
        };
        DayScheduleViewControl.prototype.setWidth = function (width) {
            $(this.canvas).width(width);
            this.draw();
        };
        DayScheduleViewControl.prototype.addTimeSlot = function (aTimeSlot) {
            this.arrayTimeSlots.push(aTimeSlot);
            this.draw();
        };
        DayScheduleViewControl.prototype.deleteTimeSlot = function (index) {
            this.arrayTimeSlots.splice(index, 1);
            this.draw();
        };
        DayScheduleViewControl.prototype.retrieveTimeSlots = function () {
            return this.arrayTimeSlots;
        };
        DayScheduleViewControl.prototype.retrieveTimeSlotsCount = function () {
            return this.arrayTimeSlots.length;
        };
        DayScheduleViewControl.prototype.clearTimeSlots = function () {
            this.arrayTimeSlots = [];
            this.draw();
        };
        return DayScheduleViewControl;
    }());
    exports.DayScheduleViewControl = DayScheduleViewControl;
});
//# sourceMappingURL=dayscheduleviewcontrol.js.map