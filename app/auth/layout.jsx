import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <main className="min-h-screen  flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-[620px] border border-transparent rounded-[45px] bg-linear-to-br from-[#080509] via-[#1a171c] to-[#080509] p-4 sm:p-10 md:p-12 xl:p-16 shadow-custom"
        style={{
          backgroundClip: "padding-box",
        }}
      >
        {/* Gradient border using after pseudo-element */}
        <div
          className="absolute -inset-px rounded-[45px] -z-10"
          style={{
            background: "linear-gradient(71deg, #110e0e, #afa220, #110e0e)",
          }}
        ></div>

        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
