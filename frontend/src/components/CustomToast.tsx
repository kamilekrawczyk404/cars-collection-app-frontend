import React from "react";
import { toast, Toast } from "react-hot-toast";
import { BadgeCheck, BadgeInfo, BadgeX, XIcon } from "lucide-react";

type CustomToastProps = {
  t: Toast;
  type?: "success" | "error" | "info";
  title: string;
  message: string;
};

const CustomToast = ({
  t,
  title,
  message,
  type = "success",
}: CustomToastProps) => {
  let icon;
  let styles: { iconBackground: string; title: string } = {
    iconBackground: "",
    title: "",
  };

  switch (type) {
    case "success":
      icon = <BadgeCheck className={"text-green-700"} />;
      styles = {
        iconBackground: "bg-green-800/10",
        title: "text-green-800",
      };
      break;
    case "error":
      icon = <BadgeX className={"text-red-700"} />;
      styles = {
        iconBackground: "bg-red-800/10",
        title: "text-red-800",
      };
      break;
    case "info":
      icon = <BadgeInfo className={"text-indigo-700"} />;
      styles = {
        iconBackground: "bg-indigo-800/10",
        title: "text-indigo-800",
      };
      break;
    default:
      icon = null;
      break;
  }

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <div
              className={`w-10 aspect-square rounded-full flex items-center justify-center ${styles.iconBackground}`}
            >
              {icon}
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-semibold ${styles.title}`}>{title}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium hover:text-accent focus:outline-none"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
