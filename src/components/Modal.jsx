export default function Modal({ ref, onConfirm }) {
  return (
    <dialog
      ref={ref}
      className="p-6 rounded-lg shadow-lg w-[90%] max-w-md
                 backdrop:bg-black/50
                 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <h2 className="text-lg font-bold mb-4">Delete Comment</h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this comment? This will remove this
        comment and this can't be undone.
      </p>
      <div className="flex justify-center md:justify-end gap-4">
        <button
          onClick={() => ref.current.close()}
          className="uppercase px-2 md:px-4 py-1 md:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-[14px] md:text-[16px] cursor-pointer"
        >
          No, Cancel
        </button>
        <button
          onClick={onConfirm}
          className="uppercase px-2 md:px-4 py-1 md:py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-[14px] md:text-[16px] cursor-pointer"
        >
          Yes, Delete
        </button>
      </div>
    </dialog>
  );
}
