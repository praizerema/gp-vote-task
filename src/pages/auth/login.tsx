import { Button, Input, Layout, logInSchema } from "../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, PassLockIcon } from "../../assets";
import { LoginUserApi } from "../../services";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(logInSchema) });

  const onSubmit = async (data: object) => {
    setIsLoading(true);
    try {
      const response = await LoginUserApi({ ...data });
      if (typeof response === "object") {
        const userResponse = response as unknown as {
          token: string;
        };
        globalThis.localStorage.setItem("token", userResponse.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-[42rem] px-5">
        <form onSubmit={handleSubmit(onSubmit)} className="auth-card">
          <h1 className="h1 pb-7 text-gp-purple-500">Log In</h1>
          <div className="space-y-6">
            <Input
              label="Email Address"
              placeholder="e.g John419@gmail.com"
              {...register("email")}
              prefix={<MailIcon />}
              errorMessage={errors.email?.message as string}
            />

            <Input
              label="Password"
              placeholder="************"
              type="password"
              {...register("password")}
              prefix={<PassLockIcon />}
              errorMessage={errors.password?.message as string}
            />
          </div>
          <p className="my-2 pbody-12">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-gp-purple-500">
              Register
            </Link>
          </p>
          <Button
            text={"Log In"}
            className="btn-gp float-right mt-6"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          />
        </form>
      </div>
    </Layout>
  );
};
export default Login;
