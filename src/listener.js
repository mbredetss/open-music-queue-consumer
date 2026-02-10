class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const songs = await this._playlistsService.getSongInPlaylist(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songs));
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }
}

export default Listener;