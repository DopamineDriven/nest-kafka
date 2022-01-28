import { KafkaHeaders } from '@nestjs/microservices';

export interface HandleOrderCreatedShape {
  magicByte: number;
  attributes: number;
  timestamp: string;
  offset: string;
  key: null | string | symbol | number;
  value:
    | {
        orderId: string;
        userId: string;
        price: number;
      }
    | Record<string, unknown extends null | undefined ? never : unknown>;
  headers:
    | keyof typeof KafkaHeaders
    | Record<string, unknown extends null | undefined ? never : unknown>;
  isControlRecord: boolean;
  batchContext: {
    firstOffset: string;
    firstTimestamp: string;
    partitionLeaderEpoch: number;
    inTransaction: boolean;
    isControlBatch: boolean;
    lastOffsetDelta: number;
    producerId: string;
    producerEpoch: number;
    firstSequence: number;
    maxTimestamp: string;
    timestampType: number;
    magicByte: number;
  };
  topic: string;
  partition: number;
}
