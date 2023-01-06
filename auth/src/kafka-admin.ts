import { Kafka } from 'kafkajs';

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'acute-admin',
      brokers: ['kafka-srv:9092']
    });

    const admin = kafka.admin();
    console.log('Connecting.....');
    await admin.connect();
    console.log('Connected!');
    await admin.createTopics({
      topics: [
        {
          topic: 'Users',
          numPartitions: 2
        }
      ]
    });
    console.log('Created Successfully!');
    await admin.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    process.exit(0);
  }
}
