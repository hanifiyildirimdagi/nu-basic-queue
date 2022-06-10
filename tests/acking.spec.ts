import BasicQueue from "../src/BasicQueue";
import { BasicQueueMessage } from "../src/BasicQueueMessage";

import { expect } from "chai";
import "mocha";
import QueueSettings from "../src/QueueSettings";

const settings = new QueueSettings();

class testMessage extends BasicQueueMessage {
  constructor() {
    super();
  }
}

function createTestQueue() {
  return new BasicQueue<testMessage>(settings);
}

describe("Acking", () => {
  it("Manuel Acking When Queue Idle", () => {
    const queue = createTestQueue();
    queue.PushMessage(new testMessage());
    queue.Ack();
    expect(queue.MessageCount).to.equals(1);
    queue.Stop();
  });
  it("Manuel Acking When Queue Processing", async () => {
    const queue = createTestQueue();
    queue.Consume(async (m: testMessage) => {
        queue.Ack()
    },false);
    queue.PushMessage(new testMessage());
    await new Promise((resolve) => setTimeout(resolve, 5));
    expect(queue.MessageCount).to.equals(0);
    queue.Stop();
  });
});
