import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

export const playlistImageOptions: MulterOptions = {
  dest: './uploads/playlists',
}
