/**
 * Created by User on 7/11/2016.
 */

import * as $ from "jquery";

export enum TimeSlotType
{
    Available = 0,
    Booking = 1
}

export class TimeSlot {
    public id : number;
    public timeSlotType: TimeSlotType;
    public startminute: number;
    public starthour: number;
    public endminute: number;
    public endhour: number;
}

export class DayScheduleViewControlOptions {

    public drawDeleteButtonOnOpenTimeSlots: boolean;

    public startTimeHour: number;
    public endTimeHour : number;

    public backColor: string;
    public openTimeSlotColor: string;
    public bookedTimeSlotColor: string;

    public onDeleteOpenTimeSlotCallback : any;
}

class openTimeSlotDeletionBox {

    public id : number;
    public index : number;
    public x : number;
    public y : number;
    public width : number;
    public height : number;

}

export class DayScheduleViewControl {

    private canvas: any;
    private arrayTimeSlots: Array<TimeSlot>;
    private options: DayScheduleViewControlOptions;
    private arrayOpenTimeSlotDeletionBoxes : Array<openTimeSlotDeletionBox>;

    private getMousePos(canvas, evt)
    {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    private draw = () => {

        var self = this;

        var ctx = this.canvas.getContext("2d");

        let canvasheight = this.canvas.height;
        let canvaswidth = this.canvas.width;

        let startdayminute = this.options.startTimeHour * 60;
        let enddayminute = this.options.endTimeHour * 60;
        let minutedayspan = enddayminute - startdayminute;

        let pixelsperminutey = canvasheight / minutedayspan;

        // draw background

        ctx.fillStyle = this.options.backColor;
        ctx.fillRect(0, 0, canvaswidth, canvasheight);

        // draw open time slots

        this.arrayOpenTimeSlotDeletionBoxes = [];

        for (let i = 0; i <  this.arrayTimeSlots.length; i++)
        {
            if (this.arrayTimeSlots[i].timeSlotType == TimeSlotType.Available)
            {
                let startminute = (this.arrayTimeSlots[i].starthour - this.options.startTimeHour) * 60;
                startminute = startminute + this.arrayTimeSlots[i].startminute;

                let endminute = (this.arrayTimeSlots[i].endhour - this.options.startTimeHour) * 60;
                endminute = endminute + this.arrayTimeSlots[i].endminute;

                let offset = 50;
                ctx.fillStyle = this.options.openTimeSlotColor;
                ctx.fillRect(offset, startminute * pixelsperminutey, canvaswidth - offset, (endminute - startminute) * pixelsperminutey);

                if (true === this.options.drawDeleteButtonOnOpenTimeSlots)
                {
                    ctx.fillStyle = "red";
                    ctx.fillRect(canvaswidth - 10, startminute * pixelsperminutey, 10, 10);

                    let aopenTimeSlotDeletionBox = new openTimeSlotDeletionBox();

                    aopenTimeSlotDeletionBox.index = i;
                    aopenTimeSlotDeletionBox.x = canvaswidth - 10;
                    aopenTimeSlotDeletionBox.y = startminute * pixelsperminutey;
                    aopenTimeSlotDeletionBox.width = 10;
                    aopenTimeSlotDeletionBox.height = 10;
                    aopenTimeSlotDeletionBox.id = this.arrayTimeSlots[i].id;

                    this.arrayOpenTimeSlotDeletionBoxes.push(aopenTimeSlotDeletionBox);
                }
            }
        }

        // draw booked time slots

        for (let i = 0; i <  this.arrayTimeSlots.length; i++)
        {
            if (this.arrayTimeSlots[i].timeSlotType == TimeSlotType.Booking)
            {
                let startminute = (this.arrayTimeSlots[i].starthour - this.options.startTimeHour) * 60;
                startminute = startminute + this.arrayTimeSlots[i].startminute;

                let endminute = (this.arrayTimeSlots[i].endhour - this.options.startTimeHour) * 60;
                endminute = endminute + this.arrayTimeSlots[i].endminute;

                let offset = 70;
                ctx.fillStyle = this.options.bookedTimeSlotColor;
                ctx.fillRect(offset, startminute * pixelsperminutey, canvaswidth - offset, (endminute - startminute) * pixelsperminutey);
            }
        }

        // draw scale over everything previous

        for (let i = 0; i < this.options.endTimeHour - this.options.startTimeHour; i++)
        {
            ctx.beginPath();
            ctx.moveTo(0, (i * 60) * pixelsperminutey);
            ctx.lineTo(canvaswidth, (i * 60) * pixelsperminutey);
            ctx.stroke();

            let currenthour = this.options.startTimeHour + i;
            let ampm = ' am';

            if (currenthour > 12)
            {
                currenthour = currenthour - 12;
                ampm = ' pm';
            }

            ctx.font = "14px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(currenthour + ampm, 2, (i * 60) * pixelsperminutey + 15 /* offset */);
        }

        $(this.canvas).unbind('click').bind('click', function(event) {

            for (let i = 0; i < self.arrayOpenTimeSlotDeletionBoxes.length; i++) {

                let xyVal = self.getMousePos(self.canvas, event);

                if ((xyVal.x >= self.arrayOpenTimeSlotDeletionBoxes[i].x) &&
                    (xyVal.x <= self.arrayOpenTimeSlotDeletionBoxes[i].x + 10) &&
                    (xyVal.y >= self.arrayOpenTimeSlotDeletionBoxes[i].y) &&
                    (xyVal.y <= self.arrayOpenTimeSlotDeletionBoxes[i].y + 10)) {

                    self.options.onDeleteOpenTimeSlotCallback(self.arrayOpenTimeSlotDeletionBoxes[i].index,
                        self.arrayOpenTimeSlotDeletionBoxes[i].id);
                    break;
                }
            }
        });
    }

    public constructor(canvas: any, options: DayScheduleViewControlOptions) {
        this.arrayTimeSlots = new Array<TimeSlot>();
        this.canvas = canvas;
        this.options = options;
        this.draw();
    }

    public setHeight(height: number)
    {
        $(this.canvas).height(height);
        this.draw();
    }

    public setWidth(width: number)
    {
        $(this.canvas).width(width);
        this.draw();
    }

    public addTimeSlot(aTimeSlot: TimeSlot)
    {
        this.arrayTimeSlots.push(aTimeSlot);
        this.draw();
    }

    public deleteTimeSlot(index: number)
    {
        this.arrayTimeSlots.splice(index, 1);
        this.draw();
    }

    public retrieveTimeSlots()
    {
        return this.arrayTimeSlots;
    }

    public retrieveTimeSlotsCount()
    {
        return this.arrayTimeSlots.length;
    }

    public clearTimeSlots()
    {
        this.arrayTimeSlots = [];
        this.draw();
    }
}