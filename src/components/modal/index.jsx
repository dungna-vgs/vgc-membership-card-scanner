import CloseIcon from "@/assets/icons/close-ic.svg";

export default function Modal({ open, onClose, icon, title, children }) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-[99999]
        ${open ? "visible bg-black/40" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-2xl shadow p-4 transition-all w-full mx-4 max-w-80
          ${open ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
      >
        <div className="flex gap-2.5 justify-between items-center mb-2.5">
          <div className="w-7 h-7 flex-shrink-0">
            {!!icon && <img src={icon} className="w-7 h-7" />}
          </div>
          <h3 className="text-base font-bold text-black uppercase text-center">
            {title}
          </h3>
          <img
            src={CloseIcon}
            onClick={onClose}
            className="w-7 h-7 flex-shrink-0 cursor-pointer"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
