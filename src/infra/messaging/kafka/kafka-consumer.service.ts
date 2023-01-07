import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['sunny-terrapin-13359-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'c3VubnktdGVycmFwaW4tMTMzNTkkeNQn_fvXxWTKXEK9u4Mh9WSHCP_OTnFppW4',
          password: '9353f1e0bfec47a98cbec5d95023d528',
        },
        ssl: true,
      }
    });
  }

  async onModuleDestroy() {
    await this.close();
  }

}
