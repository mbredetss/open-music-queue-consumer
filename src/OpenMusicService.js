import { Pool } from "pg";

class OpenMusicService {
    constructor() {
        this.pool = new Pool();
    }

    async getSongInPlaylist(id) {
        const result = await this.pool.query(
            `SELECT p.id, name, s.id as song_id, title, performer, username 
            FROM playlists as p
            JOIN playlist_songs ON playlist = p.id
            JOIN songs as s ON "songId" = s.id
            JOIN users ON users.id = owner
            WHERE p.id = $1`, [id]
        );

        const songs = result.rows.map((res) => ({
            id: res.song_id,
            title: res.title,
            performer: res.performer
        }));

        const { playlistId, name, username } = result.rows[0];
        const playlist = {
            id: playlistId,
            name,
            username,
            songs
        };

        return playlist;
    }
}

export default OpenMusicService;