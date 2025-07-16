import mongoose from "mongoose";

const createSchemaAndModel = (name: string) => {
  const schema = new mongoose.Schema({
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    data: {
      type: [String],
      required: true,
    },
  });

  return mongoose.models[name] || mongoose.model(name, schema);
};

export const modelMap = {
  "BTECH 1 SEM": createSchemaAndModel("BtechSem1"),
  "BTECH 2 SEM": createSchemaAndModel("BtechSem2"),
  "BTECH 3 SEM": createSchemaAndModel("BtechSem3"),
  "BTECH 4 SEM": createSchemaAndModel("BtechSem4"),
  "BTECH 5 SEM": createSchemaAndModel("BtechSem5"),
  "BTECH 6 SEM": createSchemaAndModel("BtechSem6"),
  "BTECH 7 SEM": createSchemaAndModel("BtechSem7"),
  "BTECH 8 SEM": createSchemaAndModel("BtechSem8"),
  "MTECH-MSc 1 SEM": createSchemaAndModel("MtechMscSem1"),
  "MTECH-MSc 2 SEM": createSchemaAndModel("MtechMscSem2"),
  "MTECH-MSc 3 SEM, PhD2": createSchemaAndModel("MtechMscSem3"),
  "MTECH-MSc 4 SEM, PhD2": createSchemaAndModel("MtechMscSem4"),
};
