import CustomButton from "../Components/custom_botton";
import visaImage from "../Assets/Images/visa.png";
import paypalImage from "../Assets/Images/paypal.png";
import americanImage from "../Assets/Images/american.png";
export default function Checkout() {
  return (
    <div className="flex-1 flex flex-col items-center p-12">
      <div className="w-full max-w-5xl bg-white dark:bg-card rounded-lg shadow-md p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 transition-colors duration-300">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <p className="text-gray-600 mb-2">Cart Type</p>
          <div className="flex items-center space-x-3 mb-4">
            <img src={paypalImage} alt="paypal" className="h-8" />
            <img src={americanImage} alt="american" className="h-8" />
            <img src={visaImage} alt="visa" className="h-8" />
          </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter name on Card"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Enter Card Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="CVC"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <label className="flex items-center space-x-2 text-gray-600">
              <input type="checkbox" />
              <span>Save my information for faster checkout</span>
            </label>
            <CustomButton text="Confirm Payment" />
          </form>
        </div>

        {/* Summary Section */}
        <div className="bg-[#9DCCFF] rounded-lg p-4 shadow-inner h-auto">
          <h3 className="text-lg font-semibold mb-4">Summary</h3>

          {/* Items */}
          <div className="flex items-center space-x-3 mb-4">
            <img src={visaImage} alt="course" className="rounded-md" />
            <div>
              <p className="text-gray-700 text-sm">Lorem ipsum dolor...</p>
              <p className="font-semibold">$24.69</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <img src={visaImage} alt="course" className="rounded-md" />
            <div>
              <p className="text-gray-700 text-sm">Lorem ipsum dolor...</p>
              <p className="font-semibold">$24.69</p>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$51.38</span>
            </div>
            <div className="flex justify-between">
              <span>Coupon Discount</span>
              <span>0</span>
            </div>
            <div className="flex justify-between">
              <span>TAX</span>
              <span>$5</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>$56.38</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
