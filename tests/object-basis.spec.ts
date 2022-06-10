import BasicQueue from "../src/BasicQueue";
import { BasicQueueMessage } from "../src/BasicQueueMessage";

import { expect } from "chai";
import "mocha";
import QueueSettings from "../src/QueueSettings";

const settings = new QueueSettings();
settings.QueueCoolDownTime = 50;

class testMessage extends BasicQueueMessage {
  constructor() {
    super();
  }
}

function createTestQueue() {
  return new BasicQueue<testMessage>(settings);
}

describe("Basis Queue Operations", () => {
  it("Consumer Is Not Registered", () => {
    const queue = createTestQueue();
    queue.PushMessage(new testMessage());
    expect(queue.MessageCount).to.equals(1);
    queue.Stop();
  });
  it("Consumer Is Running", async () => {
    const queue = createTestQueue();
    queue.Consume(async (m: testMessage) => {}, true);
    queue.PushMessage(new testMessage());
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(queue.MessageCount).to.equals(1);
    queue.Stop();
  });
  it("Queue Cleared", () => {
    const queue = createTestQueue();
    queue.PushMessage(new testMessage());
    queue.PushMessage(new testMessage());
    expect(queue.MessageCount).to.equals(2);
    queue.Clear();
    expect(queue.MessageCount).to.equals(0);
    queue.Stop();
  });
});
