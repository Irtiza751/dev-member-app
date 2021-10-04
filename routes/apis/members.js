const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const Members = require("../../Members");

// this route get all Members
router.get("/", (req, res) => res.json(Members));
// get Single Member
router.get("/:id", (req, res) => {
  const found = Members.some(members => members.id == parseInt(req.params.id));

  if (found) {
    res.json(Members.filter(members => members.id == parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No Member with the id of ${req.params.id}` });
  }
});
// Create Member
router.post("/", (req, res) => {
  const newMembers = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMembers.name || !newMembers.email) {
    return res.status(400).json({ msg: "Please include emain and name" });
  }
  Members.push(newMembers);
  res.json(Members);
  // res.redirect("/");
});
// Update Member
router.put("/:id", (req, res) => {
  const found = Members.some(members => members.id == parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    Members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member is Updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No Member with the id of ${req.params.id}` });
  }
});
// Delete Member
router.delete("/:id", (req, res) => {
  const found = Members.some(members => members.id == parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member is deleted",
      Members: Members.filter(members => members.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No Member with the id of ${req.params.id}` });
  }
});

module.exports = router;
