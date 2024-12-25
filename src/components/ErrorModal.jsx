import Modal from "./modal";
import useErrorModal from "@/hooks/useErrorModal";
import ErrorIcon from "@/assets/icons/error-ic.svg";

const ErrorModal = () => {
  const { isOpen, title, errorMessage, closeModal } = useErrorModal();

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      icon={ErrorIcon}
      title={title || "Lỗi"}
    >
      <div className="w-full rounded-2xl px-4 py-3 bg-[#EBEBEB]">
        <p className="text-center text-base">{errorMessage}</p>
      </div>
    </Modal>
  );
};

export default ErrorModal;
