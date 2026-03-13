// /api — redirect to docs page
export default function handler(req, res) {
  res.redirect(301, "/api-docs");
}
