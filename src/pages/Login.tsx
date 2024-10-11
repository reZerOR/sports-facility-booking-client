import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Mail, Lock, User, ArrowRight, Phone, MapPin } from "lucide-react";
import {
  LoginRequestBody,
  SignupRequestBody,
  useLoginMutation,
  useSignupMutation,
} from "@/redux/Features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/Features/auth/authSlice";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required to access your sports account" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required to secure your sports profile" })
    .min(8, { message: "Password must be at least 8 characters long" })
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    //   message:
    //     "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    // }),
});

const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(1, {
      message: "Name is required to personalize your sports experience",
    })
    .min(2, { message: "Name must be at least 2 characters long" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d{11}$/, { message: "Phone number must be 10 digits long" }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .min(5, { message: "Address must be at least 5 characters long" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
type RegisterFormInputs = z.infer<typeof registerSchema>;
export interface ApiResponse {
  status: number;
  data: {
    message: string;
    success: boolean;
    statusCode: number;
  };
}

export default function Component() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [signup] = useSignupMutation();
  const [login] = useLoginMutation();
  const schema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs | RegisterFormInputs>({
    resolver: zodResolver(schema),
  });

  // handle signup
  const handleSignup = async (data: LoginFormInputs) => {
    const signupData = {
      ...data,
      role: "user",
    } as SignupRequestBody;
    console.log(signupData);
    try {
      const result = await signup(signupData).unwrap();
      if (result.success) {
        reset();
        toast.success(result.message, {
          description: "You can now login to your account",
        });
        setIsLogin(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as ApiResponse).data.message);
      console.error("errror", error);
    }
  };

  // handle login
  const handleLogin = async (data: LoginFormInputs) => {
    const loginData = {
      ...data,
    } as LoginRequestBody;
      console.log(loginData);
    try {
      const result = await login(loginData).unwrap();
      if (result.success) {
        toast.success(result.message);
        dispatch(setCredentials({ user: result.data, token: result.token }));
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as ApiResponse).data.message);
      console.error("errror", error);
    }
  };

  const onSubmit: SubmitHandler<LoginFormInputs | RegisterFormInputs> = async (
    data
  ) => {
    if (isLogin) {
      handleLogin(data);
    } else {
      handleSignup(data);
    }
  };

  return (
    <div className={`min-h-dvh flex items-center bg-orange-100`}>
      <div className="hidden lg:block basis-1/2 bg-[url('@/assets/loginpattern.svg')] h-screen bg-cover bg-center"></div>
      <Card className="w-full max-w-md overflow-hidden mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-primary1 transform -skew-y-6 shadow-lg z-0"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-3xl font-bold text-white">
              {isLogin ? "Get Back in the Game!" : "Join the Team!"}
            </CardTitle>
            <CardDescription className="text-orange-100">
              {isLogin
                ? "Login to access your sports dashboard"
                : "Create your sports profile"}
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-orange-700">
                    Athlete Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="Michael Jordan"
                      className="pl-10 border-orange-300 focus:border-orange-500"
                      {...register("name")}
                    />
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                      size={18}
                    />
                  </div>
                  {errors && "name" in errors && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-orange-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      placeholder="1234567890"
                      className="pl-10 border-orange-300 focus:border-orange-500"
                      {...register("phone")}
                    />
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                      size={18}
                    />
                  </div>
                  {errors && "phone" in errors && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-orange-700">
                    Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="address"
                      placeholder="1234 Sports Ave"
                      className="pl-10 border-orange-300 focus:border-orange-500"
                      {...register("address")}
                    />
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                      size={18}
                    />
                  </div>
                  {errors && "address" in errors && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address?.message}
                    </p>
                  )}
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-orange-700">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="athlete@example.com"
                  className="pl-10 border-orange-300 focus:border-orange-500"
                  {...register("email")}
                />
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                  size={18}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-orange-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  className="pl-10 border-orange-300 focus:border-orange-500"
                  {...register("password")}
                />
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                  size={18}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-primary1 hover:bg-primary1/90 text-white"
            >
              {isLogin ? "Login" : "Join Now"}
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-primary1">
              {isLogin
                ? "New to our sports community?"
                : "Already part of the team?"}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-primary1">
                {isLogin ? "Sign Up" : "Login"}
              </span>
              <Switch
                checked={!isLogin}
                onCheckedChange={() => {
                  setIsLogin(!isLogin);
                  reset();
                }}
                className="data-[state=checked]:bg-orange-500"
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
