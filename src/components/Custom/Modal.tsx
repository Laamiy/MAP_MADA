interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  closeOnBlur?: boolean;
}

function Modal({
  isOpen,
  setIsOpen,
  children,
  closeOnBlur = true,
}: ModalProps) {
  return (
    isOpen && (
      <div className="fixed inset-0 z-1000 flex items-center justify-center">
        <div
          className="w-full h-full bg-black opacity-50 absolute"
          onClick={() => {
            if (closeOnBlur) setIsOpen(false);
          }}
        />
        <div className="bg-white rounded-md p-4 min-w-80 z-50">{children}</div>
      </div>
    )
  );
}

export default Modal;
