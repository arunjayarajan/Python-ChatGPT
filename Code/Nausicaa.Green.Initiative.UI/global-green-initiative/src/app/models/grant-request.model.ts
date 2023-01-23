export class GrantRequest {
    id: number;
    grant_id: number;
    amount: number;
    summary: string;
    date: Date;
    status: string;

    constructor() {
        this.id = 0;
        this.grant_id = 0;
        this.amount = 0;
        this.summary = '';
        this.date = new Date();
        this.status = 'Pending';
    }
}