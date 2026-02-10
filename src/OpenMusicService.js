import { Pool } from "pg";

class OpenMusicService {
    constructor() {
        this.pool = new Pool();
    }

    async getSongInPlaylist(albumId) {
        const result = await this.pool.query(
            `SELECT p.id, name, s.id as song_id, title, performer 
            FROM playlists as p
            JOIN playlist_songs ON playlist = p.id
            JOIN songs as s ON "songId" = s.id
            JOIN users ON users.id = owner
            WHERE p.id = $1`, [albumId]
        );

        const songs = result.rows.map((res) => ({
            id: res.song_id,
            title: res.title,
            performer: res.performer
        }));

        const { id, name } = result.rows[0];
        const playlist = {
            id,
            name,
            songs
        };
        
        return { playlist };
    }
}

export default OpenMusicService;