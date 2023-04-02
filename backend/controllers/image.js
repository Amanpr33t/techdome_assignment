const cloudinary = require('cloudinary').v2
const path = require('path')
const fs = require('fs')

const uploadImage = async (req, res) => {
    if (!req.files) {
        return
    }

    let image = req.files.image
    if (!image.mimetype.startsWith('image')) {
        return res.status(400).json({
            status: 'failed',
            msg: 'Please add an image'
        })
    }
    const maxSize = 1024 * 1024
    if (image.size > maxSize) {
        return res.status(400).json({
            status: 'too-large',
            msg: 'Image should be smaller than 1MB'
        })
    }
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'blog_image'
        }
    )
    fs.unlinkSync(req.files.image.tempFilePath)
    return res.status(200).json({
        status: 'ok',
        imagePath: { src: result.secure_url }
    })

}
module.exports = {
    uploadImage
}
