const { basedir } = global
const { Contact, schemas } = require(`${basedir}/models/contact`)
const { createError } = require(`${basedir}/helpers`)

const updateFavourite = async (req, res) => {
  const { error } = schemas.updateFavourite.validate(req.body)
  if (error) {
    throw createError({
      status: 400,
      message: 'missing field favourite',
    })
  }

  const { contactId } = req.params

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })

  if (!result) throw createError({ status: 404 })
  res.json(result)
}
module.exports = updateFavourite
