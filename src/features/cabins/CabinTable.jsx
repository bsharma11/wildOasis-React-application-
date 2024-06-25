import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  //1 FILTER CONDITIONS
  const filterValue = searchParams.get("discount") || "all";
  // here we are setting the default value of filterValue to "all" in case user visits from some other page or for the first time

  let filtercabins;

  if (filterValue === "all") filtercabins = cabins;

  if (filterValue === "with-discount")
    filtercabins = cabins.filter((cabin) => cabin.discount > 0);

  if (filterValue === "no-discount")
    filtercabins = cabins.filter((cabin) => cabin.discount === 0);

  // SORT CONDITIONS

  const sortBy = searchParams.get("sortBy") || "asdasd-asc";
  const [field, direction] = sortBy.split("-");
  console.log(field, direction, filtercabins);
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filtercabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  console.log(sortedCabins);
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
