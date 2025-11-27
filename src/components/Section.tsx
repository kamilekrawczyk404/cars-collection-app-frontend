import React, { ComponentProps } from "react";

const Section = ({ children, title = "" }: ComponentProps<"div">) => {
  return (
    <section className={"p-4 w-full"}>
      <div className={"max-w-7xl mx-auto"}>
        {!!title && (
          <h1
            className={"text-2xl font-semibold leading-10 tracking-tight mb-4"}
          >
            {title}
          </h1>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
