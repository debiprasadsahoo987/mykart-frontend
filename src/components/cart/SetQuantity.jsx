const SetQuantity = ({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
        <button
          disabled={quantity <= 1}
          className="border-[1.2px] border-slate-800 px-3.5 rounded-sm disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50"
          onClick={handleQtyDecrease}
        >
          -
        </button>
        <div className="text-red-500">{quantity}</div>
        <button
          className="border-[1.2px] border-slate-800 px-3 rounded"
          onClick={handleQtyIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
