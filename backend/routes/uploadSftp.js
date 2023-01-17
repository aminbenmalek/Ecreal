import multer from "multer";
import sftpStorage from "multer-sftp";
import express from "express";
import path from "path";

const router = express.Router();
const storage = sftpStorage({
  sftp: {
    host: "ahmed.prod-manager.tk",
    port: 22,
    username: "ahmedftp",
    password: "ftpahmed",
  },
  destination: (req, file, cb) => cb(null, `public_html/uploads/`),
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/uploads/${req.file.filename}`);
});

export default router;
