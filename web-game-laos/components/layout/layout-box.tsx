import React from "react";

const LayoutBox = ({
  children,
  header,
  title,
}: {
  children: React.ReactNode;
  title?: string;
  header?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h4 className="px-4 py-1 border-l-6 border-l-red-500 text-xl md:text-3xl font-semibold">
          {title}
        </h4>
        {header}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default LayoutBox;
