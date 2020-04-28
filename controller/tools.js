var express = require('express')
var router = express.Router()
var Tool = require('../models/tool.js')

router.get('/', (req, res, next) => {
  if (req.query === undefined) {
    req.query = {}
  }
  Tool.find(req.query, (err, arr) => {
    if (err) {
      return next(err)
    }
    res.json(arr)
  })
})

router.post('/', (req, res, next) => {
  var tool = Tool(req.body)
  tool.save((err, newTool) => {
    if (err) {
      return next(err)
    } else {
      res.status(201)
      res.json(newTool)
    }
  })
})

router.delete('/:id', (req, res, next) => {
  Tool.deleteOne({ id: req.params.id }, (err) => {
    if (err) {
      return next(err)
    } else {
      res.status(204)
      res.json({ Sucess: 'Elemento removido com sucesso', id: req.params.id })
    }
  })
})
module.exports = router
