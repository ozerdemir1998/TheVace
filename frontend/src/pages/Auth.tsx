import AuthForm from '@/components/ui/login-1';
import { motion } from 'framer-motion';

const Auth = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen bg-black"
        >
            <AuthForm />
        </motion.div>
    );
};

export default Auth;
