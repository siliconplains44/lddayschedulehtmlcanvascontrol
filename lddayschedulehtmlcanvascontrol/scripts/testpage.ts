/**
 * Created by User on 7/12/2016.
 */

/// <reference path="../definitions/jquery.d.ts" />

import {DayScheduleViewControl, DayScheduleViewControlOptions, TimeSlot, TimeSlotType} from "./dayscheduleviewcontrol"; DayScheduleViewControl
import * as $ from "jquery";

$(function() {

    // initialize all controls and settings

    $('#controlheight').val($('#control').height());
    $('#controlwidth').val($('#control').width());

    // create our schedule control

    let options = new DayScheduleViewControlOptions();
    options.startTimeHour = 7;
    options.endTimeHour = 18;

    options.backColor = "darkgrey";
    options.openTimeSlotColor = "blue";
    options.bookedTimeSlotColor = "white";

    let control = new DayScheduleViewControl($('#control')[0], options);

    // load sample data

    let timeslotmorning = new TimeSlot();

    timeslotmorning.timeSlotType = TimeSlotType.Available;
    timeslotmorning.starthour = 7;
    timeslotmorning.startminute = 30;
    timeslotmorning.endhour = 11;
    timeslotmorning.endminute = 0;

    control.addTimeSlot(timeslotmorning);

    let timeslotafternoon = new TimeSlot();

    timeslotafternoon.timeSlotType = TimeSlotType.Available;
    timeslotafternoon.starthour = 12;
    timeslotafternoon.startminute = 0;
    timeslotafternoon.endhour = 17;
    timeslotafternoon.endminute = 0;

    control.addTimeSlot(timeslotafternoon);

    let timeslotallocationone = new TimeSlot();

    timeslotallocationone.timeSlotType = TimeSlotType.Booking;
    timeslotallocationone.starthour = 7;
    timeslotallocationone.startminute = 45;
    timeslotallocationone.endhour = 10;
    timeslotallocationone.endminute = 0;

    control.addTimeSlot(timeslotallocationone);

    let timeslotallocationtwo = new TimeSlot();

    timeslotallocationtwo.timeSlotType = TimeSlotType.Booking;
    timeslotallocationtwo.starthour = 13;
    timeslotallocationtwo.startminute = 15;
    timeslotallocationtwo.endhour = 15;
    timeslotallocationtwo.endminute = 0;

    control.addTimeSlot(timeslotallocationtwo);

    let timeslotallocationthree = new TimeSlot();

    timeslotallocationthree.timeSlotType = TimeSlotType.Booking;
    timeslotallocationthree.starthour = 16;
    timeslotallocationthree.startminute = 0;
    timeslotallocationthree.endhour = 16;
    timeslotallocationthree.endminute = 30;

    control.addTimeSlot(timeslotallocationthree);

    // events

    $('#buttonsetheight').click(function() {
        control.setHeight(parseInt($('#controlheight').val()));
    });

    $('#buttonsetwidth').click(function() {
        control.setWidth(parseInt($('#controlwidth').val()));
    });

    let optionsdelete = new DayScheduleViewControlOptions();
    optionsdelete.drawDeleteButtonOnOpenTimeSlots = true;
    optionsdelete.startTimeHour = 7;
    optionsdelete.endTimeHour = 18;

    optionsdelete.backColor = "darkgrey";
    optionsdelete.openTimeSlotColor = "blue";
    optionsdelete.bookedTimeSlotColor = "white";

    optionsdelete.onDeleteOpenTimeSlotCallback = function(openTimeSlotIndex) {
        alert(openTimeSlotIndex + "requested to delete");
        controldelete.deleteTimeSlot(openTimeSlotIndex);
    }

    let controldelete = new DayScheduleViewControl($('#controldelete')[0], optionsdelete);

    // load sample data

    let timeslotmorningdelete = new TimeSlot();

    timeslotmorningdelete.timeSlotType = TimeSlotType.Available;
    timeslotmorningdelete.starthour = 7;
    timeslotmorningdelete.startminute = 30;
    timeslotmorningdelete.endhour = 11;
    timeslotmorningdelete.endminute = 0;

    controldelete.addTimeSlot(timeslotmorningdelete);

    let timeslotafternoondelete = new TimeSlot();

    timeslotafternoondelete.timeSlotType = TimeSlotType.Available;
    timeslotafternoondelete.starthour = 12;
    timeslotafternoondelete.startminute = 0;
    timeslotafternoondelete.endhour = 17;
    timeslotafternoondelete.endminute = 0;

    controldelete.addTimeSlot(timeslotafternoondelete);


});
