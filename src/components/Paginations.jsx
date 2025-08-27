import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPages, totalProducts }) => {
  const [searchParams] = useSearchParams();
  const pathName = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const onChangeHandler = (e, value) => {
    params.set("page", value.toString());
    navigate(`${pathName}?${params}`);
  };

  return (
    <div className="">
      <Pagination
        count={numberOfPages}
        page={paramValue}
        defaultPage={1}
        shape="rounded"
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Paginations;
