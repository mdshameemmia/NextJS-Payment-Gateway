const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PaymentSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
    },
    member_id: {
      type: Schema.Types.ObjectId,
    },
    flat_id: {
      type: Schema.Types.ObjectId,
    },
    floor_id: {
      type: Schema.Types.ObjectId,
    },
    building_id: {
      type: Schema.Types.ObjectId,
    },
    date:{
        type: Date
    },
    status: {
      type : String
    }
  },
  {
    timestamps: true,
  }
);

const Payment =
  mongoose.models?.Payment || mongoose.model("Payment", PaymentSchema);
export default Payment;
