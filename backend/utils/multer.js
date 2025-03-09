import multer from "multer";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 50, // 10MB
  },
});

const singlePhoto = multerUpload.single("profilePicture");
const attachmentsMulter = multerUpload.array("images", 5);
export { singlePhoto, attachmentsMulter };

/// kyc
const storage = multer.memoryStorage(); // Or use diskStorage if you prefer
const upload = multer({ storage });

// For passport KYC, expect two files: one for passport and one for visa.
export const kycUpload = upload.fields([
  { name: "passportDoc", maxCount: 1 },
  { name: "visaDoc", maxCount: 1 },
]);
