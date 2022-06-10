

<center>
<h1>Necessary Utils | Basic Queue</h1>
<hr/>
<a href="https://www.npmjs.com/package/necessary-utils-basic-queue"><img src="https://badgen.net/npm/v/necessary-utils-basic-queue" alt="Version"></a>
<a href="https://www.npmjs.com/package/necessary-utils-basic-queue"><img src="https://badgen.net/npm/license/necessary-utils-basic-queue" alt="License"></a>
<a href="https://www.npmjs.com/package/necessary-utils-basic-queue"><img src="https://badgen.net/npm/dm/necessary-utils-basic-queue" alt="Downloads"></a>

</center>

## Getting started

### Yarn

```sh
yarn add necessary-utils-basic-queue
```

### NPM

```sh
npm install necessary-utils-basic-queue --save
```

## Example

```ts
import {
  BasicQueue,
  BasicQueueMessage,
  QueueSettings,
} from "necessary-utils-basic-queue";

class ExampleMessage extends BasicQueueMessage {
  public MessageDetail: string;
  constructor(messageDetail: string) {
      this.MessageDetail = messageDetail
  }
}

/**
 * Queue Created
*/
const queue = new BasicQueue<ExampleMessage>();

/**
 * Consumer Method Registered
 * Auto ACK = true
*/
queue.Consume((message:ExampleMessage) => {
    console.log(message.MessageDetail);
    // Do anything...
}, /*AUTO ACK = */ true);


/**
 * Start Produce
*/
queue.PushMessage(new ExampleMessage('Hello. This is my first message on the queue.'));

```


## How its works ?

### Overview
```mermaid
    graph
        Producer1 --> |Message 1| Queue;
        Producer2 --> |Message 2| Queue;
        Producer3 --> |Message 3| Queue;

Queue --> |Messages One by One| Consumer;
```

### Consuming
```mermaid
    flowchart LR
        Producer1 --> |Message 1| Queue;
        Producer1 --> |Message 2| Queue;
        Producer1 --> |Message 3| Queue;
        Queue --> |Next Message| Consumer;
        Consumer --> EndProcess;
        EndProcess --> ACK{Auto Ack is True};
        ACK --> |True| Queue;
        ACK --> |False| WaitAck;
        WaitAck --> Queue;

```