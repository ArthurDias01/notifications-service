import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: [process.env.KAFKA_UPSTASH_BROKER_URL!],
        sasl: {
          mechanism: 'scram-sha-256',
          username: process.env.KAFKA_UPSTASH_USERNAME!,
          password: process.env.KAFKA_UPSTASH_PASSWORD!,
        },
        ssl: true,
      }
    });
  }

  async onModuleDestroy() {
    await this.close();
  }

}
