import { CONSTANTS } from "../constants";

export class Toast {
    show: string;
    colour: string;
    title: string;
    message: string;

    constructor() {
        this.show = 'hide';
        this.colour = CONSTANTS.blueColour;
        this.title = '';
        this.message = '';
    }
}