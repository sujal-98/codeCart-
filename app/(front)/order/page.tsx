"use client";
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
const OrderSuccessPage = () => {
  const router = useRouter()
  const handleform = async () => {
    setTimeout(() => {
      router.push("/"); 
  }, 1000);
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 5 }}
          className="flex justify-center mb-6"
        >
          <CheckCircleIcon className="h-20 w-20 text-green-500 dark:text-green-400" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Thank You for Using <span className="text-blue-600 dark:text-blue-400">CodeCart</span>!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Your order has been placed successfully. We appreciate your trust in us! 🚀
        </p>

        <motion.button
          onClick={handleform}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-semibold shadow-md transition-all"
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
