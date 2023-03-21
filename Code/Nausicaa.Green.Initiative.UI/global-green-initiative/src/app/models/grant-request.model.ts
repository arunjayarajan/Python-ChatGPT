export class GrantRequest {
    id: number;
    grant_id: number;
    request_id: string;
    amount: number;
    summary: string;
    date: Date;
    status: string;
    grant_name: string;
    username: string;
    email_id: string;

    constructor() {
        this.id = 0;
        this.grant_id = 0;
        this.amount = 0;
        this.summary = '';
        this.date = new Date();
        this.status = 'Pending';
        this.request_id = this.grant_name = this.username = this.email_id = '';
    }
}