import mongoose from "mongoose";

const contatoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      sparse: true,
    },
    Tel1: {
      type: String,
      sparse: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    birthday: Date,
    notes: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contato = mongoose.model("Contatos", contatoSchema);

export default Contato;
