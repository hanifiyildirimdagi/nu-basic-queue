import BasicQueue from "../src/BasicQueue";
import { BasicQueueMessage } from "../src/BasicQueueMessage";
import QueueSettings from "../src/QueueSettings";
import { wait } from "../src/utils";

class SimpleMessage extends BasicQueueMessage {
  public User: string;
  public Email: string;

  constructor(user: string, email: string) {
    super();
    this.User = user;
    this.Email = email;
  }
}

function generateTestMessage(
  start: number = 0,
  end: number = 100
): Array<SimpleMessage> {
  let result: Array<SimpleMessage> = [];
  for (let i = start; i < end; i++) {
    result.push(new SimpleMessage(`Name ${i}`, `test-mail-$${i}@mail.com`));
  }
  return result;
}

var settings = new QueueSettings();
var que = new BasicQueue<SimpleMessage>(settings);
que.Consume(async (message: SimpleMessage) => {
  // await wait(128);
  console.log(
    `Total Messages: ${que.MessageCount} | ${message.User} of User has been registered`
  );
}, true);

function testSingleMessagePush(): void {
  generateTestMessage().forEach((item) => {
    que.PushMessage(item);
  });
}

async function testParallelMessagePush() {
  const list1 = generateTestMessage();
  const list2 = generateTestMessage(300, 400);
  const list3 = generateTestMessage(1000, 1100);

  const worker = async (list: Array<SimpleMessage>): Promise<void> => {
    return new Promise(async (resolve) => {
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        await wait(Math.floor(Math.random() * (500 - 1000 + 1) + 500));
        que.PushMessage(item);
      }
      return resolve();
    });
  };

  let tasks: Array<Promise<void>> = [
    worker(list1),
    worker(list2),
    worker(list3),
  ];
  await Promise.all(tasks);
  que.Clear();
  await worker(generateTestMessage(2001, 3000));
}

testParallelMessagePush();
