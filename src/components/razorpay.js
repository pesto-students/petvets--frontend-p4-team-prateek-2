import axiosClient from '../api-client';

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });

export async function displayRazorpay() {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  // creating a new order
  const result = await axiosClient.post('api/payment/appointments');

  if (!result) {
    alert('Server error. Are you online?');
    return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result.data;

  const options = {
    key: 'rzp_test_r6FiJfddJh76SI', // Enter the Key ID generated from the Dashboard
    amount: amount.toString(),
    currency: currency,
    name: 'Soumya Corp.',
    description: 'Test Transaction',
    image: {},
    order_id: order_id,
    handler: async function (response) {
      const data = {
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };

      const result = await axiosClient.post('payment/success', data);

      alert(result.data.msg);
    },
    prefill: {
      name: 'Swati J',
      email: 'Swati J@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Swati J Corporate Office',
    },
    theme: {
      color: '#61dafb',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
