import Image from "next/image";
import SignUpForm from "../signup/components/SignupForm";

export default function Signup() {
  return (
    <main className="h-screen grid md:grid-cols-2 screen-h">
      <section className="relative text-white hidden md:flex flex-col items-center justify-center bg-gradient-to-b from-[#0575E6] via-[#02298A]  to-[#021B79]">
        <h2 className=" text-4xl font-bold pb-2">VetCare</h2>
        <p className=" font-extralight text-lg text-gray-400">
          We take care of your pet!
        </p>
        <Image
          src="/images/auth/lines.svg"
          alt=""
          width={120}
          height={120}
          style={{ width: "auto" }}
          className="absolute bottom-0 left-0 opacity-50"
        />
      </section>
      <div className="md:hidden text-center py-12">
        <h2 className=" text-4xl font-bold pb-2">VetCare</h2>
        <p className=" font-extralight text-lg text-gray-400">
          We take care of your pet!
        </p>
      </div>
      <SignUpForm />
    </main>
  );
}
