import {BasicQueue, BasicQueueMessage, QueueSettings} from "../packages/necessary-utils-basic-queue/src";

const settings = new QueueSettings();

class testMessage extends BasicQueueMessage {
  constructor() {
    super();
  }
}

function createTestQueue() {
  return new BasicQueue<testMessage>(settings);
}

describe("Interceptors", () => {
  it("When Message Count Zero", () => {
    const queue = createTestQueue();
    expect(() => {
      queue.Intercept.WhenZeroMessage();
    }).throw();
  });
  it("When Any Message", () => {
    const queue = createTestQueue();
    queue.PushMessage(new testMessage());
    queue.Stop();
    expect(() => {
      queue.Intercept.WhenAnyMessage();
    }).throw();
  });
  it("When Queue Started", () => {
    const queue = createTestQueue();
    queue.PushMessage(new testMessage());
    expect(() => {
      queue.Intercept.WhenQueueStarted();
    }).throw();
    queue.Stop();
  });
  it("When Queue Stopped", () => {
    const queue = createTestQueue();
    expect(() => {
      queue.Intercept.WhenQueueStopped();
    }).throw();
  });
  it("When Multiple Interceptor", () => {
    const queue = createTestQueue();
    expect(() => {
      queue.Intercept.WhenAnyMessage().WhenQueueStopped();
    }).throw();
  });
// TODO: ...
//   it("When Custom Query", () => {
//     const queue = createTestQueue();
//     queue.PushMessage(new testMessage());
//     queue.Stop();
//     expect(() => {
//       const handler = async (): Promise<boolean> => {
//         return false;
//       };
//       queue.Intercept.When(handler);
//     }).to.throw();
//   });
});
