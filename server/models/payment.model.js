import  { model, Schema } from 'mongoose';

const paymentSchema = new Schema({
  razor_payment_id: {
    type: String,
    required: true
  },
  razor_subscription_id: {
    type: String,
    required: true
  },
  razorpay_signature: {
    type: String,
    reqired: true
  }
}, {
    timestamps: true
});

const Payment = model('Payment',paymentSchema);
export default Payment;