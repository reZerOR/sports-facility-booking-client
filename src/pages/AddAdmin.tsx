import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Lock } from "lucide-react";
import {
  SignupRequestBody,
  useSignupMutation,
} from "@/redux/Features/auth/authApi";
import { toast } from "sonner";
import { ApiResponse } from "./Login";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^01\d{9}$/, {
    message:
      "Invalid phone number. It should start with 01 and be 11 digits long.",
  }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export default function Component() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [signup] = useSignupMutation();

  const handleSignup = async (data: FormData) => {
    const signupData = {
      ...data,
      role: "admin",
    } as SignupRequestBody;
    console.log(signupData);
    try {
      const result = await signup(signupData).unwrap();
      if (result.success) {
        reset();
        toast.success(result.message, {
          description: "Admin can now login to his account",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as ApiResponse).data.message);
      console.error("errror", error);
    }
  };
  const onSubmit = (data: FormData) => {
    handleSignup(data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Add Admin
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-orange-600">
              Name
            </Label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                size={18}
              />
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter full name"
                className="pl-10 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="text-orange-600">
              Email
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                size={18}
              />
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter email address"
                className="pl-10 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="phone" className="text-orange-600">
              Phone Number
            </Label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                size={18}
              />
              <Input
                id="phone"
                {...register("phone")}
                placeholder="Enter phone number"
                className="pl-10 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="address" className="text-orange-600">
              Address
            </Label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-orange-400"
                size={18}
              />
              <Textarea
                id="address"
                {...register("address")}
                placeholder="Enter full address"
                className="pl-10 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="text-orange-600">
              Password
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                size={18}
              />
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter password"
                className="pl-10 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Add Admin
          </Button>
        </form>
      </div>
    </div>
  );
}
