import { UUID } from '@nu-queue/nu-core';

export class BasicQueueMessage {
  public Id: string;
  public Date: number;
  public UnAck = false;
  constructor() {
    this.Id = UUID.V4();
    this.Date = new Date().getTime();
  }
}
