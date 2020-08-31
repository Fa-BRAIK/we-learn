import { BadRequestException } from '@nestjs/common'

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new BadRequestException(['File accepted are only: jpg, jpeg and png']),
      false,
    )
  }
  callback(null, true)
}
