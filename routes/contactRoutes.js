const router = require("express").Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../Application/features/contacts");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
