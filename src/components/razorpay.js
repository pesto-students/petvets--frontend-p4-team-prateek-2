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

export const displayRazorpay = async () => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  const data = await axiosClient
    .post('api/payment/razorpay', {
      method: 'POST',
    })
    .then((t) => t.json());

  const options = {
    key: 'rzp_test_0tpemkHKm5K1Bc',
    currency: data.currency,
    amount: data.amount.toString(),
    order_id: data.id,
    name: 'Donation',
    description: 'Thank you for nothing. Please give us some money',
    image: 'logo',
    handler: function (response) {
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);

      alert('Transaction successful');
    },
    prefill: {
      name: 'Rajat',
      email: 'rajat@rajat.com',
      phone_number: '9899999999',
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
