/**
 * Created by User on 7/12/2016.
 */
define(["require", "exports", "./dayscheduleviewcontrol", "jquery"], function (require, exports, dayscheduleviewcontrol_1, $) {
    "use strict";
    dayscheduleviewcontrol_1.DayScheduleViewControl;
    $(function () {
        // initialize all controls and settings
        $('#controlheight').val($('#control').height());
        $('#controlwidth').val($('#control').width());
        // create our schedule control
        var options = new dayscheduleviewcontrol_1.DayScheduleViewControlOptions();
        options.startTimeHour = 7;
        options.endTimeHour = 18;
        options.backColor = "darkgrey";
        options.openTimeSlotColor = "blue";
        options.bookedTimeSlotColor = "white";
        var control = new dayscheduleviewcontrol_1.DayScheduleViewControl($('#control')[0], options);
        // load sample data
        var timeslotmorning = new dayscheduleviewcontrol_1.TimeSlot();
        timeslotmorning.timeSlotType = dayscheduleviewcontrol_1.TimeSlotType.Available;
        timeslotmorning.starthour = 7;
        timeslotmorning.startminute = 30;
        timeslotmorning.endhour = 11;
        timeslotmorning.endminute = 0;
        control.addTimeSlot(timeslotmorning);
        var timeslotafternoon = new dayscheduleviewcontrol_1.TimeSlot();
        timeslotafternoon.timeSlotType = dayscheduleviewcontrol_1.TimeSlotType.Available;
        timeslotafternoon.starthour = 12;
        timeslotafternoon.startminute = 0;
        timeslotafternoon.endhour = 17;
        timeslotafternoon.endminute = 0;
        control.addTimeSlot(timeslotafternoon);
        var timeslotallocationone = new dayscheduleviewcontrol_1.TimeSlot();
        timeslotallocationone.timeSlotType = dayscheduleviewcontrol_1.TimeSlotType.Booking;
        timeslotallocationone.starthour = 7;
        timeslotallocationone.startminute = 45;
        timeslotallocationone.endhour = 10;
        timeslotallocationone.endminute = 0;
        control.addTimeSlot(timeslotallocationone);
        var timeslotallocationtwo = new dayscheduleviewcontrol_1.TimeSlot();
        timeslotallocationtwo.timeSlotType = dayscheduleviewcontrol_1.TimeSlotType.Booking;
        timeslotallocationtwo.starthour = 13;
        timeslotallocationtwo.startminute = 15;
        timeslotallocationtwo.endhour = 15;
        timeslotallocationtwo.endminute = 0;
        control.addTimeSlot(timeslotallocationtwo);
        var timeslotallocationthree = new dayscheduleviewcontrol_1.TimeSlot();
        timeslotallocationthree.timeSlotType = dayscheduleviewcontrol_1.TimeSlotType.Booking;
        timeslotallocationthree.starthour = 16;
        timeslotallocationthree.startminute = 0;
        timeslotallocationthree.endhour = 16;
        timeslotallocationthree.endminute = 30;
        control.addTimeSlot(timeslotallocationthree);
        // events
        $('#buttonsetheight').click(function () {
            control.setHeight(parseInt($('#controlheight').val()));
        });
        $('#buttonsetwidth').click(function () {
            control.setWidth(parseInt($('#controlwidth').val()));
        });
        var optionsdelete = new dayscheduleviewcontrol_1.DayScheduleViewControlOptions();
        optionsdelete.drawDeleteButtonOnOpenTimeSlots = true;
        optionsdelete.startTimeHour = 7;
        optionsdelete.endTimeHour = 18;
        optionsdelete.backColor = "darkgrey";
        optionsdelete.openTimeSlotColor = "blue";
        optionsdelete.bookedTimeSlotColor = "white";
        optionsdelete.onDeleteOpenTimeSlotCallback = function (openTimeSlotIndex) {
            alert(openTimeSlotIndex + "requested to delete");
            controldelete.deleteTimeSlot(openTimeSlotIndex);
        };
        var controldelete = new dayscheduleviewcontrol_1.DayScheduleViewControl($('#controldelete')[0], optionsdelete);
        // load sample data
        var timeslotmorningdelete = new dayscheduleviewcontrol_1.TimeSlot();
        timeslotmorningdelete.timeSlotType = dayscheduleviewcontrol_1.TimeSlotType.Available;
        timeslotmorningdelete.starthour = 7;
        timeslotmorningdelete.startminute = 30;
        timeslotmorningdelete.endhour = 11;
        timeslotmorningdelete.endminute = 0;
        controldelete.addTimeSlot(timeslotmorningdelete);
        var timeslotafternoondelete = new dayscheduleviewcontrol_1.TimeSlot();
        timeslotafternoondelete.timeSlotType = dayscheduleviewcontrol_1.TimeSlotType.Available;
        timeslotafternoondelete.starthour = 12;
        timeslotafternoondelete.startminute = 0;
        timeslotafternoondelete.endhour = 17;
        timeslotafternoondelete.endminute = 0;
        controldelete.addTimeSlot(timeslotafternoondelete);
    });
});
//# sourceMappingURL=testpage.js.map