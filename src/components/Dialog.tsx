import React from "react";
import { IoMdClose } from "react-icons/io";

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  title?: string;
  onClose?: () => void;
}
const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(({ children, title, onClose, ...props }, ref) => {
  return (
    <dialog
      ref={ref}
      className="outline-none max-h-dvh backdrop:bg-black/50 backdrop:pointer-events-none cursor-default"
      aria-modal="true"
      role="dialog"
      {...props}
      onClose={onClose}
    >
      <div className="overflow-hidden max-h-[95%] shadow-sm border-2 rounded-2xl w-[95%] fixed max-w-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#f1f2f4]">
        {title && (
          <div className="flex justify-between items-center p-2 px-4 border-b">
            <h2 className="text-lg font-medium">{title}</h2>
            {onClose && (
              <button onClick={onClose} className="p-1.5 rounded-sm transition duration-100 ease-in-out hover:bg-black/10 outline-none ">
                <IoMdClose size={20} />
              </button>
            )}
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </dialog>
  );
});

export default Dialog;
