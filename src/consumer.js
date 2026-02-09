import 'dotenv/config';
import amqp from 'amqplib';
import OpenMusicService from './OpenMusicService.js';
import MailSender from './MailSender.js';
import Listener from './listener.js';
import process from 'process';

const init = async () => {
    const songsService = new OpenMusicService();
    const mailSender = new MailSender();
    const listener = new Listener(songsService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:playlists', {
        durable: true
    });

    channel.consume('export:playlists', listener.listen, { noAck: true });
}

init().catch((error) => {
    console.error('Gagal menerima pesan:', error);
    process.exit(1);
});