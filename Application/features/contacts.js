const asyncHandler = require("express-async-handler");
const Contact = require("../../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not available");
  }
  res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw new Error("All feilds are Mandetory");
  }
  const Newcontact = await Contact.create({
    name: name,
    email: email,
    phone: phone,
  });
  res.status(201).json(Newcontact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not available");
  }

  const UpdatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(UpdatedContact);
});
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not available");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Contact removed successfully" });
});
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
