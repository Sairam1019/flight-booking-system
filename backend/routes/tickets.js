const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

/**
 * GET /api/ticket/:pnr
 */
router.get("/:pnr", (req, res) => {
  const { pnr } = req.params;

  const filePath = path.join(
    __dirname,
    "..",
    "tickets",
    `${pnr}.pdf`
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  res.download(filePath);
});

module.exports = router;
