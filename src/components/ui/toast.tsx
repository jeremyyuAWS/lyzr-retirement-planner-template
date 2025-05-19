import * as React from "react";

const Toast = React.forwardRef(
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
    <div
      ref={ref}
      className="bg-white border border-gray-200 shadow-lg rounded-lg p-4"
      {...props}
    />
  )
);
Toast.displayName = "Toast";

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className="text-gray-500 hover:text-gray-700"
    {...props}
  >
    ×
  </button>
));
ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className="text-sm font-medium text-gray-900"
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className="text-sm text-gray-500"
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const ToastViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="fixed top-0 right-0 p-4 flex flex-col gap-2 max-w-xs w-full z-50"
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};