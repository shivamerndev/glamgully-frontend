import axios from "axios";


// Utility to load Razorpay script
const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// handlePayment Function
export const handlePayment = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
        alert("Razorpay SDK failed to load.");
        return;
    }
    try {
        const orderRes = await axios.post("https://glamgully-backend.vercel.app/pay/order", {
            amount: amount * 100, // amount in paise
        });
        const data = orderRes.data.order;
        // console.log(data);
        handlePaymentVerify(data);
    } catch (error) {
        console.log(error);
    }
};

// verifyPayment Function
const handlePaymentVerify = (data) => {
    const options = {
        key: "rzp_test_ac7lk4wkZPzIHm",
        amount: data.amount,
        currency: data.currency,
        name: "GlamGully",
        description: "Test Transaction",
        order_id: data?.id,
        handler: async (response) => {
            console.log("Payment Successful", response);
            try {
                await axios.post("http://localhost:4000/pay/verify", {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                });
            } catch (error) {
                console.error("Payment verification failed:", error);
            }
        },
        theme: { color: "#5f63b8" }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};