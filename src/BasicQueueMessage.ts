import {UUID} from "necessary-utils-core"

export class BasicQueueMessage {
    public Id: string;
    public Date: number;
    public UnAck: boolean = false;
    constructor() {
      this.Id = UUID.V4();
      this.Date = new Date().getTime();
    }
  }