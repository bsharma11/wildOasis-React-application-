import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function Addcabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button size="large" variation="primary">
            Add new cabin
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function Addcabin() {
//   const [isOpenModal, setisopenModal] = useState(false);
//   return (
//     <div>
//       <Button
//         variation="primary"
//         size="large"
//         onClick={() => setisopenModal((show) => !show)}
//       >
//         Add new Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setisopenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setisopenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default Addcabin;
