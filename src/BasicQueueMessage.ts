import { uuidv4 } from "./utils";

export class BasicQueueMessage {
    public Id: string;
    public Date: number;
    public UnAck: boolean = false;
    constructor() {
      this.Id = uuidv4();
      this.Date = new Date().getTime();
    }
  }