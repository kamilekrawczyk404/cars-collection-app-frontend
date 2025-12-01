import React, { createContext, ReactNode, useContext, useState } from "react";
import { AlertTriangle, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type ModalType = "warning";

interface ModalOptions {
  title: string;
  description: string;
  type?: ModalType;
  processButtonText?: string;
  onProcess: () => void | Promise<void>;
  cancelButtonText?: string;
}

interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [config, setConfig] = useState<ModalOptions | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openModal = (options: ModalOptions) => {
    setConfig(options);
    setIsOpen(true);
  };

  const closeModal = () => {
    setConfig(null);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleProcess = async () => {
    if (!config?.onProcess) return;

    try {
      setIsLoading(true);
      await config.onProcess();
      closeModal();
    } catch (error) {
      console.error(`Error in modal process: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderModal = () => {
    const isWarning = config?.type === "warning";
    const iconBg = isWarning ? "bg-red-800/10" : "bg-indigo-800/10";
    const iconColor = isWarning ? "text-red-600" : "text-indigo-600";
    const Icon = isWarning ? AlertTriangle : Info;
    const buttonBg = isWarning
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";

    return (
      <AnimatePresence>
        {isOpen && config && (
          <div className={"fixed inset-0 z-50 overflow-y-auto"}>
            <motion.div
              key={"modal-overlay"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                "fixed inset-0 bg-neutral-900/50 bg-opacity-75 transition-opacity"
              }
              onClick={() => closeModal()}
            />
            <motion.div
              key={"modal"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={
                "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
              }
            >
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in zoom-in-95 duration-200">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBg} sm:mx-0 sm:h-10 sm:w-10`}
                    >
                      <Icon
                        className={`h-6 w-6 ${iconColor}`}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        {config.title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {config.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    disabled={isLoading}
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto transition-colors ${buttonBg} ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    onClick={handleProcess}
                  >
                    {isLoading
                      ? "Processing..."
                      : config.processButtonText || "Submit"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeModal}
                  >
                    {config.cancelButtonText || "Cancel"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider!");
  }

  return context;
};
