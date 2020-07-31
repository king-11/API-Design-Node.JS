export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  const data = await model.findOne({ _id: id, createdBy: userId }).exec()

  if (!data) {
    return res.status(404).end()
  }

  res.status(200).json({ data })
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id
  const data = await model.find({ createdBy: userId }).exec()
  if (data) {
    return res.status(200).json({ data })
  }

  res.status(404).end()
}

export const createOne = model => async (req, res) => {
  const userId = req.user._id
  const body = req.body

  try {
    const data = await model.create({ createdBy: userId, ...body })
    return res.status(201).json({ data })
  } catch (err) {
    return res.status(400).end()
  }
}

export const updateOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  const update = req.body

  try {
    const data = await model.findOneAndUpdate(
      { createdBy: userId, _id: id },
      update,
      { new: true }
    )
    return res.status(200).json({ data })
  } catch (err) {
    return res.status(400)
  }
}

export const removeOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  try {
    const data = await model.findOneAndRemove({ createdBy: userId, _id: id })
    return res.status(200).json({ data })
  } catch (err) {
    return res.status(400)
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
