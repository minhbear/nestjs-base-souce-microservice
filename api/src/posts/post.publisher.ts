import amqplib from 'amqplib';
import Post from './post.entity';

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

export const publishNewPost = async (post: Post) => {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();
  try {
    console.log('Publishing');
    const exchange = 'post.created';
    const queue = 'post.created';
    const routingKey = 'post_created';

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);

    console.log(post, "Data sent to rabbitmq")

    await channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(post))
    );
    console.log('Message published');
  } catch (e) {
    console.error('Error in publishing message', e);
  } finally {
    console.info('Closing channel and connection if available');
    await channel.close();
    await connection.close();
    console.info('Channel and connection closed');
  }
};
