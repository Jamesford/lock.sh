export default function rxHandler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({ ok: true })
}
