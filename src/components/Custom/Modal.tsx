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
          onClick={() => {
            if (closeOnBlur) setIsOpen(false);
          }}
        />
        <div >{children}</div>
      </div>
    )
  );
}

export default Modal;
