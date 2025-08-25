const Status = ({ text, icon: Icon, bg, color }) => {
  return (
    <div
      className={`${bg} ${color} px-2 py-2 font-medium rounded flex items-center gap-1`}
    >
      {text} {Icon ? <Icon size={15} /> : null}
    </div>
  );
};

export default Status;
